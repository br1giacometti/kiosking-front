import { z } from "zod";

const createWarehouseSchema = z.object({
  description: z.string().min(2, { message: "nameMustBeAtleast3" }),
});

export type CreateWarehouseSchema = z.infer<typeof createWarehouseSchema>;

export default createWarehouseSchema;
