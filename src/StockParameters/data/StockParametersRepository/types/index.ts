import { Category } from "Category/data/CategoryRepository";
import { UpdateStockParametersSchema } from "StockParameters/schemas/UpdateStockParametersSchema";
import { CreateStockParametersSchema } from "StockParameters/schemas/createStockParametersSchema";

export interface StockParameters {
  maxSellAmount: number;
  dailySellAmount: number;
  id: number;
}

export interface updatePriceStockParametersDto {
  maxSellAmount: number;
  dailySellAmount: number;
}

export interface StockParametersRepository {
  getAllStockParameters: () => Promise<StockParameters[]>;
  getStockParametersById: (
    stockparametersId: number
  ) => Promise<StockParameters>;
  updateStockParameters: (
    body: UpdateStockParametersSchema,
    stockparametersId: number
  ) => Promise<StockParameters>;
}
