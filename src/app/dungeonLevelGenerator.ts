import { DungeonLevel } from './dungeonLevel';
import { MonsterGenerator } from './monsterGenerator';
import { MONSTERS } from './monsters';
import { Encounter } from './encounter';
import { HeroService } from './hero.service';
import { MonsterDefinition } from './monsterDefiniton';

export class DungeonLevelGenerator {
  generate(hero: HeroService, dungeonLevel: number): DungeonLevel {
    const mGenerator = new MonsterGenerator();
    const encounters = [];
    for (let i = 0; i < 10; i += 1) {
      encounters.push(this.generateEncounter(hero, dungeonLevel, mGenerator));
    }

    return new DungeonLevel(dungeonLevel, encounters);
  }

  private generateEncounter(
    hero: HeroService,
    dungeonLevel: number,
    mGenerator: MonsterGenerator,
  ): Encounter {
    if (Math.random() > 0.5) {
      return {
        monsters: [],
      };
    }

    const maxDifficulty = (dungeonLevel + hero.xl) / 2;
    const minDifficulty = dungeonLevel / 6;
    const suitableMonsters = MONSTERS
      .filter((x) => x.difficulty > minDifficulty)
      .filter((x) => x.difficulty <= maxDifficulty);

    const weighted: MonsterDefinition [] = [];
    suitableMonsters.forEach((m) => {
      Array(m.frequency).fill(m).forEach((x) => weighted.push(x));
    });

    const monsterType = weighted[Math.floor(Math.random() * weighted.length)];
    return {
      monsters: [mGenerator.generate(monsterType.mId)],
    };
  }
}
