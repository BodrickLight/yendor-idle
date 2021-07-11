import { DungeonLevel } from './dungeonLevel';
import { MonsterGenerator } from './monsterGenerator';
import { MONSTERS } from './monsters';
import { Encounter } from './encounter';

export class DungeonLevelGenerator {
  generate(dungeonLevel: number): DungeonLevel {
    const mGenerator = new MonsterGenerator();
    const encounters = [];
    for (let i = 0; i < 10; i += 1) {
      encounters.push(this.generateEncounter(mGenerator));
    }

    return new DungeonLevel(dungeonLevel, encounters);
  }

  private generateEncounter(mGenerator: MonsterGenerator): Encounter {
    if (Math.random() > 0.5) {
      return {
        monsters: [],
      };
    }

    const monsterType = MONSTERS[Math.floor(Math.random() * MONSTERS.length)];
    return {
      monsters: [mGenerator.generate(monsterType.mId)],
    };
  }
}
