import { PropsWithChildren } from "react";
import AddProductsContext, {
  AddProductsContext as TAddProductsContext,
} from "./AddProductsContext";

const AddProductsProvider = ({
  children,
  stockMovementsDetail,
  ...props
}: PropsWithChildren<TAddProductsContext>) => (
  <AddProductsContext.Provider value={{ ...props, stockMovementsDetail }}>
    {children}
  </AddProductsContext.Provider>
);

export default AddProductsProvider;
