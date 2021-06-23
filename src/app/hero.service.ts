import { Injectable } from '@angular/core';
import { LimitedResource } from './limitedResource';
import { LogService } from './log.service';
import { Monster } from './monster';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  hp: LimitedResource;
  accuracy: number;
  evasion: number;

  constructor(private logger: LogService) {
    this.hp = {
      max: 10,
      current: 10
    },
    this.accuracy = 10,
    this.evasion = 10
  }

  attack(target: Monster) {
    this.logger.log(`You attack the ${target.definition.name}!`);
    target.hp.current = target.hp.current - 1;
    if (target.hp.current <= 0) {
      this.logger.log(`You kill the ${target.definition.name}!`)
    }
  }
}
