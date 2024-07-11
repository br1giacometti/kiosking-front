import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import createMovementsRepository from "../createMovementsRepository";

const useCreateBuyService = () => {
  const repository = useMemo(
    () => createMovementsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { createWithdraw: repository.createBuyMovements };
};

export default useCreateBuyService;
