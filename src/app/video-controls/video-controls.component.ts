import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {GameTickService, ModeEnum} from '../_services/game-tick.service';
import {ThreeJsCameraService} from '../_services/threejs/camera.service';
import {ThreeJsStyleService} from '../_services/threejs/style.service';

@Component({
  selector: 'app-video-controls',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.scss']
})
export class VideoControlsComponent implements OnInit, AfterViewInit {

  @ViewChild('scaleSelect') renderScaleSelect!: ElementRef;


  constructor(public gameTickService: GameTickService, private threeJsCameraService: ThreeJsCameraService, protected styleService: ThreeJsStyleService) {
  }

  ngAfterViewInit(): void {
    this.renderScaleSelect.nativeElement.value = this.styleService.renderScale;
  }

  ngOnInit(): void {
    //TODO buttons ausgrauen
  }

  onManualTickChange(event: any): void {
    const newTickIndex = event.target.value;
    this.gameTickService.setTickByIndex(newTickIndex)
  }

  setGameTickMode(mode: ModeEnum): void {
    this.gameTickService.setMode(mode);
  }

  onQualityChange(event: Event) {
    this.styleService.setRenderScale(parseInt(this.renderScaleSelect.nativeElement.value))
  }

  protected readonly ModeEnum = ModeEnum;

  addNewCam() {
    this.threeJsCameraService.addCamera()
  }
}
