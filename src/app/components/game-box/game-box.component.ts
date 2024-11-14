import { Component, input , Input} from '@angular/core';
import {IGame} from '../../model/interface/game'
import { GameInfoService } from '../../_services/game-info.service';
import { Game } from '../../_models/game/game';
import { GameInfo } from '../../_models/communication/game-info';




@Component({
  selector: 'app-game-box',
  standalone: true,
  imports: [],
  templateUrl: './game-box.component.html',
  styleUrl: './game-box.component.css'
})
export class GameBoxComponent {
  @Input() game!: GameInfo;
  @Input() ID: number=0;
  @Input() gamesArray: IGame[] = [];

  ngOnInit(): void {
    //alert('Hi');
    this.filterGameType();
  }

  filterGameType(){
    //console.log("IDDDDDDDD" ,this.ID)  
  }
}
