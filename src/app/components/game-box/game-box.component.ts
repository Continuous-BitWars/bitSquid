import {Component, Input} from '@angular/core';
import {IGame} from '../../model/interface/game'

import {GameInfo} from '../../_models/communication/game-info';


@Component({
  selector: 'app-game-box',
  standalone: true,
  imports: [],
  templateUrl: './game-box.component.html',
  styleUrl: './game-box.component.css'
})
export class GameBoxComponent {
  @Input() game!: GameInfo;
  @Input() ID: number = 0;
  @Input() gamesArray: IGame[] = [];


}
