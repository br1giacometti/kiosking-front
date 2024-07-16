import OptionItem from "Base/types/OptionItem";
import { useAllFieldService } from "Field/data/FieldRepository";

interface UseFieldOptionsReturn {
  options: OptionItem<number>[];
  loading: boolean;
  error?: string;
}

const useFieldOptions = (): UseFieldOptionsReturn => {
  const { fieldList, loading, error } = useAllFieldService();

  return {
    options: fieldList.map((field) => ({
      label: `${field.description}`,
      value: field.id,
      description: field.description,
    })),
    loading,
    error,
  };
};

export default useFieldOptions;
