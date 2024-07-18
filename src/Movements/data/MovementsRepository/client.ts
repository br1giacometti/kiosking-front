import axios from "axios";

const movementsClient = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_API_URL
  }/stockMovement`,
});

export default movementsClient;
