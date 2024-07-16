import aplicatorClient from "../client";
import { Aplicator } from "../types";

const getAllAplicator = async () => {
  const response = await aplicatorClient.get<Aplicator[]>("/");

  return response.data;
};

export default getAllAplicator;
