import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface ProductHeaderProps {
  navigateToCreateProduct: () => void;
  navigateToEditMultiProduct: () => void;
}

const ProductHeader = ({
  navigateToCreateProduct,
  navigateToEditMultiProduct,
}: ProductHeaderProps) => {
  const { t } = useTranslation(["product", "appLayout"]);

  return (
    <Flex justify="space-between" align="center">
      <Heading>{t("sidebar.menu.product", { ns: "appLayout" })}</Heading>
      <Flex gap={4}>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          variant="outline"
          onClick={navigateToCreateProduct}
        >
          {t("actions.create")}
        </Button>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          variant="outline"
          onClick={navigateToEditMultiProduct}
        >
          Actualizar Precios
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProductHeader;
