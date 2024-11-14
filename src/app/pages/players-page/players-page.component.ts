import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreInfoService } from '../../_services/score-info.service';
import { LeaguePlayerInfoService } from '../../_services/league-info.service';
import { ScoreInfo } from '../../_models/communication/score.info';
import { LeagueInfo } from '../../_models/communication/league-info';

@Component({
  selector: 'app-players-page',
  standalone: true,
  imports: [CommonModule],
  providers: [ScoreInfoService, LeaguePlayerInfoService],
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss'],
})
export class PlayersPageComponent {
  scoreboard: ScoreInfo[] = [];
  public leagueDataMap: Map<number, LeagueInfo> = new Map();

  constructor(
    private scoreInfoService: ScoreInfoService,
    private leaguePlayerInfoService: LeaguePlayerInfoService
  ) {
    effect(() => {
      this.scoreboard = this.scoreInfoService.data();
      console.log('Scoreboard data:', this.scoreboard);
      this.fetchAllLeagueData();
    });
  }

  async fetchAllLeagueData() {
    const playerIds = this.scoreboard.map((score) => score.player.id);
    try {
      const leagueDataArray = await Promise.all(
        playerIds.map((id) => this.leaguePlayerInfoService.fetchData(id))
      );
      playerIds.forEach((id, index) => {
        this.leagueDataMap.set(id, leagueDataArray[index]);
      });
      console.log('League data map:', this.leagueDataMap);
    } catch (error) {
      console.error('Error fetching league data:', error);
    }
  }

  gameClick(item: ScoreInfo) {
    this.scoreInfoService.currentGameInfo.set(item);
  }
}
