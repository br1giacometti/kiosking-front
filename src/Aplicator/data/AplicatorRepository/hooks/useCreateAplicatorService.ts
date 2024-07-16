import { useEffect, useState } from "react";

import { CreateAplicatorSchema } from "Aplicator/schemas/createAplicatorSchema";
import createAplicatorService from "../services/createAplicator";

const useCreateAplicatorService = (
  body: CreateAplicatorSchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createAplicatorService(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateAplicatorService;
