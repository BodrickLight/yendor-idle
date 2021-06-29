import { Injectable } from '@angular/core';
import { LimitedResource } from './limitedResource';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  hp: LimitedResource;
  accuracy: number;
  evasion: number;

  constructor() {
    (this.hp = {
      max: 10,
      current: 10,
    }),
      (this.accuracy = 10),
      (this.evasion = 10);
  }
}
