import { roll } from '@airjp73/dice-notation';
import { LimitedResource } from './limitedResource';
import { MonsterDefinition } from './monsterDefiniton';

export class Monster {
  private hp: LimitedResource;

  constructor(public definition: MonsterDefinition) {
    const hp = roll(this.getHpDice()).result;
    this.hp = {
      current: hp,
      max: hp,
    };
  }

  public get alive() { return this.hp.current > 0; }

  public getExperience() {
    return this.definition.level * this.definition.level + 1;
  }

  public get hpPercentage() {
    return this.hp.current / this.hp.max;
  }

  public dealDamage(damage: number) {
    this.hp.current -= damage;
  }

  private getHpDice() {
    if (this.definition.level <= 0) {
      return '1d4';
    }

    return `${this.definition.level}d8`;
  }
}
