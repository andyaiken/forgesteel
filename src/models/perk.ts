import { Feature } from './feature';
import { PerkList } from '../enums/perk-list';

export interface Perk extends Feature {
	list: PerkList;
}
