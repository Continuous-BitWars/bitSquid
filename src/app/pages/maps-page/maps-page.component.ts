import { CommonModule } from '@angular/common';
import { Component , effect} from '@angular/core';
import { MapInfoService } from '../../_services/map-info.service';
import { MapInfo } from '../../_models/communication/map-info';

@Component({
  selector: 'app-maps-page',
  standalone: true,
  imports: [CommonModule],
  providers: [MapInfoService],
  templateUrl: './maps-page.component.html',
  styleUrl: './maps-page.component.scss'
})
export class MapsPageComponent {

  games: MapInfo[] = [];
  

  constructor(private leagueInfoService: MapInfoService) {
    // Use effect to initialize games list and log it
    effect(() => {
      this.games = this.leagueInfoService.data();
      console.log('Games data loaded:', this.games); // Log games data
    });
  }

  gameClick(item: MapInfo) {
    this.leagueInfoService.currentGameInfo.set(item);
  }



}
