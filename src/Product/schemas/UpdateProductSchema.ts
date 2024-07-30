import { z } from "zod";

const updateProductSchema = z.object({
  description: z.string().min(2, { message: "nameMustBeAtleast3" }),
  barCode: z.string().min(2, { message: "nameMustBeAtleast3" }),
  sellPrice: z.string().transform((val, ctx) => {
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
  categoryId: z.number().min(1, { message: "Debe seleccionar una categoria" }),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export default updateProductSchema;
