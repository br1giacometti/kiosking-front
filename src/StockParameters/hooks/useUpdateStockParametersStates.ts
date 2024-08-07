import FetchActionTypes from "Base/types/FetchActionTypes";
import { StockParameters } from "StockParameters/data/StockParametersRepository";
import updateStockParametersReducer, {
  initialState,
} from "StockParameters/data/StockParametersRepository/reducer/updateStockParametersReducer";
import { useReducer } from "react";

const useUpdateStockParametersStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    updateStockParametersReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: StockParameters) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useUpdateStockParametersStates;
