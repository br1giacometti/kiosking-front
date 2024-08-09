import movementsClient from "./client";
import { MovementsRepository } from "./types";
import createBuyMovements from "./services/createBuyMovements";
import getAllMovements from "./services/getAllMovements";
import getLastMovements from "./services/getLastMovements";
import getMovementById from "./services/getMovementById";
import updateStockMovement from "./services/updateStockMovement";
import getAllMovementsByQuery from "./services/getAllMovementsByQuery";

const createMovementsRepository = (userToken: string): MovementsRepository => {
  movementsClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createBuyMovements,
    getAllMovements,
    getLastMovements,
    getMovementById,
    updateStockMovement,
    getAllMovementsByQuery,
  };
};

export default createMovementsRepository;
