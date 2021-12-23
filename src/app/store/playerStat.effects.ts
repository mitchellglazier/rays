import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { PlayerStatsService } from '../services/player-stats.service';
import {
  PlayerStatAction,
  PlayerStatActionTypes,
  LoadPlayerStatsSuccess,
  LoadPlayerStatsFailure,
} from './playerStat.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';


@Injectable()
export class PlayerStatEffects {
  loadPlayerStats$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerStatActionTypes.LoadPlayerStats),
      mergeMap(() =>
        this.playerStatsService.getPlayerStats().pipe(
          map((players: any[]) => new LoadPlayerStatsSuccess(players)),
          catchError((error: HttpErrorResponse) =>
            of(new LoadPlayerStatsFailure(error))
          )
        )
      )
    )
  );

  constructor(
    private playerStatsService: PlayerStatsService,
    private actions$: Actions<PlayerStatAction>
  ) {}
}
