import { Injectable } from '@angular/core';
import { DungeonService } from './dungeon.service';
import { HeroService } from './hero.service';
import { HeroActionType } from './heroActionType';
import { Monster } from './monster';

@Injectable({
  providedIn: 'root',
})
export class TacticsService {
  // eslint-disable-next-line no-empty-function
  constructor(public hero: HeroService, public dungeon: DungeonService) { }

  getNextAction() {
    const { monsters } = this.dungeon.level.currentEncounter;
    const target = this.getTarget(monsters);

    if (this.isAdjacent(target)) {
      return { type: HeroActionType.MeleeAttack };
    }

    const direction = this.getDirection(target);
    return { type: HeroActionType.Move, direction };
  }

  getTarget(monsters: Monster[]) {
    const closest = monsters.map((m) => ({
      distance: Math.abs(m.offset.x) + Math.abs(m.offset.y),
      monster: m,
    })).sort((a, b) => a.distance - b.distance)[0];

    return closest.monster;
  }

  isAdjacent(monster: Monster) {
    return Math.abs(monster.offset.x) <= 1 && Math.abs(monster.offset.y) <= 1;
  }

  getDirection(monster: Monster) {
    return { x: Math.sign(monster.offset.x), y: Math.sign(monster.offset.y) };
  }
}
