import { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@chakra-ui/react";

import createMovementsSchema, {
  CreateMovementsSchema,
} from "Movements/schemas/CreateMovementsSchema";
import { CreateBuyMovement } from "Movements/features";
import { useTranslation } from "Base/i18n";
import PageLayout from "Base/layout/PageLayout";
import AddProductsProvider from "Movements/contexts/CreateBuyContext/AddProductsProvider";

const MovementCreatePage = () => {
  const { t } = useTranslation("movements");
  const router = useRouter();
  const methods = useForm<CreateMovementsSchema>({
    resolver: zodResolver(createMovementsSchema),
    defaultValues: {
      movementType: "MOVEMENT",
    },
  });

  const navigateToMovements = useCallback(
    () => router.push("/movements"),
    [router]
  );

  const productsArrayMethods = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "stockMovementsDetail", // unique name for your Field Array
  });

  return (
    <FormProvider {...methods}>
      <AddProductsProvider
        {...methods}
        stockMovementsDetail={productsArrayMethods}
      >
        <PageLayout>
          {{
            header: <Heading>{"Completar los datos de compra de productos"}</Heading>,
            content: (
              <CreateBuyMovement navigateToMovements={navigateToMovements} />
            ),
          }}
        </PageLayout>
      </AddProductsProvider>
    </FormProvider>
  );
};

export default MovementCreatePage;
