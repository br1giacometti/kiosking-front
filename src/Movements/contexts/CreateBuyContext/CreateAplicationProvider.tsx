import { PropsWithChildren } from "react";
import CreateAplicationContext, {
  CreateAplicationContext as TCreateAplicationContext,
} from "./CreateAplicationContext";

const CreateAplicationProvider = ({
  children,
  stockMovementDetail,
  ...props
}: PropsWithChildren<TCreateAplicationContext>) => (
  <CreateAplicationContext.Provider
    value={{ ...props, stockMovementDetail: stockMovementDetail }}
  >
    {children}
  </CreateAplicationContext.Provider>
);

export default CreateAplicationProvider;
