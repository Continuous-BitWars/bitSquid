import {Component, Input} from '@angular/core';
import {GameActionComponent} from '../../game-action/game-action.component';
import {NgForOf, NgIf} from '@angular/common';
import {Player} from '../../_models/game/player';
import {BaseLevel} from '../../_models/game/baseLevel';
import {Base} from '../../_models/game/base';
import {GameInfo} from '../../_models/communication/game-info';
import {GameState} from '../../_models/game/gameState';
import {BaseInformationComponent} from '../../player-info-card/base-information.component';

@Component({
  selector: 'app-game-details-mobile',
  standalone: true,
  imports: [
    GameActionComponent,
    NgForOf,
    NgIf,
    BaseInformationComponent
  ],
  templateUrl: './game-details-mobile.component.html',
  styleUrl: './game-details-mobile.component.scss'
})
export class GameDetailsMobileComponent {
  @Input() gameInfo!: GameInfo
  @Input() gameState!: GameState

  getPlayerByID(playerID: number): Player {
    let players = this.gameInfo.players
    if (players != undefined) {
      let player = players.find(value => value.id == playerID)
      if (player != undefined) {
        return player
      }
    }
    return {color: "#FFFFFF", id: 0, name: ""}
  }

  getBaseLevelByLevel(level: number): BaseLevel {
    let levels = this.gameState.config.baseLevels
    if (levels != undefined && level > 0 && level < levels.length) {
      return levels[level - 1]
    }
    return {maxPopulation: 0, spawnRate: 0, upgradeCost: 0}
  }


  getBaseByID(baseID: number): Base {
    let bases = this.gameState.bases
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
