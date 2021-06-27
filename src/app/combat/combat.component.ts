import { Component, OnInit } from '@angular/core';
import { DungeonService } from '../dungeon.service';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {

  constructor(public hero: HeroService, public dungeon: DungeonService) { }

  ngOnInit(): void {
  }
}
