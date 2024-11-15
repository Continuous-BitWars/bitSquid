import {Injectable, signal} from "@angular/core";
import axios from "axios";
import {timer} from "rxjs"
import { MapInfo } from "../_models/communication/map-info";

@Injectable({
  providedIn: 'root'
})
export class MapInfoService {
  data = signal<MapInfo[]>([]);
  currentGameInfo = signal<MapInfo | undefined>(undefined)
  timer = timer(0, 30000)

  constructor() {
    this.timer.subscribe(_ => {
      this.fetchData();
    })
  }


  fetchData() {
    axios.get(`${URL}/maps`)
      .then(response => {
        this.data.set(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}


