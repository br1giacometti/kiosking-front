import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";
import useDebounce from "Base/hooks/useDebounce";
import createProductRepository from "../createProductRepository";
import listProductReducer, {
  initialState,
} from "../reducer/listProductReducer";
import { PaginationMeta } from "../types";

const useAllProductPaginated = () => {
  const [query, setQuery] = useState<string>("");
  const debouncedInputValue = useDebounce(query, 500);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
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

  // Nueva función refetch para volver a cargar los productos
  const refetch = useCallback(() => {
    setInvalidateCache(true);
  }, []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllProductPaginated(currentPage, 10, debouncedInputValue)
        .then((data) => {
          dispatch({ type: FetchActionTypes.Succeess, payload: data.data });
          setMeta(data.meta);
        })
        .catch((e) => {
          dispatch({ type: FetchActionTypes.Failure, payload: e.message });
        });
    }
  }, [
    invalidated,
    currentPage,
    meta?.itemsPerPage,
    repository,
    debouncedInputValue,
  ]);

  useEffect(() => {
    if (invalidated) {
      setInvalidateCache(false);
    }
  }, [invalidated]);

  return {
    productList,
    meta,
    loading,
    error,
    invalidateCache,
    refetch, // Añadido refetch aquí
    currentPage,
    setCurrentPage,
    setQuery,
  };
};

export default useAllProductPaginated;
