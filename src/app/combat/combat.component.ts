import { Component } from '@angular/core';
import { DungeonService } from '../dungeon.service';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss'],
})
export class CombatComponent {
  // eslint-disable-next-line no-empty-function
  xs: number[];

  ys: number[];

  constructor(public hero: HeroService, public dungeon: DungeonService) {
    this.xs = Array(15).fill(0).map((_, i) => i - 7);
    this.ys = Array(15).fill(0).map((_, i) => i - 7);
  }
}
