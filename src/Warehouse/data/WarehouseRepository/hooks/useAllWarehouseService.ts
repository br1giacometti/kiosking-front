import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";

import createWarehouseRepository from "../createWarehouseRepository";
import listWarehouseReducer, {
  initialState,
} from "../reducer/listWarehouseReducer";

const useAllWarehouseService = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>();

  const repository = useMemo(
    () => createWarehouseRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: warehouseList, loading, error }, dispatch] = useReducer(
    listWarehouseReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllWarehouse()
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

  return { warehouseList, loading, error, invalidateCache };
};

export default useAllWarehouseService;
