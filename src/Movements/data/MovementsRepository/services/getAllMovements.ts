import movementsClient from "../client";
import { MovementListItem } from "../types";

const getAllMovements = async () => {
  const response = await movementsClient.get<MovementListItem[]>("/");

  return response.data;
};

export default getAllMovements;
