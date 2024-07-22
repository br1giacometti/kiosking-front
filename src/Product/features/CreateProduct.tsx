import { useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, useToast } from "@chakra-ui/react";

import { useTranslation } from "Base/i18n";

import createProductSchema, {
  CreateProductSchema,
} from "Product/schemas/createProductSchema";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText } from "Base/components";
import FormInputNumber from "Base/components/FormInputNumber";
import { useCreateProductService } from "Product/data/ProductRepository";

interface CreateProductProps {
  navigateToProduct: () => void;
}

const CreateProduct = ({ navigateToProduct }: CreateProductProps) => {
  const { t } = useTranslation("product");
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });
  const [body, setBody] = useState<CreateProductSchema | null>(null);

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
      navigateToProduct();
    },
    [navigateToProduct, t, toast]
  );

  const { loading } = useCreateProductService(body, onSignUp);

  const handleCreateProduct = (data: CreateProductSchema) => {
    setBody(data);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateProduct)}>
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

          <FormInputNumber
            isRequired
            control={control as any}
            errorMessage={
              errors.minimumQuantity
                ? (t(`errors.${errors.minimumQuantity.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="minimumQuantity"
            label={"Cantidad Minima"}
            name="minimumQuantity"
            type="number"
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

export default CreateProduct;
