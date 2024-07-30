import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface CategoryHeaderProps {
  navigateToCreateCategory: () => void;
}

const CategoryHeader = ({ navigateToCreateCategory }: CategoryHeaderProps) => {
  const { t } = useTranslation(["category", "appLayout"]);

  return (
    <Flex justify="space-between">
      <Heading>{t("Categorias", { ns: "appLayout" })}</Heading>
      <Button
        leftIcon={<Icon as={PlusIcon} />}
        variant="outline"
        onClick={navigateToCreateCategory}
      >
        {t("Crear categoria")}
      </Button>
    </Flex>
  );
};

export default CategoryHeader;
