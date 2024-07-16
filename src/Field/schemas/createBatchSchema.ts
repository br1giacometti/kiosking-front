import { z } from "zod";

const createBatchSchema = z.object({
  description: z.string().min(2, { message: "nameMustBeAtleast3" }),
  hectares: z.string().transform((val, ctx) => {
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

export type CreateBatchSchema = z.infer<typeof createBatchSchema>;

export default createBatchSchema;
