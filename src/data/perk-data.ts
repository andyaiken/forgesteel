import { CampaignSetting } from '../models/campaign-setting';
import { Collections } from '../utils/collections';
import { Perk } from '../models/perk';

export class PerkData {
	static getPerks = (settings: CampaignSetting[]) => {
		const list: Perk[] = [];

		settings.forEach(setting => {
			list.push(...setting.perks);
		});

		return Collections.sort(list, item => item.name);
	};
}
