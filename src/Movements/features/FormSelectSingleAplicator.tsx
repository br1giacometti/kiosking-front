import { Controller, useFormContext } from "react-hook-form";

import { useMemo } from "react";
import { FormSelect } from "Base/components";
import { CreateAplicationSchema } from "Movements/schemas/CreateAplicationSchema";
import useAplicatorOptions from "Movements/hooks/useAplicatorOptions";

const FormSelectSingleAplicator = () => {
  const { options, loading } = useAplicatorOptions();
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateAplicationSchema>();

  const optionsFiltered = useMemo(
    () => options.filter((option) => option.value),
    [options]
  );

  return (
    <>
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
            isLoading={loading}
            label={"Aplicador"}
            name={field.name}
            options={optionsFiltered}
            // value={
            //   field.value &&
            //   "value" in field.value &&
            //   field.value.value !== null
            //     ? field.value
            //     : null
            // }
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
};

export default FormSelectSingleAplicator;
