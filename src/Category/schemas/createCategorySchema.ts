import { z } from "zod";

const createCategorySchema = z.object({
  description: z.string().min(2, { message: "nameMustBeAtleast3" }),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export default createCategorySchema;
