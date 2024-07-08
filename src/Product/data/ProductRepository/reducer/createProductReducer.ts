import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Product } from "../types";

type CreateProductPayload = FetchPayload<Product> & {
  CLEAN_ERROR: undefined;
};

export type CreateProductActions = BaseAction<CreateProductPayload>;

type CreateProductAction = CreateProductActions[keyof CreateProductActions];

interface CreateProductState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateProductState = {
  loading: false,
};

const createProductReducer = (
  state: CreateProductState = initialState,
  action: CreateProductAction
): CreateProductState => {
  switch (action.type) {
    case FetchActionTypes.Start: {
      return {
        ...state,
        loading: true,
      };
    }
    case FetchActionTypes.Succeess: {
      return {
        ...state,
        loading: false,
      };
    }
    case FetchActionTypes.Failure: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case "CLEAN_ERROR": {
      return {
        ...state,
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export default createProductReducer;
