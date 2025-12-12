import { Hero } from '@/models/hero';
import { MergeDuplicateBehavior } from '@/enums/merge-duplicate-behavior';
import { Utils } from '@/utils/utils';

export class HeroMergeLogic {
	static merge = (source: Hero[], target: Hero[], onDuplicate: MergeDuplicateBehavior = MergeDuplicateBehavior.Skip): Hero[] => {
		let result: Hero[] = Utils.copy(target);

		source.forEach(src => {
			const existing = result.find(s => s.id === src.id);
			if (!existing) {
				result.push(src);
			} else if (onDuplicate === MergeDuplicateBehavior.Replace) {
				result = result.filter(sb => sb.id !== src.id);
				result.push(src);
			}
		});

		return result;
	};

	// ONLY looks at Ids!
	static containsDuplicates = (source: Hero[], target: Hero[]): boolean => {
		return !source.every(a => target.every(b => b.id !== a.id));
	};

	// ONLY looks at Ids!
	static missingData = (reference: Hero[], check: Hero[]): boolean => {
		return !reference.every(a => check.some(b => b.id === a.id));
	};
};
