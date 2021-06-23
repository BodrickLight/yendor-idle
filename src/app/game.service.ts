import { Injectable } from '@angular/core';
import { Dungeon } from './dungeon';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

	private timer!: number;
  public startTime: number;
  public dungeon: Dungeon;

  constructor(private heroService: HeroService) {
		this.dungeon = new Dungeon();
		this.startTime = new Date().getTime ();
		this.enterDungeon ();
	}

	dump():string {
		return JSON.stringify(this, null, "  ");
	}

	enterDungeon() {
		this.dungeon.reset ();
		this.timer = window.setInterval(() => this.tick (), 1000);
	}

	tick() {
		this.heroService.attack(this.dungeon.monsters[0]);
    this.dungeon.update();
	}
}
