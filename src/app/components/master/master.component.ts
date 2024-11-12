import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { GameContainerComponent } from '../game-container/game-container.component';
import { GameBoxComponent } from '../game-box/game-box.component';
import { gamesArray } from '../../model/game-data';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavBarComponent, GameContainerComponent, GameBoxComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {
 
  runningGames = gamesArray.filter(game => game.status === 'running');
  oldGames = gamesArray.filter(game => game.status === 'pending');
  upcomingGames = gamesArray.filter(game => game.status === 'stopped');
}
