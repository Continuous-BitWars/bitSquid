import {Injectable, signal} from "@angular/core";
import axios from "axios";
import {timer} from "rxjs"
import { LeagueInfo } from "../_models/communication/league-info";



export class LeagueInfoService {
    data = signal<LeagueInfo[]>([]);
    currentGameInfo = signal<LeagueInfo | undefined>(undefined)
    timer = timer(0, 30000)
  
    constructor() {
      this.timer.subscribe(_ => {
        this.fetchData();
      })
    }
  
  
    fetchData() {
      axios.get('https://bitdealer.bitwars.online/leagues')
        .then(response => {
          this.data.set(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }
  
  
  