import { useMemo } from "react";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import formatPrice from "Base/utils/formatters/formatPrice";
import getMovementTypeColor from "Movements/utils/getMovementTypeColor";
import formatDatetime from "Base/utils/formatters/formatDatetime";
import {
  StockMovementDetail2,
  ViewMovements2,
} from "Movements/data/MovementsRepository";
import { PrinterIcon } from "@heroicons/react/24/outline";

interface MovementDetailsProps {
  movement: ViewMovements2 | null;
}

const MovementDetails = ({ movement }: MovementDetailsProps) => {
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
              // onClick={() => handlePrint()}
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
