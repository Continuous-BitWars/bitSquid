import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-page-games',
  templateUrl: './page-games.component.html',
  styleUrls: ['./page-games.component.scss'],
  imports: [
    NgForOf
  ],
  standalone: true
})
export class PageGamesComponent implements OnInit {
  status: string = 'live'; // Default status
  games: any[] = [
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 1, status: 'live', players: 10, map: 'Arena', time: '10:00 AM'},
    {id: 2, status: 'pending', players: 5, map: 'Jungle', time: '12:00 PM'},
    {id: 3, status: 'done', players: 8, map: 'Desert', time: '2:00 PM'}
  ];

  filteredGames: any[] = []; // Holds games filtered by status

  ngOnInit(): void {
    this.filterGames();
  }

  selectStatus(status: string) {
    this.status = status;
    this.filterGames();
  }

  filterGames() {
    this.filteredGames = this.games.filter(game => game.status === this.status);
  }
}
