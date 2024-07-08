import { PropsWithChildren } from "react";
import CreateWithdrawContext, {
  CreateWithdrawContext as TCreateWithdrawContext,
} from "./CreateWithdrawContext";

const CreateWithdrawProvider = ({
  children,
  cashBoxMovementsDetail,
  ...props
}: PropsWithChildren<TCreateWithdrawContext>) => (
  <CreateWithdrawContext.Provider value={{ ...props, cashBoxMovementsDetail }}>
    {children}
  </CreateWithdrawContext.Provider>
);

export default CreateWithdrawProvider;
