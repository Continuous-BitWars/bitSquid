import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScoreInfoService } from '../../_services/score-info.service';
import { ScoreInfo } from '../../_models/communication/score.info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class PlayerDetailComponent implements OnInit {
  playerData = signal<ScoreInfo | undefined>(undefined);
  leagueData: any[] = []; // Assuming an array of league information
  playerId!: string;

  constructor(
    private route: ActivatedRoute,
    private scoreInfoService: ScoreInfoService
  ) {}

  ngOnInit() {
    this.playerId = this.route.snapshot.paramMap.get('id')!;
    this.getPlayerData();
    this.getLeagueData();
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
}
