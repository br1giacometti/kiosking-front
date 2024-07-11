import { useContext } from "react";
import AddProductsContext, {
  AddProductsContext as TAddProductsContext,
} from "../AddProductsContext";
const useAddProductsContext = () => {
  const context = useContext<TAddProductsContext | undefined>(
    AddProductsContext
  );

  if (context === undefined) {
    throw new Error(
      "useAddProductsContext must be used within a CreateParcelProvider"
    );
  }

  return context;
};

export default useAddProductsContext;
