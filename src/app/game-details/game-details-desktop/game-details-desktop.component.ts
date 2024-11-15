import {Component} from '@angular/core';
import {LiveViewerComponent} from '../../live-viewer/live-viewer.component';

@Component({
  selector: 'app-game-details-desktop',
  standalone: true,
  imports: [
    LiveViewerComponent
  ],
  templateUrl: './game-details-desktop.component.html',
  styleUrl: './game-details-desktop.component.scss'
})
export class GameDetailsDesktopComponent {

}
