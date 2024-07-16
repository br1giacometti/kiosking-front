import { PropsWithChildren } from "react";
import AddProductsContext, {
  AddProductsContext as TAddProductsContext,
} from "./AddProductsContext";

const AddProductsProvider = ({
  children,
  stockMovementDetail,
  ...props
}: PropsWithChildren<TAddProductsContext>) => (
  <AddProductsContext.Provider value={{ ...props, stockMovementDetail }}>
    {children}
  </AddProductsContext.Provider>
);

export default AddProductsProvider;
