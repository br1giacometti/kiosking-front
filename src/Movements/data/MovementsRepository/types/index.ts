import { Aplicator } from "Aplicator/data/AplicatorRepository";
import { User } from "Auth/types";
import { Batch } from "Field/data/FieldRepository";
import { Product } from "Product/data/ProductRepository";
import { Warehouse } from "Warehouse/data/WarehouseRepository";

export interface StockMovementsDetail {
  productId: number;
  quantity: number;
  buyPrice?: number;
}

export interface CreateMovementDto {
  value?: number;
  description: string;
  movementType: "BUY" | "APLICATION" | "MOVEMENT" | string;
  stockMovementDetail?: StockMovementsDetail[];
  voucherDescription?: string;
  date?: Date;
  warehouseOriginId?: number;
  warehouseDestinyId?: number;
  batchId?: number;
  aplicatorId?: number;
}

export interface Movements {
  description: string;
  value: number;
  // user: User;
  MovementType: string;
  date: Date;
  stockMovementDetail?: StockMovementsDetail[];
  warehouseOrigin?: Warehouse;
  warehouseDestiny?: Warehouse;
  aplicator?: Aplicator;
  batch?: Batch;
  id: number;
}

interface ViewStockMovementsDetail {
  description: string;
  quantity: number;
  product: {
    productId: number;
    description: string;
    quantity: number;
    sellPrice?: number;
  };
  sellPrice?: number;
}

interface StockMovementDetail {
  quantity: number;
  product: {
    productId: number;
    description: string;
    sellPrice?: number;
  };
  sellPrice?: number;
}

export interface ViewMovements {
  description: string;
  value: number;
  movementType: string;
  date: Date;
  stockMovementDetail: StockMovementDetail[];
  id: number;
}

export interface MovementListItem {
  description: string;
  value: number;
  user: User;
  movementType: string;
  createdAt: Date;
  warehouseDestiny: string;
  id: number;
}

export interface MovementListProductItem {
  description: string;
  sellPrice: number;
  quantity: number;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export type ProductDetail = {
  productId: number;
  description: string;
  sellPrice?: number;
};

export type StockMovementDetail2 = {
  product: ProductDetail;
  quantity: number;
  sellPrice?: number;
};

export interface ViewMovements2 {
  movementType: string;
  date: Date;
  value: number;
  stockMovementDetail: StockMovementDetail[];
}

export interface MovementsRepository {
  createBuyMovements: (body: CreateMovementDto) => Promise<Movements>;
  getAllMovements: () => Promise<MovementListItem[]>;
  getLastMovements: () => Promise<MovementListItem[]>;
  getMovementById: (movementId: number) => Promise<Movements>;
}
