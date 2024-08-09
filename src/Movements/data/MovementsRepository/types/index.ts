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
  wasFactured: Boolean;
  factureLink?: string;
}

export interface Movements {
  description: string;
  value: number;
  // user: User;
  MovementType: string;
  date: Date;
  stockMovementDetail: StockMovementDetail[];
  warehouseOrigin?: Warehouse;
  warehouseDestiny?: Warehouse;
  aplicator?: Aplicator;
  batch?: Batch;
  id: number;
  wasFactured: Boolean;
  factureLink: string;
}

export interface MovementsDto {
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
  wasFactured: Boolean;
  factureLink: string;
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
  productId: number;
  product: {
    productId: number;
    description: string;
    sellPrice?: number;
  };
  sellPrice?: number;
  factureLink: string;
}

export interface ViewMovements {
  description: string;
  value: number;
  movementType: string;
  date: Date;
  stockMovementDetail: StockMovementDetail[];
  id: number;
  factureLink: string;
}

export interface MovementListItem {
  description: string;
  value: number;
  user: User;
  movementType: string;
  createdAt: Date;
  warehouseDestiny: string;
  id: number;
  factureLink: string;
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

export interface StockMovementsDetail {
  productId: number;
  quantity: number;
  buyPrice?: number;
}

export interface ViewMovements2 {
  movementType?: string;
  date: Date;
  value: number;
  stockMovementDetail: StockMovementDetail[];
  factureLink: string;
  description: string;
  MovementType: string;
  warehouseOrigin?: Warehouse;
  warehouseDestiny?: Warehouse;
  aplicator?: Aplicator;
  batch?: Batch;
  id: number;
  wasFactured: Boolean;
}

export interface MovementsPaginatedReturn {
  data: MovementListItem[];
  meta: PaginationMeta;
  payload: Movements[]; // Asegúrate de que payload sea de tipo MovementListItem[]
}

export interface MovementsRepository {
  createBuyMovements: (body: CreateMovementDto) => Promise<Movements>;
  getAllMovements: () => Promise<MovementListItem[]>;
  getLastMovements: () => Promise<MovementListItem[]>;
  getMovementById: (movementId: number) => Promise<Movements>;
  updateStockMovement: (
    body: Movements,
    movementId: number
  ) => Promise<Movements>;
  getAllMovementsByQuery: (
    query: string,
    startDate?: string,
    endDate?: string
  ) => Promise<Movements>;
}
