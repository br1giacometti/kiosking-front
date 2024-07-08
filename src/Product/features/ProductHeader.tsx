import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface ProductHeaderProps {
  navigateToCreateProduct: () => void;
}

const ProductHeader = ({ navigateToCreateProduct }: ProductHeaderProps) => {
  const { t } = useTranslation(["product", "appLayout"]);

  return (
    <Flex justify="space-between">
      <Heading>{t("sidebar.menu.product", { ns: "appLayout" })}</Heading>
      <Button
        leftIcon={<Icon as={PlusIcon} />}
        variant="outline"
        onClick={navigateToCreateProduct}
      >
        {t("actions.create")}
      </Button>
    </Flex>
  );
};

export default ProductHeader;
