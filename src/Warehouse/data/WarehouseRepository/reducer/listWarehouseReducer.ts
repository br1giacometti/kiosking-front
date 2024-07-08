import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Warehouse } from "../types";

type ListWarehousePayload = FetchPayload<Warehouse[]>;

export type ListWarehouseActions = BaseAction<ListWarehousePayload>;

type ListWarehouseAction = ListWarehouseActions[keyof ListWarehouseActions];

interface ListWarehouseState {
  data: Warehouse[];
  loading: boolean;
  error?: string;
}

export const initialState: ListWarehouseState = {
  data: [],
  loading: false,
};

const listWarehouseReducer = (
  state: ListWarehouseState = initialState,
  action: ListWarehouseAction
): ListWarehouseState => {
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

export default listWarehouseReducer;
