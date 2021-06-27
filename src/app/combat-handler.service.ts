import { Injectable } from '@angular/core';
import { DungeonService } from './dungeon.service';
import { HeroService } from './hero.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class CombatHandlerService {

  constructor(private hero: HeroService, private logger: LogService, private dungeon: DungeonService) { }

  resolveCombat(): void {
    if (!this.dungeon.level.currentRoom || !this.dungeon.level.currentRoom.monster) {
      return;
    }

    var monster = this.dungeon.level.currentRoom.monster;

    if (this.rollToHit(this.hero.accuracy, monster.evasion)) {
      this.logger.log(`You hit the ${monster.definition.name}.`);
      monster.hp.current--;
      if (monster.hp.current <= 0) {
        this.logger.log(`You kill the ${monster.definition.name}!`);
        return;
      }
    } else {
      this.logger.log(`You miss the ${monster.definition.name}.`);
    }

    if (this.rollToHit(monster.accuracy, this.hero.evasion)) {
      this.logger.log(`The ${monster.definition.name} hits you!`);
      this.hero.hp.current--;
    } else {
      this.logger.log(`The ${monster.definition.name} misses you.`);
    }
  }

  rollToHit(accuracy: number, evasion: number) {
    return Math.random() * accuracy > Math.random() * evasion;
  }
}
