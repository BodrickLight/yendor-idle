import { Injectable } from '@angular/core';
import { LogType } from 'src/app/logType';
import { DungeonService } from './dungeon.service';
import { HeroService } from './hero.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root',
})
export class CombatHandlerService {
  constructor(
    private hero: HeroService,
    private logger: LogService,
    private dungeon: DungeonService
  ) {}

  resolveCombat(): void {
    if (!this.dungeon.level.currentEncounter) {
      return;
    }

    var monster = this.dungeon.level.currentEncounter.monsters[0];
    if (!monster) {
      return;
    }

    if (this.rollToHit(this.hero.accuracy, monster.evasion)) {
      this.logger.log(
        `You hit the ${monster.definition.name}.`,
        LogType.HeroAttackHit
      );
      monster.hp.current--;
      if (monster.hp.current <= 0) {
        this.logger.log(
          `You kill the ${monster.definition.name}!`,
          LogType.MonsterDeath
        );
        return;
      }
    } else {
      this.logger.log(
        `You miss the ${monster.definition.name}.`,
        LogType.HeroAttackMiss
      );
    }

    if (this.rollToHit(monster.accuracy, this.hero.evasion)) {
      this.logger.log(
        `The ${monster.definition.name} hits you!`,
        LogType.MonsterAttackHit
      );
      this.hero.hp.current--;
    } else {
      this.logger.log(
        `The ${monster.definition.name} misses you.`,
        LogType.MonsterAttackMiss
      );
    }
  }

  rollToHit(accuracy: number, evasion: number) {
    return Math.random() * accuracy > Math.random() * evasion;
  }
}
