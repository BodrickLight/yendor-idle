import { Attack } from './attack';

export interface MonsterDefinition {
  ac: number;
  attacks: Attack[];
  color: string;
  difficulty: number;
  experience: number;
  frequency: number;
  glyph: string;
  mId: number;
  level: number;
  name: string;
  size: string;
}
