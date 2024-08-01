import { Heading } from "@chakra-ui/react";
import { withAuth } from "@kushitech/auth-module";
import { User } from "Auth/types";
import PageLayout from "Base/layout/PageLayout";
import { ViewMovements } from "Movements/data/MovementsRepository";
import createMovementsRepository from "Movements/data/MovementsRepository/createMovementsRepository";
import MovementDetails from "Movements/features/MovementDetails";

interface MovementDetailsPageProps {
  movement: ViewMovements | null;
}

const MovementDetailsPage = ({ movement }: MovementDetailsPageProps) => {
  return (
    <PageLayout>
      {{
        header:
          movement !== null ? (
            <Heading>{"Detalle movimiento: " + movement.description}</Heading>
          ) : null,
        content: <MovementDetails movement={movement} />,
      }}
    </PageLayout>
  );
};

export const getServerSideProps = withAuth<User>(async (ctx, user) => {
  if (
    user.role === "USER" ||
    user.role === "DEBT_COLLECTOR" ||
    !ctx.req.cookies.token
  ) {
    // eslint-disable-next-line no-console
    console.log("You dont have permission on  :>> ", ctx.resolvedUrl);
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }

  let movement;
  const repository = createMovementsRepository(ctx.req.cookies.token);
  const movementId = Number.parseInt(String(ctx.query.id), 10);

  try {
    movement = await repository.getMovementById(movementId);
    console.log(movement);
  } catch (error) {
    movement = null;
  }

  return {
    props: {
      user,
      movement,
    },
  };
});

export default MovementDetailsPage;
