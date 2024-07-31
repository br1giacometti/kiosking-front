import FetchActionTypes from "Base/types/FetchActionTypes";
import { Product } from "Product/data/ProductRepository";
import updateProductReducer, {
  initialState,
} from "Product/data/ProductRepository/reducer/updateProductReducer";
import { useReducer } from "react";

const useUpdateProductStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    updateProductReducer,
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

export default useUpdateProductStates;
