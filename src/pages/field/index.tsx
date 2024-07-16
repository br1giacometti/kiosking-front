import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import FieldHeader from "Field/features/FieldHeader";
import FieldList from "Field/features/FieldList";

const FieldPage = () => {
  const router = useRouter();

  const navigateToCreateField = useCallback(
    () => router.push("/field/create"),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <FieldHeader navigateToCreateField={navigateToCreateField} />
        ),
        content: <FieldList />,
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

export default FieldPage;
