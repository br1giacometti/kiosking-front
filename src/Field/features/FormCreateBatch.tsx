import { Box, Center, IconButton, Stack } from "@chakra-ui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FormInputText } from "Base/components";
import FormInputNumber from "Base/components/FormInputNumber";
import { useTranslation } from "Base/i18n";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import useCreateFieldContext from "Field/contexts/CreateBatchContext/hooks/useCreateFieldContext";

interface FormCreateOwnerProps {
  id: string;
  index: number;
}

const FormCreateBatch = ({ index }: FormCreateOwnerProps) => {
  const { t } = useTranslation("field");
  const {
    register,
    control,
    formState: { errors },
    batches: { remove },
  } = useCreateFieldContext();

  return (
    <Center py={16} w="full">
      <Box position="absolute" right={0} top={0}>
        <IconButton
          aria-label="Close button"
          colorScheme="red"
          icon={<TrashIcon height={24} width={24} />}
          onClick={() => remove(index)}
        />
      </Box>
      <Stack
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 8, md: 32 }}
      >
        <FormSectionLayout
          minW={{ lg: "md" }}
          title={`${t("createBatch.carousel.addBatch")}`}
        >
          <FormInputText
            isRequired
            errorMessage={
              errors.batches && errors.batches[index]?.description
                ? (t(`errors.${errors.batches[index]?.description?.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            inputProps={register(`batches.${index}.description`)}
            label={t("createBatch.carousel.description")}
            name="description"
          />

          <FormInputNumber
            isRequired
            control={control}
            errorMessage={
              errors.batches && errors.batches[index]?.hectares
                ? (t(`errors.${errors.batches[index]?.hectares?.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id={`hectares-${index}`} // Añade el índice al id para que sea único
            label={t("createBatch.carousel.hectares")}
            name={`batches.${index}.hectares`} // Usa el índice en el name
          />
        </FormSectionLayout>
      </Stack>
    </Center>
  );
};

export default FormCreateBatch;
