import { InventoryItemType } from './inventory/inventoryItemType';

export class ItemGenerator {
  generateItem() {
    return {
      name: 'food ration',
      nutrition: 380,
      delay: 5,
      weight: 20,
      glyph: '%',
      color: 'organic',
      type: InventoryItemType.Food,
    };
  }
}
