import {Component, Input} from '@angular/core';
import {IGame} from '../../model/interface/game'
import {GameInfo} from '../../_models/communication/game-info';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-game-box',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './game-box.component.html',
  styleUrl: './game-box.component.css'
})
export class GameBoxComponent {
  @Input() game!: GameInfo;
  @Input() ID: number = 0;
  @Input() gamesArray: IGame[] = [];


  protected readonly name = name;
  protected readonly length = length;
}
