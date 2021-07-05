import { roll } from '@airjp73/dice-notation';
import { Injectable } from '@angular/core';
import { LogType } from 'src/app/logType';
import { DungeonService } from './dungeon.service';
import { HeroService } from './hero.service';
import { LogService } from './log.service';
import { Monster } from './monster';

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

    if (this.rollToHitMonster(this.hero, monster)) {
      this.logger.log(
        `You hit the ${monster.definition.name}.`,
        LogType.HeroAttackHit
      );
      var damage = roll("1d6").result;
      monster.hp.current -= damage;
      if (monster.hp.current <= 0) {
        this.hero.addXp(monster.definition.experience);
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

    for (var i = 0; i < monster.definition.attacks.length; i++) {
      var attack = monster.definition.attacks[i];

      if (this.rollToHitHero(this.hero, monster, i)) {
        this.logger.log(
          `The ${monster.definition.name} ${attack.type}s you!`,
          LogType.MonsterAttackHit
        );
        var damage = roll(attack.damage).result;
        this.hero.hp.current -= damage;
      } else {
        this.logger.log(
          `The ${monster.definition.name} misses you.`,
          LogType.MonsterAttackMiss
        );
    }
    }
  }

  rollToHitHero(hero: HeroService, monster: Monster, attackNumber: number) {
    var dice = "1d" + 20 + attackNumber;
    var result = roll(dice).result;
    
    var target = 10 + hero.ac + monster.definition.level;
    return result < target;
  }

  rollToHitMonster(hero: HeroService, monster: Monster) {
    var dice = "1d20";
    var result = roll(dice).result;

    var target = 2 + hero.xl + monster.definition.ac;
    return result < target;
  }
}
