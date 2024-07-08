import { z } from "zod";

const createAplicatorSchema = z.object({
  description: z.string().min(2, { message: "nameMustBeAtleast3" }),
});

export type CreateAplicatorSchema = z.infer<typeof createAplicatorSchema>;

export default createAplicatorSchema;
