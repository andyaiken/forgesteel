import type { Feature } from './feature';
import type { PerkList } from '../enums/perk-list';

export type Perk<TFeature extends Feature = Feature> = TFeature & { list: PerkList };
