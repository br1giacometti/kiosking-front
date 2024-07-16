import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";
import { Field } from "../types";

type CreateFieldPayload = FetchPayload<Field> & {
  CLEAN_ERROR: undefined;
};

export type CreateFieldActions = BaseAction<CreateFieldPayload>;

type CreateFieldAction = CreateFieldActions[keyof CreateFieldActions];

interface CreateFieldState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateFieldState = {
  loading: false,
};

const createFieldReducer = (
  state: CreateFieldState = initialState,
  action: CreateFieldAction
): CreateFieldState => {
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

export default createFieldReducer;
