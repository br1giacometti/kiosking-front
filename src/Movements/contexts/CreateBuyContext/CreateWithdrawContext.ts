import { CreateWithdrawSchema } from "Movements/schemas/CreateWithdrawSchema";
import { createContext } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

export type CreateWithdrawContext = UseFormReturn<CreateWithdrawSchema> & {
  stockMovementDetail: UseFieldArrayReturn<
    CreateWithdrawSchema,
    "stockMovementDetail"
  >;
};

export default createContext<CreateWithdrawContext | undefined>(undefined);
