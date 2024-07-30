import { Category } from "Category/data/CategoryRepository";
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

export interface ProductRepository {
  createProduct: (body: CreateProductSchema) => Promise<Product>;
  getAllProduct: () => Promise<Product[]>;
}
