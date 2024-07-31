import OptionItem from "Base/types/OptionItem";
import { useAllProductService } from "Product/data/ProductRepository";

interface ProductOption extends OptionItem<number> {
  sellPrice: number;
  barCode: string;
}

interface UseProductsOptionsReturn {
  options: ProductOption[];
  loading: boolean;
  error?: string;
}

const useProductsOptions = (): UseProductsOptionsReturn => {
  const { productList, loading, error } = useAllProductService();

  // Mapea productList a ProductOption
  const options: ProductOption[] = productList.map((product) => ({
    label: `${product.description}`,
    value: product.id,
    sellPrice: product.sellPrice,
    barCode: product.barCode,
  }));

  return {
    options,
    loading,
    error,
  };
};

export default useProductsOptions;
