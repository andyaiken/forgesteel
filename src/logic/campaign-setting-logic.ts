import { Ancestry } from '../models/ancestry';
import { CampaignSetting } from '../models/campaign-setting';
import { Career } from '../models/career';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { HeroClass } from '../models/class';
import { Kit } from '../models/kit';

export class CampaignSettingLogic {
	static getAncestrySetting = (settings: CampaignSetting[], ancestry: Ancestry) => {
		return settings.find(cs => cs.ancestries.find(a => a.id === ancestry.id));
	};

	static getCultureSetting = (settings: CampaignSetting[], culture: Culture) => {
		return settings.find(cs => cs.cultures.find(c => c.id === culture.id));
	};

	static getCareerSetting = (settings: CampaignSetting[], career: Career) => {
		return settings.find(cs => cs.careers.find(c => c.id === career.id));
	};

	static getClassSetting = (settings: CampaignSetting[], heroClass: HeroClass) => {
		return settings.find(cs => cs.classes.find(c => c.id === heroClass.id));
	};

	static getKitSetting = (settings: CampaignSetting[], kit: Kit) => {
		return settings.find(cs => cs.kits.find(k => k.id === kit.id));
	};

	static getComplicationSetting = (settings: CampaignSetting[], complication: Complication) => {
		return settings.find(cs => cs.complications.find(c => c.id === complication.id));
	};
}
