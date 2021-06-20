import { LimitedResource } from "./limitedResource";

export class Hero {
	hp: LimitedResource;

	constructor() {
		this.hp = {
			max: 20,
			current: 20
		};
	}
}