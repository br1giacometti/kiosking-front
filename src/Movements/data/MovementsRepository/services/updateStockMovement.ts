import peopleClient from "../client";
import { CreateMovementDto, Movements } from "../types";

const updateStockMovement = async (
  body: Movements,
  stockmovementId: number
): Promise<Movements> => {
  const response = await peopleClient.patch<Movements>(
    `/${stockmovementId}`,
    body
  );

  return response.data;
};

export default updateStockMovement;
