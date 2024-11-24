import { CampaignSetting } from '../models/campaign-setting';
import { Collections } from '../utils/collections';
import { Item } from '../models/item';

export class ItemData {
	static getItems = (settings: CampaignSetting[]) => {
		const list: Item[] = [];

		settings.forEach(setting => {
			list.push(...setting.items);
		});

		return Collections.sort(list, item => item.name);
	};
}
