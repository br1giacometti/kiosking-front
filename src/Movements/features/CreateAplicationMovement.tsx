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
import FormCreateAplicationDetails from "./FormCreateAplicationDetails";

// import useProductsOptions from "Movements/hooks/useProductsOptions";
import { CreateAplicationSchema } from "Movements/schemas/CreateAplicationSchema";
import { FormInputText, FormSelect } from "Base/components";
import useWareHouseOptions from "Movements/hooks/useWareHouseOptions";
import useAplicatorOptions from "Movements/hooks/useAplicatorOptions";
import useFieldOptions from "Movements/hooks/useFieldOptions";
import useBatchOptions from "Movements/hooks/useBatchOptions";

// import { StatusCard } from "Base/components";

interface CreateMovementsProps {
  navigateToMovements: () => void;
}
const CreateAplicationMovement = ({
  navigateToMovements,
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
  const { options: warehouseOptions, loading: warehouseLoading } =
    useWareHouseOptions();

  const { options: aplicatorOptions, loading: aplicatorLoading } =
    useAplicatorOptions();

  const { options: fieldOptions, loading: fieldLoading } = useFieldOptions();

  const { options: batchOptions, loading: batchLoading } = useBatchOptions();

  const { loading, error, startFetch, successFetch, failureFetch } =
    useCreateMovementsStates();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const { createMovements } = useCreateMovementsService();

  const handleCreateMovements = (data: CreateAplicationSchema) => {
    console.log("startFetch :>> ", data);
    startFetch();

    createMovements({
      warehouseDestinyId: data.warehouseOriginId.value,
      stockMovementDetail: data.stockMovementDetail.map((product) => ({
        productId: product.product.productId,
        quantity: product.quantity,
        buyPrice: product.buyPrice,
      })),
      date: new Date(),
      description: data.description,
      movementType: data.movementType,
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

  const handleSubmitError = (errors: FieldErrors<CreateAplicationSchema>) => {
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
            name="warehouseOriginId"
            render={({ field }) => (
              <FormSelect
                ref={field.ref}
                isRequired
                errorMessage={
                  errors.warehouseOriginId?.message
                    ? "Debe seleccionar un deposito de origen"
                    : undefined
                }
                isLoading={warehouseLoading}
                label={"Deposito de origen"}
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

          <Controller
            control={control}
            name="aplicatorId"
            render={({ field }) => (
              <FormSelect
                ref={field.ref}
                isRequired
                errorMessage={
                  errors.aplicatorId?.message
                    ? "Debe seleccionar un plicador"
                    : undefined
                }
                isLoading={aplicatorLoading}
                label={"Aplicador"}
                name={field.name}
                options={aplicatorOptions}
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

          <Controller
            control={control}
            name="fieldId"
            render={({ field }) => (
              <FormSelect
                ref={field.ref}
                isRequired
                errorMessage={
                  errors.fieldId?.message
                    ? "Debe seleccionar un campo"
                    : undefined
                }
                isLoading={fieldLoading}
                label={"Campo"}
                name={field.name}
                options={fieldOptions}
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

          <Controller
            control={control}
            name="batchId"
            render={({ field }) => (
              <FormSelect
                ref={field.ref}
                isRequired
                errorMessage={
                  errors.batchId?.message
                    ? "Debe seleccionar un lote"
                    : undefined
                }
                isLoading={batchLoading}
                label={"Lote"}
                name={field.name}
                options={batchOptions}
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
            label={"Descripcion de la aplicacion"}
            name="description"
            inputProps={{ ...register("description") }}
          />
        </FormSectionLayout>

        <FormCreateAplicationDetails />

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

export default CreateAplicationMovement;
