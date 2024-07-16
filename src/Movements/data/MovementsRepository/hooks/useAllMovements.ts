import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";

import FetchActionTypes from "Base/types/FetchActionTypes";
import createMovementsRepository from "../createMovementsRepository";
import listMovementsReducer, {
  initialState,
} from "../reducer/listMovementsReducer";


const useAllMovements = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>();

  const repository = useMemo(
    () => createMovementsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: movementsList, loading, error }, dispatch] = useReducer(
    listMovementsReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllMovements()
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

  return { movementsList, loading, error, invalidateCache };
};

export default useAllMovements;
