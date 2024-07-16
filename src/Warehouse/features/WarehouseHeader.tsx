import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface WarehouseHeaderProps {
  navigateToCreateWarehouse: () => void;
}

const WarehouseHeader = ({
  navigateToCreateWarehouse,
}: WarehouseHeaderProps) => {
  const { t } = useTranslation(["warehouse", "appLayout"]);

  return (
    <Flex justify="space-between">
      <Heading>{t("sidebar.menu.warehouse", { ns: "appLayout" })}</Heading>
      <Button
        leftIcon={<Icon as={PlusIcon} />}
        variant="outline"
        onClick={navigateToCreateWarehouse}
      >
        {t("actions.create")}
      </Button>
    </Flex>
  );
};

export default WarehouseHeader;
