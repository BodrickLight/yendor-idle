import { InventoryItem } from './inventoryItem';

export interface FoodItem extends InventoryItem {
  nutrition: number;
  delay: number;
}
