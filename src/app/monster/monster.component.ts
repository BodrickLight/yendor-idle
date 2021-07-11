import { Component, Input } from '@angular/core';
import { Monster } from '../monster';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss'],
})
export class MonsterComponent {
  @Input() monster!: Monster;
}
