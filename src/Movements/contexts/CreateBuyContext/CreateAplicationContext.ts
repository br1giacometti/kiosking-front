import { CreateAplicationSchema } from "Movements/schemas/CreateAplicationSchema";
import { createContext } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

export type CreateAplicationContext = UseFormReturn<CreateAplicationSchema> & {
  warehouseMovementsDetail: UseFieldArrayReturn<
    CreateAplicationSchema,
    "warehouseMovementsDetail"
  >;
};

export default createContext<CreateAplicationContext | undefined>(undefined);
