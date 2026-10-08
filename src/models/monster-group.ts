import { Feature, FeatureAddOn } from '@/models/feature';
import { Element } from '@/models/element';
import { Extensible } from '@/models/extension';
import { Monster } from '@/models/monster';

export interface MonsterGroup extends Element, Extensible {
	picture: string | null;
	information: Element[];
	malice: Feature[];
	monsters: Monster[];
	addOns: FeatureAddOn[];
};
