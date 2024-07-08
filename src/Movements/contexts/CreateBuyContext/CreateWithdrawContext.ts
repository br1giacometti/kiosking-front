import { CreateWithdrawSchema } from "Movements/schemas/CreateWithdrawSchema";
import { createContext } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

export type CreateWithdrawContext = UseFormReturn<CreateWithdrawSchema> & {
  cashBoxMovementsDetail: UseFieldArrayReturn<
    CreateWithdrawSchema,
    "cashBoxMovementsDetail"
  >;
};

export default createContext<CreateWithdrawContext | undefined>(undefined);
