import { Injectable } from '@angular/core';
import { CombatHandlerService } from './combat-handler.service';
import { Dungeon } from './dungeon';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

	private timer!: number;
  public startTime: number;
  public dungeon: Dungeon;

  constructor(private heroService: HeroService, private combatHandler: CombatHandlerService) {
		this.dungeon = new Dungeon();
		this.startTime = new Date().getTime ();
		this.enterDungeon ();
	}

	enterDungeon() {
		this.dungeon.reset ();
		this.timer = window.setInterval(() => this.tick (), 1000);
	}

	tick() {
		this.combatHandler.resolveCombat(this.dungeon.monsters[0]);
    this.dungeon.update();
	}
}
