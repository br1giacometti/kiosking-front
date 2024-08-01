import movementsClient from "../client";
import { MovementListItem } from "../types";

const getLastMovements = async () => {
  const response = await movementsClient.get<MovementListItem[]>("/last");

  return response.data;
};

export default getLastMovements;
