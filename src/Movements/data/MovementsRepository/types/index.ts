import { User } from "Auth/types";
import { Warehouse } from "Warehouse/data/WarehouseRepository";

export interface ProductMovementsDetail {
  productId: number;
  quantity: number;
  buyPrice: number;
}

export interface CreateMovementDto {
  batchId?: number;
  value?: number;
  description: string;
  movementType: "BUY" | "APLICATION" | "MOVEMENT" | string;
  stockMovementsDetail?: ProductMovementsDetail[];
  voucherDescription: string;
  date?: Date;
  warehouseOriginId?: number;
}

export interface Movements {
  description: string;
  value: number;
  user: User;
  MovementType: string;
  date: Date;
  stockMovementsDetail?: ProductMovementsDetail[];
  warehouseOrigin?: Warehouse;
  id: number;
}

export interface MovementListItem {
  description: string;
  value: number;
  user: User;
  MovementType: string;
  date: Date;
  id: number;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface MovementsRepository {
  createBuyMovements: (body: CreateMovementDto) => Promise<Movements>;
  getAllMovements: () => Promise<MovementListItem[]>;
}
