import peopleClient from "../client";
import { ProductPaginatedReturn } from "../types";

const useAllProductPaginated = async (
  page = 1,
  limit = 100,
  query?: string,
  categoryId?: string
): Promise<ProductPaginatedReturn> => {
  const response = await peopleClient.get<ProductPaginatedReturn>(
    `/pagination?page=${page}&limit=${limit}${query ? `&query=${query}` : ""}${
      categoryId ? `&categoryId=${categoryId}` : ""
    }`
  );

  return response.data;
};

export default useAllProductPaginated;
