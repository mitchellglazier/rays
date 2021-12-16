import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export enum PlayerStatActionTypes {
  LoadPlayerStats = "[PLAYER STAT] = Load Players' Stats",
  LoadPlayerStatsSuccess = "[PLAYER STAT] = Load Players' Stats Success",
  LoadPlayerStatsFailure = "[PLAYER STAT] = Load Players' Stats Failure",
}

export class LoadPlayerStats implements Action {
  readonly type = PlayerStatActionTypes.LoadPlayerStats;
}
export class LoadPlayerStatsSuccess implements Action {
  readonly type = PlayerStatActionTypes.LoadPlayerStatsSuccess;
  constructor(public payload: any[]) {}
}
export class LoadPlayerStatsFailure implements Action {
  readonly type = PlayerStatActionTypes.LoadPlayerStatsFailure;
  constructor(public payload: HttpErrorResponse) {}
}

export type PlayerStatAction =
  | LoadPlayerStats
  | LoadPlayerStatsSuccess
  | LoadPlayerStatsFailure;
