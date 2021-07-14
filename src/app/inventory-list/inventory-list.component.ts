import { Component } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent {
  // eslint-disable-next-line no-empty-function
  constructor(public hero: HeroService) { }
}
