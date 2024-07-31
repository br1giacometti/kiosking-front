import { UpdateProductSchema } from "Product/schemas/UpdateProductSchema";
import peopleClient from "../client";
import { Product } from "../types";

const updateProduct = async (
  body: UpdateProductSchema,
  productId: number
): Promise<Product> => {
  const response = await peopleClient.patch<Product>(`/${productId}`, body);

  return response.data;
};

export default updateProduct;
