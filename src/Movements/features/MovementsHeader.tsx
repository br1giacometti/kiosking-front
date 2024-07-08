import { Button, Flex, Heading, HStack, Icon, Stack } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "Base/i18n";

interface MovementsHeaderProps {
  navigateToCreateBuyMovement: () => void;
  navigateToCreateRendition: () => void;
  navigateToCreateWithdraw: () => void;
}

const MovementsHeader = ({
  navigateToCreateBuyMovement,
  navigateToCreateRendition,
  navigateToCreateWithdraw,
}: MovementsHeaderProps) => {
  const { t } = useTranslation(["movements"]);

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      px={6}
      spacing={{ base: 6, lg: 0 }}
    >
      <Heading>{t("sidebar.menu.movements", { ns: "appLayout" })}</Heading>
      <Stack direction={{ base: "column", md: "row" }}>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          variant="outline"
          onClick={navigateToCreateBuyMovement}
        >
          {"Comprar productos"}
        </Button>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          mr="2"
          variant="outline"
          onClick={navigateToCreateRendition}
        >
          {"Generar aplicacion"}
        </Button>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          variant="outline"
          onClick={navigateToCreateWithdraw}
        >
          {"Generar retiro"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default MovementsHeader;
