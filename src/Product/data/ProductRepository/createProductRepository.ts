import { ProductRepository } from "./types";
import createProduct from "./services/createProduct";
import getAllProduct from "./services/getAllProduct";
import productClient from "./client";
import updatePriceProduct from "./services/updatePriceProduct";
import updateProduct from "./services/updateProduct";
import deleteProduct from "./services/deleteProduct";
import getProductById from "./services/getProductById";
import getAllProductPaginated from "./services/getAllProductPaginated";

const createProductRepository = (userToken: string): ProductRepository => {
  productClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createProduct,
    getAllProduct,
    updatePriceProduct,
    getAllProductPaginated,
    deleteProduct,
    getProductById,
    updateProduct,
  };
};

export default createProductRepository;
