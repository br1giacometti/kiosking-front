import batchClient from "../clientBatch";
import { Batch } from "../types";

const getAllBatch = async () => {
  const response = await batchClient.get<Batch[]>("/");
  console.log("batchs", response);
  return response.data;
};

export default getAllBatch;
