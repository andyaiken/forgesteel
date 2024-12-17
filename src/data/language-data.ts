import { Collections } from '../utils/collections';
import { Language } from '../models/language';
import { Sourcebook } from '../models/sourcebook';

export class LanguageData {
	static getLanguages = (sourcebooks: Sourcebook[]) => {
		const list: Language[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.languages);
		});

		return Collections.sort(list, item => item.name);
	};
}
