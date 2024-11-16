// leagues-page.component.ts
import { Component, effect } from '@angular/core';
import { LeagueInfoService } from '../../_services/league-info.service';
import { CommonModule } from '@angular/common';
import { LeagueInfo } from '../../_models/communication/league-info';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-leagues-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './leagues-page.component.html',
  styleUrls: ['./leagues-page.component.scss'],
})
export class LeaguesPageComponent {
  games: LeagueInfo[] = [];
  visibilityState: { [key: number]: { players: boolean; maps: boolean } } = {}; // New state for visibility

  constructor(private leagueInfoService: LeagueInfoService, private router: Router) {
    effect(() => {
      this.games = this.leagueInfoService.data();
      console.log('Games data loaded:', this.games); // Log games data
    });
  }

  onLeagueRowClick(leagueId: number) { // Renamed for clarity
    this.router.navigate(['/leagues', leagueId, 'scoreboard']); // Removed leading slash before 'scoreboard'
  }

  // Toggle the "Players" or "Maps" section
  toggleSection(league: LeagueInfo, section: 'players' | 'maps') {
    // Initialize visibility state for league if not already set
    if (!this.visibilityState[league.id]) {
      this.visibilityState[league.id] = { players: false, maps: false };
    }

    // Toggle the visibility of the section
    this.visibilityState[league.id][section] = !this.visibilityState[league.id][section];
  }

  // Check if the section is expanded
  isSectionExpanded(league: LeagueInfo, section: 'players' | 'maps'): boolean {
    return this.visibilityState[league.id]?.[section] ?? false; // Default to false if not set
  }
}
