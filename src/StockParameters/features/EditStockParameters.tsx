import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { StockParameters } from "StockParameters/data/StockParametersRepository";
import { useTranslation } from "Base/i18n";
import updateStockParametersSchema, {
  UpdateStockParametersSchema,
} from "StockParameters/schemas/UpdateStockParametersSchema";
import useUpdateStockParametersService from "StockParameters/data/StockParametersRepository/hooks/useUpdateStockParametersService";
import { FormInputText } from "Base/components";
import useUpdateStockParametersStates from "StockParameters/hooks/useUpdateStockParametersStates";
import FormInputNumber from "Base/components/FormInputNumber";

interface EditStockParametersProps {
  defaultValues: StockParameters;
}

const EditStockParameters = ({ defaultValues }: EditStockParametersProps) => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation("product");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateStockParametersSchema>({
    resolver: zodResolver(updateStockParametersSchema),
    defaultValues: {
      dailySellAmount: defaultValues.dailySellAmount,
      maxSellAmount: defaultValues.maxSellAmount,
    },
  });

  const { error, successFetch, failureFetch } =
    useUpdateStockParametersStates();

  const { updateStockParameters } = useUpdateStockParametersService();

  const handleUpdateStockParameters = (data: UpdateStockParametersSchema) =>
    updateStockParameters(data, defaultValues.id)
      .then((stockparametersUpdated) => {
        reset();
        successFetch(stockparametersUpdated);
        toast({
          status: "success",
          description: `Monto se actualizo`,
        });
        router.push("/stockparameters");
      })
      .catch((axiosError) => {
        failureFetch(axiosError.response.data.message);
      });

  useEffect(() => {
    if (error) {
      toast({ status: "error", description: error });
    }
  }, [error, toast]);

  return (
    <Flex
      as="form"
      justifyContent={{ base: "center", lg: "flex-start" }}
      paddingBottom={16}
      paddingX={{ lg: 32 }}
      onSubmit={handleSubmit(handleUpdateStockParameters)}
    >
      <Box>
        <Heading>{t("Actualizar Parametros de ventas")}</Heading>
        <Flex
          flexDirection={{ base: "column" }}
          gap={{ base: 12 }}
          mt={8}
          w={{ base: "auto" }}
        >
          <Stack maxW={"md"} spacing={6} w={"full"}>
            <FormInputText
              errorMessage={
                errors.maxSellAmount
                  ? (t(
                      `update.error.${errors.maxSellAmount.message}`
                    ) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("maxSellAmount")}
              label={t("Monto maximo venta")}
              name="maxSellAmount"
            />

            <FormInputText
              isRequired
              errorMessage={
                errors.dailySellAmount
                  ? (t(
                      `update.error.${errors.dailySellAmount.message}`
                    ) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("dailySellAmount")}
              label={t("Tope facturacion diario")}
              name="dailySellAmount"
            />
          </Stack>

          <Button
            bg="main.500"
            color="white"
            isLoading={isSubmitting}
            type="submit"
          >
            {t("Actualizar")}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default EditStockParameters;
