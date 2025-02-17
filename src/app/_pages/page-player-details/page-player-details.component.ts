import {Component, effect, Input, numberAttribute, OnDestroy, OnInit} from '@angular/core';
import {ScoreService} from '../../_services/score.service';
import {Score} from '../../_models/api/score.model';
import {NgForOf, NgIf} from '@angular/common';
import {LeagueListComponent} from '../../league-list/league-list.component';
import {GamesListComponent} from '../../games-list/games-list.component';
import {League} from '../../_models/api/league.model';
import {GameInfo} from '../../_models/communication/game-info';

@Component({
  selector: 'app-page-player-details',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    LeagueListComponent,
    GamesListComponent
  ],
  templateUrl: './page-player-details.component.html',
  styleUrl: './page-player-details.component.scss'
})
export class PagePlayerDetailsComponent implements OnInit, OnDestroy {
  @Input({transform: numberAttribute}) playerId: number = 0;

  score?: Score
  leagues: League[] = [];
  games: GameInfo[] = [];

  constructor(private scoreService: ScoreService) {
    effect(() => {
      let score = this.scoreService.data().find(value => value.player.id == this.playerId)
      if (score) {
        this.score = score;

        this.scoreService.fetchLeaguesOfPlayer(this.playerId).then(item => {
          this.leagues = item
        })
        this.scoreService.fetchGamesOfPlayer(this.playerId).then(item => {
          this.games = item
        })
      }
    })
  }

  ngOnInit(): void {
    this.scoreService.toggleTimer(true);
  }

  ngOnDestroy(): void {
    this.scoreService.toggleTimer(false);
  }
}
