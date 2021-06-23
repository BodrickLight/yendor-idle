import { DungeonLevelGenerator } from "./dungeonLevelGenerator";
import { Monster } from "./monster";

export class Dungeon {
	currentLevel: number;
	monsters: Monster [];

	constructor() {
		this.currentLevel = 1;
		this.monsters = [];
	}

	reset() {
		this.currentLevel = 1;
		this.generateLevel();
	}

	generateLevel() {
		var generator = new DungeonLevelGenerator();
		var level = generator.generate (this.currentLevel);
		this.monsters = level.monsters;
	}

	update() {
		for(var monster of this.monsters) {
			if (monster.hp.current <= 0) {
				this.monsters = this.monsters.filter(x => x.id !== monster.id);
			}
		}
	}
}
