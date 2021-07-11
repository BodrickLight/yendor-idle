import { roll } from '@airjp73/dice-notation';
import { Monster } from './monster';
import { MonsterDefinition } from './monsterDefiniton';
import { MONSTERS } from './monsters';

export class MonsterGenerator {
  private static id = 0;

  generate(monsterId: number): Monster {
    const definition = MONSTERS.find((x) => x.mId === monsterId);
    if (!definition) {
      throw new Error(`Unable to find monster definition with id ${monsterId}`);
    }

    const hpDice = this.getHpDice(definition);
    const hp = roll(hpDice).result;

    MonsterGenerator.id += 1;
    return {
      id: MonsterGenerator.id,
      definition,
      hp: {
        current: hp,
        max: hp,
      },
    };
  }

  getHpDice(definition: MonsterDefinition) {
    if (definition.level <= 0) {
      return '1d4';
    }

    return `${definition.level}d8`;
  }
}
