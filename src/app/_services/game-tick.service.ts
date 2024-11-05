import {computed, Injectable, Signal, signal} from '@angular/core';
import {GameState} from '../_models/game/gameState';
import {GameInfoService} from './game-info.service';
import {interval, Subscription} from 'rxjs';

export enum ModeEnum {
  LIVE,
  PAUSE,
  PLAY_BACKWARD,
  PLAY_FORWARD
}

@Injectable({
  providedIn: 'root'
})
export class GameTickService {

  tickMap = new Map<number, GameState[]>()
  currentTick = signal<GameState | undefined>(undefined)
  currentGameTickIndex = computed(() => {
    let tick = this.currentTick()
    if (!tick) {
      return 0
    } else {
      return this.currentGameStates.findIndex(state => state.game.tick === tick?.game.tick)
    }
  })

  currentMode: ModeEnum = ModeEnum.LIVE
  currentGameID: Signal<number>;
  private timerSubscription?: Subscription;

  get currentGameStates(): GameState[] {
    return this.tickMap.get(this.currentGameID()) || []
  }

  constructor(gameInfoService: GameInfoService) {
    this.currentGameID = computed(() => gameInfoService.currentGameInfo()?.id || 0)
    this.startTimer();

    //TODO this.addGameStateForGame(0, {})
  }

  public addGameStateForGame(gameId: number, gameState: GameState): void {
    let gameStates = this.tickMap.get(gameId) || []

    if (gameStates.some(gs => gs.game.tick == gameState.game.tick)) {
      return;
    }
    gameStates.push(gameState)
    gameStates = gameStates.sort((a, b) => a.game.tick - b.game.tick)
    this.tickMap.set(gameId, gameStates)

    if (gameId == this.currentGameID() && this.currentMode == ModeEnum.LIVE) {
      this.currentTick.set(gameStates[gameStates.length - 1])
    }
  }

  public startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.currentMode == ModeEnum.PAUSE || this.currentMode == ModeEnum.LIVE) return;
      const gameStates = this.tickMap.get(this.currentGameID()) || [];
      const currentIndex = gameStates.findIndex(gs => gs === this.currentTick());

      if (this.currentMode === ModeEnum.PLAY_FORWARD && currentIndex < gameStates.length - 1) {
        this.currentTick.set(gameStates[currentIndex + 1]);
      } else if (this.currentMode === ModeEnum.PLAY_BACKWARD && currentIndex > 0) {
        this.currentTick.set(gameStates[currentIndex - 1]);
      } else if (this.currentMode === ModeEnum.PLAY_FORWARD && currentIndex == gameStates.length - 1) {
        this.currentMode = ModeEnum.LIVE;
      } else {
        this.currentMode = ModeEnum.PAUSE;
      }

    })
  }

  public setMode(mode: ModeEnum): void {
    this.currentMode = mode;

    if (mode == ModeEnum.PAUSE || mode == ModeEnum.LIVE) {
      this.stopTimer();
    } else {
      if (!this.timerSubscription) {
        this.startTimer();
      }
    }
  }

  public stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  setTickByIndex(newTickIndex: number) {
    this.currentTick.set(this.currentGameStates[newTickIndex])
  }
}
