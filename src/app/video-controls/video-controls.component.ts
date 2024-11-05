import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {GameTickService, ModeEnum} from '../_services/game-tick.service';

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
export class VideoControlsComponent implements OnInit {

  quality: any;

  constructor(public gameTickService: GameTickService) {
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

  onQualityChange($event: Event) {

  }

  protected readonly ModeEnum = ModeEnum;
}
