import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import StockParametersHeader from "StockParameters/features/StockParametersHeader";
import StockParametersList from "StockParameters/features/StockParametersList";
import { StockParameters } from "StockParameters/data/StockParametersRepository";

const StockParametersPage = () => {
  const router = useRouter();

  const navigateToEdit = useCallback(
    (stockparameters: StockParameters) => {
      router.push(`/stockparameters/edit/${stockparameters.id}`);
    },
    [router]
  );

  return (
    <PageLayout>
      {{
        header: <StockParametersHeader />,
        content: <StockParametersList navigateToEdit={navigateToEdit} />,
      }}
    </PageLayout>
  );
};

/* export const getServerSideProps = withAuth<User>(async (ctx, user) => {
  if (user.role === "USER") {
    // eslint-disable-next-line no-console
    console.log("You dont have permission on  :>> ", ctx.resolvedUrl);
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
  return {
    props: {
      user,
    },
  };
}); */

export default StockParametersPage;
