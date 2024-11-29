import { CampaignSetting } from '../models/campaign-setting';
import { Collections } from '../utils/collections';
import { MonsterGroup } from '../models/monster';

export class MonsterGroupData {
	static getMonsterGroups = (settings: CampaignSetting[]) => {
		const list: MonsterGroup[] = [];

		settings.forEach(setting => {
			list.push(...setting.monsterGroups);
		});

		return Collections.sort(list, item => item.name);
	};
}
