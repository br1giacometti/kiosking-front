import fieldClient from "../client";
import { Field } from "../types";

const getAllField = async () => {
  const response = await fieldClient.get<Field[]>("/");

  return response.data;
};

export default getAllField;
