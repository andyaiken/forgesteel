import { Ancestry } from '@/models/ancestry';
import { Career } from '@/models/career';
import { Characteristic } from '@/enums/characteristic';
import { Complication } from '@/models/complication';
import { Culture } from '@/models/culture';
import { Feature } from '@/models/feature';
import { HeroClass } from '@/models/class';
import { HeroState } from '@/models/hero-state';

export interface AbilityCustomization {
	abilityID: string;
	name: string;
	description: string;
	notes: string;
	distanceBonus: number;
	damageBonus: number;
	characteristic: Characteristic | null;
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
