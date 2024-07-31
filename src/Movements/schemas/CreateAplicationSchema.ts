import { z } from "zod";

export const productOptionItem = z.object({
  productId: z.number(),
  description: z.string(),
  quantity: z.number(),
  sellPrice: z.number().optional(),
});

export const StockMovementDetailSchema = z.object({
  product: productOptionItem,
  quantity: z.number(),
  sellPrice: z.number().optional(),
  description: z.string().min(1, { message: "Required" }),
});

export type StockMovementDetail = z.infer<typeof StockMovementDetailSchema>;

const createAplicationSchema = z.object({
  movementType: z.string().nonempty({ message: "Required" }),
  stockMovementDetail: z.array(StockMovementDetailSchema),
});

export type CreateAplicationSchema = z.infer<typeof createAplicationSchema>;

export default createAplicationSchema;
