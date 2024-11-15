import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ScoreInfoService } from '../../_services/score-info.service';
import { ScoreInfo } from '../../_models/communication/score.info';
import { CommonModule } from '@angular/common';
import { GameInfo } from '../../_models/communication/game-info';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
  imports: [CommonModule,RouterLink,RouterOutlet,RouterLinkActive],
  standalone: true
})
export class PlayerDetailComponent implements OnInit {
  playerData = signal<ScoreInfo | undefined>(undefined);
  leagueData: any[] = []; // Assuming an array of league information
  gamesData: any[] = []; // Assuming an array of league information
  showLeagues = false;
  showGames = false;
  playerId!: string;
  runningGames: GameInfo[] = [];
  oldGames: GameInfo[] = [];
  upcomingGames: GameInfo[] = [];
  constructor(
    private route: ActivatedRoute,
    private scoreInfoService: ScoreInfoService
  ) {}

  toggleLeagues() {
    this.showLeagues = !this.showLeagues;
  }

  toggleGames() {
    this.showGames = !this.showGames;
  }

  ngOnInit() {
    this.playerId = this.route.snapshot.paramMap.get('id')!;
    this.getPlayerData();
    this.getLeagueData();
    this.getGamesData();
  }

  getPlayerData() {
    // Get the computed signal and then set the playerData value by calling the signal to extract the value.
    const playerSignal = this.scoreInfoService.getPlayerData(this.playerId);
    if (playerSignal()) {
      this.playerData.set(playerSignal());
    }
  }

  async getLeagueData() {
    if (this.playerId) {
      this.leagueData = await this.scoreInfoService.fetchLeagueDataByPlayerId(parseInt(this.playerId, 10));
    }
  }

  async getGamesData(){
    if (this.playerId) {
      this.gamesData = await this.scoreInfoService.fetchGamesDataByPlayerId(parseInt(this.playerId, 10));
      this.runningGames = this.gamesData.filter(game => game.status === 'running');
      this.oldGames = this.gamesData.filter(game => game.status === 'done');
      this.upcomingGames = this.gamesData.filter(game => game.status === 'stopped');
    }
  }
}
