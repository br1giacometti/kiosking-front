import { CreateProductSchema } from "Product/schemas/createProductSchema";

export interface Product {
  description: string;
  sellPrice: number;
  createdAt: Date;
  barCode: string;
  id: number;
}

export interface ProductRepository {
  createProduct: (body: CreateProductSchema) => Promise<Product>;
  getAllProduct: () => Promise<Product[]>;
}
