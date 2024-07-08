import { useEffect, useState } from "react";
import { CreateProductSchema } from "Product/schemas/createProductSchema";
import createProductService from "../services/createProduct";

const useCreateProductService = (
  body: CreateProductSchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createProductService(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateProductService;
