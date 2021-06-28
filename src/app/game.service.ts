import { Injectable } from '@angular/core';
import { LogType } from 'src/app/logType';
import { CombatHandlerService } from './combat-handler.service';
import { DungeonService } from './dungeon.service';
import { HeroService } from './hero.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

	private timer!: number;
	public startTime: number;

	constructor(private hero: HeroService, private dungeon: DungeonService, private combatHandler: CombatHandlerService, private logger: LogService) {
		this.startTime = new Date().getTime ();
		this.enterDungeon ();
	}

	enterDungeon() {
		this.dungeon.reset ();
		this.timer = window.setInterval(() => this.tick (), 1000);
	}

	tick() {
		this.combatHandler.resolveCombat();
		this.dungeon.update();
		if (this.hero.hp.current <= 0) {
			this.logger.log("You die...", LogType.HeroDeath);
			window.clearInterval(this.timer);
		}
	}
}
