import { Element } from './element';
import { Feature } from './feature';
import { PerkType } from '../enums/perk-type';

export interface Perk extends Element {
	type: PerkType;
	features: Feature[];
}
