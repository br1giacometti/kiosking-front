import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import createStockParametersRepository from "../createStockParametersRepository";

const useUpdateStockParametersService = () => {
  const repository = useMemo(
    () =>
      createStockParametersRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { updateStockParameters: repository.updateStockParameters };
};

export default useUpdateStockParametersService;
