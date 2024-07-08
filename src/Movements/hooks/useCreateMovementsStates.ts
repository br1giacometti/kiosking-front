import { useReducer } from "react";
import createMovementsReducer, {
  initialState,
} from "Movements/data/MovementsRepository/reducer/createMovementsReducer";

import { Movements } from "Movements/data/MovementsRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";

const useCreateMovementsStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createMovementsReducer,
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

export default useCreateMovementsStates;
