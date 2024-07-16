import FetchPayload from "Base/types/FetchPayload";
import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import { Movements } from "../types";

type CreatePersonPayload = FetchPayload<Movements> & {
  CLEAN_ERROR: undefined;
};

export type CreateMovementsActions = BaseAction<CreatePersonPayload>;

type CreateMovementsAction =
  CreateMovementsActions[keyof CreateMovementsActions];

interface CreateMovementsState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateMovementsState = {
  loading: false,
};

const createMovementsReducer = (
  state: CreateMovementsState = initialState,
  action: CreateMovementsAction
): CreateMovementsState => {
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

export default createMovementsReducer;
