import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, useToast } from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import createProductSchema, {
  CreateProductSchema,
} from "Product/schemas/createProductSchema";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText, FormSelect } from "Base/components";
import FormInputNumber from "Base/components/FormInputNumber";
import { useCreateProductService } from "Product/data/ProductRepository";
import useCategoryOptions from "Product/hooks/useCategoryOptions";

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

  const { options, loading: loading2 } = useCategoryOptions();

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
    console.log("handleCreateProduct called");
    console.log("Product Data:", data); // Verificar qué datos se envían
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
                  }) as string)
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
              errors.sellPrice
                ? (t(`errors.${errors.sellPrice.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="sellPrice"
            label={"Precio"}
            name="sellPrice"
            type="number"
            leftIcon="$"
            thousandSeparator="."
          />

          <FormInputText
            isRequired
            errorMessage={
              errors.barCode
                ? (t(`errors.${errors.barCode.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            inputProps={register("barCode")}
            label={"Codigo de Barra"}
            name="barCode"
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <FormSelect
                ref={field.ref}
                errorMessage={
                  errors.categoryId?.message
                    ? "Debe seleccionar una categoria"
                    : undefined
                }
                isLoading={loading2}
                label={t("Categoria")}
                name={field.name}
                options={options}
                value={
                  options.find((option) => option.value === field.value) || null
                }
                onChange={(selectedOption) => {
                  // Verifica si selectedOption es de tipo OptionItem
                  if (selectedOption && "value" in selectedOption) {
                    field.onChange(selectedOption.value);
                  } else {
                    field.onChange(null);
                  }
                }}
              />
            )}
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
