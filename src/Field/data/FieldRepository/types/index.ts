import { CreateFieldSchema } from "Field/schemas/createFieldSchema";

export interface Batch {
  description: string;
  hectares: number;
  id: number;
}

export interface Field {
  description: string;
  hectares: number;
  batches: Batch[];
  id: number;
}

export interface FieldRepository {
  createField: (body: CreateFieldSchema) => Promise<Field>;
  getAllField: () => Promise<Field[]>;
}
