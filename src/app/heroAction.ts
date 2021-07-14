import { HeroActionType } from './heroActionType';
import { Offset } from './offset';

export interface HeroAction {
  type: HeroActionType;
  direction?: Offset;
}
