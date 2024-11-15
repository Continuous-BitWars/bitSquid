import { computed, Injectable, signal } from '@angular/core';
import axios from 'axios';
import { timer } from 'rxjs';
import { ScoreInfo } from '../_models/communication/score.info';
import { URL } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ScoreInfoService {
  data = signal<ScoreInfo[]>([]);
  currentGameInfo = signal<ScoreInfo | undefined>(undefined);
  timer = timer(0, 30000);

  constructor() {
    this.timer.subscribe(() => {
      this.fetchData();
    });
  }

  fetchData() {
    axios
      .get(`${URL}/scoreboard`)
      .then((response) => {
        // Assuming response.data.scores is an array of ScoreInfo
        this.data.set(response.data.scores);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  // Computed signal to get player data based on player ID.
  getPlayerData(playerId: string) {
    return computed(() => this.data().find((score) => score.player.id.toString() === playerId));
  }

  async fetchLeagueDataByPlayerId(playerId: number) {
    try {
      const response = await axios.get(`${URL}/players/${playerId}/leagues`);
      return response.data; // Assuming response.data contains league information
    } catch (error) {
      console.error('Error fetching league data:', error);
      return [];
    }
  }

  async fetchGamesDataByPlayerId(playerId: number) {
    try {
      const response = await axios.get(`${URL}/players/${playerId}/games`);
      return response.data; // Assuming response.data contains league information
    } catch (error) {
      console.error('Error fetching league data:', error);
      return [];
    }
  }
}
