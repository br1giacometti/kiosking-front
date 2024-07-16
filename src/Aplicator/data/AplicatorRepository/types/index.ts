import { CreateAplicatorSchema } from "Aplicator/schemas/createAplicatorSchema";

export interface Aplicator {
  description: string;
  id: number;
}

export interface AplicatorRepository {
  createAplicator: (body: CreateAplicatorSchema) => Promise<Aplicator>;
  getAllAplicator: () => Promise<Aplicator[]>;
}
