import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Field } from "../types";

type ListFieldPayload = FetchPayload<Field[]>;

export type ListFieldActions = BaseAction<ListFieldPayload>;

type ListFieldAction = ListFieldActions[keyof ListFieldActions];

interface ListFieldState {
  data: Field[];
  loading: boolean;
  error?: string;
}

export const initialState: ListFieldState = {
  data: [],
  loading: false,
};

const listFieldReducer = (
  state: ListFieldState = initialState,
  action: ListFieldAction
): ListFieldState => {
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

export default listFieldReducer;
