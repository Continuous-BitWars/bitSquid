import {Injectable, signal} from "@angular/core";
import axios from "axios";
import {timer} from "rxjs"
import {PlayerInfo} from "../_models/communication/player-info";


@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {
  data = signal<PlayerInfo[]>([]);
  currentGameInfo = signal<PlayerInfo | undefined>(undefined)
  timer = timer(0, 30000)

  constructor() {
    this.timer.subscribe(_ => {
      this.fetchData();
    })
  }


  fetchData() {
    axios.get('https://bitdealer.bitwars.de/players')
      .then(response => {
        this.data.set(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}


