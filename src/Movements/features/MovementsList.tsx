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
        label: t("list.label.description"),
        selector: (row) => row.description,
      },
      {
        label: t("list.label.movementType"),
        selector: (row) => {
          const color = getMovementTypeColor(row.MovementType);

          return (
            <Badge colorScheme={color}>
              {t(`list.movementTypes.${row.MovementType}`)}
            </Badge>
          );
        },
      },
      {
        label: t("list.label.originBox"),
        selector: (row) => row.MovementType,
      },
      {
        label: t("list.label.date"),
        selector: (row) => formatDate(new Date(row.date)),
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
