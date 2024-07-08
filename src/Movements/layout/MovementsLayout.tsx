import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface MovementsLayoutProps {
  children: {
    header: ReactNode;
    content: ReactNode;
  };
}

const MovementsLayout = ({ children }: MovementsLayoutProps) => (
  <Flex flexDirection="column" gap={8} w="100%">
    {children.header}
    {children.content}
  </Flex>
);

export default MovementsLayout;
