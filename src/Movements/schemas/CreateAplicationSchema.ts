import { z } from "zod";

export const warehouseOptionItem = z.object({
  label: z.string(),
  value: z.number(),
  description: z.string(),
});

export const batchOptionItem = z.object({
  label: z.string(),
  value: z.number(),
  description: z.string(),
});

export const aplicatorOptionItem = z.object({
  label: z.string(),
  value: z.number(),
  description: z.string(),
});

export const fieldOptionItem = z.object({
  label: z.string(),
  value: z.number(),
  description: z.string(),
});

export const productOptionItem = z.object({
  productId: z.number(),
  description: z.string(),
});

export const StockMovementDetailSchema = z.object({
  product: productOptionItem,
  quantity: z.number(),
  buyPrice: z.number().optional(),
  description: z.string().min(1, { message: "Required" }),
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
});

export type StockMovementDetail = z.infer<typeof StockMovementDetailSchema>;

const createAplicationSchema = z.object({
  description: z.string(),
  movementType: z.string(),
  warehouseOriginId: warehouseOptionItem,
  batchId: batchOptionItem,
  aplicatorId: aplicatorOptionItem,
  voucherDescription: z.string(),
  fieldId: fieldOptionItem,
  stockMovementDetail: z.array(StockMovementDetailSchema),
});

export type CreateAplicationSchema = z.infer<typeof createAplicationSchema>;

export default createAplicationSchema;
