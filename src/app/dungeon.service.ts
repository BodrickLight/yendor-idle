import { Injectable } from '@angular/core';
import { CombatHandlerService } from './combat-handler.service';

import { DungeonLevel } from './dungeonLevel';
import { DungeonLevelGenerator } from './dungeonLevelGenerator';
import { HeroService } from './hero.service';
import { HeroAction } from './heroAction';
import { HeroActionType } from './heroActionType';
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

    switch (action.type) {
      // case HeroAction.Rest:
      // case HeroAction.Move:
      case HeroActionType.Descend:
        this.currentLevel += 1;
        this.generateLevel();
        return Math.ceil(10 + Math.random() * 20);

      case HeroActionType.Explore:
        this.level.moveToNextEncounter();
        return Math.ceil(10 + Math.random() * 5);

      case HeroActionType.PickUp: {
        const item = this.level.currentEncounter.items.splice(0, 1)[0];
        this.hero.inventory.push(item);
        break;
      }

      case HeroActionType.MeleeAttack:
        if (this.level.currentEncounter) {
          this.combat.attackMonster(this.level.currentEncounter.monsters[0]);
        }
        break;

      case HeroActionType.Eat: {
        const food = <FoodItem> this.hero.inventory
          .filter((x) => x.type === InventoryItemType.Food)[0];
        this.hero.eat(food);
        duration = food.delay;
        break;
      }

      case HeroActionType.Move:
        if (
          action.direction === undefined
          || action.direction.x === undefined
          || action.direction.y === undefined
        ) {
          throw new Error('No action specified for move.');
        }

        for (const m of this.level.currentEncounter.monsters) {
          m.offset.x -= action.direction.x;
          m.offset.y -= action.direction.y;
        }

        break;

      default:
        throw new Error(`Unable to perform action ${action.type}`);
    }

    this.level.update();
    for (let i = 0; i < duration; i += 1) {
      if (this.level.currentEncounter?.monsters.length) {
        for (const m of this.level.currentEncounter.monsters) {
          if (Math.abs(m.offset.x) <= 1 && Math.abs(m.offset.y) <= 1) {
            for (let attackNumber = 0; attackNumber < m.definition.attacks.length; attackNumber++) {
              this.combat.attackHero(m, m.definition.attacks[attackNumber], attackNumber);
            }
          }
        }
      }
    }

    return duration;
  }
}
