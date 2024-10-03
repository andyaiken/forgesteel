import { CampaignSetting } from '../models/campaign-setting';
import { Collections } from '../utils/collections';
import { Language } from '../models/language';

export class LanguageData {
	static getLanguages = (settings: CampaignSetting[]) => {
		const list: Language[] = [];

		settings.forEach(setting => {
			list.push(...setting.languages);
		});

		return Collections.sort(list, item => item.name);
	};
}
