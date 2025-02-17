import {Routes} from '@angular/router';
import {PageGamesComponent} from './_pages/page-games/page-games.component';
import {PageLeagueComponent} from './_pages/page-league/page-league.component';
import {PageLeagueDetailsComponent} from './_pages/page-league-details/page-league-details.component';
import {PagePlayerComponent} from './_pages/page-player/page-player.component';
import {PageMapsComponent} from './_pages/page-maps/page-maps.component';
import {PagePlayerDetailsComponent} from './_pages/page-player-details/page-player-details.component';
import {PageMapsDetailsComponent} from './_pages/page-maps-details/page-maps-details.component';
import {PageGameDetailsComponent} from './_pages/page-game-details/page-game-details.component';

export const routes: Routes = [
  {path: 'games', component: PageGamesComponent},
  {path: 'games/:gameId', component: PageGameDetailsComponent},
  {path: 'leagues', component: PageLeagueComponent},
  {path: 'leagues/:leagueId', component: PageLeagueDetailsComponent},
  {path: 'players', component: PagePlayerComponent},
  {path: 'players/:playerId', component: PagePlayerDetailsComponent},
  {path: 'maps', component: PageMapsComponent},
  {path: 'maps/:mapsId', component: PageMapsDetailsComponent},
  {path: '**', redirectTo: "/games"}
];
