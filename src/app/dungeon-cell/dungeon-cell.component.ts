import { Component, Input } from '@angular/core';
import { Encounter } from '../encounter';

@Component({
  selector: 'app-dungeon-cell',
  templateUrl: './dungeon-cell.component.html',
  styleUrls: ['./dungeon-cell.component.scss'],
})
export class DungeonCellComponent {
  @Input() x!: number;

  @Input() y!: number;

  @Input() encounter!: Encounter;

  getMonster() {
    return this.encounter && this.encounter.monsters.filter(
      (m) => m.offset.x === this.x && m.offset.y === this.y,
    )[0];
  }

  getColor() {
    if (this.x === 0 && this.y === 0) {
      return 'white';
    }

    return 'grey';
  }

  getGlyph() {
    if (this.x === 0 && this.y === 0) {
      return '@';
    }

    return '.';
  }
}
