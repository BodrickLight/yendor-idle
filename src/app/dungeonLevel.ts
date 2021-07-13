import { Encounter } from './encounter';

export class DungeonLevel {
  currentEncounter?: Encounter;

  complete: boolean;

  floorSize: number;

  encounterNumber: number;

  private currentEncounterIdx: number;

  constructor(
    public readonly level: number,
    private readonly encounters: Encounter[],
  ) {
    this.complete = false;
    this.currentEncounterIdx = 0;
    this.encounterNumber = this.currentEncounterIdx + 1;
    this.currentEncounter = this.encounters[this.currentEncounterIdx];
    this.floorSize = encounters.length;
  }

  update() {
    if (this.complete || !this.currentEncounter) {
      return;
    }

    if (this.currentEncounter.monsters.every((m) => !m.alive)) {
      this.currentEncounterIdx += 1;
      this.encounterNumber = this.currentEncounterIdx + 1;
      this.currentEncounter = this.encounters[this.currentEncounterIdx];
    }

    this.complete = this.currentEncounterIdx >= this.encounters.length;
  }
}
