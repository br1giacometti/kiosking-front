import { useContext } from "react";
import CreateBuyContext, {
  CreateBuyContext as TCreateBuyContext,
} from "../CreateBuyContext";

const useCreateBuyContext = () => {
  const context = useContext<TCreateBuyContext | undefined>(
    CreateBuyContext
  );

  if (context === undefined) {
    throw new Error(
      "useCreateBuyContext"
    );
  }

  return context;
};

export default useCreateBuyContext;
