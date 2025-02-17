import {Component, effect, Input, numberAttribute} from '@angular/core';
import {MapsCardComponent} from '../../maps-card/maps-card.component';
import {LiveViewerComponent} from '../../live-viewer/live-viewer.component';
import {GameInfoService} from '../../_services/game-info.service';
import {GameTickService} from '../../_services/game-tick.service';

@Component({
  selector: 'app-page-game-details',
  standalone: true,
  imports: [
    MapsCardComponent,
    LiveViewerComponent
  ],
  templateUrl: './page-game-details.component.html',
  styleUrl: './page-game-details.component.scss'
})
export class PageGameDetailsComponent {

  @Input({transform: numberAttribute}) gameId: number = 0;


  constructor(private gameInfoService: GameInfoService, private gameTickService: GameTickService) {
    effect(() => {
      let gameInfo = this.gameInfoService.data().find(value => value.id === this.gameId);
      if (gameInfo && this.gameInfoService.currentGameInfo()?.id !== this.gameId) {
        this.gameInfoService.currentGameInfo.set(gameInfo);
        this.gameTickService.setTickByIndex(0)
      }
    }, {allowSignalWrites: true});
  }
}
