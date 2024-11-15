import {Component, computed, Input, OnInit} from '@angular/core';
import {GameDetailsDesktopComponent} from './game-details-desktop/game-details-desktop.component';
import {VideoControlsComponent} from '../video-controls/video-controls.component';
import {GameDetailsMobileComponent} from './game-details-mobile/game-details-mobile.component';
import {BaseInformationComponent} from '../player-info-card/base-information.component';
import {NgForOf, NgIf} from '@angular/common';
import {GameActionComponent} from '../game-action/game-action.component';
import {GameTickService} from '../_services/game-tick.service';
import {GameInfoService} from '../_services/game-info.service';
import {GameInfo} from '../_models/communication/game-info';
import {GameState} from '../_models/game/gameState';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [
    GameDetailsDesktopComponent,
    VideoControlsComponent,
    GameDetailsMobileComponent,
    BaseInformationComponent,
    NgForOf,
    NgIf,
    GameActionComponent
  ],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss'
})
export class GameDetailsComponent implements OnInit {

  @Input("gameId") gameId = 0;


  currentGameInfo = computed(() => this.gameInfoService.currentGameInfo() || <GameInfo>{});
  currentTick = computed(() => this.gameTickService.currentTick() || <GameState>{});

  constructor(protected gameTickService: GameTickService, protected gameInfoService: GameInfoService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.updateGameId()
    }, 100)
  }

  updateGameId() {
    if (this.gameInfoService.data().length == 0) {
      setTimeout(() => {
        this.updateGameId()
      }, 100)
    } else {
      this.gameInfoService.setGameById(this.gameId)
    }
  }
}
