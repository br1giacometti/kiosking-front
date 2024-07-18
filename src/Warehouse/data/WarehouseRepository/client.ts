import axios from "axios";

const warehouseClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/warehouse`,
});

export default warehouseClient;
