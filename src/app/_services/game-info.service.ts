import {Injectable, signal} from "@angular/core";
import {GameInfo} from "../_models/communication/game-info";
import axios from "axios";
import {timer} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class GameInfoService {
  data = signal<GameInfo[]>([]);
  currentGameInfo = signal<GameInfo | undefined>(undefined)
  timer = timer(0, 30000)

  constructor() {
    this.timer.subscribe(_ => {
      this.fetchData();
    })
  }


  fetchData() {
    console.log("fetch data game info")
    axios.get('https://bitdealer.bitwars.online/games')
      .then(response => {
        this.data.set(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}


