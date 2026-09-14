import { describe, expect, test } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';

// A representative role for each stamina tier, and for each damage tier
const LOW_ROLE = MonsterRoleType.Hexer;
const MED_ROLE = MonsterRoleType.Harrier;
const HIGH_ROLE = MonsterRoleType.Defender;
const NORMAL_ROLE = MonsterRoleType.Hexer;
const DPS_ROLE = MonsterRoleType.Artillery;

const getStats = (organization: MonsterOrganizationType, role: MonsterRoleType, level: number) => {
	const monster = FactoryLogic.createMonster({
		id: 'test',
		name: 'Test',
		level: level,
		role: FactoryLogic.createMonsterRole(organization, role),
		keywords: [],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'M'),
		speed: FactoryLogic.createSpeed(5),
		stamina: 0,
		stability: 0,
		freeStrikeDamage: 0,
		characteristics: [],
		features: []
	});
	return MonsterLogic.getSuggestedStats(monster);
};

const asArray = (damage: { tier1: number, tier2: number, tier3: number }) => [ damage.tier1, damage.tier2, damage.tier3 ];

// Damage, transcribed from the monster math tables. For hordes and above these are
// the non-strike values, ie. the damage before the monster's characteristic is added.
const EXPECTED_DAMAGE: { organization: MonsterOrganizationType, damage: { normal: number[], dps: number[] }[] }[] = [
	{
		organization: MonsterOrganizationType.Minion,
		damage: [
			{ normal: [ 1, 2, 3 ], dps: [ 2, 4, 5 ] },
			{ normal: [ 2, 3, 5 ], dps: [ 3, 4, 6 ] },
			{ normal: [ 2, 4, 5 ], dps: [ 3, 5, 6 ] },
			{ normal: [ 2, 4, 6 ], dps: [ 3, 5, 7 ] },
			{ normal: [ 3, 5, 6 ], dps: [ 3, 6, 7 ] },
			{ normal: [ 3, 5, 7 ], dps: [ 4, 6, 8 ] },
			{ normal: [ 3, 6, 7 ], dps: [ 4, 7, 8 ] },
			{ normal: [ 3, 6, 8 ], dps: [ 4, 7, 9 ] },
			{ normal: [ 4, 6, 8 ], dps: [ 5, 7, 9 ] },
			{ normal: [ 4, 7, 9 ], dps: [ 5, 8, 10 ] },
			{ normal: [ 5, 7, 9 ], dps: [ 5, 8, 10 ] }
		]
	},
	{
		organization: MonsterOrganizationType.Horde,
		damage: [
			{ normal: [ 1, 2, 3 ], dps: [ 2, 4, 5 ] },
			{ normal: [ 2, 3, 5 ], dps: [ 3, 4, 6 ] },
			{ normal: [ 2, 4, 5 ], dps: [ 3, 5, 6 ] },
			{ normal: [ 2, 4, 6 ], dps: [ 3, 5, 7 ] },
			{ normal: [ 3, 5, 6 ], dps: [ 3, 6, 7 ] },
			{ normal: [ 3, 5, 7 ], dps: [ 4, 6, 8 ] },
			{ normal: [ 3, 6, 7 ], dps: [ 4, 7, 8 ] },
			{ normal: [ 3, 6, 8 ], dps: [ 4, 7, 9 ] },
			{ normal: [ 4, 6, 8 ], dps: [ 5, 7, 9 ] },
			{ normal: [ 4, 7, 9 ], dps: [ 5, 8, 10 ] },
			{ normal: [ 5, 7, 9 ], dps: [ 5, 8, 10 ] }
		]
	},
	{
		organization: MonsterOrganizationType.Platoon,
		damage: [
			{ normal: [ 3, 5, 7 ], dps: [ 4, 7, 10 ] },
			{ normal: [ 4, 7, 10 ], dps: [ 5, 8, 11 ] },
			{ normal: [ 5, 8, 11 ], dps: [ 5, 9, 12 ] },
			{ normal: [ 5, 9, 12 ], dps: [ 6, 10, 13 ] },
			{ normal: [ 6, 10, 13 ], dps: [ 6, 11, 14 ] },
			{ normal: [ 6, 11, 14 ], dps: [ 7, 12, 15 ] },
			{ normal: [ 7, 12, 15 ], dps: [ 7, 13, 16 ] },
			{ normal: [ 7, 13, 16 ], dps: [ 8, 13, 17 ] },
			{ normal: [ 8, 13, 17 ], dps: [ 9, 14, 18 ] },
			{ normal: [ 9, 14, 18 ], dps: [ 10, 15, 19 ] },
			{ normal: [ 10, 15, 19 ], dps: [ 10, 16, 20 ] }
		]
	},
	{
		organization: MonsterOrganizationType.Elite,
		damage: [
			{ normal: [ 4, 7, 10 ], dps: [ 5, 8, 11 ] },
			{ normal: [ 5, 8, 11 ], dps: [ 5, 9, 12 ] },
			{ normal: [ 5, 9, 12 ], dps: [ 6, 10, 13 ] },
			{ normal: [ 6, 10, 13 ], dps: [ 6, 11, 14 ] },
			{ normal: [ 6, 11, 14 ], dps: [ 7, 12, 15 ] },
			{ normal: [ 7, 12, 15 ], dps: [ 7, 13, 16 ] },
			{ normal: [ 7, 13, 16 ], dps: [ 8, 13, 17 ] },
			{ normal: [ 8, 13, 17 ], dps: [ 9, 14, 18 ] },
			{ normal: [ 9, 14, 18 ], dps: [ 10, 15, 19 ] },
			{ normal: [ 10, 15, 19 ], dps: [ 10, 16, 20 ] },
			{ normal: [ 10, 16, 20 ], dps: [ 11, 17, 21 ] }
		]
	},
	{
		organization: MonsterOrganizationType.Leader,
		damage: [
			{ normal: [ 4, 7, 10 ], dps: [ 4, 7, 10 ] },
			{ normal: [ 5, 8, 11 ], dps: [ 5, 8, 11 ] },
			{ normal: [ 5, 9, 12 ], dps: [ 5, 9, 12 ] },
			{ normal: [ 6, 10, 13 ], dps: [ 6, 10, 13 ] },
			{ normal: [ 6, 11, 14 ], dps: [ 6, 11, 14 ] },
			{ normal: [ 7, 12, 15 ], dps: [ 7, 12, 15 ] },
			{ normal: [ 7, 13, 16 ], dps: [ 7, 13, 16 ] },
			{ normal: [ 8, 13, 17 ], dps: [ 8, 13, 17 ] },
			{ normal: [ 9, 14, 18 ], dps: [ 9, 14, 18 ] },
			{ normal: [ 10, 15, 19 ], dps: [ 10, 15, 19 ] },
			{ normal: [ 10, 16, 20 ], dps: [ 10, 16, 20 ] }
		]
	},
	{
		organization: MonsterOrganizationType.Solo,
		damage: [
			{ normal: [ 5, 8, 11 ], dps: [ 5, 8, 11 ] },
			{ normal: [ 5, 9, 12 ], dps: [ 5, 9, 12 ] },
			{ normal: [ 6, 10, 13 ], dps: [ 6, 10, 13 ] },
			{ normal: [ 6, 11, 14 ], dps: [ 6, 11, 14 ] },
			{ normal: [ 7, 12, 15 ], dps: [ 7, 12, 15 ] },
			{ normal: [ 7, 13, 16 ], dps: [ 7, 13, 16 ] },
			{ normal: [ 8, 13, 17 ], dps: [ 8, 13, 17 ] },
			{ normal: [ 9, 14, 18 ], dps: [ 9, 14, 18 ] },
			{ normal: [ 10, 15, 19 ], dps: [ 10, 15, 19 ] },
			{ normal: [ 10, 16, 20 ], dps: [ 10, 16, 20 ] },
			{ normal: [ 11, 17, 21 ], dps: [ 11, 17, 21 ] }
		]
	}
];

