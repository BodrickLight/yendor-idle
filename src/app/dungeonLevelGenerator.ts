import { DungeonLevel } from './dungeonLevel';
import { MonsterGenerator } from './monsterGenerator';
import { MONSTERS } from './monsters';
import { Encounter } from './encounter';

export class DungeonLevelGenerator {
  generate(dungeonLevel: number): DungeonLevel {
    var mGenerator = new MonsterGenerator();
    var encounters = [];
    for (var i = 0; i < 10; i++) {
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

    var monsterType = MONSTERS[Math.floor(Math.random() * MONSTERS.length)];
    return {
      monsters: [mGenerator.generate(monsterType.mId)],
    };
  }
}
