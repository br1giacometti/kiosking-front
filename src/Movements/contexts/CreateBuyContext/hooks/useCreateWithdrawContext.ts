import { useContext } from "react";
import CreateWithdrawContext, {
  CreateWithdrawContext as TCreateWithdrawContext,
} from "../CreateWithdrawContext";

const useCreateWithdrawContext = () => {
  const context = useContext<TCreateWithdrawContext | undefined>(
    CreateWithdrawContext
  );

  if (context === undefined) {
    throw new Error(
      "useCreateParcel must be used within a CreateParcelProvider"
    );
  }

  return context;
};

export default useCreateWithdrawContext;
