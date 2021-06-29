import { MonsterDefinition } from "./monsterDefiniton";

export const MONSTERS: MonsterDefinition[] = [
  {
    id: 1,
    name: 'newt',
    glyph: ':',
    color: 'yellow',
    hp: '1d4',
    evasion: 10,
    accuracy: 2,
  },
  {
    id: 2,
    name: 'jackal',
    glyph: 'd',
    color: 'brown',
    hp: '1d4',
    evasion: 5,
    accuracy: 10,
  },
  {
    id: 3,
    name: 'rat',
    glyph: 'r',
    color: 'brown',
    hp: '1d4',
    evasion: 10,
    accuracy: 5,
  },
];
