import axios from "axios";

const aplicatorClient = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_API_URL
  }/aplicator`,
});

export default aplicatorClient;
