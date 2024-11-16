import {Injectable, signal} from "@angular/core";
import axios from "axios";
import {timer} from "rxjs"
import { LeagueInfo } from "../_models/communication/league-info";
import { LeagueScoreInfo } from "../_models/communication/league-score-info";

@Injectable({
  providedIn: 'root'
})

export class LeagueScoeboardService {
  async fetchLeagueDataByLeagueId(leagueId: number): Promise<LeagueScoreInfo> {
    try {
      const response = await axios.get(`https://bitdealer.bitwars.de/leagues/${leagueId}/scoreboard`);
      console.log('Raw API Response:', response.data);
      return response.data; // Adjust this if your API returns a different structure
    } catch (error) {
      console.error('Error fetching league data:', error);
      throw error;
    }
  }
}