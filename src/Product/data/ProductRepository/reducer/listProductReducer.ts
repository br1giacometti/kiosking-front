import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Product } from "../types";

type ListProductPayload = FetchPayload<Product[]>;

export type ListProductActions = BaseAction<ListProductPayload>;

type ListProductAction = ListProductActions[keyof ListProductActions];

interface ListProductState {
  data: Product[];
  loading: boolean;
  error?: string;
}

export const initialState: ListProductState = {
  data: [],
  loading: false,
};

const listProductReducer = (
  state: ListProductState = initialState,
  action: ListProductAction
): ListProductState => {
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
        data: action.payload,
      };
    }
    case FetchActionTypes.Failure: {
      return {
        ...state,
        data: initialState.data,
        error: action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default listProductReducer;
