import { z } from "zod";
import createBatchSchema from "./createBatchSchema";

const createFieldSchema = z.object({
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
  batches: z.array(createBatchSchema),
});

export type CreateFieldSchema = z.infer<typeof createFieldSchema>;

export default createFieldSchema;
