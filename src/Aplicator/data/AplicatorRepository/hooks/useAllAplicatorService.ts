import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";

import createAplicatorRepository from "../createAplicatorRepository";
import listAplicatorReducer, {
  initialState,
} from "../reducer/listAplicatorReducer";

const useAllAplicatorService = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>();

  const repository = useMemo(
    () => createAplicatorRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: aplicatorList, loading, error }, dispatch] = useReducer(
    listAplicatorReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllAplicator()
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

  return { aplicatorList, loading, error, invalidateCache };
};

export default useAllAplicatorService;
