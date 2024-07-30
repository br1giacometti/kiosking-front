import { zodResolver } from "@hookform/resolvers/zod";
import { FormSelect } from "Base/components";
import { useTranslation } from "Base/i18n";
import useCategoryOptions from "Product/hooks/useCategoryOptions";
import createProductSchema, {
  CreateProductSchema,
} from "Product/schemas/createProductSchema";
import { Controller, useForm } from "react-hook-form";

const FormSelectCategory = () => {
  const { t } = useTranslation("product");
  const { options, loading } = useCategoryOptions();
  const {
    control,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  return (
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
          isLoading={loading}
          label={t("create.steps.step4.description")}
          name={field.name}
          options={options}
          value={options.find((option) => option.value === field.value) || null} // Encontrar la opción seleccionada
          onChange={(selectedOption) =>
            field.onChange(selectedOption ? selectedOption.value : null)
          } // Manejar el cambio
        />
      )}
    />
  );
};

export default FormSelectCategory;
