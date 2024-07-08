import { z } from "zod";

export const optionItem = z.object({
  label: z.string(),
  value: z.number(),
  currentValue: z.number(),
});

export const CashBoxMovementsDetailSchema = z.object({
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
export type CashBoxMovementsDetail = z.infer<
  typeof CashBoxMovementsDetailSchema
>;

const createWithdrawSchema = z.object({
  isVirtualPaid: z.boolean(),
  cashBoxOrigin: optionItem,
  movementType: z.string(),
  date: z.string(),
  cashBoxMovementsDetail: z.array(CashBoxMovementsDetailSchema),
});

export type CreateWithdrawSchema = z.infer<typeof createWithdrawSchema>;

export default createWithdrawSchema;
