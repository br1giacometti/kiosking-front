import { z } from "zod";

export const optionItem = z.object({
  label: z.string(),
  value: z.number(),
  currentValue: z.number(),
});

export const WarehouseMovementsDetailSchema = z.object({
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
export type WarehouseMovementsDetail = z.infer<
  typeof WarehouseMovementsDetailSchema
>;

const createAplicationSchema = z.object({
  warehouseOrigin: optionItem,
  movementType: z.string(),
  aplicatorId: z.number(),
  date: z.string(),
  warehouseMovementsDetail: z.array(WarehouseMovementsDetailSchema),
});

export type CreateAplicationSchema = z.infer<typeof createAplicationSchema>;

export default createAplicationSchema;
