import { useCallback, useMemo } from "react";
import { Button, Center, Text } from "@chakra-ui/react";

import Carousel from "Base/components/Carousel";

import useCreateBuyContext from "Movements/contexts/CreateBuyContext/hooks/useCreateBuyContext";
import FormCreateBuyDetail from "./FormCreateBuyDetail";

const FormCreateBuyDetails = () => {
  const {
    stockMovementDetail: { fields, append },
  } = useCreateBuyContext();

  const addNewBuyDetail = useCallback(() => {
    append({
      product: null as any,
      quantity: 0,
      buyPrice: 0,
      value: 0,
      description: "",
    });
  }, [append]);

  const buyDetailsCreateList = useMemo(
    () =>
      fields
        .map((item, index) => ({
          id: item.id,
          content: <FormCreateBuyDetail id={item.id} index={index} />,
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
                  onClick={addNewBuyDetail}
                >
                  <Text fontSize={{ base: "3xl", lg: "5xl" }}>+</Text>
                  <Text fontSize={{ base: "2xl", lg: "4xl" }} ml={4}>
                    {"Detalle"}
                  </Text>
                </Button>
              </Center>
            ),
          },
        ]),
    [addNewBuyDetail, fields]
  );

  return (
    <Carousel
      items={buyDetailsCreateList}
      maxH={{ base: "2xl", lg: "initial" }}
      maxW={{ base: "container.sm", lg: "container.sm" }}
      overflowY={{ base: "scroll", lg: "initial" }}
      pt={8}
      w="full"
    />
  );

  return null;
};

export default FormCreateBuyDetails;
