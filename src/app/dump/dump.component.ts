import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dump',
  templateUrl: './dump.component.html',
  styleUrls: ['./dump.component.scss']
})
export class DumpComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.game = this.gameService.getGame();
  }

  game: Game = new Game ();
}
