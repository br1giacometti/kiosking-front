import { useContext } from "react";
import CreateFieldContext, {
  CreateFieldContext as TCreateFieldContext,
} from "../CreateFieldContext";

const useCreateFieldContext = () => {
  const context = useContext<TCreateFieldContext | undefined>(
    CreateFieldContext
  );

  if (context === undefined) {
    throw new Error(
      "useCreateParcel must be used within a CreateParcelProvider"
    );
  }

  return context;
};

export default useCreateFieldContext;
