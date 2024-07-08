import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface AplicatorHeaderProps {
  navigateToCreateAplicator: () => void;
}

const AplicatorHeader = ({
  navigateToCreateAplicator,
}: AplicatorHeaderProps) => {
  const { t } = useTranslation(["aplicator", "appLayout"]);

  return (
    <Flex justify="space-between">
      <Heading>{t("sidebar.menu.aplicator", { ns: "appLayout" })}</Heading>
      <Button
        leftIcon={<Icon as={PlusIcon} />}
        variant="outline"
        onClick={navigateToCreateAplicator}
      >
        {t("actions.create")}
      </Button>
    </Flex>
  );
};

export default AplicatorHeader;
