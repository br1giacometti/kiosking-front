import { useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, useToast } from "@chakra-ui/react";

import { useTranslation } from "Base/i18n";

import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText } from "Base/components";
import { useCreateWarehouseService } from "Warehouse/data/WarehouseRepository";
import createWarehouseSchema, {
  CreateWarehouseSchema,
} from "Warehouse/schemas/createWarehouseSchema";

interface CreateWarehouseProps {
  navigateToWarehouse: () => void;
}

const CreateWarehouse = ({ navigateToWarehouse }: CreateWarehouseProps) => {
  const { t } = useTranslation("warehouse");
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWarehouseSchema>({
    resolver: zodResolver(createWarehouseSchema),
  });
  const [body, setBody] = useState<CreateWarehouseSchema | null>(null);

  const onSignUp = useCallback(
    (error?: string) => {
      if (error) {
        toast({
          status: "error",
          description: error,
        });
        return;
      }
      toast({
        status: "success",
        description: t("toast.create.success"),
      });
      navigateToWarehouse();
    },
    [navigateToWarehouse, toast]
    // [navigateToSignIn, toast]
  );

  const { loading } = useCreateWarehouseService(body, onSignUp);

  const handleCreateWarehouse = (data: CreateWarehouseSchema) => {
    setBody(data);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateWarehouse)}>
      <FormContainerLayout>
        <FormSectionLayout>
          <FormInputText
            isRequired
            errorMessage={
              errors.description
                ? (t(`errors.${errors.description.message}`, {
                    ns: "common",
                  }) as string) // TODO: Deberia eleminar este casteo: `as string`
                : undefined
            }
            inputProps={register("description")}
            label={t("create.label.description")}
            name="description"
          />
        </FormSectionLayout>
      </FormContainerLayout>
      <Button
        colorScheme={"main"}
        isLoading={loading}
        loadingText="Submitting"
        maxW="container.sm"
        mt={8}
        type="submit"
        variant={"solid"}
      >
        {t("create.button.submit")}
      </Button>
    </FormPageLayout>
  );
};

export default CreateWarehouse;
