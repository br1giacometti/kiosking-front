import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createMovementsRepository from "../createMovementsRepository";

const useUpdateStockMovementService = () => {
  const repository = useMemo(
    () => createMovementsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { updateStockMovement: repository.updateStockMovement };
};

export default useUpdateStockMovementService;
