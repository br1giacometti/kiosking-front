import FetchActionTypes from "Base/types/FetchActionTypes";
import { Movements } from "Movements/data/MovementsRepository";
import updateMovementsReducer2, {
  initialState,
} from "Movements/data/MovementsRepository/reducer/updateMovementsReducer2";
import { useReducer } from "react";

const useUpdateMovementsStates2 = () => {
  const [{ loadingPrint, errorPrint }, dispatch] = useReducer(
    updateMovementsReducer2,
    initialState
  );

  const startFetchPrint = () => dispatch({ type: FetchActionTypes.Start });

  const successFetchPrint = (payload: Movements) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetchPrint = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return {
    loadingPrint,
    errorPrint,
    startFetchPrint,
    successFetchPrint,
    failureFetchPrint,
  };
};

export default useUpdateMovementsStates2;
