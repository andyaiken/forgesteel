import { Characteristic } from '../enums/characteristic';
import { Element } from './element';

export interface Project extends Element {
	itemPrerequisites: string;
	source: string;
	characteristic: Characteristic[];
	goal: number;
	effect: string;
}
