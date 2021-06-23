import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {

  constructor(public gameService: GameService, public heroService: HeroService) { }

  ngOnInit(): void {
  }
}
