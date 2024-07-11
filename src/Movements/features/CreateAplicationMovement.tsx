import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button, useDisclosure, useToast } from "@chakra-ui/react";

import { useTranslation } from "Base/i18n";
import { CreateMovementsSchema } from "Movements/schemas/CreateMovementsSchema";
import useCreateMovementsStates from "Movements/hooks/useCreateMovementsStates";
import { useCreateMovementsService } from "Movements/data/MovementsRepository";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import FormInputNumber from "Base/components/FormInputNumber";
import ConfirmCreateModal from "Movements/components/ConfirmCreateDialog";
import FormSelectSingleWH from "./FormSelectSingleWH";
import FormAddProductsDetails from "./FormAddProductsDetails";

// import useProductsOptions from "Movements/hooks/useProductsOptions";
import FormSelectSingleProduct from "./FormSelectSingleProduct";
import FormCreateBuyDetails from "./FormCreateBuyDetails";

// import { StatusCard } from "Base/components";

interface CreateMovementsProps {
  navigateToMovements: () => void;
}
const CreateBuyMovement = ({ navigateToMovements }: CreateMovementsProps) => {
  const toast = useToast();
  const { t } = useTranslation("movements");
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext<CreateMovementsSchema>();

  const { loading, error, startFetch, successFetch, failureFetch } =
    useCreateMovementsStates();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const { createMovements } = useCreateMovementsService();

  const handleCreateMovements = (data: CreateMovementsSchema) => {
    startFetch();

    createMovements({
      warehouseOriginId: data.warehouseOriginId.value,
      stockMovementDetail: data.stockMovementDetail.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        buyPrice: product.buyPrice,
      })),
      date: new Date(),
      voucherDescription: "vaucher Description  hardcode",
      description: "Test 1  hardcode",
      movementType: data.movementType,
      value: 1500, // hardcode
    })
      .then((movementsCreated) => {
        reset();
        successFetch(movementsCreated);
        toast({
          status: "success",
          description: ` ${t("createMovement.message.success.create")} `,
        });
        onClose();
        navigateToMovements();
      })
      .catch((e) => {
        const errorMessage = e.response.data.message;
        failureFetch(errorMessage);
      });
  };

  useEffect(() => {
    if (error) {
      toast({ status: "error", description: error });
    }
  }, [error, toast]);

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateMovements)}>
      <FormContainerLayout>
        <FormSectionLayout>
          <FormSelectSingleWH />
          <FormSelectSingleWH />

          <FormInputNumber
            isRequired
            control={control as any}
            errorMessage={
              errors.value
                ? (t(`errors.${errors.value.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="value"
            label={"Valor total de la compra"}
            leftIcon="$"
            name="value"
            thousandSeparator="."
            type="number"
          />

          <FormInputNumber
            isRequired
            control={control as any}
            errorMessage={
              errors.description
                ? (t(`errors.${errors.description.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="description"
            label={"Descripcion de la compra"}
            name="description"
            type="text"
          />
        </FormSectionLayout>
        <FormCreateBuyDetails />
        <FormAddProductsDetails></FormAddProductsDetails>

        <Button colorScheme="main" isLoading={loading} onClick={onOpen}>
          {"Confirmar compra"}
        </Button>
        <ConfirmCreateModal
          description={"Desea confirmar la operacion?"}
          isLoading={loading} 
          isOpen={isOpen}
          title={"Confirmar"}
          onClose={onClose}
          onConfirm={handleSubmit(handleCreateMovements)}
        />
      </FormContainerLayout>
    </FormPageLayout>
  );
};

export default CreateBuyMovement;
