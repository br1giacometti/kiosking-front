import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createFieldRepository from "../createFieldRepository";

const useCreateFieldService = () => {
  const repository = useMemo(
    () => createFieldRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { createField: repository.createField };
};

export default useCreateFieldService;
