import { roll } from "@airjp73/dice-notation";
import { Monster } from "./monster";
import { MONSTERS } from "./monsters";

export class MonsterGenerator {
	static _id: number = 0;
	generate(monsterId: number): Monster {
		var definition = MONSTERS.find(x => x.id === monsterId);
		if(!definition) {
			throw `Unable to find monster definition with id ${monsterId}`;
		}

		var hp = roll(definition.hp).result;
		return {
			definition: definition,
			id: MonsterGenerator._id++,
			hp: {
				current: hp,
				max: hp
			},
			evasion: definition.evasion,
			accuracy: definition.accuracy
		};
	}
}