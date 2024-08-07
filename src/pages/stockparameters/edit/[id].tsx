import { GetServerSidePropsContext } from "next";
import { withAuth } from "@kushitech/auth-module";
import { StockParameters } from "StockParameters/data/StockParametersRepository";
import EditStockParameters from "StockParameters/features/EditStockParameters";
import { User } from "Auth/types";
import createStockParametersRepository from "StockParameters/data/StockParametersRepository/createStockParametersRepository";

interface StockParametersEditPageProps {
  defaultValues: StockParameters;
}

const StockParametersEditPage = (props: StockParametersEditPageProps) => (
  <EditStockParameters defaultValues={props.defaultValues} />
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

    const repository = createStockParametersRepository(
      context.req.cookies.token as string
    );

    try {
      const stockparameters = await repository.getStockParametersById(
        parseInt(context.query.id as string, 10)
      );
      return {
        props: { defaultValues: stockparameters },
      };
    } catch (error) {
      console.log("StockParameters doesn't exist :>> ", error);
      return {
        redirect: {
          permanent: false,
          destination: "/stockparameters",
        },
      };
    }
  }
);

export default StockParametersEditPage;
