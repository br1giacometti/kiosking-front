import fieldClient from "./fieldClient";
import createField from "./services/createField";
import getAllField from "./services/getAllField";
import { FieldRepository } from "./types";

const createFieldRepository = (userToken: string): FieldRepository => {
  fieldClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createField,
    getAllField,
  };
};

export default createFieldRepository;
