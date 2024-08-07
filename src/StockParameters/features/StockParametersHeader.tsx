import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

const ProductHeader = () => {
  const { t } = useTranslation(["product", "appLayout"]);

  return (
    <Flex justify="space-between" align="center">
      <Heading>{t("Configuracion", { ns: "appLayout" })}</Heading>
      <Flex gap={4}></Flex>
    </Flex>
  );
};

export default ProductHeader;
