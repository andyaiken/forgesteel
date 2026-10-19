import { describe, expect, it } from 'vitest';
import { AbilityUsage } from '@/enums/ability-usage';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
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
