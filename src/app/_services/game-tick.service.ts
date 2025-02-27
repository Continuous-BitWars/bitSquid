import {computed, effect, Injectable, Signal, signal} from '@angular/core';
import {GameState} from '../_models/game/gameState';
import {GameInfoService} from './game-info.service';
import {interval, Subscription} from 'rxjs';
import axios, {AxiosError, AxiosResponse} from 'axios';

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
  currentGameID: Signal<number>; //Array mit allen spielticks
  // die bisher gepielt worden sind wenn sich gameID ändert soll drauf reagiert werden am besten mit effect
  // überprüfe in tickMap ob Id der index 0 der erste tick ist wenn nicht dann /games/gameID/ticks z.b. /games/1/ticks
  // überprüfe ob id von letztem tick gleich mit anzahl ticks sind dann in tickMap packen
  // axios request mit get
  // url als global constant
  private timerSubscription?: Subscription;

  fetchData(gameID: number) {
    if (gameID == 0) return;
    axios.get(`https://bitdealer.bitwars.de/games/${gameID}/ticks`)
      .then((response: AxiosResponse<GameState[]>) => {
        let data: GameState[] = response.data;
        data.forEach(value => this.addGameStateForGame(gameID, value, false))
      })
      .catch((error: Error | AxiosError) => {
        console.error('Error fetching data:', error);
      });
  }

  get currentGameStates(): GameState[] {
    return this.tickMap.get(this.currentGameID()) || []
  }

  constructor(gameInfoService: GameInfoService) {
    this.currentGameID = computed(() => gameInfoService.currentGameInfo()?.id || 0)
    this.startTimer();
    effect(() => this.fetchData(this.currentGameID()))
    effect(() => {
      if (this.currentTick() == undefined) {
        if (this.tickMap.has(this.currentGameID())) {
          let checkTickMap = this.tickMap.get(this.currentGameID())
          if (checkTickMap != undefined) {
            this.currentTick.set(checkTickMap[0])
          }
        }
      }
    })

  }

  public addGameStateForGame(gameId: number, gameState: GameState, goLive: boolean = true): void {
    let gameStates = this.tickMap.get(gameId) || []

    if (gameStates.some(gs => gs.game.tick == gameState.game.tick)) {
      return;
    }
    gameStates.push(gameState)
    gameStates = gameStates.sort((a, b) => a.game.tick - b.game.tick)
    this.tickMap.set(gameId, gameStates)

    if (gameId == this.currentGameID() && this.currentMode == ModeEnum.LIVE && goLive) {
      this.currentTick.set(gameStates[gameStates.length - 1])
    } else if (gameId == this.currentGameID() && this.currentTick() == undefined || this.currentGameTickIndex() < 0) {
      this.currentTick.set(gameState)
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
    if (mode == ModeEnum.LIVE) {
      this.currentTick.set(this.currentGameStates[this.currentGameStates.length - 1])
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
    this.setMode(ModeEnum.PAUSE)
  }
}
