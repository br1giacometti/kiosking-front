import { PropsWithChildren } from "react";
import { Flex } from "@chakra-ui/react";

interface FormPageLayoutProps extends PropsWithChildren {
  onSubmit?: () => void;
  width?: string | { base: string; md: string }; // Añadir la prop width
}

const FormPageLayout = ({ children, onSubmit, width }: FormPageLayoutProps) => (
  <Flex
    as="form"
    flexDirection="column"
    gap={8}
    m="auto"
    w={width || { base: "md", md: "container.md" }} // Utilizar la prop width
    onSubmit={onSubmit}
  >
    {children}
  </Flex>
);

export default FormPageLayout;
