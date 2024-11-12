import { Component, effect } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { GameContainerComponent } from '../../components/game-container/game-container.component';
import { GameBoxComponent } from '../../components/game-box/game-box.component';
import { gamesArray } from '../../model/game-data';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { GameInfo } from '../../_models/communication/game-info';
import { GameInfoService } from '../../_services/game-info.service';

@Component({
  selector: 'app-games-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavBarComponent, GameContainerComponent, GameBoxComponent],
  templateUrl: './games-page.component.html',
  styleUrl: './games-page.component.scss'
})
export class GamesPageComponent {
  /*
  games: GameInfo[] = [];

  constructor(private gameInfoService: GameInfoService) {
    // Use effect here to initialize games list and log it to the console
    effect(() => {
      this.games = this.gameInfoService.data();
      console.log('Games data loaded:', this.games); // Log games data
    });
  }

  gameClick(item: GameInfo) {
    this.gameInfoService.currentGameInfo.set(item);
  }

*/



  runningGames = gamesArray.filter(game => game.status === 'running');
  oldGames = gamesArray.filter(game => game.status === 'pending');
  upcomingGames = gamesArray.filter(game => game.status === 'stopped');  
}
