import axios from "axios";

const stockparametersClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/stock-parameters`,
});

export default stockparametersClient;
