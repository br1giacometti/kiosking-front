import stockparametersClient from "../client";
import { StockParameters } from "../types";

const getAllStockParameters = async () => {
  const response = await stockparametersClient.get<StockParameters[]>("/");

  return response.data;
};

export default getAllStockParameters;
