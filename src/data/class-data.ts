import { Collections } from '../utils/collections';
import { HeroClass } from '../models/class';
import { Sourcebook } from '../models/sourcebook';

export class ClassData {
	static getClasses = (sourcebooks: Sourcebook[]) => {
		const list: HeroClass[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.classes);
		});

		return Collections.sort(list, item => item.name);
	};
}
