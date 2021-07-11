import { Injectable } from '@angular/core';

import { DungeonLevel } from './dungeonLevel';
import { DungeonLevelGenerator } from './dungeonLevelGenerator';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root',
})
export class DungeonService {
  currentLevel: number;

  level: DungeonLevel;

  constructor(private hero: HeroService) {
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

  update() {
    this.level.update();
    if (this.level.complete) {
      this.currentLevel += 1;
      this.generateLevel();
    }
  }
}
