import { Encounter } from './encounter';

export class DungeonLevel {
  constructor(
    public readonly level: number,
    private readonly encounters: Encounter[]
  ) {
    this.complete = false;
    this.currentEncounterIdx = 0;
    this.encounterNumber = this.currentEncounterIdx + 1;
    this.currentEncounter = this.encounters[this.currentEncounterIdx];
    this.floorSize = encounters.length;
  }

  currentEncounter?: Encounter;
  private currentEncounterIdx: number;
  complete: boolean;

  floorSize: number;
  encounterNumber: number;

  update() {
    if (this.complete || !this.currentEncounter) {
      return;
    }

    if (this.currentEncounter.monsters.every((m) => m.hp.current <= 0)) {
      this.currentEncounterIdx++;
      this.encounterNumber = this.currentEncounterIdx + 1;
      this.currentEncounter = this.encounters[this.currentEncounterIdx];
    }

    this.complete = this.currentEncounterIdx >= this.encounters.length;
  }
}
