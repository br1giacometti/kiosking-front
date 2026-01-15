import { useState, useEffect, useCallback } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import productClient from "../client";
import { Product } from "../types";
import useDebounce from "Base/hooks/useDebounce";

// Límite de productos a mostrar en búsqueda
const SEARCH_LIMIT = 150;

interface UseSearchProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchByBarcode: (barcode: string) => Promise<Product | null>;
}

const useSearchProducts = (
  searchTerm: string,
  debounceMs: number = 500
): UseSearchProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  // Configurar token en el cliente
  useEffect(() => {
    const token = TokenHandler.getTokenFromCookies();
    if (token) {
      productClient.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };
    }
  }, []);

  // Búsqueda con debounce para escritura normal
  useEffect(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < 1) {
      setProducts([]);
      return;
    }

    setLoading(true);
    productClient
      .get<Product[]>(`/search`, {
        params: { q: debouncedSearchTerm, limit: SEARCH_LIMIT },
      })
      .then((response) => {
        setProducts(response.data);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedSearchTerm]);

  // Búsqueda inmediata para código de barras (sin debounce)
  const searchByBarcode = useCallback(
    async (barcode: string): Promise<Product | null> => {
      if (!barcode) return null;
      try {
        const response = await productClient.get<Product[]>(`/search`, {
          params: { q: barcode, limit: 50 },
        });
        
        if (response.data.length === 0) return null;
        
        // Buscar coincidencia exacta por código de barras
        const exactMatch = response.data.find(
          (p) => p.barCode === barcode
        );
        
        return exactMatch || response.data[0];
      } catch {
        return null;
      }
    },
    []
  );

  return { products, loading, error, searchByBarcode };
};

export default useSearchProducts;
