import { Injectable } from '@angular/core';
import { CombatHandlerService } from './combat-handler.service';

import { DungeonLevel } from './dungeonLevel';
import { DungeonLevelGenerator } from './dungeonLevelGenerator';
import { HeroService } from './hero.service';
import { HeroAction } from './heroAction';
import { MonsterGenerator } from './monsterGenerator';

@Injectable({
  providedIn: 'root',
})
export class DungeonService {
  currentLevel: number;

  level: DungeonLevel;

  constructor(private hero: HeroService, private combat: CombatHandlerService) {
    this.currentLevel = 1;
    this.level = new DungeonLevel(1, []);
  }

  reset() {
    this.currentLevel = 1;
    this.generateLevel();
  }

  generateLevel() {
    const generator = new DungeonLevelGenerator();
    const level = generator.generate(this.hero, this.currentLevel);
    this.level = level;
  }

  maybeSpawnMonsters(passedTime: number) {
    const generator = new DungeonLevelGenerator();
    const mGenerator = new MonsterGenerator();
    for (let i = 0; i < passedTime; i++) {
      if (Math.random() < 1 / 70) {
        const encounter = generator.generateEncounter(this.hero, this.currentLevel, mGenerator);
        this.level.addEncounter(encounter);
      }
    }
  }

  executeAction(action: HeroAction) {
    switch (action) {
      // case HeroAction.Rest:
      // case HeroAction.Move:
      case HeroAction.Descend:
        this.currentLevel += 1;
        this.generateLevel();
        return Math.ceil(10 + Math.random() * 20);

      case HeroAction.Explore:
        this.level.moveToNextEncounter();
        return Math.ceil(10 + Math.random() * 5);
      case HeroAction.MeleeAttack:
        if (this.level.currentEncounter) {
          this.combat.attackMonster(this.level.currentEncounter.monsters[0]);
        }
        break;
      default:
        break;
    }

    this.level.update();
    if (this.level.currentEncounter?.monsters.length) {
      for (const m of this.level.currentEncounter.monsters) {
        for (let attackNumber = 0; attackNumber < m.definition.attacks.length; attackNumber++) {
          this.combat.attackHero(m, m.definition.attacks[attackNumber], attackNumber);
        }
      }
    }

    return 1;
  }
}
