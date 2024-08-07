import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";
import { StockParameters } from "../types";

type ListStockParametersPayload = FetchPayload<StockParameters[]>;

export type ListStockParametersActions = BaseAction<ListStockParametersPayload>;

type ListStockParametersAction =
  ListStockParametersActions[keyof ListStockParametersActions];

interface ListStockParametersState {
  data: StockParameters[];
  loading: boolean;
  error?: string;
}

export const initialState: ListStockParametersState = {
  data: [],
  loading: false,
};

const listStockParametersReducer = (
  state: ListStockParametersState = initialState,
  action: ListStockParametersAction
): ListStockParametersState => {
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

export default listStockParametersReducer;
