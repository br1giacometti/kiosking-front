import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createProductRepository from "../createProductRepository";

const useDeletePersonService = () => {
  const repository = useMemo(
    () => createProductRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { deletePerson: repository.deleteProduct };
};

export default useDeletePersonService;
