import { useEffect, useMemo } from "react";
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import { EditIcon } from "@chakra-ui/icons";
import { PrinterIcon } from "@heroicons/react/24/outline";
import formatDatetime from "Base/utils/formatters/formatDatetime";
import formatPrice from "Base/utils/formatters/formatPrice";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import useLastMovements from "Movements/data/MovementsRepository/hooks/useLastMovements";
import { MovementListItem } from "Movements/data/MovementsRepository";

interface LastMovementsListProps {
  navigateToPrint: (factureLink: string) => void;
}

const LastMovementsList = ({ navigateToPrint }: LastMovementsListProps) => {
  const toast = useToast();
  const { t } = useTranslation("movements");
  const { error, loading, movementsList } = useLastMovements();

  useEffect(() => {
    if (error) {
      toast({ status: "error", description: error });
    }
  }, [error, toast]);

  const columns: BaseColumn<MovementListItem>[] = useMemo(
    () => [
      {
        label: "Fecha",
        selector: (row) => formatDatetime(new Date(row.createdAt)),
      },
      {
        label: "Valor",
        selector: (row) => formatPrice(row.value),
      },
      {
        label: t("Acciones"),
        selector: (row) => (
          <>
            <Flex gap={2}>
              <Tooltip label={t("Imprimir")} placement="bottom">
                <IconButton
                  aria-label="Edit icon"
                  colorScheme="gray"
                  icon={<PrinterIcon />}
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    row.factureLink
                      ? navigateToPrint(row.factureLink)
                      : console.log("no hay ticket")
                  }
                />
              </Tooltip>
            </Flex>
          </>
        ),
      },
    ],
    [t]
  );

  return (
    <Box px={{ base: 3, md: 6 }}>
      <DataTable columns={columns} data={movementsList} loading={loading} />
    </Box>
  );
};

export default LastMovementsList;
