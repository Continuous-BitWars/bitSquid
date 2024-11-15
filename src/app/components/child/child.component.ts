import {Component, computed} from '@angular/core';
import {GameDetailsMobileComponent} from '../../game-details/game-details-mobile/game-details-mobile.component';
import {GameInfo} from '../../_models/communication/game-info';
import {GameState} from '../../_models/game/gameState';
import {GameTickService} from '../../_services/game-tick.service';
import {GameInfoService} from '../../_services/game-info.service';

@Component({
  selector: 'app-child',
  standalone: true,
  templateUrl: './child.component.html',
  imports: [
    GameDetailsMobileComponent
  ],
  styleUrl: './child.component.scss'

})
export class ChildComponent {

  currentGameInfo = computed(() => this.gameInfoService.currentGameInfo() || <GameInfo>{});
  currentTick = computed(() => this.gameTickService.currentTick() || <GameState>{});

  constructor(protected gameTickService: GameTickService, protected gameInfoService: GameInfoService) {
  }
}
