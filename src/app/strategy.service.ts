import { Injectable } from '@angular/core';
import { DungeonService } from './dungeon.service';
import { HeroService } from './hero.service';
import { HeroAction } from './heroAction';
import { HeroActionType } from './heroActionType';
import { HungerStatus } from './hungerStatus';
import { InventoryItemType } from './inventory/inventoryItemType';
import { TacticsService } from './tactics.service';

@Injectable({
  providedIn: 'root',
})
export class StrategyService {
  constructor(
    private hero: HeroService,
    private dungeon: DungeonService,
    private tactics: TacticsService,
  // eslint-disable-next-line no-empty-function
  ) {}

  getNextAction(): HeroAction {
    if (
      this.dungeon.level.currentEncounter
      && this.dungeon.level.currentEncounter.monsters.length
    ) {
      return this.tactics.getNextAction();
    }

    if (
      this.dungeon.level.currentEncounter
      && this.dungeon.level.currentEncounter.items.length
    ) {
      return { type: HeroActionType.PickUp };
    }

    if (
      this.hero.hungerStatus <= HungerStatus.Hungry
      && this.hero.inventory.some((y) => y.type === InventoryItemType.Food)
    ) {
      return { type: HeroActionType.Eat };
    }

    /* if (this.hero.hp.current < this.hero.hp.max) {
      return HeroAction.Rest;
    } */

    if (this.dungeon.level.complete) {
      return { type: HeroActionType.Descend };
    }

    return { type: HeroActionType.Explore };
  }
}
