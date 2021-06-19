import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.game = this.getGame();
  }

  game: Game = new Game ();

  getGame(): Game {
    return this.gameService.getGame();
  }
}
