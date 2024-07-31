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
import { Product } from "Product/data/ProductRepository";
import { useTranslation } from "Base/i18n";
import updateProductSchema, {
  UpdateProductSchema,
} from "Product/schemas/UpdateProductSchema";
import useUpdateProductService from "Product/data/ProductRepository/hooks/useUpdateProductService";
import { FormInputText } from "Base/components";
import useUpdateProductStates from "Product/hooks/useUpdateProductStates";
import FormInputNumber from "Base/components/FormInputNumber";

interface EditProductProps {
  defaultValues: Product;
}

const EditProduct = ({ defaultValues }: EditProductProps) => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation("product");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      description: defaultValues.description,
      categoryId: defaultValues.categoryId,
      sellPrice: defaultValues.sellPrice,
      barCode: defaultValues.barCode,
    },
  });

  const { error, successFetch, failureFetch } = useUpdateProductStates();

  const { updateProduct } = useUpdateProductService();

  const handleUpdateProduct = (data: UpdateProductSchema) =>
    updateProduct(data, defaultValues.id)
      .then((productUpdated) => {
        reset();
        successFetch(productUpdated);
        toast({
          status: "success",
          description: `${productUpdated.description}  se actualizo`,
        });
        router.push("/product");
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
      onSubmit={handleSubmit(handleUpdateProduct)}
    >
      <Box>
        <Heading>{t("Actualizar Producto")}</Heading>
        <Flex
          flexDirection={{ base: "column" }}
          gap={{ base: 12 }}
          mt={8}
          w={{ base: "auto" }}
        >
          <Stack maxW={"md"} spacing={6} w={"full"}>
            <FormInputText
              isRequired
              errorMessage={
                errors.description
                  ? (t(`update.error.${errors.description.message}`) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("description")}
              label={t("Descripcion")}
              name="description"
            />

            <FormInputText
              errorMessage={
                errors.sellPrice
                  ? (t(`update.error.${errors.sellPrice.message}`) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("sellPrice")}
              label={t("Precio")}
              name="sellPrice"
            />

            <FormInputText
              isRequired
              errorMessage={
                errors.barCode
                  ? (t(`update.error.${errors.barCode.message}`) as string) // TODO: Deberia eleminar este casteo: `as string`
                  : undefined
              }
              inputProps={register("barCode")}
              label={t("Codigo de Barra")}
              name="barCode"
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

export default EditProduct;
