import { DungeonLevel } from "./dungeonLevel";
import { MonsterGenerator } from "./monsterGenerator";
import { MONSTERS } from "./monsters";
import { Room } from "./room";

export class DungeonLevelGenerator {
	generate(dungeonLevel: number): DungeonLevel {
		var mGenerator = new MonsterGenerator();
		var rooms = [];
		for (var i = 0; i < 10; i++) {
			rooms.push(this.generateRoom(mGenerator));
		}

		return new DungeonLevel (dungeonLevel, rooms);
	}

	private generateRoom(mGenerator: MonsterGenerator): Room {
		if (Math.random() > 0.5) {
			return {};
		}

		var monsterType = MONSTERS[Math.floor(Math.random() * MONSTERS.length)];
		return {
			monster: mGenerator.generate(monsterType.id)
		}
	}
}

const LEVEL_SIZE = 50;