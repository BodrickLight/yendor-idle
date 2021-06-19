import { LimitedResource } from "./limitedResource";

export class Player {
	hp: LimitedResource;
	mana: LimitedResource;
	experience: number;
	inventory: {
		items: [];
	}

	constructor() {
		this.hp = {
			max: 10,
			current: 10
		};
		this.mana = {
			max: 0,
			current: 0
		};
		this.experience = 0;
		this.inventory = {
			items: []
		}
	}
}