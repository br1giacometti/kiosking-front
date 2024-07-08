import { useAllAplicatorService } from "Aplicator/data/AplicatorRepository";
import OptionItem from "Base/types/OptionItem";

interface UseAplicatorOptions {
  options: OptionItem<number>[];
  loading: boolean;
  error?: string;
}

const useAplicatorOptions = (): UseAplicatorOptions => {
  const { aplicatorList, loading, error } = useAllAplicatorService();

  return {
    options: aplicatorList.map((aplicator) => ({
      label: `${aplicator.description}`,
      value: aplicator.id,
      description: aplicator.description,
    })),
    loading,
    error,
  };
};

export default useAplicatorOptions;
