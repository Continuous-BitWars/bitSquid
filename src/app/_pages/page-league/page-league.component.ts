import {Component, effect} from '@angular/core';
import {DatePipe, NgFor, NgIf, TitleCasePipe} from '@angular/common';
import {GamesListComponent} from '../../games-list/games-list.component';
import {LeagueListComponent} from '../../league-list/league-list.component';
import {League} from '../../_models/api/league.model';
import {LeagueService} from '../../_services/league.service';

@Component({
  selector: 'app-page-league',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, TitleCasePipe, GamesListComponent, LeagueListComponent],
  templateUrl: './page-league.component.html',
  styleUrl: './page-league.component.scss'
})

export class PageLeagueComponent {
  // display all league infos use name and use icons:value add background header of league if stopped header red if running header green

  leagues: League[] = [];

  constructor(private leagueService: LeagueService) {
    effect(() => {
      this.leagues = this.leagueService.data()
    });
  }
}
