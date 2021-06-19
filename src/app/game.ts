import { Dungeon } from "./dungeon";
import { Player } from "./player";

export class Game {
	dungeon: Dungeon
	player: Player;

	constructor() {
		this.dungeon = new Dungeon();
		this.player = new Player();
	}

	dump():string {
		return JSON.stringify(this, null, "  ");
	}
}