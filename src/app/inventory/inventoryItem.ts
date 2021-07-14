import { InventoryItemType } from './inventoryItemType';

export interface InventoryItem {
  name: string;
  weight: number;
  glyph: string;
  color: string;
  type: InventoryItemType;
}
