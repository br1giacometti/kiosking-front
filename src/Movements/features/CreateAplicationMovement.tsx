import { useEffect, useState } from "react";
import { Controller, FieldErrors, useFormContext } from "react-hook-form";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import useCreateMovementsStates from "Movements/hooks/useCreateMovementsStates";
import { useCreateMovementsService } from "Movements/data/MovementsRepository";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import ConfirmCreateModal from "Movements/components/ConfirmCreateDialog";
import FormCreateAplicationDetails from "./FormCreateAplicationDetails";
import { CreateAplicationSchema } from "Movements/schemas/CreateAplicationSchema";
import { FormInputText, FormSelect } from "Base/components";
import useWareHouseOptions from "Movements/hooks/useWareHouseOptions";
import useAplicatorOptions from "Movements/hooks/useAplicatorOptions";
import useFieldOptions from "Movements/hooks/useFieldOptions";
import useBatchOptions from "Movements/hooks/useBatchOptions";
import FormInputNumber from "Base/components/FormInputNumber";

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
    watch,
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

  const [filteredBatchOptions, setFilteredBatchOptions] =
    useState(batchOptions);

  const fieldId = watch("fieldId");

  useEffect(() => {
    if (fieldId) {
      const newBatchOptions = batchOptions.filter(
        (batch) => batch.fieldId === fieldId.value
      );
      setFilteredBatchOptions(newBatchOptions);
    } else {
      setFilteredBatchOptions(batchOptions);
    }
  }, [fieldId, batchOptions]);

  const handleCreateMovements = (data: CreateAplicationSchema) => {
    console.log("startFetch :>> ", data);
    startFetch();

    createMovements({
      stockMovementDetail: data.stockMovementDetail.map((product) => ({
        productId: product.product.productId,
        quantity: product.quantity,
        buyPrice: product.buyPrice,
      })),
      date: new Date(),
      description: data.description,
      movementType: data.movementType,
      aplicatorId: data.aplicatorId.value,
      warehouseOriginId: data.warehouseOriginId.value,
      batchId: data.batchId.value,
      value: data.value,
    })
      .then((movementsCreated) => {
        reset();
        successFetch(movementsCreated);
        toast({
          status: "success",
          description: ` ${"Creado correctamente"} `,
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
                    ? "Debe seleccionar un aplicador"
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
                options={filteredBatchOptions}
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
            label={"Valor aproximado de la aplicacion"}
            leftIcon="$"
            name="value"
            thousandSeparator="."
            // type=""
          />
        </FormSectionLayout>

        <FormCreateAplicationDetails />

        <Button colorScheme="main" isLoading={loading} onClick={onOpen}>
          {"Confirmar aplicacion"}
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
