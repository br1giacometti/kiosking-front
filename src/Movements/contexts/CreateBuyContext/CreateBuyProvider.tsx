import { PropsWithChildren } from "react";
import CreateBuyContext, {
  CreateBuyContext as TCreateBuyContext,
} from "./CreateBuyContext";

const CreateBuyProvider = ({
  children,
  stockMovementsDetail: stockMovementsDetail,
  ...props
}: PropsWithChildren<TCreateBuyContext>) => (
  <CreateBuyContext.Provider value={{ ...props, stockMovementsDetail: stockMovementsDetail }}>
    {children}
  </CreateBuyContext.Provider>
);

export default CreateBuyProvider;
