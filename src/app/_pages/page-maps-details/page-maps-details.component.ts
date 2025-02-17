import {Component, effect, Input, numberAttribute, OnInit} from '@angular/core';
import {GameMap, GameMapJson} from '../../_models/api/map.model';
import {MapService} from '../../_services/map.service';
import {JsonPipe, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {parseJson} from '@angular/cli/src/utilities/json-file';

@Component({
  selector: 'app-page-maps-details',
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink,
    NgIf
  ],
  templateUrl: './page-maps-details.component.html',
  styleUrl: './page-maps-details.component.scss'
})
export class PageMapsDetailsComponent implements OnInit {
  @Input({transform: numberAttribute}) mapsId: number = 0;

  map?: GameMap;
  json?: GameMapJson


  constructor(private mapService: MapService) {
    effect(() => {
      let map = this.mapService.data().find(value => value.id == this.mapsId)
      if (map) {
        this.map = map;
        this.mapService.fetchJsonForMap(map.id).then(item => {
          this.json = item
        })
      }
    })
  }

  ngOnInit(): void {
  }


  protected readonly parseJson = parseJson;

  loadJSON(value: string) {
    let json = JSON.parse(value)
    return json
  }
}
