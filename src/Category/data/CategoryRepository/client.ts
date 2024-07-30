import axios from "axios";

const categoryClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/category`,
});

export default categoryClient;
