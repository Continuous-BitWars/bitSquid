import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {VideoControlsComponent} from './video-controls/video-controls.component';
import {WebsocketService} from './_services/websocket.service';
import {BaseInformationComponent} from './player-info-card/base-information.component';
import {NgFor, NgIf} from '@angular/common';
import {GameActionComponent} from './game-action/game-action.component';
import {LiveViewerComponent} from './live-viewer/live-viewer.component';
import {GameDetailsComponent} from './game-details/game-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBarComponent, RouterOutlet, DashboardComponent, VideoControlsComponent, BaseInformationComponent, NgFor, GameActionComponent, NgIf, LiveViewerComponent, GameDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BitSquid';

  constructor(websocketService: WebsocketService) {
  }


}
