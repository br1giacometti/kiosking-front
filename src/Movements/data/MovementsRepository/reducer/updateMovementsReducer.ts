import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Movements } from "../types";

type UpdateMovementsPayload = FetchPayload<Movements> & {
  CLEAN_ERROR: undefined;
};

export type UpdateMovementsActions = BaseAction<UpdateMovementsPayload>;

type UpdateMovementsAction =
  UpdateMovementsActions[keyof UpdateMovementsActions];

interface UpdateMovementsState {
  loading: boolean;
  error?: string;
}

export const initialState: UpdateMovementsState = {
  loading: false,
};

const updateMovementsReducer = (
  state: UpdateMovementsState = initialState,
  action: UpdateMovementsAction
): UpdateMovementsState => {
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

export default updateMovementsReducer;
