import { Injectable } from '@angular/core';
import { DungeonService } from './dungeon.service';
import { HeroService } from './hero.service';
import { LocalStorageService } from './local-storage.service';
import { LogService } from './log.service';
import { StrategyService } from './strategy.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public startTime: number = new Date().getTime();

  public deathCount = 0;

  public turns!: number;

  private timer!: number;

  constructor(
    private hero: HeroService,
    private dungeon: DungeonService,
    private logger: LogService,
    private storage: LocalStorageService,
    private strategy: StrategyService,
  ) {
    const save = storage.load();
    if (save && save.deathCount) {
      this.deathCount = save.deathCount;
    }
    this.enterDungeon();
  }

  enterDungeon() {
    this.dungeon.reset();
    this.turns = 0;
    this.timer = window.setInterval(() => this.tick(), 100);
  }

  tick() {
    const nextAction = this.strategy.getNextAction();
    const passedTime = this.dungeon.executeAction(nextAction);
    this.turns += passedTime;

    this.dungeon.maybeSpawnMonsters(passedTime);
    this.hero.update(passedTime, this.turns);

    if (this.hero.hp.current <= 0) {
      this.deathCount += 1;
      this.storage.save({
        deathCount: this.deathCount,
      });
      window.clearInterval(this.timer);
    }
  }
}
