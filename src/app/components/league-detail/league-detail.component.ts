import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaguePlayerInfoService } from '../../_services/league-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss'],
  standalone: true,
  imports:[CommonModule]
})
export class LeagueDetailComponent implements OnInit {
  leagueData: any; // Holds the fetched league data
  leagueId!: string;

  constructor(
    private route: ActivatedRoute,
    private leagueInfoService: LeaguePlayerInfoService
  ) {}

  async getLeagueData() {
    if (this.leagueId) {
      try {
        // Fetch data based on leagueId
        this.leagueData = await this.leagueInfoService.fetchLeagueDataByPlayerId(parseInt(this.leagueId, 10));
        console.log('Fetched League Data:', this.leagueData);
      } catch (error) {
        console.error('Error fetching league data:', error);
      }
    } else {
      console.error('League ID is undefined or invalid');
    }
  }

  ngOnInit() {
    // Extract leagueId from the route
    this.leagueId = this.route.snapshot.paramMap.get('id')!;
    if (this.leagueId) {
      this.getLeagueData();
    } else {
      console.error('No league ID found in route params.');
    }
  }

  getKeys(obj: object): string[] {
    return Object.keys(obj);
  }
}




/*  <!-- Maps -->
      <h3>Maps</h3>
      <ul class="map-list">
        <li *ngFor="let map of leagueData.league.maps">
          {{ map.name }} (Max Players: {{ map.max_player_count }})
        </li>
      </ul>
      
      
      
      
      
      
      <!-- Players -->
      <h3>Players</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Provider URL</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let player of leagueData.league.players">
            <td>{{ player.name }}</td>
            <td>
              <span class="color-box" [style.background]="player.color"></span>
              {{ player.color }}
            </td>
            <td>
              <a [href]="player.provider_url" target="_blank" class="player-url">{{ player.provider_url }}</a>
            </td>
          </tr>
        </tbody>
      </table>

      */