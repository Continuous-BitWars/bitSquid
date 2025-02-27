import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {VideoControlsComponent} from './video-controls/video-controls.component';
import {WebsocketService} from './_services/websocket.service';
import {BaseInformationComponent} from './player-info-card/base-information.component';
import {GameTickService} from './_services/game-tick.service';
import {NgFor, NgIf} from '@angular/common';
import {GameInfoService} from './_services/game-info.service';
import {Player} from './_models/game/player';
import {BaseLevel} from './_models/game/baseLevel';
import {GameActionComponent} from './game-action/game-action.component';
import {Base} from './_models/game/base';
import {LiveViewerComponent} from './live-viewer/live-viewer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PageGamesComponent} from './_pages/page-games/page-games.component';
import {PageLeagueComponent} from './_pages/page-league/page-league.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, VideoControlsComponent, BaseInformationComponent, NgFor, GameActionComponent, NgIf, LiveViewerComponent, NavbarComponent, PageGamesComponent, PageLeagueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BitSquid';

  constructor(websocketService: WebsocketService, public gameTickService: GameTickService, public gameInfoService: GameInfoService) {
  }


  getPlayerByID(playerID: number): Player {
    let players = this.gameInfoService.currentGameInfo()?.players
    if (players != undefined) {
      let player = players.find(value => value.id == playerID)
      if (player != undefined) {
        return player
      }
    }
    return {color: "#FFFFFF", id: 0, name: ""}
  }

  getBaseLevelByLevel(level: number): BaseLevel {
    let levels = this.gameTickService.currentTick()?.config.baseLevels
    if (levels != undefined && level > 0 && level < levels.length) {
      return levels[level - 1]
    }
    return {maxPopulation: 0, spawnRate: 0, upgradeCost: 0}
  }


  getBaseByID(baseID: number): Base {
    let bases = this.gameTickService.currentTick()?.bases
    if (bases != undefined) {
      let base = bases.find(value => value.uid == baseID)
      if (base != undefined) {
        return base
      }
    }
    return {level: 0, player: 0, population: 0, position: {x: 0, y: 0, z: 0}, uid: 0, unitsUntilUpgrade: 0, name: ""}
  }


  getPlayerFromBaseByID(baseID: number): Player {
    let base = this.getBaseByID(baseID)
    return this.getPlayerByID(base.player);
  }
}
