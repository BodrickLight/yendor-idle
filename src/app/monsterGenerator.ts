import { roll } from "@airjp73/dice-notation";
import { Monster } from "./monster";
import { MONSTERS } from "./monsters";

export class MonsterGenerator {
	generate(monsterId: number): Monster {
		var definition = MONSTERS.find(x => x.id === monsterId);
		if(!definition) {
			throw `Unable to find monster definition with id ${monsterId}`;
		}

		var hp = roll(definition.hp).result;
		return {
			definition: definition,
			id: monsterId,
			hp: {
				current: hp,
				max: hp
			}
		};
	}
}