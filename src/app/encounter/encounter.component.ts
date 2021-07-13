import { Component, Input } from '@angular/core';
import { Encounter } from '../encounter';
import { Monster } from '../monster';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss'],
})
export class EncounterComponent {
  @Input() encounter!: Encounter;

  public getColor(monster: Monster) {
    const health = monster.hpPercentage;
    if (health > 0.5) {
      return 'green';
    } if (health > 0.25) {
      return 'yellow';
    }

    return 'red';
  }
}
