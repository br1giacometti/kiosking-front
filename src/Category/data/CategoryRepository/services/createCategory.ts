import { isAxiosError } from "axios";
import { CreateCategorySchema } from "Category/schemas/createCategorySchema";
import categoryClient from "../client";

const createCategory = async (body: CreateCategorySchema) => {
  try {
    const response = await categoryClient.post("/create", body);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createCategory;
