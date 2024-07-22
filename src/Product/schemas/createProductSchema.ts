import { z } from "zod";

const createProductSchema = z.object({
  description: z.string().min(2, { message: "nameMustBeAtleast3" }),
  minimumQuantity: z.number(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export default createProductSchema;
