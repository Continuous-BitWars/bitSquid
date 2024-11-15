// player-list.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreInfo } from '../../_models/communication/score.info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  standalone: true,
  imports:[CommonModule]
})
export class PlayerListComponent {
  @Input() scoreboard: ScoreInfo[] = [];

  constructor(private router: Router) {}

  onPlayerRowClick(playerId: number) {
    // Navigate to the player detail page
    this.router.navigate(['players', playerId, 'player']);
  }
}
