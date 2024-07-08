import { useEffect } from "react";

import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import useCreateFieldContext from "Field/contexts/CreateBatchContext/hooks/useCreateFieldContext";
import useCreateFieldStates from "Field/hooks/useCreateFieldStates";
import { useCreateFieldService } from "Field/data/FieldRepository";

import FormPageLayout from "Base/layout/FormPageLayout";
import { StatusCard } from "Base/components";

import FormContainerLayout from "Base/layout/FormContainerLayout";
import { CreateFieldSchema } from "Field/schemas/createFieldSchema";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import ConfirmCreateModal from "Field/components/ConfirmCreateDialog";
import FormCreateBatchDetails from "./FormCreateBatchDetails";
import FormCreateField from "./FormCreateField";

interface CreateFieldProps {
  navigateToField: () => void;
}

const CreateField = ({ navigateToField }: CreateFieldProps) => {
  const toast = useToast();
  const { t } = useTranslation("field");
  const { handleSubmit, reset, watch } = useCreateFieldContext();

  const { loading, error, startFetch, successFetch, failureFetch } =
    useCreateFieldStates();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const { createField } = useCreateFieldService();

  const handleCreateField = (data: CreateFieldSchema) => {
    startFetch();

    createField({
      description: data.description,
      hectares: data.hectares,
      batches: data.batches.map((batch) => ({
        description: batch.description,
        hectares: batch.hectares,
      })),
    })
      .then((FieldCreated) => {
        reset();
        successFetch(FieldCreated);
        toast({
          status: "success",
          description: `  ${t("toast.create.success")} `,
        });
        onClose();
        navigateToField();
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
    <FormPageLayout>
      <FormContainerLayout>
        <FormSectionLayout>
          <FormCreateField></FormCreateField>
        </FormSectionLayout>

        <FormCreateBatchDetails />

        <FormSectionLayout>
          {watch("description") && (
            // Verifica si hay una descripción del campo
            <StatusCard
              label={watch("description")}
              value={
                watch("batches").length > 0 && watch("description") !== ""
                  ? watch("batches").map((batch, index) => (
                      <div key={index}>
                        {batch.hectares !== 0 && ( // Verifica si las hectáreas son diferentes de 0
                          <p>
                            {batch.description &&
                              `Description: ${batch.description}, `}
                            {batch.hectares && `Hectares: ${batch.hectares}`}
                          </p>
                        )}
                      </div>
                    ))
                  : undefined
              }
            />
          )}
        </FormSectionLayout>

        <Button colorScheme="main" isLoading={loading} onClick={onOpen}>
          {t("create.button.submit")}
        </Button>
        <ConfirmCreateModal
          description={t("modal.description")}
          isLoading={loading}
          isOpen={isOpen}
          title={t("modal.title")}
          onClose={onClose}
          onConfirm={handleSubmit(handleCreateField)}
        />
      </FormContainerLayout>
    </FormPageLayout>
  );
};

export default CreateField;
