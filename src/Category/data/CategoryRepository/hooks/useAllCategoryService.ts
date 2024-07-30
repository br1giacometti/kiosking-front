import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createCategoryRepository from "../createCategoryRepository";
import listCategoryReducer, {
  initialState,
} from "../reducer/listCategoryReducer";

const useAllCategoryService = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>();

  const repository = useMemo(
    () => createCategoryRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: categoryList, loading, error }, dispatch] = useReducer(
    listCategoryReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllCategory()
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

  return { categoryList, loading, error, invalidateCache };
};

export default useAllCategoryService;
