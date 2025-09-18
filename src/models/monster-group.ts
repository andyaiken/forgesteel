import { FeatureAddOn, FeatureMalice, FeatureMaliceAbility } from './feature';
import { Element } from './element';
import { Monster } from './monster';

export interface MonsterGroup extends Element {
	picture: string | null;
	information: Element[];
	malice: (FeatureMalice | FeatureMaliceAbility)[];
	monsters: Monster[];
	addOns: FeatureAddOn[];
};
