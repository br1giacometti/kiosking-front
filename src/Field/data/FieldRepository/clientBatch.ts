import axios from "axios";

const batchClient = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_API_URL
  }/batch`,
});

export default batchClient;
