import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueScoeboardService } from '../../_services/league-scoreboard.service';
import { LeagueScoreInfo } from '../../_models/communication/league-score-info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-league-detail',
  standalone: true,
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss'],
  imports: [CommonModule],
})
export class LeagueDetailComponent implements OnInit {
  leagueData = signal<LeagueScoreInfo | undefined>(undefined); // Changed from LeagueScoreInfo[] to LeagueScoreInfo | undefined
  leagueId!: number;
  objectKeys = Object.keys; // Helper to iterate over object keys in the template

  constructor(
    private leagueInfoService: LeagueScoeboardService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    // Retrieve the leagueId from the route parameters
    const idParam = this.route.snapshot.paramMap.get('leagueId');
    if (idParam) {
      this.leagueId = +idParam;
      console.log('Retrieved leagueId:', this.leagueId);

      try {
        // Fetch league data by ID
        const data = await this.leagueInfoService.fetchLeagueDataByLeagueId(this.leagueId);
        // Update the component's state with the fetched data
        this.leagueData.set(data);
        console.log('League data loaded in detail:', data);
      } catch (error) {
        console.error('Error loading league data:', error);
      }
    } else {
      console.error('No leagueId found in route parameters.');
    }
  }

  // Helper method to get object keys
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}


/*<h2>Maps</h2>
    <table class="league-table">
      <thead>
        <tr>
          <th>Map ID</th>
          <th>Name</th>
          <th>Max Player Count</th>
          <th>Provider URL</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let map of data.league.maps">
          <td>{{ map.id }}</td>
          <td>{{ map.name }}</td>
          <td>{{ map.max_player_count }}</td>
          <td><a [href]="map.provider_url" target="_blank">{{ map.provider_url }}</a></td>
        </tr>
      </tbody>
    </table>
  </div> */