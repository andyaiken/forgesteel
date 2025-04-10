import { Ancestry } from './ancestry';
import { Career } from './career';
import { Complication } from './complication';
import { Condition } from './condition';
import { Culture } from './culture';
import { Feature } from './feature';
import { HeroClass } from './class';
import { Item } from './item';
import { Project } from './project';

export interface HeroState {
	staminaDamage: number;
	staminaTemp: number;
	recoveriesUsed: number;
	surges: number;
	victories: number;
	xp: number;
	heroicResource: number;
	heroTokens: number;
	renown: number;
	wealth: number;
	projectPoints: number;
	conditions: Condition[];
	inventory: Item[];
	projects: Project[];
	notes: string;
	hidden: boolean;
	acted: boolean;
	defeated: boolean;
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

	folder: string;
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

export type HeroEditTab = 'start' | 'ancestry' | 'culture' | 'career' | 'class' | 'complication' | 'details';
