import OptionItem from "Base/types/OptionItem";
import { useAllCategoryService } from "Category/data/CategoryRepository";

interface UseCategoryOptionsReturn {
  options: OptionItem<number>[];
  loading: boolean;
  error?: string;
}

const useCategoryOptions = (): UseCategoryOptionsReturn => {
  const { categoryList, loading, error } = useAllCategoryService();

  return {
    options: categoryList.map((category) => ({
      label: `${category.description}`,
      value: category.id,
    })),
    loading,
    error,
  };
};

export default useCategoryOptions;
