import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createProductRepository from "../createProductRepository";
import listProductReducer, {
  initialState,
} from "../reducer/listProductReducer";
import { PaginationMeta } from "../types";
import useDebounce from "Base/hooks/useDebounce";

// Límite de productos por página por defecto
const DEFAULT_ITEMS_PER_PAGE = 50;

interface UseAllProductPaginatedOptions {
  itemsPerPage?: number;
}

const useAllProductPaginated = (options?: UseAllProductPaginatedOptions) => {
  const itemsPerPage = options?.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE;
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>(
    false
  );

  // Debounce de 500ms para evitar requests en cada tecla
  const debouncedQuery = useDebounce(query, 500);

  const repository = useMemo(
    () => createProductRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: productList, loading, error }, dispatch] = useReducer(
    listProductReducer,
    initialState
  );

  const refetch = useCallback(() => {
    // Reinitialize invalidation state and fetch data
    setInvalidateCache(true);
  }, []);

  useEffect(() => {
    if (invalidated !== undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllProductPaginated(currentPage, itemsPerPage, debouncedQuery)
        .then((data) => {
          dispatch({ type: FetchActionTypes.Succeess, payload: data.data });
          setMeta(data.meta);
          setInvalidateCache(false); // Reset the cache invalidation state after fetching data
        })
        .catch((e) => {
          dispatch({ type: FetchActionTypes.Failure, payload: e.message });
          setInvalidateCache(false); // Reset the cache invalidation state on error
        });
    }
  }, [invalidated, currentPage, debouncedQuery, repository]);

  return {
    productList,
    meta,
    loading,
    error,
    refetch,
    currentPage,
    setCurrentPage,
    setQuery,
  };
};

export default useAllProductPaginated;
