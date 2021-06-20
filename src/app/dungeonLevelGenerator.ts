import { DungeonLevel } from "./dungeonLevel";
import { MonsterGenerator } from "./monsterGenerator";

export class DungeonLevelGenerator {
	generate(dungeonLevel: number): DungeonLevel {
		var mGenerator = new MonsterGenerator();
		return {
			level: dungeonLevel,
			monsters: [
				mGenerator.generate(1),
				mGenerator.generate(1),
				mGenerator.generate(1),
				mGenerator.generate(2),
				mGenerator.generate(2)
			]
		};
	}
}

const LEVEL_SIZE = 50;