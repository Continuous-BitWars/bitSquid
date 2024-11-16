import {Injectable, signal} from "@angular/core";
import axios from "axios";
import {timer} from "rxjs"
import { LeagueInfo } from "../_models/communication/league-info";
import { LeagueScoreInfo } from "../_models/communication/league-score-info";

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


    async fetchLeagueDataByLeagueId(leagueId: number): Promise<LeagueScoreInfo> {
      try {
        const response = await axios.get(`https://bitdealer.bitwars.de/leagues/${leagueId}/scoreboard`);
        console.log("Raw API Response:", response.data);
        return response.data; // Adjust this if your API returns a different structure
      } catch (error) {
        console.error("Error fetching league data:", error);
        throw error;
      }
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

    
    
  


  
  }
  