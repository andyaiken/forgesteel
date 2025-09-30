import { FeatureAddOn, FeatureMalice, FeatureMaliceAbility } from '@/models/feature';
import { Element } from '@/models/element';
import { Monster } from '@/models/monster';

export interface MonsterGroup extends Element {
	picture: string | null;
	information: Element[];
	malice: (FeatureMalice | FeatureMaliceAbility)[];
	monsters: Monster[];
	addOns: FeatureAddOn[];
};