// Stamina, transcribed from the monster math tables.
const EXPECTED_STAMINA: { organization: MonsterOrganizationType, stamina: { low: number[], med: number[], high: number[] } }[] = [
	{
		organization: MonsterOrganizationType.Minion,
		stamina: {
			low: [ 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 14 ],
			med: [ 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 15 ],
			high: [ 5, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18 ]
		}
	},
	{
		organization: MonsterOrganizationType.Horde,
		stamina: {
			low: [ 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 55 ],
			med: [ 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 60 ],
			high: [ 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70 ]
		}
	},
	{
		organization: MonsterOrganizationType.Platoon,
		stamina: {
			low: [ 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 110 ],
			med: [ 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 120 ],
			high: [ 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140 ]
		}
	},
	{
		organization: MonsterOrganizationType.Elite,
		stamina: {
			low: [ 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 220 ],
			med: [ 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 240 ],
			high: [ 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280 ]
		}
	},
	{
		organization: MonsterOrganizationType.Leader,
		stamina: { low: [ 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280 ], med: [ 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280 ], high: [ 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280 ] }
	},
	{
		organization: MonsterOrganizationType.Solo,
		stamina: { low: [ 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700 ], med: [ 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700 ], high: [ 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700 ] }
	}
];

// Encounter value, transcribed from the monster math tables.
const EXPECTED_EV: { organization: MonsterOrganizationType, ev: number[] }[] = [
	{ organization: MonsterOrganizationType.Minion, ev: [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ] },
	{ organization: MonsterOrganizationType.Horde, ev: [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ] },
	{ organization: MonsterOrganizationType.Platoon, ev: [ 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26 ] },
	{ organization: MonsterOrganizationType.Elite, ev: [ 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52 ] },
	{ organization: MonsterOrganizationType.Leader, ev: [ 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52 ] },
	{ organization: MonsterOrganizationType.Solo, ev: [ 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156 ] }
];

