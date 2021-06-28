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
}
