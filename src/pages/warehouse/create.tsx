import { useCallback } from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PageLayout from "Base/layout/PageLayout";
import CreateWarehouse from "Warehouse/features/CreateWarehouse";

const WarehouseCreatePage = () => {
  const { t } = useTranslation("warehouse");
  const router = useRouter();

  const navigateToWarehouse = useCallback(
    () => router.push("/warehouse"),
    [router]
  );
  return (
    <PageLayout>
      {{
        header: <Heading>{t("create.title")}</Heading>,
        content: <CreateWarehouse navigateToWarehouse={navigateToWarehouse} />,
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

export default WarehouseCreatePage;
