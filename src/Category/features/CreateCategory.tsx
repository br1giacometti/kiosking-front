import { useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, useToast } from "@chakra-ui/react";

import { useTranslation } from "Base/i18n";

import createCategorySchema, {
  CreateCategorySchema,
} from "Category/schemas/createCategorySchema";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText } from "Base/components";
import FormInputNumber from "Base/components/FormInputNumber";
import { useCreateCategoryService } from "Category/data/CategoryRepository";

interface CreateCategoryProps {
  navigateToCategory: () => void;
}

const CreateCategory = ({ navigateToCategory }: CreateCategoryProps) => {
  const { t } = useTranslation("category");
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
  });
  const [body, setBody] = useState<CreateCategorySchema | null>(null);

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
      navigateToCategory();
    },
    [navigateToCategory, t, toast]
  );

  const { loading } = useCreateCategoryService(body, onSignUp);

  const handleCreateCategory = (data: CreateCategorySchema) => {
    setBody(data);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateCategory)}>
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
            label={t("Descripcion")}
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
        {t("Crear categoria")}
      </Button>
    </FormPageLayout>
  );
};

export default CreateCategory;
