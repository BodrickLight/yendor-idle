import { Injectable } from '@angular/core';
import { CombatHandlerService } from './combat-handler.service';

import { DungeonLevel } from './dungeonLevel';
import { DungeonLevelGenerator } from './dungeonLevelGenerator';
import { HeroService } from './hero.service';
import { HeroAction } from './heroAction';
import { FoodItem } from './inventory/foodItem';
import { InventoryItemType } from './inventory/inventoryItemType';
import { ItemGenerator } from './itemGenerator';
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
    const iGenerator = new ItemGenerator();

    for (let i = 0; i < passedTime; i += 1) {
      if (Math.random() < 1 / 70) {
        const encounter = generator.generateEncounter(
          this.hero,
          this.currentLevel,
          mGenerator,
          iGenerator,
        );
        this.level.addEncounter(encounter);
      }
    }
  }

  executeAction(action: HeroAction) {
    let duration = 1;

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

      case HeroAction.PickUp: {
        const item = this.level.currentEncounter.items.splice(0, 1)[0];
        this.hero.inventory.push(item);
        break;
      }

      case HeroAction.MeleeAttack:
        if (this.level.currentEncounter) {
          this.combat.attackMonster(this.level.currentEncounter.monsters[0]);
        }
        break;

      case HeroAction.Eat: {
        const food = <FoodItem> this.hero.inventory
          .filter((x) => x.type === InventoryItemType.Food)[0];
        this.hero.eat(food);
        duration = food.delay;
        break;
      }

      default:
        break;
    }

    this.level.update();
    for (let i = 0; i < duration; i += 1) {
      if (this.level.currentEncounter?.monsters.length) {
        for (const m of this.level.currentEncounter.monsters) {
          for (let attackNumber = 0; attackNumber < m.definition.attacks.length; attackNumber++) {
            this.combat.attackHero(m, m.definition.attacks[attackNumber], attackNumber);
          }
        }
      }
    }

    return duration;
  }
}
