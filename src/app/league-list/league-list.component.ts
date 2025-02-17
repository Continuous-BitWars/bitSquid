import {Component, Input} from '@angular/core';
import {DatePipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {League} from '../_models/api/league.model';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-league-list',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './league-list.component.html',
  styleUrl: './league-list.component.scss'
})
export class LeagueListComponent {

  @Input() leagues: League[] = [];
}
