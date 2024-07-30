import { Category } from "Category/data/CategoryRepository";
import { UpdateProductSchema } from "Product/schemas/UpdateProductSchema";
import { CreateProductSchema } from "Product/schemas/createProductSchema";

export interface Product {
  description: string;
  sellPrice: number;
  createdAt: Date;
  barCode: string;
  categoryId: number;
  category: Category;
  id: number;
}

export interface updatePriceProduct {
  sellPrice: number;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface ProductPaginatedReturn {
  data: Product[];
  meta: PaginationMeta;
}

export interface ProductRepository {
  createProduct: (body: CreateProductSchema) => Promise<Product>;
  getAllProduct: () => Promise<Product[]>;
  updateProduct: (
    body: updatePriceProduct,
    productId: number
  ) => Promise<Product>;
  getAllProductPaginated: (
    page?: number,
    limit?: number,
    query?: string
  ) => Promise<ProductPaginatedReturn>;
}
