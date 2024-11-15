import {Component, effect} from '@angular/core';
import {LeagueInfoService} from '../../_services/league-info.service';
import {CommonModule} from '@angular/common';
import {LeagueInfo} from '../../_models/communication/league-info';

@Component({
  selector: 'app-leagues-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leagues-page.component.html',
  styleUrls: ['./leagues-page.component.scss']
})
export class LeaguesPageComponent {

  games: LeagueInfo[] = [];
  selectedLeague: LeagueInfo | null = null; // Store selected league for toggling
  visibilityState: { [key: number]: { players: boolean, maps: boolean } } = {}; // New state for visibility

  constructor(private leagueInfoService: LeagueInfoService) {
    effect(() => {
      this.games = this.leagueInfoService.data();
      //console.log('Games data loaded:', this.games); // Log games data
    });
  }

  gameClick(item: LeagueInfo) {
    this.leagueInfoService.currentGameInfo.set(item);
  }

  // Toggle the "Players" or "Maps" section
  toggleSection(league: LeagueInfo, section: 'players' | 'maps') {
    // Initialize visibility state for league if not already set
    if (!this.visibilityState[league.id]) {
      this.visibilityState[league.id] = {players: false, maps: false};
    }

    // Toggle the visibility of the section
    this.visibilityState[league.id][section] = !this.visibilityState[league.id][section];
  }

  // Check if the section is expanded
  isSectionExpanded(league: LeagueInfo, section: 'players' | 'maps'): boolean {
    return this.visibilityState[league.id]?.[section] ?? false; // Default to false if not set
  }
}
