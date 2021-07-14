import { StatusEffectType } from './statusEffectType';

export interface StatusEffect {
  type: StatusEffectType;
  duration?: number;
}
