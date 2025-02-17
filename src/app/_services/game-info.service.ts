import {Injectable, signal} from "@angular/core";
import {GameInfo} from "../_models/communication/game-info";
import axios from "axios";
import {timer} from "rxjs"
import {API_URL, timerInterval} from '../config';

@Injectable({
  providedIn: 'root'
})
export class GameInfoService {
  data = signal<GameInfo[]>([]);
  currentGameInfo = signal<GameInfo | undefined>(undefined)
  timer = timer(0, timerInterval)

  constructor() {
    this.timer.subscribe(_ => {
      this.fetchData();
    })
  }


  fetchData() {
    axios.get(`${API_URL}/games`)
      .then(response => {
        this.data.set(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}


