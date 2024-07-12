import { useContext } from "react";
import CreateAplicationContext, {
  CreateAplicationContext as TCreateAplicationContext,
} from "../CreateAplicationContext";

const useCreateAplicationContext = () => {
  const context = useContext<TCreateAplicationContext | undefined>(
    CreateAplicationContext
  );

  if (context === undefined) {
    throw new Error(
      "useCreateAplicationContext"
    );
  }

  return context;
};

export default useCreateAplicationContext;
