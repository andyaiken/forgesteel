import { CampaignSetting } from '../models/campaign-setting';
import { CampaignSettingData } from './campaign-setting-data';
import { Collections } from '../utils/collections';
import { conduit } from './classes/conduit';
import { elementalist } from './classes/elementalist';
import { fury } from './classes/fury';
import { shadow } from './classes/shadow';
import { tactician } from './classes/tactician';

export class ClassData {
	static getClasses = (setting?: CampaignSetting) => {
		const list = [
			conduit,
			elementalist,
			fury,
			shadow,
			tactician
		];

		if (setting) {
			list.push(...setting.classes);
		} else {
			CampaignSettingData.getCampaignSettings()
				.forEach(s => {
					list.push(...s.classes);
				});
		}

		return Collections.sort(list, item => item.name);
	};
}
