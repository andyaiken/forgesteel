import { describe, expect, it } from 'vitest';
import { AbilityUsage } from '@/enums/ability-usage';
import { FeatureType } from '@/enums/feature-type';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { elementalist } from '@/data/classes/elementalist/elementalist';
import { talent } from '@/data/classes/talent/talent';

describe('getAbilitiesFromClass', () => {
	it('retains the level of abilities granted by subclass levels', () => {
		const abilities = SourcebookLogic.getAbilitiesFromClass(talent, false, false, false, false, false, true);
		const rogueTalentAbilities = abilities
			.filter(ability => ability.cost === 0 && ability.minLevel <= 1 && ability.type.usage === AbilityUsage.Trigger)
			.map(ability => ability.name)
			.sort();

		expect(rogueTalentAbilities).toEqual([ 'Again', 'Feedback Loop', 'Repel' ]);
	});
});

describe('getClassAbilityOptions', () => {
	const getChoice = (id: string) => {
		const feature = elementalist.featuresByLevel.flatMap(lvl => lvl.features).find(f => f.id === id);
		if (!feature || (feature.type !== FeatureType.ClassAbility)) {
			throw new Error(`No class ability feature ${id}`);
		}
		return feature.data;
	};

	const getLevels = (id: string) => {
		const levels = SourcebookLogic.getClassAbilityOptions(elementalist, getChoice(id)).map(a => a.minLevel);
		return [ ...new Set(levels) ].sort((a, b) => a - b);
	};

	// At levels 2, 6, and 9 an elementalist can instead take an ability of the same cost that they didn't choose at the level before
	it('offers an elementalist the abilities of the previous level at levels 2, 6, and 9', () => {
		expect(getLevels('elementalist-2-2')).toEqual([ 1, 2 ]);
		expect(getLevels('elementalist-6-3')).toEqual([ 5, 6 ]);
		expect(getLevels('elementalist-9-2')).toEqual([ 8, 9 ]);

		const names = SourcebookLogic.getClassAbilityOptions(elementalist, getChoice('elementalist-2-2')).map(a => a.name);
		expect(names).toContain('Conflagration');
	});

	it('does not offer an elementalist abilities from a higher level', () => {
		expect(getLevels('elementalist-1-11')).toEqual([ 1 ]);
		expect(getLevels('elementalist-3-1')).toEqual([ 3 ]);
		expect(getLevels('elementalist-5-1')).toEqual([ 5 ]);
		expect(getLevels('elementalist-8-2')).toEqual([ 8 ]);
	});
});
