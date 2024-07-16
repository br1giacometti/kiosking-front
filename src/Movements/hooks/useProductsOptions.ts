import OptionItem from "Base/types/OptionItem";
import { useAllProductService } from "Product/data/ProductRepository";

interface UseProductsOptionsReturn {
  options: OptionItem<number>[];
  loading: boolean;
  error?: string;
}

const useProductsOptions = (): UseProductsOptionsReturn => {
  const { productList, loading, error } = useAllProductService();

  return {
    options: productList.map((product) => ({
      label: `${product.description}`,
      value: product.id,
    })),
    loading,
    error,
  };
};

export default useProductsOptions;
