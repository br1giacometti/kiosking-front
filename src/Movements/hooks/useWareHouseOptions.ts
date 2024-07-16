import OptionItem from "Base/types/OptionItem";
import { useAllWarehouseService } from "Warehouse/data/WarehouseRepository";

interface UseWareHouseOptionsReturn {
  options: OptionItem<number>[];
  loading: boolean;
  error?: string;
}

const useWareHouseOptions = (): UseWareHouseOptionsReturn => {
  const { warehouseList, loading, error } = useAllWarehouseService();

  return {
    options: warehouseList.map((wh) => ({
      label: `${wh.description}`,
      value: wh.id,
      description: wh.description,
    })),
    loading,
    error,
  };
};

export default useWareHouseOptions;
