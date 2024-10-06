import { Ancestry } from './ancestry';
import { Career } from './career';
import { Complication } from './complication';
import { Culture } from './culture';
import { HeroClass } from './class';
import { Kit } from './kit';
import { Language } from './language';
import { Skill } from './skill';

export interface CampaignSetting {
	id: string;
	name: string;
	description: string;

	isHomebrew: boolean;
	ancestries: Ancestry[];
	cultures: Culture[];
	careers: Career[];
	classes: HeroClass[];
	kits: Kit[];
	complications: Complication[];
	skills: Skill[];
	languages: Language[];
	defaultLanguages: string[];
}
