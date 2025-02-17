import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {GameInfo} from '../_models/communication/game-info';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent {
  @Input() status: string = 'live'; // Default status
  @Input() games: GameInfo[] = [];

  filteredGames: GameInfo[] = []; // Holds games filtered by status

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
