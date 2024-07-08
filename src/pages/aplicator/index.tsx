import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import AplicatorHeader from "Aplicator/features/AplicatorHeader";
import AplicatorList from "Aplicator/features/AplicatorList";

const AplicatorPage = () => {
  const router = useRouter();

  const navigateToCreateAplicator = useCallback(
    () => router.push("/aplicator/create"),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <AplicatorHeader
            navigateToCreateAplicator={navigateToCreateAplicator}
          />
        ),
        content: <AplicatorList />,
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

export default AplicatorPage;
