import movementsClient from "../client";

export default async function getMovementById(movementId: number) {
  const response = await movementsClient.get(`/${movementId}`);

  return response.data;
}
