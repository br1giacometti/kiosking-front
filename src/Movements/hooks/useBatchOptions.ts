import OptionItem from "Base/types/OptionItem";
import useAllBatchService from "Field/data/FieldRepository/hooks/useAllBatchService";

interface BatchOptionItem extends OptionItem<number> {
  fieldId: number;
}

interface UseBatchOptionsReturn {
  options: BatchOptionItem[];
  loading: boolean;
  error?: string;
}

const useBatchOptions = (): UseBatchOptionsReturn => {
  const { batchList, loading, error } = useAllBatchService();

  return {
    options: batchList.map((batch) => ({
      label: `${batch.description}`,
      value: batch.id,
      description: batch.description,
      fieldId: batch.fieldId,
    })),
    loading,
    error,
  };
};

export default useBatchOptions;
