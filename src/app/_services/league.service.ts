import {Injectable, signal} from '@angular/core';
import {API_URL, timerInterval} from '../config';
import axios from "axios";
import {timer} from "rxjs"
import {League} from '../_models/api/league.model';
import {LeagueData} from '../_models/api/score.model';
import {GameInfo} from '../_models/communication/game-info';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  data = signal<League[]>([]);
  timer = timer(0, timerInterval)

  constructor() {
    this.timer.subscribe(_ => {
      this.fetchData();
    })
  }


  fetchData() {
    axios.get(`${API_URL}/leagues`)
      .then(response => {
        this.data.set(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  fetchScoreFromLeague(id: number): Promise<LeagueData> {
    return axios.get(`${API_URL}/leagues/${id}/scoreboard`)
      .then(response => response.data as LeagueData)
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
      });
  }

  fetchGamesFromLeague(id: number): Promise<GameInfo[]> {
    return axios.get(`${API_URL}/leagues/${id}/games`)
      .then(response => response.data as GameInfo[])
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
      });
  }


}
