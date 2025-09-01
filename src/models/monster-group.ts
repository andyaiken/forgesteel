import { FeatureAbility, FeatureAddOn, FeatureMalice } from './feature';
import { Element } from './element';
import { Monster } from './monster';

export interface MonsterGroup extends Element {
	picture: string | null;
	information: Element[];
	malice: (FeatureMalice | FeatureAbility)[];
	monsters: Monster[];
	addOns: FeatureAddOn[];
};
