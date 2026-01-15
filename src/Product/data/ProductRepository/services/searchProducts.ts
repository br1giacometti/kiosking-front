import productClient from "../client";
import { Product } from "../types";

const searchProducts = async (
  query: string,
  limit: number = 50
): Promise<Product[]> => {
  if (!query || query.length < 1) {
    return [];
  }
  const response = await productClient.get<Product[]>(`/search`, {
    params: { q: query, limit },
  });
  return response.data;
};

export default searchProducts;
