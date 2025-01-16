import { ConditionEndType, ConditionType } from '../enums/condition-type';
import { Feature, FeatureItemChoice } from './feature';
import { Ancestry } from './ancestry';
import { Career } from './career';
import { Characteristic } from '../enums/characteristic';
import { Complication } from './complication';
import { Culture } from './culture';
import { HeroClass } from './class';

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
	wealth: number;
	projectPoints: number;
	conditions: Condition[];
	inventory: FeatureItemChoice[];
}

export interface AbilityCustomization {
	abilityID: string;
	name: string;
	description: string;
	notes: string;
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

	features: Feature[];
	state: HeroState;
	abilityCustomizations: AbilityCustomization[];
}
