import {Component, effect} from '@angular/core';
import {LeagueListComponent} from '../../league-list/league-list.component';
import {NgForOf} from '@angular/common';
import {MapsCardComponent} from '../../maps-card/maps-card.component';
import {MapService} from '../../_services/map.service';
import {GameMap} from '../../_models/api/map.model';
import {MapsListComponent} from '../../maps-list/maps-list.component';


@Component({
  selector: 'app-page-maps',
  standalone: true,
  imports: [
    LeagueListComponent,
    NgForOf,
    MapsCardComponent,
    MapsListComponent
  ],
  templateUrl: './page-maps.component.html',
  styleUrl: './page-maps.component.scss'
})
export class PageMapsComponent {
  maps: GameMap[] = [];

  constructor(private mapService: MapService) {
    effect(() => {
      this.maps = this.mapService.data()
    });
  }

}
