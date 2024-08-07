import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createStockParametersRepository from "../createStockParametersRepository";
import listStockParametersReducer, {
  initialState,
} from "../reducer/listStockParametersReducer";

const useAllStockParametersService = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>(
    undefined
  );

  const repository = useMemo(
    () =>
      createStockParametersRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: stockparametersList, loading, error }, dispatch] = useReducer(
    listStockParametersReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  // Nueva función refetch para volver a cargar los stockparametersos
  const refetch = useCallback(() => {
    setInvalidateCache(true);
  }, []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllStockParameters()
        .then((data) => {
          dispatch({ type: FetchActionTypes.Succeess, payload: data });
        })
        .catch((e) => {
          dispatch({ type: FetchActionTypes.Failure, payload: e.message });
        });
    }
  }, [invalidated, repository]);

  useEffect(() => {
    if (invalidated) {
      setInvalidateCache(false);
    }
  }, [invalidated]);

  return { stockparametersList, loading, error, refetch };
};

export default useAllStockParametersService;
