import movementsClient from "../client";
import { CreateMovementDto, Movements } from "../types";

const createBuyMovements = async (
  body: CreateMovementDto
): Promise<Movements> => {
  const response = await movementsClient.post<Movements>("/create", body);

  return response.data;
};

export default createBuyMovements;
