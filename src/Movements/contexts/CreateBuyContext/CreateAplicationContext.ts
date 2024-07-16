import { CreateAplicationSchema } from "Movements/schemas/CreateAplicationSchema";
import { createContext } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

export type CreateAplicationContext = UseFormReturn<CreateAplicationSchema> & {
  stockMovementDetail: UseFieldArrayReturn<
    CreateAplicationSchema,
    "stockMovementDetail"
  >;
};

export default createContext<CreateAplicationContext | undefined>(undefined);
