import warehouseClient from "../client";
import { Warehouse } from "../types";

const getAllWarehouse = async () => {
  const response = await warehouseClient.get<Warehouse[]>("/");

  return response.data;
};

export default getAllWarehouse;
