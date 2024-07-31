import productClient from "../client";
import { Product } from "../types";

const getProductById = async (productId: number) => {
  const response = await productClient.get<Product>(`/${productId}`);

  return response.data;
};

export default getProductById;
