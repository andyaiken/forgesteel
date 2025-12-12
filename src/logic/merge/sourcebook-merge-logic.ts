import { MergeDuplicateBehavior } from '@/enums/merge-duplicate-behavior';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';

export class SourcebookMergeLogic {
	static merge = (source: Sourcebook[], target: Sourcebook[], onDuplicate: MergeDuplicateBehavior = MergeDuplicateBehavior.Skip): Sourcebook[] => {
		let result: Sourcebook[] = Utils.copy(target);

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

	static containsDuplicates = (source: Sourcebook[], target: Sourcebook[]): boolean => {
		return !source.every(a => target.every(b => b.id !== a.id));
	};

	// ONLY looks at Ids!
	static missingData = (reference: Sourcebook[], check: Sourcebook[]): boolean => {
		return !reference.every(a => check.some(b => b.id === a.id));
	};
};
