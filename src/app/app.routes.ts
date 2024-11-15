import {Routes} from '@angular/router';
import {GamesPageComponent} from './pages/games-page/games-page.component';
import {LeaguesPageComponent} from './pages/leagues-page/leagues-page.component';
import {PlayersPageComponent} from './pages/players-page/players-page.component';
import {MapsPageComponent} from './pages/maps-page/maps-page.component';
import {PlayerDetailComponent} from './components/player-detail/player-detail.component';
import {GameDetailsComponent} from './game-details/game-details.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full'
  },
  {
    path: 'games',
    component: GamesPageComponent
  },
  {
    path: 'games/:gameId',
    component: GameDetailsComponent
  },
  {
    path: 'leagues',
    component: LeaguesPageComponent
  },
  {
    path: 'players',
    component: PlayersPageComponent
  },
  {
    path: 'players/:id/player',
    component: PlayerDetailComponent
  },
  {
    path: 'maps',
    component: MapsPageComponent
  }
];
