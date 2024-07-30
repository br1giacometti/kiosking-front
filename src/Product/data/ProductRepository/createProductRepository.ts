import { ProductRepository } from "./types";
import createProduct from "./services/createProduct";
import getAllProduct from "./services/getAllProduct";
import productClient from "./client";
import updateProduct from "./services/updateProduct";

const createProductRepository = (userToken: string): ProductRepository => {
  productClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createProduct,
    getAllProduct,
    updateProduct,
  };
};

export default createProductRepository;
