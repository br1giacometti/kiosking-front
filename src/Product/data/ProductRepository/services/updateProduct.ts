import productClient from "../client";
import { Product, updatePriceProduct } from "../types";

const updateProduct = async (
  body: updatePriceProduct,
  productId: number
): Promise<Product> => {
  const response = await productClient.patch<Product>(`/${productId}`, {
    sellPrice: body.sellPrice,
  });

  return response.data;
};

export default updateProduct;
