import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Aplicator } from "../types";

type ListAplicatorPayload = FetchPayload<Aplicator[]>;

export type ListAplicatorActions = BaseAction<ListAplicatorPayload>;

type ListAplicatorAction = ListAplicatorActions[keyof ListAplicatorActions];

interface ListAplicatorState {
  data: Aplicator[];
  loading: boolean;
  error?: string;
}

export const initialState: ListAplicatorState = {
  data: [],
  loading: false,
};

const listAplicatorReducer = (
  state: ListAplicatorState = initialState,
  action: ListAplicatorAction
): ListAplicatorState => {
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

export default listAplicatorReducer;
