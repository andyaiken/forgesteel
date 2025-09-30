import type { Feature } from '@/models/feature';
import type { PerkList } from '@/enums/perk-list';

export type Perk<TFeature extends Feature = Feature> = TFeature & { list: PerkList };
