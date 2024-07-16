import { useReducer } from "react";

import { Aplicator } from "Aplicator/data/AplicatorRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createAplicatorReducer from "Aplicator/data/AplicatorRepository/reducer/createAplicatorReducer";
import { initialState } from "Aplicator/data/AplicatorRepository/reducer/listAplicatorReducer";

const useCreateAplicatorStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createAplicatorReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Aplicator) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateAplicatorStates;
