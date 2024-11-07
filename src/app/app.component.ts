import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {VideoControlsComponent} from './video-controls/video-controls.component';
import {WebsocketService} from './_services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, VideoControlsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BitSquid';

  constructor(websocketService: WebsocketService) {
  }
}
