import { isAxiosError } from "axios";
import { CreateAplicatorSchema } from "Aplicator/schemas/createAplicatorSchema";
import aplicatorClient from "../client";

const createAplicator = async (body: CreateAplicatorSchema) => {
  try {
    const response = await aplicatorClient.post("/create", body);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createAplicator;
