import productClient from "../client";
import { Product } from "../types";

const getAllProduct = async () => {
  const response = await productClient.get<Product[]>("/");

  return response.data;
};

export default getAllProduct;
