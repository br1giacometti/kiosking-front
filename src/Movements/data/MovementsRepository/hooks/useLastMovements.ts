import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";
import useDebounce from "Base/hooks/useDebounce";

import { PaginationMeta } from "../types";
import createMovementsRepository from "../createMovementsRepository";
import listMovementsReducer, {
  initialState,
} from "../reducer/listLastMovementsReducer";

const useLastMovements = () => {
  const [query, setQuery] = useState<string>("");
  const debouncedInputValue = useDebounce(query, 500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>(
    false
  );

  const repository = useMemo(
    () => createMovementsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: movementsList, loading, error }, dispatch] = useReducer(
    listMovementsReducer,
    initialState
  );

  const refetch = useCallback(() => {
    console.log("Refetch called");
    setInvalidateCache(true);
  }, []);

  useEffect(() => {
    if (invalidated !== undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getLastMovements()
        .then((data) => {
          dispatch({ type: FetchActionTypes.Succeess, payload: data });
          setInvalidateCache(false); // Reset the cache invalidation state after fetching data
        })
        .catch((e) => {
          dispatch({ type: FetchActionTypes.Failure, payload: e.message });
          setInvalidateCache(false); // Reset the cache invalidation state on error
        });
    }
  }, [invalidated, currentPage, debouncedInputValue, repository]);

  return {
    movementsList,
    meta,
    loading,
    error,
    refetch,
    currentPage,
    setCurrentPage,
    setQuery,
  };
};

export default useLastMovements;
