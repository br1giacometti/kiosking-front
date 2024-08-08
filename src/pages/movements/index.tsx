import { useCallback } from "react";
import { useRouter } from "next/router";

import { MovementsList, MovementsHeader } from "Movements/features";

import MovementsLayout from "Movements/layout/MovementsLayout";

const MovementsPage = () => {
  const router = useRouter();

  const navigateToCreateBuyMovement = useCallback(
    () => router.push("/movements/create-buy"),
    [router]
  );

  const navigateToCreateAplication = useCallback(
    () => router.push("/movements/create-aplication"),
    [router]
  );

  const navigateToCreateWithdraw = useCallback(
    () => router.push("/movements/create-withdraw"),
    [router]
  );

  const navigateToDetails = useCallback(
    (movementId: number) => router.push(`/movements/${movementId}`),
    [router]
  );

  const navigateToPrint = (factureLink: string) => {
    window.open(factureLink, "_blank"); // Abre el link en una nueva pestaña
  };

  return (
    <MovementsLayout>
      {{
        header: (
          <MovementsHeader
            navigateToCreateBuyMovement={navigateToCreateBuyMovement}
            navigateToCreateAplication={navigateToCreateAplication}
            navigateToCreateWithdraw={navigateToCreateWithdraw}
          />
        ),
        content: (
          <MovementsList
            navigateToDetails={navigateToDetails}
            navigateToPrint={navigateToPrint}
          />
        ),
      }}
    </MovementsLayout>
  );
};

export default MovementsPage;
