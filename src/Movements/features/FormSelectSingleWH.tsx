import { Controller, useFormContext } from "react-hook-form";

import { useMemo } from "react";
import { useTranslation } from "Base/i18n";
import useWareHouseOptions from "Movements/hooks/useWareHouseOptions";
import { FormSelect } from "Base/components";

const FormSelectSingleWH = () => {
  const { options, loading } = useWareHouseOptions();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const optionsFiltered = useMemo(
    () => options.filter((option) => option.value),
    [options]
  );

  return (
    <>
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
            isLoading={loading}
            label={"Deposito"}
            name={field.name}
            options={optionsFiltered}
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
    </>
  );
};

export default FormSelectSingleWH;
