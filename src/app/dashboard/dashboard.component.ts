import {Component, OnInit} from '@angular/core';
import {GameInfoService} from '../_services/game-info.service';
import {GameTickService} from '../_services/game-tick.service';
import {JsonPipe, NgFor} from '@angular/common';
import {GameInfo} from '../_models/communication/game-info';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, JsonPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(public gameInfoService: GameInfoService, public gameTickService: GameTickService) {

  }

  ngOnInit(): void {
  }

  protected readonly GameInfoService = GameInfoService;

  gameClick(item: GameInfo) {
    this.gameInfoService.currentGameInfo.set(item)
  }
}
