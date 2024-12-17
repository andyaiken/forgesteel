import { Collections } from '../utils/collections';
import { Item } from '../models/item';
import { Sourcebook } from '../models/sourcebook';

export class ItemData {
	static getItems = (sourcebooks: Sourcebook[]) => {
		const list: Item[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.items);
		});

		return Collections.sort(list, item => item.name);
	};
}
