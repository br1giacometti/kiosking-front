import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Aplicator } from "../types";

type CreateAplicatorPayload = FetchPayload<Aplicator> & {
  CLEAN_ERROR: undefined;
};

export type CreateAplicatorActions = BaseAction<CreateAplicatorPayload>;

type CreateAplicatorAction =
  CreateAplicatorActions[keyof CreateAplicatorActions];

interface CreateAplicatorState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateAplicatorState = {
  loading: false,
};

const createAplicatorReducer = (
  state: CreateAplicatorState = initialState,
  action: CreateAplicatorAction
): CreateAplicatorState => {
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

export default createAplicatorReducer;
