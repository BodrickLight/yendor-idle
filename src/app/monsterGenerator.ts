import { roll } from "@airjp73/dice-notation";
import { Monster } from "./monster";
import { MonsterDefinition } from "./monsterDefiniton";
import { MONSTERS } from "./monsters";

export class MonsterGenerator {
  static _id: number = 0;
  generate(monsterId: number): Monster {
    var definition = MONSTERS.find((x) => x.mId === monsterId);
    if (!definition) {
      throw `Unable to find monster definition with id ${monsterId}`;
    }

    var hpDice = this.getHpDice(definition);
    var hp = roll(hpDice).result;

    return {
      id: MonsterGenerator._id++,
      definition: definition,
      hp: {
        current: hp,
        max: hp,
      },
    };
  }

  getHpDice(definition: MonsterDefinition) {
    if (definition.level <= 0) {
      return "1d4";
    }

    return definition.level + "d8";
  }
}