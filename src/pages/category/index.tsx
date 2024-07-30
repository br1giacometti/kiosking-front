import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import CategoryHeader from "Category/features/CategoryHeader";
import CategoryList from "Category/features/CategoryList";

const CategoryPage = () => {
  const router = useRouter();

  const navigateToCreateCategory = useCallback(
    () => router.push("/category/create"),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <CategoryHeader navigateToCreateCategory={navigateToCreateCategory} />
        ),
        content: <CategoryList />,
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

export default CategoryPage;
