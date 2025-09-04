import { Ancestry } from './ancestry';
import { Career } from './career';
import { Complication } from './complication';
import { Culture } from './culture';
import { Feature } from './feature';
import { HeroClass } from './class';
import { HeroState } from './hero-state';

export interface AbilityCustomization {
	abilityID: string;
	name: string;
	description: string;
	notes: string;
}

export interface Hero {
	id: string;
	name: string;

	picture: string | null;
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
