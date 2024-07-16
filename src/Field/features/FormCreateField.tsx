import { Controller } from "react-hook-form";
import { useTranslation } from "Base/i18n";
import useCreateFieldContext from "Field/contexts/CreateBatchContext/hooks/useCreateFieldContext";
import { FormInputText } from "Base/components";

const FormCreateField = () => {
  const { t } = useTranslation(["field"]);
  const {
    control,
    register,
    formState: { errors },
  } = useCreateFieldContext();

  return (
    <>
      <Controller
        control={control}
        name="description"
        render={() => (
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
        )}
      />

      <Controller
        control={control}
        name="hectares"
        render={() => (
          <FormInputText
            isRequired
            errorMessage={
              errors.hectares
                ? (t(`errors.${errors.hectares.message}`, {
                    ns: "common",
                  }) as string) // TODO: Deberia eleminar este casteo: `as string`
                : undefined
            }
            inputProps={register("hectares")}
            label={t("create.label.hectares")}
            name="hectares"
          />
        )}
      />
    </>
  );
};

export default FormCreateField;
