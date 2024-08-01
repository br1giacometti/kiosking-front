import FetchPayload from "Base/types/FetchPayload";
import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import { MovementListItem } from "../types";

type ListMovementsPayload = FetchPayload<MovementListItem[]>;

export type ListMovementsActions = BaseAction<ListMovementsPayload>;

type ListMovementsAction = ListMovementsActions[keyof ListMovementsActions];

interface listLastMovementsReducer {
  data: MovementListItem[];
  loading: boolean;
  error?: string;
}

export const initialState: listLastMovementsReducer = {
  data: [],
  loading: false,
};

const listMovementsReducer = (
  state: listLastMovementsReducer = initialState,
  action: ListMovementsAction
): listLastMovementsReducer => {
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

export default listMovementsReducer;
