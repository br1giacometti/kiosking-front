import { isAxiosError } from "axios";
import { CreateProductSchema } from "Product/schemas/createProductSchema";
import productClient from "../client";

const createProduct = async (body: CreateProductSchema) => {
  try {
    const response = await productClient.post("/create", body);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createProduct;
