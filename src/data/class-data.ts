import { CampaignSetting } from '../models/campaign-setting';
import { Collections } from '../utils/collections';
import { HeroClass } from '../models/class';

export class ClassData {
	static getClasses = (settings: CampaignSetting[]) => {
		const list: HeroClass[] = [];

		settings.forEach(setting => {
			list.push(...setting.classes);
		});

		return Collections.sort(list, item => item.name);
	};
}
