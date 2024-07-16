import { createContext } from "react";

import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { CreateMovementsSchema } from "Movements/schemas/CreateMovementsSchema";

export type AddProductsContext = UseFormReturn<CreateMovementsSchema> & {
  stockMovementDetail: UseFieldArrayReturn<
    CreateMovementsSchema,
    "stockMovementDetail"
  >;
};

export default createContext<AddProductsContext | undefined>(undefined);
