import { CampaignSetting } from '../models/campaign-setting';
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
		}

		return Collections.sort(list, item => item.name);
	};
}
