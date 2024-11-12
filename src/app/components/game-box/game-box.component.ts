import { Component, input , Input} from '@angular/core';
import {IGame} from '../../model/interface/game'

@Component({
  selector: 'app-game-box',
  standalone: true,
  imports: [],
  templateUrl: './game-box.component.html',
  styleUrl: './game-box.component.css'
})
export class GameBoxComponent {
  @Input() game!: IGame;
  @Input() ID: number=0;
  @Input() gamesArray: IGame[] = [];

  ngOnInit(): void {
    //alert('Hi');
    this.filterGameType();
  }

  filterGameType(){
    console.log(this.ID)
    console.log(this.game.id)
  }
}
