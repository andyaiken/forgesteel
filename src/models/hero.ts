import { Ancestry } from './ancestry';
import { Career } from './career';
import { Complication } from './complication';
import { Condition } from '../enums/condition';
import { Culture } from './culture';
import { HeroClass } from './class';
import { Kit } from './kit';

export interface HeroState {
	staminaDamage: number;
	recoveriesUsed: number;
	victories: number;
	heroicResource: number;
	heroTokens: number;
	renown: number;
	projectPoints: number;
	conditions: Condition[];
}

export interface Hero {
	id: string;
	name: string;

	settingID: string;

	ancestry: Ancestry | null;
	culture: Culture | null;
	class: HeroClass | null;
	career: Career | null;
	complication: Complication | null;
	kit: Kit | null;

	state: HeroState;
}
