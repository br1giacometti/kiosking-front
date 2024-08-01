import { useCallback, useMemo } from "react";
import { Button, Center, Text } from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import useAddProductsContext from "Movements/contexts/CreateBuyContext/hooks/useAddProductsContext";

import Carousel from "Base/components/Carousel";
import FormAddProducts from "./FormAddProducts";

const FormAddProductsDetails = () => {
  const { t } = useTranslation("field");
  const {
    stockMovementDetail: { fields, append },
  } = useAddProductsContext();

  const addNewProductDetail = useCallback(() => {
    append({
      productId: 0,
      sellPrice: 0,
      quantity: 0,
    });
  }, [append]);

  const productsDetailsCreateList = useMemo(
    () =>
      fields
        .map((item, index) => ({
          id: item.id,
          content: <FormAddProducts id={item.id} index={index} />,
        }))
        .concat([
          {
            id: "add-new-owner",
            content: (
              <Center mx={{ base: 16, md: 24 }}>
                <Button
                  colorScheme="main"
                  h={{ base: "2xl", md: "lg" }}
                  w="full"
                  onClick={addNewProductDetail}
                >
                  <Text fontSize={{ base: "3xl", lg: "5xl" }}>+</Text>
                  <Text fontSize={{ base: "2xl", lg: "4xl" }} ml={4}>
                    {"Añadir producto"}
                  </Text>
                </Button>
              </Center>
            ),
          },
        ]),
    [addNewProductDetail, fields, t]
  );

  return (
    <Carousel
      items={productsDetailsCreateList}
      maxH={{ base: "2xl", lg: "initial" }}
      maxW={{ base: "container.sm", lg: "container.sm" }}
      overflowY={{ base: "scroll", lg: "initial" }}
      pt={8}
      w="full"
    />
  );

  return null;
};

export default FormAddProductsDetails;
