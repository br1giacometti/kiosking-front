import { GetServerSidePropsContext } from "next";
import { withAuth } from "@kushitech/auth-module";
import { Product } from "Product/data/ProductRepository";
import EditProduct from "Product/features/EditProduct";
import { User } from "Auth/types";
import createProductRepository from "Product/data/ProductRepository/createProductRepository";

interface ProductEditPageProps {
  defaultValues: Product;
}

const ProductEditPage = (props: ProductEditPageProps) => (
  <EditProduct defaultValues={props.defaultValues} />
);

export const getServerSideProps = withAuth<User>(
  async (context: GetServerSidePropsContext, user) => {
    if (user.role === "USER") {
      console.log("You dont have permission on  :>> ", context.resolvedUrl);
      return {
        redirect: {
          permanent: false,
          destination: `/`,
        },
      };
    }

    const repository = createProductRepository(
      context.req.cookies.token as string
    );

    try {
      const product = await repository.getProductById(
        parseInt(context.query.id as string, 10)
      );
      return {
        props: { defaultValues: product },
      };
    } catch (error) {
      console.log("Product doesn't exist :>> ", error);
      return {
        redirect: {
          permanent: false,
          destination: "/product",
        },
      };
    }
  }
);

export default ProductEditPage;
