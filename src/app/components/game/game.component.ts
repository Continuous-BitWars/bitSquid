import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{
  gameId!: number;
  gameName!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.gameId = +params.get('id')!;
      this.gameName = params.get('name')!;
    });
  }
}
