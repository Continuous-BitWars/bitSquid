import {Component, Input, numberAttribute, OnDestroy, OnInit} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {PlayerScoreboardComponent} from '../../player-scoreboard/player-scoreboard.component';
import {LeagueService} from '../../_services/league.service';
import {interval, Subscription} from 'rxjs';
import {League} from '../../_models/api/league.model';
import {Player} from '../../_models/game/player';
import {Score} from '../../_models/api/score.model';
import {GamesListComponent} from '../../games-list/games-list.component';
import {GameInfo} from '../../_models/communication/game-info';
import {LeagueDetailsComponent} from '../../league-details/league-details.component';
import {LeagueListComponent} from '../../league-list/league-list.component';
import {MapsListComponent} from '../../maps-list/maps-list.component';

@Component({
  selector: 'app-page-league-details',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    PlayerScoreboardComponent,
    GamesListComponent,
    LeagueDetailsComponent,
    LeagueListComponent,
    JsonPipe,
    MapsListComponent
  ],
  templateUrl: './page-league-details.component.html',
  styleUrl: './page-league-details.component.scss'
})
export class PageLeagueDetailsComponent implements OnInit, OnDestroy {
  @Input({transform: numberAttribute}) leagueId: number = 0;
  league!: League;
  scores: Score[] = [];
  games: GameInfo[] = [];

  pollingSubscription: Subscription | undefined;

  constructor(private leagueService: LeagueService) {
  }

  ngOnInit(): void {
    this.pollingSubscription = interval(1000).subscribe(() => {
      this.fetchData();
    });
    this.fetchData();
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  mergedScoresMissingPlayers(scores: Score[], players: Player[]): Score[] {
    const mergedScores = players.map((player) => {
      const scoreEntry = scores.find((score) => score.player.id === player.id);

      if (scoreEntry) {
        return scoreEntry;
      } else {
        return {
          player: player,
          score: 0,
          wins_by_place: {},
          open_games_count: 0,
        } as Score;
      }
    });

    mergedScores.sort((a, b) => b.score - a.score);

    return mergedScores;
  }

  fetchData(): void {
    this.leagueService.fetchScoreFromLeague(this.leagueId)
      .then(data => {
        this.league = data.league;

        this.scores = this.mergedScoresMissingPlayers(data.scores, data.league.players)
      })
      .catch(error => {
        console.error('Error in fetchData:', error);
      });

    this.leagueService.fetchGamesFromLeague(this.leagueId)
      .then(data => {
        this.games = data;
      })
      .catch(error => {
        console.error('Error in fetchData:', error);
      });
  }

}
