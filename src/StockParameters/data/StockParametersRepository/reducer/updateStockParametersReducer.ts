import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { StockParameters } from "../types";

type UpdateStockParametersPayload = FetchPayload<StockParameters> & {
  CLEAN_ERROR: undefined;
};

export type UpdateStockParametersActions =
  BaseAction<UpdateStockParametersPayload>;

type UpdateStockParametersAction =
  UpdateStockParametersActions[keyof UpdateStockParametersActions];

interface UpdateStockParametersState {
  loading: boolean;
  error?: string;
}

export const initialState: UpdateStockParametersState = {
  loading: false,
};

const updateStockParametersReducer = (
  state: UpdateStockParametersState = initialState,
  action: UpdateStockParametersAction
): UpdateStockParametersState => {
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

export default updateStockParametersReducer;
