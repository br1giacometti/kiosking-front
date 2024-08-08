import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Toast,
  Tooltip,
} from "@chakra-ui/react";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import formatPrice from "Base/utils/formatters/formatPrice";
import getMovementTypeColor from "Movements/utils/getMovementTypeColor";
import formatDatetime from "Base/utils/formatters/formatDatetime";
import {
  CreateMovementDto,
  Movements,
  MovementsDto,
  StockMovementDetail2,
  ViewMovements2,
} from "Movements/data/MovementsRepository";
import { PrinterIcon } from "@heroicons/react/24/outline";
import updateStockMovement from "Movements/data/MovementsRepository/services/updateStockMovement";
import useUpdateStockMovementService from "Movements/data/MovementsRepository/hooks/useUpdateProductService";
import useUpdateMovementsStates from "Movements/hooks/useUpdateMovementsStates";
import getMovementById from "Movements/data/MovementsRepository/services/getMovementById";

interface MovementDetailsProps {
  movement: ViewMovements2 | null;
  navigateToPrint: (factureLink: string) => void;
  movementsDto: MovementsDto;
}

const MovementDetails = ({
  movement,
  navigateToPrint,
  movementsDto,
}: MovementDetailsProps) => {
  const { updateStockMovement } = useUpdateStockMovementService();

  const { loading, error, successFetch, failureFetch, startFetch } =
    useUpdateMovementsStates();

  const [factureLink, setFactureLink] = useState<string | null>(null);

  const movementDetailsColumns: BaseColumn<StockMovementDetail2>[] = useMemo(
    () => [
      {
        label: "Producto",
        selector: (row) => row.product.description,
      },
      {
        label: "Precio de venta",
        selector: (row) =>
          row.sellPrice != null ? formatPrice(row.sellPrice) : "0",
      },
      {
        label: "Cantidad",
        selector: (row) => row.quantity,
      },
    ],
    []
  );

  if (movement === null) {
    return <>No existe el movimiento que intentas buscar</>;
  }

  const handleNavigateToPrint = (factureLink: string) => {
    window.open(factureLink, "_blank"); // Abre el link en una nueva pestaña
  };

  const handleUpdateProduct = (data: Movements) => {
    if (loading) return; // Previene múltiples solicitudes

    startFetch();
    updateStockMovement(data, data.id)
      .then((productUpdated) => {
        successFetch(productUpdated);
        setFactureLink(productUpdated.factureLink);
      })
      .catch((axiosError) => {
        failureFetch(axiosError.response.data.message);
      });
  };
  return (
    <Stack>
      <Card px={6} py={6}>
        <Heading size="md">
          {"Datos del movimiento"}
          <Badge
            colorScheme={getMovementTypeColor(movement.movementType)}
            fontSize={{ md: "md" }}
          >
            {movement.movementType === "BUY" ? " COMPRA " : " APLICACION "}
          </Badge>
        </Heading>
        <Stack
          direction={{ base: "row" }}
          mt={4}
          spacing={2}
          align="center"
          justifyContent={"space-between"}
        >
          <Text>
            <strong>{"Fecha"}:</strong> {formatDatetime(movement.date)}
          </Text>
          <Tooltip label="Imprimir Ticket" placement="bottom">
            <IconButton
              aria-label="Print"
              colorScheme="gray"
              icon={<PrinterIcon />}
              size="sm"
              variant="outline"
              onClick={() =>
                (factureLinkSet || row.factureLink) === null
                  ? handleUpdateProduct(row.id)
                  : navigateToPrint(factureLinkSet || row.factureLink)
              }
              isLoading={loadingPrint} // Deshabilita el botón y muestra un spinner mientras carga
            />
          </Tooltip>
        </Stack>
      </Card>
      <Card px={6} py={6}>
        <Stack spacing={6}>
          <DataTable
            columns={movementDetailsColumns}
            data={movement.stockMovementDetail}
          />
        </Stack>
        <Box p={4} borderTopWidth={1}>
          <Flex justify="space-between" fontWeight="bold">
            <Text fontSize={30}>Monto Total</Text>
            <Text fontSize={30}>{formatPrice(movement.value)}</Text>
          </Flex>
        </Box>
      </Card>
    </Stack>
  );
};

export default MovementDetails;
