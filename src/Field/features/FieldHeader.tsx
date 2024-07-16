import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Base/i18n";

interface FieldHeaderProps {
  navigateToCreateField: () => void;
}

const FieldHeader = ({ navigateToCreateField }: FieldHeaderProps) => {
  const { t } = useTranslation(["field", "appLayout"]);

  return (
    <Flex justify="space-between">
      <Heading>{t("sidebar.menu.field", { ns: "appLayout" })}</Heading>
      <Button
        leftIcon={<Icon as={PlusIcon} />}
        variant="outline"
        onClick={navigateToCreateField}
      >
        {t("actions.create")}
      </Button>
    </Flex>
  );
};

export default FieldHeader;
