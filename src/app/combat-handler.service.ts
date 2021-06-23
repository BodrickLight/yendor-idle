import { roll } from '@airjp73/dice-notation';
import { Injectable } from '@angular/core';
import { HeroService } from './hero.service';
import { LogService } from './log.service';
import { Monster } from './monster';

@Injectable({
  providedIn: 'root'
})
export class CombatHandlerService {

  constructor(private hero: HeroService, private logger: LogService) { }

  resolveCombat(monster: Monster) {
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
