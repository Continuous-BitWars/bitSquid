import {Component, Input} from '@angular/core';
import {GameMap} from '../_models/api/map.model';
import {MapsCardComponent} from '../maps-card/maps-card.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-maps-list',
  standalone: true,
  imports: [
    MapsCardComponent,
    NgForOf
  ],
  templateUrl: './maps-list.component.html',
  styleUrl: './maps-list.component.scss'
})
export class MapsListComponent {

  @Input() maps: GameMap[] = []
}
