import axios from "axios";

const fieldClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/field`,
});

export default fieldClient;
