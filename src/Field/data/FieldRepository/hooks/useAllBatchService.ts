import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createBatchRepository from "../createBatchRepository";
import listBatchReducer, { initialState } from "../reducer/listBatchReducer";

const useAllBatchService = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>();

  const repository = useMemo(
    () => createBatchRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: batchList, loading, error }, dispatch] = useReducer(
    listBatchReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllBatch()
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

  return { batchList, loading, error, invalidateCache };
};

export default useAllBatchService;
