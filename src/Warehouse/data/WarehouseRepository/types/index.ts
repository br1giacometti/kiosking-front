import { CreateWarehouseSchema } from "Warehouse/schemas/createWarehouseSchema";

export interface Warehouse {
  description: string;
  id: number;
}

export interface WarehouseRepository {
  createWarehouse: (body: CreateWarehouseSchema) => Promise<Warehouse>;
  getAllWarehouse: () => Promise<Warehouse[]>;
}
