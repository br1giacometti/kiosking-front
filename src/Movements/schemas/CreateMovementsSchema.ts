import { z } from "zod";

export const optionItem = z.object({
  label: z.string(),
  value: z.number(),
  currentValue: z.number(),
});

export const productMovementsDetail = z.object({
  productId: z.number(),
  quantity: z.number(),
  sellPrice: z.number(),
});

const createMovementsSchema = z.object({
  description: z.string(),
  value: z.string().transform((val, ctx) => {
    const parsed = Number.parseInt(val.replaceAll(".", ""), 10);
    if (Number.isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
      });

      return z.NEVER;
    }
    if (parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "mustBePositive",
      });

      return z.NEVER;
    }
    return parsed;
  }),
  warehouseOriginId: optionItem,
  movementType: z.string(),
  stockMovementDetail: z.array(productMovementsDetail),
  productId: optionItem,
});

export type CreateMovementsSchema = z.infer<typeof createMovementsSchema>;

export default createMovementsSchema;
