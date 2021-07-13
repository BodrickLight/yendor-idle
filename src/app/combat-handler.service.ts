import { roll } from '@airjp73/dice-notation';
import { Injectable } from '@angular/core';
import { LogType } from './logType';
import { Attack } from './attack';
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
    private dungeon: DungeonService,
  // eslint-disable-next-line no-empty-function
  ) {}

  resolveCombat(): void {
    if (!this.dungeon.level.currentEncounter) {
      return;
    }

    const monster = this.dungeon.level.currentEncounter.monsters[0];
    if (!monster) {
      return;
    }

    this.attackMonster(monster);

    if (!monster.alive) {
      return;
    }

    monster.definition.attacks.forEach((attack, i) => {
      this.attackHero(monster, attack, i);
    });
  }

  attackMonster(monster: Monster) {
    if (!this.rollToHitMonster(monster)) {
      this.logger.log(
        `You miss the ${monster.definition.name}.`,
        LogType.HeroAttackMiss,
      );
      return;
    }

    this.logger.log(
      `You hit the ${monster.definition.name}.`,
      LogType.HeroAttackHit,
    );
    const damage = roll('1d6').result;
    monster.dealDamage(damage);
    if (!monster.alive) {
      this.hero.addXp(monster.getExperience());
      this.logger.log(
        `You kill the ${monster.definition.name}!`,
        LogType.MonsterDeath,
      );
    }
  }

  attackHero(monster: Monster, attack: Attack, attackNumber: number) {
    if (!this.rollToHitHero(monster, attackNumber)) {
      this.logger.log(
        `The ${monster.definition.name} misses you.`,
        LogType.MonsterAttackMiss,
      );
      return;
    }

    const damage = roll(attack.damage).result;
    this.logger.log(
      `The ${monster.definition.name} ${attack.type}s you for ${damage} damage!`,
      LogType.MonsterAttackHit,
    );
    this.hero.hp.current -= damage;
  }

  rollToHitHero(monster: Monster, attackNumber: number) {
    const dice = `1d${20}${attackNumber}`;
    const { result } = roll(dice);

    const target = 10 + this.hero.ac + monster.definition.level;
    return result < target;
  }

  rollToHitMonster(monster: Monster) {
    const dice = '1d20';
    const { result } = roll(dice);

    const target = 2 + this.hero.xl + monster.definition.ac;
    return result < target;
  }
}
