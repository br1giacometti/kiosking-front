import { UpdateStockParametersSchema } from "StockParameters/schemas/UpdateStockParametersSchema";
import peopleClient from "../client";
import { StockParameters } from "../types";

const updateStockParameters = async (
  body: UpdateStockParametersSchema,
  stockparametersId: number
): Promise<StockParameters> => {
  const response = await peopleClient.patch<StockParameters>(
    `/${stockparametersId}`,
    body
  );

  return response.data;
};

export default updateStockParameters;
