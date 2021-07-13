import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CombatComponent } from './combat/combat.component';
import { LogComponent } from './log/log.component';
import { MonsterComponent } from './monster/monster.component';
import { SettingsComponent } from './settings/settings.component';
import { EncounterComponent } from './encounter/encounter.component';

@NgModule({
  declarations: [
    AppComponent,
    CombatComponent,
    LogComponent,
    MonsterComponent,
    SettingsComponent,
    EncounterComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
