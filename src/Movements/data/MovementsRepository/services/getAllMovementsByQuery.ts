import movementsClient from "../client";
import { Movements, MovementsPaginatedReturn } from "../types";

const getAllMovementsByQuery = async (
  query?: string,
  startDate?: string,
  endDate?: string
): Promise<Movements> => {
  let queryString = "/byquery";

  console.log(query, startDate, endDate);

  // Construir la cadena de consulta manualmente
  if (startDate) {
    queryString += `?startDate=${encodeURIComponent(startDate)}`;
  }

  if (endDate) {
    queryString += `${
      queryString.includes("?") ? "&" : "?"
    }endDate=${encodeURIComponent(endDate)}`;
  }

  if (query) {
    queryString += `${
      queryString.includes("?") ? "&" : "?"
    }query=${encodeURIComponent(query)}`;
  }

  const response = await movementsClient.get<Movements>(queryString);

  console.log(queryString);
  return response.data;
};

export default getAllMovementsByQuery;
