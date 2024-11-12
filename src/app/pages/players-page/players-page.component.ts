import { Component,effect } from '@angular/core';
import { PlayerInfo } from '../../_models/communication/player-info';
import { PlayerInfoService } from '../../_services/player-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-players-page',
  standalone: true,
  imports: [CommonModule],
  providers: [PlayerInfoService],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.scss'
})
export class PlayersPageComponent {



  games: PlayerInfo[] = [];

  constructor(private playerInfoService: PlayerInfoService) {
    // Use effect to initialize games list and log it
    effect(() => {
      this.games = this.playerInfoService.data();
      console.log('Games data loaded:', this.games); // Log games data
    });
  }

  gameClick(item: PlayerInfo) {
    this.playerInfoService.currentGameInfo.set(item);
  }
}
