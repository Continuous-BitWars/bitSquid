import {Injectable, signal} from "@angular/core";
import axios from "axios";
import {timer} from "rxjs"
import { LeagueInfo } from "../_models/communication/league-info";

@Injectable({
  providedIn: 'root'
})

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
      axios.get('https://bitdealer.bitwars.de/leagues')
        .then(response => {
          this.data.set(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }



  

  
  @Injectable({
    providedIn: 'root',
  })
  export class LeaguePlayerInfoService {
    async fetchData(playerId: number): Promise<LeagueInfo[]> {
      const url = `https://bitdealer.bitwars.de/players/${playerId}/leagues`;
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }


    async fetchLeagueDataByPlayerId(leagueId: number) {
      try {
        const response = await axios.get(`https://bitdealer.bitwars.de/leagues/${leagueId}`);
        console.log("Raw API Response:", response);
        return response.data; // Ensure this is what you expect
      } catch (error) {
        console.error("Error fetching league data:", error);
        throw error;
      }
    }
  }
  