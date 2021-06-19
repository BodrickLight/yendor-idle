import { Injectable } from '@angular/core';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  getGame(): Game {
    return this.game;
  }

  game: Game = new Game ()
}
