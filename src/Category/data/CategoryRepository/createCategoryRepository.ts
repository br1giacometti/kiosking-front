import { CategoryRepository } from "./types";
import createCategory from "./services/createCategory";
import getAllCategory from "./services/getAllCategory";
import categoryClient from "./client";

const createCategoryRepository = (userToken: string): CategoryRepository => {
  categoryClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createCategory,
    getAllCategory,
  };
};

export default createCategoryRepository;
