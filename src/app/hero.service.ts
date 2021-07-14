import { roll } from '@airjp73/dice-notation';
import { Injectable } from '@angular/core';
import { LimitedResource } from './limitedResource';
import { LogService } from './log.service';
import { LogType } from './logType';
import { StatusEffect } from './statusEffect';
import { HungerStatus } from './hungerStatus';
import { StatusEffectType } from './statusEffectType';
import { InventoryItem } from './inventory/inventoryItem';
import { ItemGenerator } from './itemGenerator';
import { FoodItem } from './inventory/foodItem';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  hp: LimitedResource;

  ac: number;

  xp: number;

  xl: number;

  nutrition: number;

  statusEffects: StatusEffect [];

  inventory: InventoryItem [];

  private xpBreakpoints = [
    20,
    40,
    80,
    160,
    320,
    640,
    1280,
    2560,
    5120,
    10000,
  ];

  constructor(private logger: LogService) {
    this.hp = {
      max: 16,
      current: 16,
    };
    this.ac = 10;
    this.xp = 0;
    this.xl = 1;
    this.nutrition = 900;
    this.statusEffects = [];
    this.inventory = [];
  }

  get hungerStatus() {
    if (this.nutrition > 2000) return HungerStatus.Oversatiated;
    if (this.nutrition > 1000) return HungerStatus.Satiated;
    if (this.nutrition > 150) return HungerStatus.NotHungry;
    if (this.nutrition > 50) return HungerStatus.Hungry;
    if (this.nutrition > 0) return HungerStatus.Weak;
    return HungerStatus.Fainting;
  }

  initialize() {
    const generator = new ItemGenerator();
    this.inventory.push(generator.generateItem());
  }

  addXp(xp: number) {
    this.xp += xp;
    if (this.xp > this.xpBreakpoints[this.xl - 1]) {
      this.xl += 1;
      const hpIncrease = roll('1d10 + 1d2').result;
      this.hp.current += hpIncrease;
      this.hp.max += hpIncrease;
      this.logger.log(`Welcome to level ${this.xl}!`, LogType.HeroLevelUp);
    }
  }

  eat(food: FoodItem) {
    this.removeItem(food);
    this.nutrition += food.nutrition;
    this.logger.log(`You eat the ${food.name}.`, LogType.EatFood);
  }

  removeItem(item: InventoryItem) {
    this.inventory = this.inventory.filter((x) => x !== item);
  }

  update(passedTurns: number, currentTurns: number) {
    if (this.hp.current <= 0) {
      this.logger.log('You die...', LogType.HeroDeath);
      return;
    }

    const regenRate = this.getRegenRate();
    const previousTurns = currentTurns - passedTurns;
    const regen = Math.floor(currentTurns / regenRate) - Math.floor(previousTurns / regenRate);
    this.hp.current = Math.min(this.hp.max, this.hp.current + regen);

    this.nutrition -= passedTurns;
    if (this.nutrition < -280) {
      this.hp.current = 0;
      this.logger.log('You have starved to death.', LogType.HeroDeath);
    }
  }

  removeStatusEffect(types: StatusEffectType[]) {
    this.statusEffects = this.statusEffects.filter((x) => !types.some((y) => y === x.type));
  }

  addStatusEffect(type: StatusEffectType, duration?: number) {
    const existing = this.statusEffects.filter((x) => x.type === type)[0];
    if (existing) {
      if (existing.duration !== undefined && duration !== undefined) {
        existing.duration += duration;
      }

      return;
    }

    this.statusEffects.push({
      type,
      duration,
    });
  }

  getRegenRate() {
    switch (this.xl) {
      case 1: return 15;
      case 2: return 11;
      case 3: return 9;
      case 4: return 8;
      case 5: return 7;
      case 6: return 6;
      case 7:
      case 8:
        return 5;
      case 9: return 4;
      default: return 3;
    }
  }
}
