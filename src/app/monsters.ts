import { MonsterDefinition } from './monsterDefiniton';
import { Size } from './size';

export const MONSTERS: MonsterDefinition[] = [
  {
    mId: 1,
    name: 'newt',
    glyph: ':',
    color: 'yellow',
    level: 0,
    experience: 1,
    size: Size.Tiny,
    frequency: 5,
    ac: 8,
    difficulty: 1,
    attacks: [
      {
        type: 'bite',
        damage: '1d2',
      },
    ],
  },
  {
    mId: 2,
    name: 'jackal',
    glyph: 'd',
    color: 'brown',
    level: 0,
    experience: 1,
    size: Size.Small,
    frequency: 3,
    ac: 7,
    difficulty: 1,
    attacks: [
      {
        type: 'bite',
        damage: '1d2',
      },
    ],
  },
  {
    mId: 3,
    name: 'sewer rat',
    glyph: 'r',
    color: 'brown',
    level: 0,
    experience: 1,
    frequency: 1,
    difficulty: 1,
    size: Size.Tiny,
    ac: 7,
    attacks: [
      {
        type: 'bite',
        damage: '1d3',
      },
    ],
  },
  {
    mId: 4,
    name: 'fox',
    glyph: 'd',
    color: 'red',
    level: 0,
    experience: 4,
    frequency: 1,
    difficulty: 1,
    size: Size.Small,
    ac: 7,
    attacks: [
      {
        type: 'bite',
        damage: '1d3',
      },
    ],
  },
  {
    mId: 5,
    name: 'kobold lord',
    glyph: 'k',
    color: 'purple',
    level: 2,
    experience: 22,
    frequency: 1,
    difficulty: 3,
    size: Size.Small,
    ac: 10,
    attacks: [
      {
        type: 'weapon',
        damage: '2d4',
      },
    ],
  },
];
