import { CreateCategorySchema } from "Category/schemas/createCategorySchema";

export interface Category {
  description: string;
  id: number;
}

export interface CategoryRepository {
  createCategory: (body: CreateCategorySchema) => Promise<Category>;
  getAllCategory: () => Promise<Category[]>;
}
