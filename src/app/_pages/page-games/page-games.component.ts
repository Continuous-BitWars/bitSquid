import {Component, effect} from '@angular/core';
import {NgForOf} from '@angular/common';
import {GamesListComponent} from '../../games-list/games-list.component';
import {GameInfoService} from '../../_services/game-info.service';
import {GameInfo} from '../../_models/communication/game-info';


@Component({
  selector: 'app-page-games',
  templateUrl: './page-games.component.html',
  styleUrls: ['./page-games.component.scss'],
  imports: [
    NgForOf,
    GamesListComponent
  ],
  standalone: true
})
export class PageGamesComponent {

  games: GameInfo[] = []

  constructor(private gameInfoService: GameInfoService) {
    effect(() => {
      this.games = this.gameInfoService.data()
    });
  }
}
