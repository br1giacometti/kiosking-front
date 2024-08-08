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
  loadingPrint: boolean;
  errorPrint?: string;
}

export const initialState: UpdateMovementsState = {
  loadingPrint: false,
};

const updateMovementsReducer2 = (
  state: UpdateMovementsState = initialState,
  action: UpdateMovementsAction
): UpdateMovementsState => {
  switch (action.type) {
    case FetchActionTypes.Start: {
      return {
        ...state,
        loadingPrint: true,
      };
    }
    case FetchActionTypes.Succeess: {
      return {
        ...state,
        loadingPrint: false,
      };
    }
    case FetchActionTypes.Failure: {
      return {
        ...state,
        loadingPrint: false,
        errorPrint: action.payload,
      };
    }
    case "CLEAN_ERROR": {
      return {
        ...state,
        errorPrint: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export default updateMovementsReducer2;
