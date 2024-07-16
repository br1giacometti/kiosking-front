import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Warehouse } from "../types";

type CreateWarehousePayload = FetchPayload<Warehouse> & {
  CLEAN_ERROR: undefined;
};

export type CreateWarehouseActions = BaseAction<CreateWarehousePayload>;

type CreateWarehouseAction =
  CreateWarehouseActions[keyof CreateWarehouseActions];

interface CreateWarehouseState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateWarehouseState = {
  loading: false,
};

const createWarehouseReducer = (
  state: CreateWarehouseState = initialState,
  action: CreateWarehouseAction
): CreateWarehouseState => {
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

export default createWarehouseReducer;
