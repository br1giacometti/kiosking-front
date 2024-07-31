import productClient from "../client";
import { Product, updatePriceProductDto } from "../types";

const updatePriceProduct = async (
  body: updatePriceProductDto,
  productId: number
): Promise<Product> => {
  const response = await productClient.patch<Product>(`/${productId}`, {
    sellPrice: body.sellPrice,
  });

  return response.data;
};

export default updatePriceProduct;
