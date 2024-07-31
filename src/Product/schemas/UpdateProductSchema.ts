import { z } from "zod";

const updateProductSchema = z.object({
  description: z.string().min(2, { message: "nameMustBeAtleast3" }),
  barCode: z.string().min(2, { message: "nameMustBeAtleast3" }),
  sellPrice: z
    .string()
    .transform((val) => {
      const parsed = Number.parseInt(val, 10);
      if (Number.isNaN(parsed)) {
        return null;
      }
      return parsed;
    })
    .optional(),
  categoryId: z.number().min(1, { message: "Debe seleccionar una categoria" }),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export default updateProductSchema;
