import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Score} from '../_models/api/score.model';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-player-scoreboard',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './player-scoreboard.component.html',
  styleUrl: './player-scoreboard.component.scss'
})
export class PlayerScoreboardComponent {

  @Input() scores: Score[] = [];


  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

  }


}
