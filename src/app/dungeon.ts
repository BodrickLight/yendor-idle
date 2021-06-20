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
}
