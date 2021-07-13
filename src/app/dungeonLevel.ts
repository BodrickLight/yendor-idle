import { Encounter } from './encounter';

export class DungeonLevel {
  currentEncounter?: Encounter;

  complete: boolean;

  floorSize: number;

  private currentEncounterIdx: number;

  constructor(
    public readonly level: number,
    private readonly encounters: Encounter[],
  ) {
    this.complete = false;
    this.currentEncounterIdx = 0;
    this.currentEncounter = this.encounters[this.currentEncounterIdx];
    this.floorSize = encounters.length;
  }

  moveToNextEncounter() {
    if (this.complete || !this.currentEncounter) {
      return;
    }

    this.currentEncounterIdx += 1;
    this.currentEncounter = this.encounters[this.currentEncounterIdx];
    this.complete = this.currentEncounterIdx >= this.encounters.length;
  }

  update() {
    if (this.complete || !this.currentEncounter) {
      return;
    }

    this.currentEncounter.monsters = this.currentEncounter.monsters.filter((x) => x.alive);
  }
}
