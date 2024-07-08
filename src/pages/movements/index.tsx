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

  const navigateToCreateRendition = useCallback(
    () => router.push("/movements/create-rendition"),
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

  return (
    <MovementsLayout>
      {{
        header: (
          <MovementsHeader
            navigateToCreateBuyMovement={navigateToCreateBuyMovement}
            navigateToCreateRendition={navigateToCreateRendition}
            navigateToCreateWithdraw={navigateToCreateWithdraw}
          />
        ),
        content: <MovementsList navigateToDetails={navigateToDetails} />,
      }}
    </MovementsLayout>
  );
};

export default MovementsPage;
