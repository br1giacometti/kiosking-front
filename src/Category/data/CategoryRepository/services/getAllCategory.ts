import categoryClient from "../client";
import { Category } from "../types";

const getAllCategory = async () => {
  const response = await categoryClient.get<Category[]>("/");

  return response.data;
};

export default getAllCategory;
