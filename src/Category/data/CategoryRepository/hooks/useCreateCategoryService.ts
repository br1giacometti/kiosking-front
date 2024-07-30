import { useEffect, useState } from "react";
import { CreateCategorySchema } from "Category/schemas/createCategorySchema";
import createCategoryService from "../services/createCategory";

const useCreateCategoryService = (
  body: CreateCategorySchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createCategoryService(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateCategoryService;
