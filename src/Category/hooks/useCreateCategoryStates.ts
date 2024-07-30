import { useReducer } from "react";

import { Category } from "Category/data/CategoryRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createCategoryReducer from "Category/data/CategoryRepository/reducer/createCategoryReducer";
import { initialState } from "Category/data/CategoryRepository/reducer/listCategoryReducer";

const useCreateCategoryStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createCategoryReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Category) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateCategoryStates;
