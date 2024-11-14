import { Component , Input,OnInit,Output} from '@angular/core';
import { GameBoxComponent } from '../game-box/game-box.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameInfoService } from '../../_services/game-info.service';
import { GameInfo } from '../../_models/communication/game-info';
@Component({
  selector: 'app-game-container',
  standalone: true,
  imports: [CommonModule,RouterLink,GameBoxComponent],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.css'
})
export class GameContainerComponent implements OnInit{
  @Input() title: string = 'Default Title';
  @Input() borderColor: string = 'black';
  @Input() games: GameInfo[] = [];
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
    //console.log("this is ",this.games)
  }
  

   
}
