import { CreateFieldSchema } from "Field/schemas/createFieldSchema";
import { createContext } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

export type CreateFieldContext = UseFormReturn<CreateFieldSchema> & {
  batches: UseFieldArrayReturn<CreateFieldSchema, "batches">;
};

export default createContext<CreateFieldContext | undefined>(undefined);
