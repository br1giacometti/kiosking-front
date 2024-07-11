import { useContext } from "react";
import CreateWithdrawContext, {
  CreateAplicationContext as TCreateAplicationContext,
} from "../CreateAplicationContext";

const useCreateAplicationContext = () => {
  const context = useContext<TCreateAplicationContext | undefined>(
    CreateWithdrawContext
  );

  if (context === undefined) {
    throw new Error(
      "useCreateAplicationContext"
    );
  }

  return context;
};

export default useCreateAplicationContext;
