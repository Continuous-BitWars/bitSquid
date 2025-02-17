import {Component, effect, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {LeagueListComponent} from '../../league-list/league-list.component';
import {ScoreService} from '../../_services/score.service';
import {Score} from '../../_models/api/score.model';
import {PlayerScoreboardComponent} from '../../player-scoreboard/player-scoreboard.component';


@Component({
  selector: 'app-page-player',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    LeagueListComponent,
    PlayerScoreboardComponent
  ],
  templateUrl: './page-player.component.html',
  styleUrl: './page-player.component.scss'
})
export class PagePlayerComponent implements OnInit, OnDestroy {

  scores: Score[] = [];

  constructor(private scoreService: ScoreService) {
    effect(() => {
      this.scores = this.scoreService.data()
    });
  }

  ngOnInit(): void {
    this.scoreService.toggleTimer(true);
  }

  ngOnDestroy(): void {
    this.scoreService.toggleTimer(false);
  }
}
