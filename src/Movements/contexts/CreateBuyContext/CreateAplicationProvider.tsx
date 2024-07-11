import { PropsWithChildren } from "react";
import CreateAplicationContext, {
  CreateAplicationContext as TCreateAplicationContext,
} from "./CreateAplicationContext";

const CreateBuyProvider = ({
  children,
  warehouseMovementsDetail,
  ...props
}: PropsWithChildren<TCreateAplicationContext>) => (
  <CreateAplicationContext.Provider value={{ ...props, warehouseMovementsDetail }}>
    {children}
  </CreateAplicationContext.Provider>
);

export default CreateBuyProvider;