describe('getSuggestedStats', () => {
	describe('encounter value', () => {
		EXPECTED_EV.forEach(({ organization, ev }) => {
			test(`matches the tables for a ${organization}`, () => {
				ev.forEach((expected, index) => {
					expect(getStats(organization, LOW_ROLE, index + 1).ev).toBe(expected);
				});
			});
		});
	});

	describe('stamina', () => {
		EXPECTED_STAMINA.forEach(({ organization, stamina }) => {
			test(`matches the tables for a ${organization}`, () => {
				([ [ 'low', LOW_ROLE ], [ 'med', MED_ROLE ], [ 'high', HIGH_ROLE ] ] as const).forEach(([ tier, role ]) => {
					stamina[tier].forEach((expected, index) => {
						expect(getStats(organization, role, index + 1).stamina, `${organization} ${role} level ${index + 1}`).toBe(expected);
					});
				});
			});
		});

		test('does not vary by role for leaders and solos', () => {
			[ MonsterOrganizationType.Leader, MonsterOrganizationType.Solo ].forEach(organization => {
				const low = getStats(organization, LOW_ROLE, 5).stamina;
				expect(getStats(organization, MED_ROLE, 5).stamina).toBe(low);
				expect(getStats(organization, HIGH_ROLE, 5).stamina).toBe(low);
			});
		});

		test('tolerates being within one level of the suggestion', () => {
			// One level's worth of stamina, for this organization and stamina tier
			expect(getStats(MonsterOrganizationType.Minion, LOW_ROLE, 5).staminaTolerance).toBe(2);
			expect(getStats(MonsterOrganizationType.Horde, LOW_ROLE, 5).staminaTolerance).toBe(5);
			expect(getStats(MonsterOrganizationType.Platoon, LOW_ROLE, 5).staminaTolerance).toBe(10);
			expect(getStats(MonsterOrganizationType.Elite, LOW_ROLE, 5).staminaTolerance).toBe(20);
			expect(getStats(MonsterOrganizationType.Leader, LOW_ROLE, 5).staminaTolerance).toBe(20);
			expect(getStats(MonsterOrganizationType.Solo, LOW_ROLE, 5).staminaTolerance).toBe(50);
		});

		test('keeps the same tolerance where the table stops rising', () => {
			// The low and medium columns plateau at level 11, so the step to the previous level is 0
			[ MonsterOrganizationType.Minion, MonsterOrganizationType.Horde, MonsterOrganizationType.Platoon, MonsterOrganizationType.Elite ].forEach(organization => {
				[ LOW_ROLE, MED_ROLE, HIGH_ROLE ].forEach(role => {
					expect(getStats(organization, role, 11).staminaTolerance, `${organization} ${role}`).toBe(getStats(organization, role, 5).staminaTolerance);
				});
			});
		});

		test('has no tolerance for organizations the tables do not cover', () => {
			expect(getStats(MonsterOrganizationType.NoOrganization, LOW_ROLE, 1).staminaTolerance).toBe(0);
		});

		test('does not increase from level 10 to 11 for low and medium stamina roles', () => {
			expect(getStats(MonsterOrganizationType.Platoon, LOW_ROLE, 11).stamina).toBe(getStats(MonsterOrganizationType.Platoon, LOW_ROLE, 10).stamina);
			expect(getStats(MonsterOrganizationType.Platoon, MED_ROLE, 11).stamina).toBe(getStats(MonsterOrganizationType.Platoon, MED_ROLE, 10).stamina);
			expect(getStats(MonsterOrganizationType.Platoon, HIGH_ROLE, 11).stamina).toBeGreaterThan(getStats(MonsterOrganizationType.Platoon, HIGH_ROLE, 10).stamina);
		});
	});

	describe('damage', () => {
		EXPECTED_DAMAGE.forEach(({ organization, damage }) => {
			test(`matches the tables for a ${organization}`, () => {
				damage.forEach((expected, index) => {
					([ [ NORMAL_ROLE, expected.normal ], [ DPS_ROLE, expected.dps ] ] as const).forEach(([ role, base ]) => {
						const stats = getStats(organization, role, index + 1);
						const where = `${organization} ${role} level ${index + 1}`;
						expect(asArray(stats.baseDamage), where).toEqual(base);
						// The tables list damage before the characteristic; minions are the exception
						const bonus = organization === MonsterOrganizationType.Minion ? 0 : stats.highestCharacteristic;
						expect(asArray(stats.damage), where).toEqual(base.map(x => x + bonus));
					});
				});
			});
		});

		test('adds the highest characteristic to strikes, but not for minions', () => {
			const minion = getStats(MonsterOrganizationType.Minion, NORMAL_ROLE, 5);
			expect(minion.damage.tier1).toBe(minion.freeStrikeDamage);

			// Everyone else writes the damage of a strike on the statblock
			[ MonsterOrganizationType.Horde, MonsterOrganizationType.Platoon, MonsterOrganizationType.Elite, MonsterOrganizationType.Leader, MonsterOrganizationType.Solo ].forEach(organization => {
				const stats = getStats(organization, NORMAL_ROLE, 5);
				expect(stats.damage.tier1 - stats.freeStrikeDamage, organization).toBe(stats.highestCharacteristic);
			});
		});

		test('uses the tier 1 damage as the free strike damage', () => {
			EXPECTED_DAMAGE.forEach(({ organization, damage }) => {
				damage.forEach((expected, index) => {
					expect(getStats(organization, NORMAL_ROLE, index + 1).freeStrikeDamage).toBe(expected.normal[0]);
				});
			});
		});

		test('adjusts for target count the way the tables do', () => {
			// The tables round up 80% of the strike damage for an extra target, and take 120% of it
			// for one fewer, rounding up only from .7 - both work from the strike damage, not the base
			const platoon = getStats(MonsterOrganizationType.Platoon, NORMAL_ROLE, 11);
			expect(asArray(platoon.damage)).toEqual([ 15, 20, 24 ]);
			expect(asArray(platoon.damageMoreTargets), 'exact multiples must not round up').toEqual([ 12, 16, 20 ]);
			expect(asArray(platoon.damageFewerTargets)).toEqual([ 18, 24, 29 ]);

			// Minions add no characteristic, so their adjustments work from small numbers
			const minion = getStats(MonsterOrganizationType.Minion, NORMAL_ROLE, 1);
			expect(asArray(minion.damage)).toEqual([ 1, 2, 3 ]);
			expect(asArray(minion.damageMoreTargets)).toEqual([ 1, 2, 3 ]);
			expect(asArray(minion.damageFewerTargets)).toEqual([ 1, 2, 3 ]);
		});

		test('reproduces the worked example from the tables', () => {
			// A level 4 platoon brute, with a highest characteristic of 3
			const stats = getStats(MonsterOrganizationType.Platoon, MonsterRoleType.Brute, 4);
			expect(stats.highestCharacteristic).toBe(3);
			expect(stats.freeStrikeDamage).toBe(6);
			expect(asArray(stats.damage), 'strike damage').toEqual([ 9, 13, 16 ]);
			expect(asArray(stats.damageMoreTargets), 'strike with more targets').toEqual([ 8, 11, 13 ]);
			expect(asArray(stats.damageFewerTargets), 'strike with fewer targets').toEqual([ 11, 15, 19 ]);
			expect(asArray(stats.baseDamage), 'base damage').toEqual([ 6, 10, 13 ]);
			expect(asArray(stats.areaDamage), 'area damage').toEqual([ 5, 8, 10 ]);
			expect([ stats.potencies.weak, stats.potencies.average, stats.potencies.strong ], 'potencies').toEqual([ 1, 2, 3 ]);
		});
	});

	test('assigns each role the right stamina and damage tier', () => {
		const stamina = (role: MonsterRoleType) => getStats(MonsterOrganizationType.Platoon, role, 5).stamina;
		// Tier 3 damage at this level is what separates the normal and DPS roles
		// (both include the highest characteristic of 3, as strike damage does)
		const damage = (role: MonsterRoleType) => getStats(MonsterOrganizationType.Platoon, role, 5).damage.tier3;

		// Low / medium / high stamina
		[ MonsterRoleType.Artillery, MonsterRoleType.Controller, MonsterRoleType.Hexer ].forEach(role => expect(stamina(role), role).toBe(60));
		[ MonsterRoleType.Ambusher, MonsterRoleType.Harrier, MonsterRoleType.Mount, MonsterRoleType.Support ].forEach(role => expect(stamina(role), role).toBe(70));
		[ MonsterRoleType.Brute, MonsterRoleType.Defender ].forEach(role => expect(stamina(role), role).toBe(80));

		// Normal / DPS damage
		[ MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Mount, MonsterRoleType.Support ].forEach(role => expect(damage(role), role).toBe(16));
		[ MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute ].forEach(role => expect(damage(role), role).toBe(17));
	});

	test('expects elites, leaders and solos to hit two targets', () => {
		[ MonsterOrganizationType.Elite, MonsterOrganizationType.Leader, MonsterOrganizationType.Solo ].forEach(organization => {
			expect(getStats(organization, LOW_ROLE, 1).expectedTargets, organization).toBe(2);
		});
		[ MonsterOrganizationType.Minion, MonsterOrganizationType.Horde, MonsterOrganizationType.Platoon ].forEach(organization => {
			expect(getStats(organization, LOW_ROLE, 1).expectedTargets, organization).toBe(1);
		});
	});

	test('takes potencies from the highest characteristic', () => {
		[ MonsterOrganizationType.Minion, MonsterOrganizationType.Platoon, MonsterOrganizationType.Solo ].forEach(organization => {
			[ 1, 5, 9, 11 ].forEach(level => {
				const stats = getStats(organization, LOW_ROLE, level);
				expect([ stats.potencies.weak, stats.potencies.average, stats.potencies.strong ], `${organization} level ${level}`)
					.toEqual([ stats.highestCharacteristic - 2, stats.highestCharacteristic - 1, stats.highestCharacteristic ]);
			});
		});
	});

	describe('highest characteristic', () => {
		test('rises by echelon, and is one higher for leaders and solos', () => {
			expect(getStats(MonsterOrganizationType.Platoon, LOW_ROLE, 1).highestCharacteristic).toBe(2);
			expect(getStats(MonsterOrganizationType.Platoon, LOW_ROLE, 4).highestCharacteristic).toBe(3);
			expect(getStats(MonsterOrganizationType.Platoon, LOW_ROLE, 7).highestCharacteristic).toBe(4);
			expect(getStats(MonsterOrganizationType.Leader, LOW_ROLE, 1).highestCharacteristic).toBe(3);
			expect(getStats(MonsterOrganizationType.Solo, LOW_ROLE, 7).highestCharacteristic).toBe(5);
		});

		test('keeps rising past the hero levels', () => {
			expect(getStats(MonsterOrganizationType.Platoon, LOW_ROLE, 11).highestCharacteristic).toBe(5);
			expect(getStats(MonsterOrganizationType.Leader, LOW_ROLE, 11).highestCharacteristic).toBe(5);
		});

		test('is capped at 5', () => {
			expect(getStats(MonsterOrganizationType.Platoon, LOW_ROLE, 10).highestCharacteristic).toBe(5);
			expect(getStats(MonsterOrganizationType.Leader, LOW_ROLE, 10).highestCharacteristic).toBe(5);
			expect(getStats(MonsterOrganizationType.Solo, LOW_ROLE, 10).highestCharacteristic).toBe(5);
		});
	});

	test('suggests no stamina or encounter value for organizations the tables do not cover', () => {
		const stats = getStats(MonsterOrganizationType.NoOrganization, MonsterRoleType.NoRole, 1);
		expect(stats.stamina).toBe(0);
		expect(stats.ev).toBe(0);
	});
});
