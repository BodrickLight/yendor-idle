import { LimitedResource } from "./limitedResource";
import { MonsterDefinition } from "./monsterDefiniton";

export interface Monster {
	id: number;
	hp: LimitedResource;
	definition: MonsterDefinition;
}