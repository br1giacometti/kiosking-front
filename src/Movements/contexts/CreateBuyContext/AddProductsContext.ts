import { createContext } from "react";

import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { CreateMovementsSchema } from "Movements/schemas/CreateMovementsSchema";

export type AddProductsContext = UseFormReturn<CreateMovementsSchema> & {
  stockMovementsDetail: UseFieldArrayReturn<
    CreateMovementsSchema,
    "stockMovementsDetail"
  >;
};

export default createContext<AddProductsContext | undefined>(undefined);
