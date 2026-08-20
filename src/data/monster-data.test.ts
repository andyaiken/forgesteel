import { describe, expect, test } from 'vitest';
import { Monster } from '@/models/monster';
import { MonsterData } from '@/data/monster-data';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterLogic } from '@/logic/monster-logic';

const allMonsters = Object.values(MonsterData)
	.filter((group): group is MonsterGroup => !!group && typeof group === 'object' && 'monsters' in group)
	.flatMap(group => group.monsters as Monster[]);

describe('monster power rolls', () => {
	test('every power roll states either a bonus or the characteristics the target tests', () => {
		// Without either, the sheet has to guess the bonus from the potency values in the tier text
		const gaps: string[] = [];
		allMonsters.forEach(monster => {
			MonsterLogic.getFeatures(monster).forEach(f => {
				if (f.type !== 'Ability') {
					return;
				}
				f.data.ability.sections.forEach(section => {
					if (section.type !== 'roll') {
						return;
					}
					if (!section.roll.bonus && !section.roll.characteristic.length) {
						gaps.push(`${monster.name} / ${f.data.ability.name}`);
					}
				});
			});
		});
		expect(gaps).toEqual([]);
	});
});
