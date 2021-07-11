import { roll } from '@airjp73/dice-notation';
import { Injectable } from '@angular/core';
import { LimitedResource } from './limitedResource';
import { LogService } from './log.service';
import { LogType } from './logType';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  hp: LimitedResource;

  ac: number;

  xp: number;

  xl: number;

  xpBreakpoints = [
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
  }

  addXp(xp: number) {
    this.xp += xp;
    if (this.xp > this.xpBreakpoints[this.xl - 1]) {
      this.xl += 1;
      const hpIncrease = roll('1d10').result;
      this.hp.current += hpIncrease;
      this.hp.max += hpIncrease;
      this.logger.log(`Welcome to level ${this.xl}!`, LogType.HeroLevelUp);
    }
  }
}
