import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import createMovementsRepository from "../createMovementsRepository";

const useCreateMovementsService = () => {
  const repository = useMemo(
    () => createMovementsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { createMovements: repository.createBuyMovements };
};

export default useCreateMovementsService;
