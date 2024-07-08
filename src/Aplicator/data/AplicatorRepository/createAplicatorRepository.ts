import { AplicatorRepository } from "./types";
import createAplicator from "./services/createAplicator";
import getAllAplicator from "./services/getAllAplicator";
import aplicatorClient from "./client";

const createAplicatorRepository = (userToken: string): AplicatorRepository => {
  aplicatorClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createAplicator,
    getAllAplicator,
  };
};

export default createAplicatorRepository;
