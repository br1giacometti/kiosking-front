import { PropsWithChildren } from "react";
import CreateBuyContext, {
  CreateBuyContext as TCreateBuyContext,
} from "./CreateBuyContext";

const CreateBuyProvider = ({
  children,
  stockMovementDetail: stockMovementDetail,
  ...props
}: PropsWithChildren<TCreateBuyContext>) => (
  <CreateBuyContext.Provider
    value={{ ...props, stockMovementDetail: stockMovementDetail }}
  >
    {children}
  </CreateBuyContext.Provider>
);

export default CreateBuyProvider;
