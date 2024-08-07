import stockparametersClient from "../client";
import { StockParameters } from "../types";

const getStockParametersById = async (stockparametersId: number) => {
  const response = await stockparametersClient.get<StockParameters>(
    `/${stockparametersId}`
  );

  return response.data;
};

export default getStockParametersById;
