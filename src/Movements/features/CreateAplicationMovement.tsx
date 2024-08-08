import { useEffect, useMemo, useState } from "react";
import { Controller, FieldErrors, useFormContext } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import useCreateMovementsStates from "Movements/hooks/useCreateMovementsStates";
import {
  MovementListItem,
  Movements,
  useCreateMovementsService,
} from "Movements/data/MovementsRepository";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import ConfirmCreateModal from "Movements/components/ConfirmCreateDialog";
import FormCreateAplicationDetails from "./FormCreateAplicationDetails";
import { CreateAplicationSchema } from "Movements/schemas/CreateAplicationSchema";
import LastMovementsList from "./LastMovementsList";
import useLastMovements from "Movements/data/MovementsRepository/hooks/useLastMovements";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import formatDatetime from "Base/utils/formatters/formatDatetime";
import formatPrice from "Base/utils/formatters/formatPrice";
import { PrinterIcon } from "@heroicons/react/24/outline";
import useUpdateStockMovementService from "Movements/data/MovementsRepository/hooks/useUpdateProductService";
import useUpdateMovementsStates from "Movements/hooks/useUpdateMovementsStates";
import getMovementById from "Movements/data/MovementsRepository/services/getMovementById";
import useUpdateMovementsStates2 from "Movements/hooks/useUpdateMovementsStates2";

interface CreateMovementsProps {
  navigateToPrint: (factureLink: string) => void;
}

const CreateAplicationMovement = ({
  navigateToPrint,
}: CreateMovementsProps) => {
  const toast = useToast();
  const { t } = useTranslation("movements");
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useFormContext<CreateAplicationSchema>();

  const { createMovements } = useCreateMovementsService();
  const {
    loading: loadingCreate,
    error,
    startFetch,
    successFetch,
    failureFetch,
  } = useCreateMovementsStates();
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const {
    error: errorLast,
    loading: loadingLast,
    movementsList,
    refetch,
  } = useLastMovements();

  // Estado para el monto total
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Función para actualizar el monto total
  const handleTotalAmountChange = (amount: number) => {
    setTotalAmount(amount);
  };

  const { updateStockMovement } = useUpdateStockMovementService();

  const {
    loadingPrint,
    successFetchPrint,
    failureFetchPrint,
    startFetchPrint,
  } = useUpdateMovementsStates2();

  const [factureLinkSet, setFactureLinkSet] = useState<string | null>(null);

  const handleCreateMovements = (data: CreateAplicationSchema) => {
    startFetch();

    createMovements({
      stockMovementDetail: data.stockMovementDetail.map((product) => ({
        productId: product.product.productId,
        quantity: product.quantity,
        sellPrice: product.sellPrice,
      })),
      wasFactured: true,
      date: new Date(),
      description: "Hardcoded description", // Hardcoded value
      movementType: "SELL", // Hardcoded value
      warehouseOriginId: 1,
      value: totalAmount, // Use the totalAmount here
    })
      .then((movementsCreated) => {
        reset();
        successFetch(movementsCreated);
        toast({
          status: "success",
          description: "Creado correctamente",
        });
        onClose();
        refetch(); // Asegúrate de que esta línea esté siendo ejecutada
      })
      .catch((e) => {
        const errorMessage = e.response.data.message;
        failureFetch(errorMessage);
      });
  };

  const handleSubmitError = (errors: FieldErrors<CreateAplicationSchema>) => {
    console.log("errors :>> ", errors);
  };

  useEffect(() => {
    if (error) {
      toast({ status: "error", description: error });
    }
  }, [error, toast]);

  useEffect(() => {
    if (errorLast) {
      toast({ status: "error", description: errorLast });
    }
  }, [errorLast, toast]);

  const handleUpdateProduct = async (id: number) => {
    if (loadingPrint) return; // Previene múltiples solicitudes

    startFetchPrint(); // Inicia la carga
    try {
      const movement = await getMovementById(id);
      if (movement) {
        const productUpdated = await updateStockMovement(movement, movement.id);
        successFetchPrint(productUpdated);
        setFactureLinkSet(productUpdated.factureLink);
      }
      refetch();
    } catch (error) {
      failureFetchPrint("Error fetching movement");
    } finally {
      // Asegúrate de que el estado de carga se restablezca
      // Si el loading es gestionado en el hook useUpdateMovementsStates
      // se debería manejar automáticamente.
    }
  };

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
          <Flex gap={2}>
            <Tooltip label="Imprimir Ticket" placement="bottom">
              <IconButton
                aria-label="Print"
                colorScheme="gray"
                icon={<PrinterIcon />}
                size="sm"
                variant="outline"
                onClick={() =>
                  row.factureLink === null
                    ? handleUpdateProduct(row.id)
                    : navigateToPrint(row.factureLink)
                }
                isLoading={loadingPrint}
              />
            </Tooltip>
          </Flex>
        ),
      },
    ],
    [loadingPrint, t, onOpen, handleUpdateProduct, factureLinkSet]
  );

  return (
    <FormPageLayout
      onSubmit={handleSubmit(handleCreateMovements, handleSubmitError)}
      width={{ base: "full", md: "container.xl" }}
    >
      <FormContainerLayout>
        <FormSectionLayout>
          <FormCreateAplicationDetails
            onTotalAmountChange={handleTotalAmountChange}
          />
        </FormSectionLayout>

        <Button colorScheme="main" isLoading={loadingCreate} onClick={onOpen}>
          Confirmar Venta
        </Button>
        <ConfirmCreateModal
          description="Esta seguro de confirmar la venta?"
          isLoading={loadingCreate}
          isOpen={isOpen}
          title="Realizar venta"
          onClose={onClose}
          onConfirm={handleSubmit(handleCreateMovements, handleSubmitError)}
        />
      </FormContainerLayout>

      <Box px={{ base: 3, md: 6 }}>
        <DataTable
          columns={columns}
          data={movementsList}
          loading={loadingLast}
        />
      </Box>
    </FormPageLayout>
  );
};

export default CreateAplicationMovement;
