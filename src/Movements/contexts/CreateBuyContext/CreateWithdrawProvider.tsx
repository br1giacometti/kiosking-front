import { PropsWithChildren } from "react";
import CreateWithdrawContext, {
  CreateWithdrawContext as TCreateWithdrawContext,
} from "./CreateWithdrawContext";

const CreateWithdrawProvider = ({
  children,
  stockMovementDetail,
  ...props
}: PropsWithChildren<TCreateWithdrawContext>) => (
  <CreateWithdrawContext.Provider value={{ ...props, stockMovementDetail }}>
    {children}
  </CreateWithdrawContext.Provider>
);

export default CreateWithdrawProvider;
