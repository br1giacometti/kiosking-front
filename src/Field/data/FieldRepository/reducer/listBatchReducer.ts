import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Batch } from "../types";

type ListBatchPayload = FetchPayload<Batch[]>;

export type ListBatchActions = BaseAction<ListBatchPayload>;

type ListBatchAction = ListBatchActions[keyof ListBatchActions];

interface ListBatchState {
  data: Batch[];
  loading: boolean;
  error?: string;
}

export const initialState: ListBatchState = {
  data: [],
  loading: false,
};

const listBatchReducer = (
  state: ListBatchState = initialState,
  action: ListBatchAction
): ListBatchState => {
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

export default listBatchReducer;
