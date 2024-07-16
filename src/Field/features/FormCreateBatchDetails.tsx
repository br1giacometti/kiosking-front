import { useCallback, useMemo } from "react";
import { Button, Center, Text } from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import Carousel from "Base/components/Carousel";
import useCreateFieldContext from "Field/contexts/CreateBatchContext/hooks/useCreateFieldContext";
import FormCreateBatch from "./FormCreateBatch";

const FormCreateBatchDetails = () => {
  const { t } = useTranslation("field");
  const {
    batches: { fields, append },
  } = useCreateFieldContext();

  const addNewBatchDetail = useCallback(() => {
    append({
      description: "",
      hectares: 0,
    });
  }, [append]);

  const batchesDetailsCreateList = useMemo(
    () =>
      fields
        .map((item, index) => ({
          id: item.id,
          content: <FormCreateBatch id={item.id} index={index} />,
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
                  onClick={addNewBatchDetail}
                >
                  <Text fontSize={{ base: "3xl", lg: "5xl" }}>+</Text>
                  <Text fontSize={{ base: "2xl", lg: "4xl" }} ml={4}>
                    {t("createBatch.carousel.addBatch")}
                  </Text>
                </Button>
              </Center>
            ),
          },
        ]),
    [addNewBatchDetail, fields, t]
  );

  return (
    <Carousel
      items={batchesDetailsCreateList}
      maxH={{ base: "2xl", lg: "initial" }}
      maxW={{ base: "container.sm", lg: "container.sm" }}
      overflowY={{ base: "scroll", lg: "initial" }}
      pt={8}
      w="full"
    />
  );

  return null;
};

export default FormCreateBatchDetails;
