import { StockParametersRepository } from "./types";
import getAllStockParameters from "./services/getAllStockParameters";
import stockparametersClient from "./client";
import updateStockParameters from "./services/updateStockParameters";
import getStockParametersById from "./services/getStockParametersById";

const createStockParametersRepository = (
  userToken: string
): StockParametersRepository => {
  stockparametersClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    getAllStockParameters,
    getStockParametersById,
    updateStockParameters,
  };
};

export default createStockParametersRepository;
