import { Injectable } from '@angular/core';
import { LogType } from 'src/app/logType';
import { CombatHandlerService } from './combat-handler.service';
import { DungeonService } from './dungeon.service';
import { HeroService } from './hero.service';
import { LocalStorageService } from './local-storage.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private timer!: number;
  public startTime: number = new Date().getTime();
  public deathCount: number = 0;

  constructor(
    private hero: HeroService,
    private dungeon: DungeonService,
    private combatHandler: CombatHandlerService,
    private logger: LogService,
    private storage: LocalStorageService
  ) {
    var save = storage.load();
    if (save && save.deathCount) {
      this.deathCount = save.deathCount;
    }
    this.enterDungeon();
  }

  enterDungeon() {
    this.dungeon.reset();
    this.timer = window.setInterval(() => this.tick(), 100);
  }

  tick() {
    this.combatHandler.resolveCombat();
    this.dungeon.update();
    if (this.hero.hp.current <= 0) {
      this.logger.log('You die...', LogType.HeroDeath);
      this.deathCount++;
      this.storage.save({
        deathCount: this.deathCount,
      });
      window.clearInterval(this.timer);
    }
  }
}
