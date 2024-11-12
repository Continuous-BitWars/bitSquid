import {Component, Input} from '@angular/core';
import {BoardAction} from '../_models/game/boardActions';
import {NgIf, NgStyle} from '@angular/common';
import {Base} from '../_models/game/base';
import {Player} from '../_models/game/player';

@Component({
  selector: 'app-game-action',
  standalone: true,
  imports: [
    NgIf,
    NgStyle
  ],
  templateUrl: './game-action.component.html',
  styleUrl: './game-action.component.scss'
})
export class GameActionComponent {
  @Input() action?: BoardAction;
  @Input() baseSrc?: Base
  @Input() baseDest?: Base
  @Input() playerSrc?: Player
  @Input() playerDest?: Player
  @Input() player?: Player

  get attackPercentage() {
    return this.action && this.action.progress
      ? (this.action.progress.traveled / this.action.progress.distance) * 100
      : 0;
  }

  get attackProgressText() {
    return this.action && this.action.progress
      ? `${this.action.progress.traveled}/${this.action.progress.distance}`
      : '0/0';
  }
}
