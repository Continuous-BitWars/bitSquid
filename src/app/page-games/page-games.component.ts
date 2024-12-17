import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-page-games',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './page-games.component.html',
  styleUrl: './page-games.component.scss'
})
export class PageGamesComponent {
  games = [
    {id: 1, name: 'Game 1', status: 'live', description: 'This is a live game.'},
    {id: 2, name: 'Game 2', status: 'pending', description: 'This game is coming soon.'},
    {id: 3, name: 'Game 3', status: 'done', description: 'This game is finished.'},
    {id: 4, name: 'Game 4', status: 'live', description: 'This is a live game.'},
    {id: 5, name: 'Game 5', status: 'done', description: 'This game is finished.'},
    {id: 6, name: 'Game 6', status: 'pending', description: 'This game is coming soon.'}
  ];

  currentTab: string = 'live'; // Default tab
}
