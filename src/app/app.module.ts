import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CombatComponent } from './combat/combat.component';
import { LogComponent } from './log/log.component';
import { MonsterComponent } from './monster/monster.component';
import { SettingsComponent } from './settings/settings.component';
import { EncounterComponent } from './encounter/encounter.component';
import { HungerStatusComponent } from './hunger-status/hunger-status.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { DungeonCellComponent } from './dungeon-cell/dungeon-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    CombatComponent,
    LogComponent,
    MonsterComponent,
    SettingsComponent,
    EncounterComponent,
    HungerStatusComponent,
    InventoryListComponent,
    DungeonCellComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
