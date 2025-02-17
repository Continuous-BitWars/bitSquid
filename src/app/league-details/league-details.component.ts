import {Component, Input} from '@angular/core';
import {League} from '../_models/api/league.model';
import {NgForOf, TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-league-details',
  standalone: true,
  imports: [
    NgForOf,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './league-details.component.html',
  styleUrl: './league-details.component.scss'
})
export class LeagueDetailsComponent {

  @Input() league!: League;

}
