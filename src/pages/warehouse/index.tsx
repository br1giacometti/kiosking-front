import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import WarehouseHeader from "Warehouse/features/WarehouseHeader";
import WarehouseList from "Warehouse/features/WarehouseList";

const WarehousePage = () => {
  const router = useRouter();

  const navigateToCreateWarehouse = useCallback(
    () => router.push("/warehouse/create"),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <WarehouseHeader
            navigateToCreateWarehouse={navigateToCreateWarehouse}
          />
        ),
        content: <WarehouseList />,
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

export default WarehousePage;
