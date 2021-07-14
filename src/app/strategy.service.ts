import { Injectable } from '@angular/core';
import { DungeonService } from './dungeon.service';
import { HeroService } from './hero.service';
import { HeroAction } from './heroAction';

@Injectable({
  providedIn: 'root',
})
export class StrategyService {
  // eslint-disable-next-line no-empty-function
  constructor(private hero: HeroService, private dungeon: DungeonService) {}

  getNextAction() {
    if (this.dungeon.level.currentEncounter
      && this.dungeon.level.currentEncounter.monsters.length) {
      return HeroAction.MeleeAttack;
    }

    /* if (this.hero.hp.current < this.hero.hp.max) {
      return HeroAction.Rest;
    } */

    if (this.dungeon.level.complete) {
      return HeroAction.Descend;
    }

    return HeroAction.Explore;
  }
}
