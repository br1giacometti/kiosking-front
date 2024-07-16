import { useReducer } from "react";

import { Warehouse } from "Warehouse/data/WarehouseRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createWarehouseReducer from "Warehouse/data/WarehouseRepository/reducer/createWarehouseReducer";
import { initialState } from "Warehouse/data/WarehouseRepository/reducer/listWarehouseReducer";

const useCreateWarehouseStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createWarehouseReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Warehouse) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateWarehouseStates;
