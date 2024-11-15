// player-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScoreInfo } from '../_models/communication/score.info';

@Injectable({
  providedIn: 'root',
})
export class PlayerDataService {
  private playerDataSubject = new BehaviorSubject<ScoreInfo | null>(null);
  playerData$ = this.playerDataSubject.asObservable();

  setPlayerData(data: ScoreInfo) {
    this.playerDataSubject.next(data);
  }
}