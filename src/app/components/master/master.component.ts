import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { GameContainerComponent } from '../game-container/game-container.component';
import { GameBoxComponent } from '../game-box/game-box.component';
import { gamesArray } from '../../model/game-data';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { GamesPageComponent } from '../../pages/games-page/games-page.component';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavBarComponent, GameContainerComponent, GameBoxComponent,GamesPageComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {
 
 
}
