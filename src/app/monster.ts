import { roll } from '@airjp73/dice-notation';
import { LimitedResource } from './limitedResource';
import { MonsterDefinition } from './monsterDefiniton';

export class Monster {
  private _hp: LimitedResource;

  constructor(public definition: MonsterDefinition) {
    const hp = roll(this.getHpDice()).result;
    this._hp = {
      current: hp,
      max: hp,
    };
  }

  public get alive() { return this._hp.current > 0; }

  public getExperience() {
    return this.definition.level * this.definition.level + 1;
  }

  public dealDamage(damage: number) {
    this._hp.current -= damage;
  }

  private getHpDice() {
    if (this.definition.level <= 0) {
      return '1d4';
    }

    return `${this.definition.level}d8`;
  }
}
