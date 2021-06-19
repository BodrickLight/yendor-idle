import { Monster } from "./monster";

export class Dungeon {
	currentLevel: number;
	monsters: Monster [];

	constructor() {
		this.currentLevel = 1;
		this.monsters = [];
	}
}