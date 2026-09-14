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

describe('monster ids', () => {
	test('feature ids are unique across all monsters', () => {
		// Duplicates collide as React keys and make features ambiguous to look up
		const owners = new Map<string, string[]>();
		allMonsters.forEach(monster => {
			MonsterLogic.getFeatures(monster).forEach(f => {
				owners.set(f.id, [ ...(owners.get(f.id) ?? []), `${monster.name} / ${f.name}` ]);
			});
		});
		const duplicates = [ ...owners.entries() ]
			.filter(([ , holders ]) => holders.length > 1)
			.map(([ id, holders ]) => `${id}: ${holders.join(', ')}`);
		expect(duplicates).toEqual([]);
	});

	test('monster ids are unique', () => {
		const seen = new Map<string, string[]>();
		allMonsters.forEach(m => seen.set(m.id, [ ...(seen.get(m.id) ?? []), m.name ]));
		const duplicates = [ ...seen.entries() ]
			.filter(([ , names ]) => names.length > 1)
			.map(([ id, names ]) => `${id}: ${names.join(', ')}`);
		expect(duplicates).toEqual([]);
	});
});

describe('monster potencies', () => {
	// Confirmed against the published stat block: this one really does hold one potency across all three tiers
	const flatPotencyExceptions = [ 'Omen Dragon / Souls of the Broken' ];

	test('a power roll\'s potency rises with each tier', () => {
		// A tier's potency is one higher than the tier below it, so repeating a value across tiers is a typo
		const flat: string[] = [];
		allMonsters.forEach(monster => {
			MonsterLogic.getFeatures(monster).forEach(f => {
				if (f.type !== 'Ability') {
					return;
				}
				f.data.ability.sections.forEach(section => {
					if (section.type !== 'roll') {
						return;
					}
					const values = [ section.roll.tier1, section.roll.tier2, section.roll.tier3 ]
						.map(tier => [ ...tier.matchAll(/([MARIP])\s*<\s*(\d)/gi) ])
						.map(matches => matches.length === 1 ? Number.parseInt(matches[0][2]) : null)
						.filter(v => v !== null);
					const name = `${monster.name} / ${f.data.ability.name}`;
					if (new Set(values).size !== values.length && !flatPotencyExceptions.includes(name)) {
						flat.push(`${name}: ${values.join('/')}`);
					}
				});
			});
		});
		expect(flat).toEqual([]);
	});

	test('a power roll\'s damage moves in one direction across the tiers', () => {
		// Damage climbs when the monster rolls and falls when the target makes a test - never both
		const erratic: string[] = [];
		allMonsters.forEach(monster => {
			MonsterLogic.getFeatures(monster).forEach(f => {
				if (f.type !== 'Ability') {
					return;
				}
				f.data.ability.sections.forEach(section => {
					if (section.type !== 'roll') {
						return;
					}
					const damage = [ section.roll.tier1, section.roll.tier2, section.roll.tier3 ]
						.map(tier => tier.match(/^(\d+)\s/))
						.map(match => match ? Number.parseInt(match[1]) : null);
					if (damage.some(d => d === null)) {
						return;
					}
					const [ t1, t2, t3 ] = damage as number[];
					if (!(t1 <= t2 && t2 <= t3) && !(t1 >= t2 && t2 >= t3)) {
						erratic.push(`${monster.name} / ${f.data.ability.name}: ${damage.join('/')}`);
					}
				});
			});
		});
		expect(erratic).toEqual([]);
	});
});
