import { Dungeon } from "./dungeon";
import { Hero } from "./hero";

export class Game {
	dungeon: Dungeon
	hero: Hero;
	startTime: number;

	private timer!: number;

	constructor() {
		this.dungeon = new Dungeon();
		this.hero = new Hero();
		this.startTime = new Date().getTime ();
		this.enterDungeon ();
	}

	dump():string {
		return JSON.stringify(this, null, "  ");
	}

	enterDungeon() {
		this.dungeon.reset ();
		this.timer = window.setInterval(() => this.tick (), 1000);
	}

	tick() {

	}
}