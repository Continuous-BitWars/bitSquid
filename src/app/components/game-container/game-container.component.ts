import { Component , Input,Output} from '@angular/core';
import {IGame} from '../../model/interface/game'
import { GameBoxComponent } from '../game-box/game-box.component';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-game-container',
  standalone: true,
  imports: [CommonModule,RouterLink,GameBoxComponent],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.css'
})
export class GameContainerComponent {
  @Input() title: string = 'Default Title';
  @Input() borderColor: string = 'black';
  @Input() gamesArray: IGame[] = [];
  //s@Output() startGame = new EventEmitter<IGame>(); 

  showGames = true;

  //constructor(private router: Router) {} 

  toggleGames() {
    this.showGames = !this.showGames;
  }

  ngOnInit(): void {
    //alert('Hi');
    this.filterGameType();
  }

  filterGameType(){
    console.log("this is ",this.gamesArray[0].status)
  }
  

  
}
