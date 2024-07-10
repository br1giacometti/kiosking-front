import { Box, Center, IconButton, Stack } from "@chakra-ui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FormInputText } from "Base/components";
import FormInputNumber from "Base/components/FormInputNumber";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import useCreateBuyContext from "Movements/contexts/CreateBuyContext/hooks/useCreateBuyContext";
import FormSelectSingleProduct from "./FormSelectSingleProduct";

interface FormCreateOwnerProps {
  id: string;
  index: number;
}

const FormCreateBuyDetail = ({ index }: FormCreateOwnerProps) => {
  const {
    register,
    control,
    formState: { errors },
    stockMovementsDetail: { remove },
  } = useCreateBuyContext();

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
          title={`${"Seleccionar retiro"}`}
        >
          {/* {<FormSelectSingleProduct />} */}

          <FormInputText
            isRequired
            errorMessage={
              errors.stockMovementDetail &&
              errors.stockMovementDetail[index]?.description
                ? "movement error"
                : undefined
            }
            inputProps={register(`stockMovementDetail.${index}.description`)}
            label={"Cantidad"}
            name="description"
          />
          <FormInputNumber
            isRequired
            control={control}
            errorMessage={
              errors.stockMovementDetail &&
              errors.stockMovementDetail[index]?.value
                ? `errors.${errors.stockMovementDetail[index]?.value?.message}`
                : // TODO: Deberia eleminar este casteo: `as string`
                  undefined
            }
            id="value"
            label={"Valor"}
            leftIcon="$"
            name={`stockMovementDetail.${index}.value`}
          />
        </FormSectionLayout>
      </Stack>
    </Center>
  );
};

export default FormCreateBuyDetail;
