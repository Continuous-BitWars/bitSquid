import {Component, Input} from '@angular/core';
import {GameMap} from '../_models/api/map.model';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-maps-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './maps-card.component.html',
  styleUrl: './maps-card.component.scss'
})
export class MapsCardComponent {
  @Input() map!: GameMap;
}
