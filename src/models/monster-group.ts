import { Feature, FeatureAddOn } from '@/models/feature';
import { Element } from '@/models/element';
import { Monster } from '@/models/monster';

export interface MonsterGroup extends Element {
	picture: string | null;
	information: Element[];
	malice: Feature[];
	monsters: Monster[];
	addOns: FeatureAddOn[];
};
