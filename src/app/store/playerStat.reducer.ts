import { HttpErrorResponse } from '@angular/common/http';
import { PlayerStatAction, PlayerStatActionTypes } from './playerStat.actions';

export interface PlayerStatState {
  stats: any[];
  // pitcherStats: any[];
  pending: boolean;
  error: HttpErrorResponse;
}

export const initialState: PlayerStatState = {
  stats: [],
  pending: false,
  error: undefined,
};

export function PlayerStatReducer(
  state = initialState,
  action: PlayerStatAction
): PlayerStatState {
  switch (action.type) {
    case PlayerStatActionTypes.LoadPlayerStats:
      return {
        ...state,
        pending: true,
      };

    case PlayerStatActionTypes.LoadPlayerStatsSuccess:
      return {
        ...state,
        pending: false,
        stats: action.payload
      };

    case PlayerStatActionTypes.LoadPlayerStatsFailure:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
  }
}
