import { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@chakra-ui/react";

import createAplicationSchema, {
  CreateAplicationSchema,
} from "Movements/schemas/CreateAplicationSchema";
import PageLayout from "Base/layout/PageLayout";
import CreateAplicationProvider from "Movements/contexts/CreateBuyContext/CreateAplicationProvider";
import CreateAplicationMovement from "Movements/features/CreateAplicationMovement";

const AplicationCreatePage = () => {
  const router = useRouter();
  const methods = useForm<CreateAplicationSchema>({
    resolver: zodResolver(createAplicationSchema),
    //remover hardcodeo
    defaultValues: {
      movementType: "APLICATION",
      stockMovementDetail: [],
    },
  });

  const stockMovementsArrayMethods = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "stockMovementDetail", // unique name for your Field Array
  });

  const navigateToPrint = (factureLink: string) => {
    window.open(factureLink, "_blank"); // Abre el link en una nueva pestaña
  };

  return (
    <FormProvider {...methods}>
      <CreateAplicationProvider
        {...methods}
        stockMovementDetail={stockMovementsArrayMethods}
      >
        <PageLayout>
          {{
            header: <Heading>{""}</Heading>,
            content: (
              <CreateAplicationMovement navigateToPrint={navigateToPrint} />
            ),
          }}
        </PageLayout>
      </CreateAplicationProvider>
    </FormProvider>
  );
};

export default AplicationCreatePage;
