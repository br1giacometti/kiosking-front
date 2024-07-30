import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Category } from "../types";

type CreateCategoryPayload = FetchPayload<Category> & {
  CLEAN_ERROR: undefined;
};

export type CreateCategoryActions = BaseAction<CreateCategoryPayload>;

type CreateCategoryAction = CreateCategoryActions[keyof CreateCategoryActions];

interface CreateCategoryState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateCategoryState = {
  loading: false,
};

const createCategoryReducer = (
  state: CreateCategoryState = initialState,
  action: CreateCategoryAction
): CreateCategoryState => {
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

export default createCategoryReducer;
