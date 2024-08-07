import { z } from "zod";

const updateStockParametersSchema = z.object({
  maxSellAmount: z
    .string()
    .transform((val) => {
      const parsed = Number.parseInt(val, 10);
      if (Number.isNaN(parsed)) {
        return null;
      }
      return parsed;
    })
    .optional(),
  dailySellAmount: z
    .string()
    .transform((val) => {
      const parsed = Number.parseInt(val, 10);
      if (Number.isNaN(parsed)) {
        return null;
      }
      return parsed;
    })
    .optional(),
});

export type UpdateStockParametersSchema = z.infer<
  typeof updateStockParametersSchema
>;

export default updateStockParametersSchema;
