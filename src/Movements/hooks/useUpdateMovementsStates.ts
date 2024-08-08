import FetchActionTypes from "Base/types/FetchActionTypes";
import { Movements } from "Movements/data/MovementsRepository";
import updateMovementsReducer, {
  initialState,
} from "Movements/data/MovementsRepository/reducer/updateMovementsReducer";
import { useReducer } from "react";

const useUpdateMovementsStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    updateMovementsReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Movements) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useUpdateMovementsStates;
