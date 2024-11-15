import { Routes } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { Game2Component } from './components/game/game.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { LeaguesPageComponent } from './pages/leagues-page/leagues-page.component';
import { PlayersPageComponent } from './pages/players-page/players-page.component';
import { MapsPageComponent } from './pages/maps-page/maps-page.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
//import { EmployeeComponent } from './components/employee/employee.component';
//import { ClientComponent } from './components/client/client.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'master',
        pathMatch:'full'
    },
    {
        path:'master',
        component:MasterComponent
    },
    {
        path:'games',
        component:GamesPageComponent
    },
    {
        path:'game',
        component:Game2Component
    },
    {
        path:'leagues',
        component:LeaguesPageComponent
    },
    {
        path:'players',
        component:PlayersPageComponent
    },
    {
        path:'players/:id/player',
        component:PlayerDetailComponent
    },
    {
        path:'maps',
        component:MapsPageComponent
    }
];
