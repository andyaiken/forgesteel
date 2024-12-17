import { Collections } from '../utils/collections';
import { Perk } from '../models/perk';
import { Sourcebook } from '../models/sourcebook';

export class PerkData {
	static getPerks = (sourcebooks: Sourcebook[]) => {
		const list: Perk[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.perks);
		});

		return Collections.sort(list, item => item.name);
	};
}
