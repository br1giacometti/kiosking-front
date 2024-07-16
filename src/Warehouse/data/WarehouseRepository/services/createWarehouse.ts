import { isAxiosError } from "axios";
import { CreateWarehouseSchema } from "Warehouse/schemas/createWarehouseSchema";
import warehouseClient from "../client";

const createWarehouse = async (body: CreateWarehouseSchema) => {
  try {
    const response = await warehouseClient.post("/create", body);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createWarehouse;
