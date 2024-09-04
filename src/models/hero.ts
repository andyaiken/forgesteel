import { Condition } from '../enums/condition';
import { Ancestry } from './ancestry';
import { Career } from './career';
import { HeroClass } from './class';
import { Complication } from './complication';
import { Culture } from './culture';
import { Kit } from './kit';

export interface HeroState {
	stamina: number;
	recoveries: number;
	victories: number;
	heroicResource: number;
	renown: number;
	conditions: Condition[];
}

export interface Hero {
	id: string;
	name: string;

	ancestry: Ancestry | null;
	culture: Culture | null;
	class: HeroClass | null;
	career: Career | null;
	complication: Complication | null;
	kits: Kit[];

	state: HeroState;
}
