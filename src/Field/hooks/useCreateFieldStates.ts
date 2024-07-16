import { useReducer } from "react";

import { Field } from "Field/data/FieldRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createFieldReducer from "Field/data/FieldRepository/reducer/createFieldReducer";
import { initialState } from "Field/data/FieldRepository/reducer/listFieldReducer";

const useCreateFieldStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createFieldReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Field) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateFieldStates;
