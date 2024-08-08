import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import getMovementTypeColor from "Movements/utils/getMovementTypeColor";
import { useTranslation } from "Base/i18n";
import {
  MovementListItem,
  useAllMovements,
} from "Movements/data/MovementsRepository";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import formatDate from "Base/utils/formatters/formatDate";
import formatPrice from "Base/utils/formatters/formatPrice";
import { EditIcon } from "@chakra-ui/icons";
import { PrinterIcon } from "@heroicons/react/24/outline";
import formatDatetime from "Base/utils/formatters/formatDatetime";

interface MovementsListProps {
  navigateToDetails: (movementId: number) => void;
  navigateToPrint: (factureLink: string) => void;
}

const MovementsList = ({
  navigateToDetails,
  navigateToPrint,
}: MovementsListProps) => {
  const toast = useToast();
  const { t } = useTranslation("movements");
  const { error, loading, movementsList } = useAllMovements();

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
    ],
    [t]
  );

  const handleClickMovement = useCallback(
    (row: MovementListItem) => {
      navigateToDetails(row.id);
    },
    [navigateToDetails]
  );

  useEffect(() => {
    if (error) {
      toast({ status: "error", description: error });
    }
  }, [error, toast]);

  return (
    <>
      <Box px={{ base: 3, md: 6 }}>
        <DataTable
          columns={columns}
          data={movementsList}
          loading={loading}
          onClickRow={handleClickMovement}
        />
      </Box>
    </>
  );
};

export default MovementsList;
