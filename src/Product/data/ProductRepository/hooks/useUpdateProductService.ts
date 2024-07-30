import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import createProductRepository from "../createProductRepository";

const useUpdateProductService = () => {
  const repository = useMemo(
    () => createProductRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { updateProduct: repository.updateProduct };
};

export default useUpdateProductService;
