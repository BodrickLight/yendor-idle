import { InventoryItem } from './inventory/inventoryItem';
import { Monster } from './monster';

export interface Encounter {
  monsters: Monster[];
  items: InventoryItem [];
}
