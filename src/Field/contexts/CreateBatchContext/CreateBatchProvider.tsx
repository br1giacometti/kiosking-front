import { PropsWithChildren } from "react";
import CreateFieldContext, {
  CreateFieldContext as TCreateFieldContext,
} from "./CreateFieldContext";

const CreateFieldProvider = ({
  children,
  batches,
  ...props
}: PropsWithChildren<TCreateFieldContext>) => (
  <CreateFieldContext.Provider value={{ ...props, batches }}>
    {children}
  </CreateFieldContext.Provider>
);

export default CreateFieldProvider;
