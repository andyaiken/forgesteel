import { Ancestry } from './ancestry';
import { CampaignSetting } from './campaign-setting';
import { Career } from './career';
import { Complication } from './complication';
import { Culture } from './culture';
import { HeroClass } from './class';
import { Kit } from './kit';

export interface Sourcebook {
	settings: CampaignSetting[];
	ancestries: Ancestry[];
	cultures: Culture[];
	careers: Career[];
	classes: HeroClass[];
	kits: Kit[];
	complications: Complication[];
}
