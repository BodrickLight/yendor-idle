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
  constructor(public hero: HeroService, public dungeon: DungeonService) {}
}
