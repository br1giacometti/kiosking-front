import { useReducer } from "react";

import { Product } from "Product/data/ProductRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createProductReducer from "Product/data/ProductRepository/reducer/createProductReducer";
import { initialState } from "Product/data/ProductRepository/reducer/listProductReducer";

const useCreateProductStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createProductReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Product) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateProductStates;
