import {Component, Input} from '@angular/core';
import {Base} from '../_models/game/base';
import {Player} from '../_models/game/player';
import {NgIf, NgStyle} from '@angular/common';
import {BaseLevel} from '../_models/game/baseLevel';

@Component({
  selector: 'app-base-information',
  standalone: true,
  imports: [
    NgIf,
    NgStyle
  ],
  templateUrl: './base-Information.component.html',
  styleUrl: './base-information.component.scss'
})
export class BaseInformationComponent {

  @Input() base?: Base
  @Input() player?: Player
  @Input() baseLevel?: BaseLevel
}
