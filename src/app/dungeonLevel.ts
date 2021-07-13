import { Encounter } from './encounter';

export class DungeonLevel {
  private currentEncounterIdx: number;

  constructor(
    public readonly level: number,
    private readonly encounters: Encounter[],
  ) {
    this.currentEncounterIdx = 0;
  }

  get currentEncounter() {
    return this.encounters[this.currentEncounterIdx];
  }

  get complete() {
    return this.currentEncounterIdx >= this.encounters.length;
  }

  addEncounter(encounter: Encounter) {
    this.encounters.push(encounter);
  }

  moveToNextEncounter() {
    if (this.complete || !this.currentEncounter) {
      return;
    }

    this.currentEncounterIdx += 1;
  }

  update() {
    if (this.complete || !this.currentEncounter) {
      return;
    }

    this.currentEncounter.monsters = this.currentEncounter.monsters.filter((x) => x.alive);
  }
}
