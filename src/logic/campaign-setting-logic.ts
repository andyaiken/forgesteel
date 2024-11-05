import { Ancestry } from '../models/ancestry';
import { CampaignSetting } from '../models/campaign-setting';
import { Career } from '../models/career';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { Domain } from '../models/domain';
import { HeroClass } from '../models/class';
import { Kit } from '../models/kit';
import { Perk } from '../models/perk';

export class CampaignSettingLogic {
	static getElementCount = (setting: CampaignSetting) => {
		let count = 0;

		count += setting.ancestries.length;
		count += setting.cultures.length;
		count += setting.careers.length;
		count += setting.classes.length;
		count += setting.complications.length;
		count += setting.kits.length;
		count += setting.domains.length;
		count += setting.perks.length;

		return count;
	};

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

	static getComplicationSetting = (settings: CampaignSetting[], complication: Complication) => {
		return settings.find(cs => cs.complications.find(c => c.id === complication.id));
	};

	static getKitSetting = (settings: CampaignSetting[], kit: Kit) => {
		return settings.find(cs => cs.kits.find(k => k.id === kit.id));
	};

	static getDomainSetting = (settings: CampaignSetting[], domain: Domain) => {
		return settings.find(cs => cs.domains.find(d => d.id === domain.id));
	};

	static getPerkSetting = (settings: CampaignSetting[], perk: Perk) => {
		return settings.find(cs => cs.perks.find(p => p.id === perk.id));
	};
}
