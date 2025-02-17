import {Injectable, signal} from '@angular/core';
import axios from 'axios';
import {Subscription, timer} from 'rxjs';
import {Score} from '../_models/api/score.model';
import {API_URL, timerInterval} from '../config';
import {League} from '../_models/api/league.model';
import {GameInfo} from '../_models/communication/game-info';


@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  data = signal<Score[]>([]);
  timer = timer(0, timerInterval);
  timerSubscription: Subscription | null = null;
  timerEnabled = false;

  constructor() {
    this.toggleTimer(false);
    this.fetchData()
  }

  toggleTimer(enabled: boolean) {
    if (enabled && !this.timerEnabled) {
      // Timer aktivieren
      this.timerSubscription = this.timer.subscribe(() => {
        this.fetchData();
      });
      this.timerEnabled = true;
    } else if (!enabled && this.timerEnabled) {
      // Timer aktivieren
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
        this.timerSubscription = null;
      }
      this.timerEnabled = false;
    }
  }

  fetchData() {
    axios
      .get(`${API_URL}/scoreboard`)
      .then((response) => {
        this.data.set(response.data.scores);
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });
  }

  fetchLeaguesOfPlayer(playerId: number): Promise<League[]> {
    return axios.get(`${API_URL}/players/${playerId}/leagues`)
      .then((response) => {
        return response.data as League[]
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
        throw error
      });
  }

  fetchGamesOfPlayer(playerId: number): Promise<GameInfo[]> {
    return axios.get(`${API_URL}/players/${playerId}/games`)
      .then((response) => {
        return response.data as GameInfo[]
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
        throw error
      });
  }
}
