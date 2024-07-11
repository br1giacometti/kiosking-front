import { Aplicator } from "Aplicator/data/AplicatorRepository";
import { User } from "Auth/types";
import { Batch } from "Field/data/FieldRepository";
import { Warehouse } from "Warehouse/data/WarehouseRepository";

export interface StockMovementDetail {
  productId: number;
  quantity: number;
  buyPrice?: number;
}

export interface CreateMovementDto {
  batchId?: number;
  value?: number;
  description: string;
  movementType: "BUY" | "APLICATION" | "MOVEMENT" | string;
  stockMovementDetail?: StockMovementDetail[];
  voucherDescription?: string;
  date?: Date;
  warehouseOriginId?: number;
  warehouseDestinyId?: number;
  aplicatorId?: number;
}

export interface Movements {
  description: string;
  value: number;
  // user: User;
  MovementType: string;
  date: Date;
  stockMovementDetail?: StockMovementDetail[];
  warehouseOrigin?: Warehouse;
  warehouseDestiny?: Warehouse;
  aplicator?: Aplicator;
  batch?: Batch;
  id: number;
}

export interface MovementListItem {
  description: string;
  value: number;
  user: User;
  movementType: string;
  date: Date;
  warehouseDestiny: string;
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
