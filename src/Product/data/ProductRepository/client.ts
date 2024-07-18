import axios from "axios";

const productClient = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_API_URL
  }/product`,
});

export default productClient;
