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

	languages: Language[];
	defaultLanguages: string[];
	skills: Skill[];

	ancestries: Ancestry[];
	cultures: Culture[];
	classes: HeroClass[];
	careers: Career[];
	complications: Complication[];
	kits: Kit[];
}
