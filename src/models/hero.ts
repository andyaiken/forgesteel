import { ConditionEndType, ConditionType } from '../enums/condition-type';
import { Ancestry } from './ancestry';
import { Career } from './career';
import { Characteristic } from '../enums/characteristic';
import { Complication } from './complication';
import { Culture } from './culture';
import { HeroClass } from './class';
import { Item } from './item';

export interface Condition {
	id: string;
	type: ConditionType;
	ends: ConditionEndType;
	resistCharacteristic: Characteristic;
}

export interface HeroState {
	staminaDamage: number;
	recoveriesUsed: number;
	surges: number;
	victories: number;
	xp:number;
	heroicResource: number;
	heroTokens: number;
	renown: number;
	projectPoints: number;
	conditions: Condition[];
	inventory: Item[];
}

export interface Hero {
	id: string;
	name: string;

	settingIDs: string[];

	ancestry: Ancestry | null;
	culture: Culture | null;
	class: HeroClass | null;
	career: Career | null;
	complication: Complication | null;

	state: HeroState;
}
