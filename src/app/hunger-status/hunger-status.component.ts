import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { HungerStatus } from '../hungerStatus';

@Component({
  selector: 'app-hunger-status',
  templateUrl: './hunger-status.component.html',
  styleUrls: ['./hunger-status.component.scss'],
})
export class HungerStatusComponent {
  constructor(private hero: HeroService) { }

  getStatus() {
    switch (this.hero.hungerStatus) {
      case HungerStatus.Fainting: return 'Fainting';
      case HungerStatus.Weak: return 'Weak';
      case HungerStatus.Hungry: return 'Hungry';
      // case HungerStatus.NotHungry: return '';
      case HungerStatus.Satiated: return 'Satiated';
      case HungerStatus.Oversatiated: return 'Oversatiated';
      default: return '';
    }
  }

  getColor() {
    switch (this.hero.hungerStatus) {
      case HungerStatus.Fainting: return 'red';
      case HungerStatus.Weak: return 'red';
      case HungerStatus.Hungry: return 'yellow';
      // case HungerStatus.NotHungry: return '';
      case HungerStatus.Satiated: return 'green';
      case HungerStatus.Oversatiated: return 'green';
      default: return '';
    }
  }
}
