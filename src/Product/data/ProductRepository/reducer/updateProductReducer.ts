import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Product } from "../types";

type UpdateProductPayload = FetchPayload<Product> & {
  CLEAN_ERROR: undefined;
};

export type UpdateProductActions = BaseAction<UpdateProductPayload>;

type UpdateProductAction = UpdateProductActions[keyof UpdateProductActions];

interface UpdateProductState {
  loading: boolean;
  error?: string;
}

export const initialState: UpdateProductState = {
  loading: false,
};

const updateProductReducer = (
  state: UpdateProductState = initialState,
  action: UpdateProductAction
): UpdateProductState => {
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

export default updateProductReducer;
