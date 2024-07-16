import { CreateBuySchema } from "Movements/schemas/CreateBuySchema";
import { createContext } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

export type CreateBuyContext = UseFormReturn<CreateBuySchema> & {
  stockMovementDetail: UseFieldArrayReturn<
    CreateBuySchema,
    "stockMovementDetail"
  >;
};

export default createContext<CreateBuyContext | undefined>(undefined);
