import { Injectable } from '@angular/core';
import { LimitedResource } from './limitedResource';
import { LogService } from './log.service';
import { Monster } from './monster';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  hp: LimitedResource;

  constructor(private logger: LogService) {
    this.hp = {
      max: 10,
      current: 10
    }
  }

  attack(target: Monster) {
    this.logger.log(`You attack the ${target.definition.name}!`);
  }
}
