import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import ProductHeader from "Product/features/ProductHeader";
import ProductList from "Product/features/ProductList";

const ProductPage = () => {
  const router = useRouter();

  const navigateToCreateProduct = useCallback(
    () => router.push("/product/create"),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <ProductHeader navigateToCreateProduct={navigateToCreateProduct} />
        ),
        content: <ProductList />,
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

export default ProductPage;
