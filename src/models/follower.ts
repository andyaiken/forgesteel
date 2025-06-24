import { Characteristic } from '../enums/characteristic';
import { Element } from './element';
import { FollowerType } from '../enums/follower-type';

export interface Follower extends Element {
	type: FollowerType;
	characteristics: {
		characteristic: Characteristic;
		value: number;
	}[];
	skills: string[];
	languages: string[];
}
