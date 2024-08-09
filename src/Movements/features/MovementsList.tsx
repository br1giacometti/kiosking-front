import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Tooltip,
  useToast,
  Input,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";

import getMovementTypeColor from "Movements/utils/getMovementTypeColor";
import { useTranslation } from "Base/i18n";

import DataTable, { BaseColumn } from "Base/components/DataTable";
import formatPrice from "Base/utils/formatters/formatPrice";
import formatDatetime from "Base/utils/formatters/formatDatetime";
import SalesChart from "./SalesChart";
import {
  addDays,
  startOfDay,
  endOfDay,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import useAllMovementsByQuery from "Movements/data/MovementsRepository/hooks/useAllMovementsByQuery";
import { MovementListItem } from "Movements/data/MovementsRepository";

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

  const {
    error,
    loading,
    movementsList,
    refetch,
    setQuery,
    setEndDate,
    setStartDate,
  } = useAllMovementsByQuery();

  const [selectedRange, setSelectedRange] = useState<string>("");
  const [customStartDate, setCustomStartDate] = useState<string | null>(null);
  const [customEndDate, setCustomEndDate] = useState<string | null>(null);

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
    ],
    [t]
  );

  const handleClickMovement = useCallback(
    (row: MovementListItem) => {
      navigateToDetails(row.id);
    },
    [navigateToDetails]
  );

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const range = e.target.value;
    setSelectedRange(range); // Guarda el rango seleccionado en el estado
    setQuery(range);

    let start: Date | null = null;
    let end: Date | null = endOfDay(new Date()); // Default end date is today

    switch (range) {
      case "day":
        start = startOfDay(new Date());
        break;
      case "lastDay":
        start = startOfDay(subDays(new Date(), 1));
        end = endOfDay(subDays(new Date(), 1));
        break;
      case "lastWeek":
        start = startOfDay(subDays(new Date(), 7));
        break;
      case "lastMonth":
        start = startOfDay(subMonths(new Date(), 1));
        break;
      case "lastYear":
        start = startOfDay(subYears(new Date(), 1));
        break;
      case "custom":
        start = null;
        end = null;
        break;
      default:
        start = null;
        end = null;
    }

    if (start) setStartDate(start.toISOString());
    if (end) setEndDate(end.toISOString());

    if (range !== "custom") {
      refetch();
    }
  };

  const handleCustomDateChange = () => {
    if (customStartDate && customEndDate) {
      setStartDate(customStartDate);
      setEndDate(customEndDate);
      refetch();
    } else {
      toast({
        status: "warning",
        description:
          "Por favor selecciona ambas fechas para el rango personalizado.",
      });
    }
  };

  // Calculate total sales and invoiced amounts
  const totalSales = useMemo(() => {
    return movementsList.reduce((acc, movement) => acc + movement.value, 0);
  }, [movementsList]);

  const totalInvoiced = useMemo(() => {
    return movementsList.reduce(
      (acc, movement) => (movement.factureLink ? acc + movement.value : acc),
      0
    );
  }, [movementsList]);

  return (
    <>
      <Box px={{ base: 3, md: 6 }} mb={4}>
        <Flex mb={4} alignItems="center">
          <Select placeholder="Seleccionar Rango" onChange={handleRangeChange}>
            <option value="day">Hoy</option>
            <option value="lastDay">Ayer</option>
            <option value="lastWeek">Última Semana</option>
            <option value="lastMonth">Último Mes</option>
            <option value="lastYear">Último Año</option>
            <option value="custom">Personalizado</option>
          </Select>

          {selectedRange === "custom" && (
            <Flex ml={4}>
              <Input
                type="date"
                placeholder="Fecha de inicio"
                onChange={(e) => setCustomStartDate(e.target.value)}
              />
              <Input
                type="date"
                placeholder="Fecha de fin"
                onChange={(e) => setCustomEndDate(e.target.value)}
              />
              <Button onClick={handleCustomDateChange} ml={2}>
                Aplicar
              </Button>
            </Flex>
          )}
        </Flex>

        {/* Totals Display */}
        <Flex
          mb={4}
          direction="row"
          justify="space-between"
          align="center"
          p={4}
          bg="gray.100"
          borderRadius="md"
          boxShadow="md"
        >
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Total Ventas:
            </Text>
            <Text fontSize="2xl">{formatPrice(totalSales)}</Text>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Total Facturado:
            </Text>
            <Text fontSize="2xl">{formatPrice(totalInvoiced)}</Text>
          </Box>
        </Flex>

        <SalesChart
          movementsList={movementsList}
          selectedRange={selectedRange}
        />

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
