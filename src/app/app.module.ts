import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CombatComponent } from './combat/combat.component';
import { LogComponent } from './log/log.component';

@NgModule({
  declarations: [
    AppComponent,
    CombatComponent,
    LogComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
