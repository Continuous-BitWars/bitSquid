import {Component} from '@angular/core';
import {ThreeJsCameraService} from '../_services/threejs/camera.service';
import {ThreeJsModelService} from '../_services/threejs/model.service';
import {GameCamRendererComponent} from './game-cam-renderer/game-cam-renderer.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-live-viewer',
  standalone: true,
  imports: [
    GameCamRendererComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './live-viewer.component.html',
  styleUrl: './live-viewer.component.scss'
})
export class LiveViewerComponent {

  protected readonly Math: Math = Math;

  constructor(protected cameraService: ThreeJsCameraService, protected modelService: ThreeJsModelService) {
  }
}
