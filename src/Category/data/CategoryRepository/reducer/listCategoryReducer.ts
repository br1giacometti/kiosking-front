import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Category } from "../types";

type ListCategoryPayload = FetchPayload<Category[]>;

export type ListCategoryActions = BaseAction<ListCategoryPayload>;

type ListCategoryAction = ListCategoryActions[keyof ListCategoryActions];

interface ListCategoryState {
  data: Category[];
  loading: boolean;
  error?: string;
}

export const initialState: ListCategoryState = {
  data: [],
  loading: false,
};

const listCategoryReducer = (
  state: ListCategoryState = initialState,
  action: ListCategoryAction
): ListCategoryState => {
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

export default listCategoryReducer;
