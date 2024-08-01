import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import createMovementsRepository from "../createMovementsRepository";
import { TokenHandler } from "@kushitech/auth-module";
import listMovementsReducer, {
  initialState,
} from "../reducer/listLastMovementsReducer";
import FetchActionTypes from "Base/types/FetchActionTypes";

const useLastMovements = () => {
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
        .getLastMovements()
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

export default useLastMovements;
