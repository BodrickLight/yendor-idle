import { Monster } from './monster';
import { MONSTERS } from './monsters';
import { Offset } from './offset';

export class MonsterGenerator {
  generate(monsterId: number, offset: Offset): Monster {
    const definition = MONSTERS.find((x) => x.mId === monsterId);
    if (!definition) {
      throw new Error(`Unable to find monster definition with id ${monsterId}`);
    }

    return new Monster(definition, offset);
  }
}
