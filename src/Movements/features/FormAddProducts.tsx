import { Box, Center, IconButton, Stack } from "@chakra-ui/react";
import { TrashIcon } from "@heroicons/react/24/outline";

import FormInputNumber from "Base/components/FormInputNumber";
import { useTranslation } from "Base/i18n";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import useCreateFieldContext from "Field/contexts/CreateBatchContext/hooks/useCreateFieldContext";
import useAddProductsContext from "Movements/contexts/CreateBuyContext/hooks/useAddProductsContext";
// import FormSelectSingleProduct from "./FormSelectSingleProduct";
import useWareHouseOptions from "Movements/hooks/useWareHouseOptions";
import { Controller } from "react-hook-form";
import { useMemo } from "react";
import { FormInputText, FormSelect } from "Base/components";
import useProductsOptions from "Movements/hooks/useProductsOptions";
import FormSelectSingleProduct from "./FormSelectSingleProduct";

interface FormCreateOwnerProps {
  id: string;
  index: number;
}

const FormAddProducts = ({ index }: FormCreateOwnerProps) => {
  const { t } = useTranslation("movements");
  const {
    control,
    formState: { errors },
    stockMovementDetail: { remove },
  } = useAddProductsContext();

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
        <FormSectionLayout minW={{ lg: "md" }} title={`${"Agregar producto"}`}>
          {<FormSelectSingleProduct />}

          <FormInputNumber
            isRequired
            control={control}
            errorMessage={
              errors.stockMovementDetail &&
              errors.stockMovementDetail[index]?.sellPrice
                ? (t(
                    `errors.${errors.stockMovementDetail[index]?.sellPrice?.message}`,
                    {
                      ns: "common",
                    }
                  ) as string)
                : undefined
            }
            id={`sellPrice-${index}`} // Añade el índice al id para que sea único
            label={"Precio de venta"}
            name={`stockMovementDetail.${index}.sellPrice`} // Usa el índice en el name
          />

          <FormInputNumber
            isRequired
            control={control}
            errorMessage={
              errors.stockMovementDetail &&
              errors.stockMovementDetail[index]?.quantity
                ? (t(
                    `errors.${errors.stockMovementDetail[index]?.quantity?.message}`,
                    {
                      ns: "common",
                    }
                  ) as string)
                : undefined
            }
            id={`quantity-${index}`} // Añade el índice al id para que sea único
            label={"Cantidad"}
            name={`stockMovementDetail.${index}.quantity`} // Usa el índice en el name
          />
        </FormSectionLayout>
      </Stack>
    </Center>
  );
};

export default FormAddProducts;
