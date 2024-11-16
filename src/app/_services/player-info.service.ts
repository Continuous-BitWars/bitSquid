import {Injectable, signal} from "@angular/core";
import axios from "axios";
import {timer} from "rxjs"
import { PlayerInfo } from "../_models/communication/player-info";
import { URL } from "../config";


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
      axios.get(`${URL}/players`)
        .then(response => {
          this.data.set(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }


