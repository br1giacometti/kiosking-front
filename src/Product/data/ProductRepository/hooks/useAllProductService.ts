import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createProductRepository from "../createProductRepository";
import listProductReducer, {
  initialState,
} from "../reducer/listProductReducer";

const useAllProductService = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>();

  const repository = useMemo(
    () => createProductRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: productList, loading, error }, dispatch] = useReducer(
    listProductReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllProduct()
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

  return { productList, loading, error, invalidateCache };
};

export default useAllProductService;
