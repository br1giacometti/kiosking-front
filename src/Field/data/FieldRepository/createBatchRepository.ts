import batchClient from "./clientBatch";
import { BatchRepository } from "./types";
import getAllBatch from "./services/getAllBatch";

const createBatchRepository = (userToken: string): BatchRepository => {
  batchClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    getAllBatch,
  };
};

export default createBatchRepository;
