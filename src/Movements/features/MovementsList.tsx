import { useCallback, useEffect, useMemo } from "react";
import { Badge, Box, useToast } from "@chakra-ui/react";

import getMovementTypeColor from "Movements/utils/getMovementTypeColor";
import { useTranslation } from "Base/i18n";
import {
  MovementListItem,
  useAllMovements,
} from "Movements/data/MovementsRepository";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import formatDate from "Base/utils/formatters/formatDate";

interface MovementsListProps {
  navigateToDetails: (movementId: number) => void;
}

const MovementsList = ({ navigateToDetails }: MovementsListProps) => {
  const toast = useToast();
  const { t } = useTranslation("movements");
  const { error, loading, movementsList } = useAllMovements();
  const columns: BaseColumn<MovementListItem>[] = useMemo(
    () => [
      {
        label: "Descripcion",
        selector: (row) => row.description,
      },
      {
        label: "Tipo de movimiento",
        selector: (row) => {
          const color = getMovementTypeColor(row.movementType);

          return <Badge colorScheme={color}>{row.movementType}</Badge>;
        },
      },
      {
        label: "Valor",
        selector: (row) => row.value,
      },
      {
        label: "Fecha",
        selector: (row) => formatDate(new Date(row.createdAt)),
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
