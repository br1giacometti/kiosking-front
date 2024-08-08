import { useEffect, useMemo, useState } from "react";
import { Controller, FieldErrors, useFormContext } from "react-hook-form";

import { Button, useDisclosure, useToast } from "@chakra-ui/react";

import { useTranslation } from "Base/i18n";
import useCreateMovementsStates from "Movements/hooks/useCreateMovementsStates";
import { useCreateMovementsService } from "Movements/data/MovementsRepository";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import FormInputNumber from "Base/components/FormInputNumber";
import ConfirmCreateModal from "Movements/components/ConfirmCreateDialog";
import FormCreateBuyDetails from "./FormCreateBuyDetails";

// import useProductsOptions from "Movements/hooks/useProductsOptions";
import { CreateBuySchema } from "Movements/schemas/CreateBuySchema";
import { FormInputText, FormSelect } from "Base/components";
import useWareHouseOptions from "Movements/hooks/useWareHouseOptions";

// import { StatusCard } from "Base/components";

interface CreateMovementsProps {
  navigateToMovements: () => void;
}
const CreateBuyMovement = ({ navigateToMovements }: CreateMovementsProps) => {
  const toast = useToast();
  const { t } = useTranslation("movements");
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useFormContext<CreateBuySchema>();
  const { options: warehouseOptions, loading: warehouseLoading } =
    useWareHouseOptions();

  const { loading, error, startFetch, successFetch, failureFetch } =
    useCreateMovementsStates();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const { createMovements } = useCreateMovementsService();

  const handleCreateMovements = (data: CreateBuySchema) => {
    console.log("startFetch :>> ", data);
    startFetch();

    createMovements({
      warehouseDestinyId: data.warehouseDestinyId.value,
      stockMovementDetail: data.stockMovementDetail.map((product) => ({
        productId: product.product.productId,
        quantity: product.quantity,
        sellPrice: product.sellPrice,
      })),
      date: new Date(),
      description: data.description,
      movementType: data.movementType,
      value: data.value, // hardcode
      wasFactured: true,
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

  const handleSubmitError = (errors: FieldErrors<CreateBuySchema>) => {
    console.log("errors :>> ", errors);
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
          <Controller
            control={control}
            name="warehouseDestinyId"
            render={({ field }) => (
              <FormSelect
                ref={field.ref}
                isRequired
                errorMessage={
                  errors.warehouseDestinyId?.message
                    ? "Debe seleccionar un deposito de destino"
                    : undefined
                }
                isLoading={warehouseLoading}
                label={"Deposito destino productos"}
                name={field.name}
                options={warehouseOptions}
                value={
                  field.value &&
                  "value" in field.value &&
                  field.value.value !== null
                    ? field.value
                    : null
                }
                onChange={field.onChange}
              />
            )}
          />

          <FormInputNumber
            isRequired
            control={control}
            errorMessage={
              errors.value
                ? (t(`errors.${errors.value.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="value"
            label={"Valor aproximado total de la compra"}
            leftIcon="$"
            name="value"
            thousandSeparator="."
            // type=""
          />

          <FormInputText
            isRequired
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
            inputProps={{ ...register("description") }}
          />
        </FormSectionLayout>

        <FormCreateBuyDetails />

        <Button colorScheme="main" isLoading={loading} onClick={onOpen}>
          {"Confirmar compra"}
        </Button>
        <ConfirmCreateModal
          description={"confirm button"}
          isLoading={loading}
          isOpen={isOpen}
          title={"Confirmar"}
          onClose={onClose}
          onConfirm={handleSubmit(handleCreateMovements, handleSubmitError)}
        />
      </FormContainerLayout>
    </FormPageLayout>
  );
};

export default CreateBuyMovement;
