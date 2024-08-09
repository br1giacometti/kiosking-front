import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";

import FetchActionTypes from "Base/types/FetchActionTypes";
import createMovementsRepository from "../createMovementsRepository";
import listMovementsReducer, {
  initialState,
} from "../reducer/listMovementsReducer";
import useDebounce from "Base/hooks/useDebounce";
import { MovementListItem } from "../types";

const useAllMovementsByQuery = () => {
  const [query, setQuery] = useState<string>("day");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>();

  const repository = useMemo(
    () => createMovementsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: movementsList, loading, error }, dispatch] = useReducer(
    listMovementsReducer,
    initialState
  );

  const refetch = useCallback(() => {
    setInvalidateCache(true);
  }, []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllMovementsByQuery(query, startDate, endDate)
        .then((data: any) => {
          dispatch({ type: FetchActionTypes.Succeess, payload: data });
          setInvalidateCache(false);
        })
        .catch((e) => {
          dispatch({ type: FetchActionTypes.Failure, payload: e.message });
          setInvalidateCache(false);
        });
    }
  }, [invalidated, repository, query, startDate, endDate]);

  useEffect(() => {
    if (invalidated) {
      setInvalidateCache(false);
    }
  }, [invalidated]);

  return {
    movementsList,
    loading,
    error,
    refetch,
    setQuery,
    setEndDate,
    setStartDate,
  };
};

export default useAllMovementsByQuery;
