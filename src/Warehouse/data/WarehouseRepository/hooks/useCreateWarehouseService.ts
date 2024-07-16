import { useEffect, useState } from "react";

import { CreateWarehouseSchema } from "Warehouse/schemas/createWarehouseSchema";
import createWarehouseService from "../services/createWarehouse";

const useCreateWarehouseService = (
  body: CreateWarehouseSchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createWarehouseService(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateWarehouseService;
