import { Monster } from './monster';
import { MONSTERS } from './monsters';

export class MonsterGenerator {
  generate(monsterId: number): Monster {
    const definition = MONSTERS.find((x) => x.mId === monsterId);
    if (!definition) {
      throw new Error(`Unable to find monster definition with id ${monsterId}`);
    }

    return new Monster(definition);
  }
}
