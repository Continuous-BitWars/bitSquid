import {Injectable, signal} from "@angular/core";
import axios from "axios";
import {timer} from "rxjs"
import { ScoreInfo } from "../_models/communication/score.info";




export class ScoreInfoService {
  data = signal<ScoreInfo[]>([]);
  currentGameInfo = signal<ScoreInfo | undefined>(undefined);
  timer = timer(0, 30000);

  constructor() {
    this.timer.subscribe(_ => {
      this.fetchData();
    });
  }

  fetchData() {
    axios.get('https://bitdealer.bitwars.online/scoreboard')
      .then(response => {
        // Assuming response.data.scores is an array of ScoreInfo
        this.data.set(response.data.scores);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}