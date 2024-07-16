import { CreateProductSchema } from "Product/schemas/createProductSchema";

export interface Product {
  description: string;
  buyPrice: number;
  sellPrice: number;
  createdAt: Date;
  minimumQuantity: number;
  id: number;
}

export interface ProductRepository {
  createProduct: (body: CreateProductSchema) => Promise<Product>;
  getAllProduct: () => Promise<Product[]>;
}
