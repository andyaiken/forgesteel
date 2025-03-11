import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const minotaur: MonsterGroup = {
	id: 'monster-group-minotaur',
	name: 'Minotaur',
	description: 'The fearsome minotaur is a study in contrasts. Their imposing humanoid body is muscular with patches of thick hair. Their head is that of a massive horned bull, and their soft eyes convey a soulful intelligence mingled with smoldering intensity.',
	information: [
		{
			id: 'minotaur-info-1',
			name: 'Primal Rage',
			description: `Minotaurs burn with fury. Some constantly desire to unleash this destructive energy on the world, and they attack anyone or anything that crosses their path. Others make it a point of pride to control their rage, only fighting when survival demands it.

Regardless, once combat begins, minotaurs relish charging at foes with their great horns. In the heat of battle, a minotaur charges from one foe to the next, only retreating if victory is entirely impossible.`
		},
		{
			id: 'minotaur-info-2',
			name: 'Labyrinthine Origins',
			description: 'The first minotaur was once the human warrior Thesia “The Bull” Danaria, who dared challenge the Beast Lords of Kham. When her revolution was crushed, the Lords of Kham used their beastmagics to twist Thesia’s mortal body into a human-bull hybrid prone to fits of violent rage. The Beast Lords placed this minotaur at the center of a vast labyrinth and sent captured rebels to attack the monster. Many fell to Thesia’s anger—until a prisoner named Velathri took a chance, speaking to the minotaur instead of brandishing steel. He befriended Thesia, and in retribution, the Beast Lords made him a minotaur as well. This act was their undoing, for Thesia and Velathri fell in love. New minotaurs were born, and decades later, hundreds charged out of the maze together. These minotaurs reduced Kham to ruins, then they spread far and wide, fearing reprisal from neighboring lands. Even today, many minotaurs shun civilization, preferring to live in winding canyons, twisting ruins, bewildering dungeons, or other maze-like terrain where they can continue to hunt. However, a few can be found in nearly any terrain or settlement.'
		},
		{
			id: 'minotaur-info-3',
			name: 'Deep Bonds',
			description: 'Even evil minotaurs can be fiercely loyal friends, gladly charging into certain death for those they trust. These chosen friends never suffer the creature’s ire — but gods help them if they betray the minotaur.'
		},
		{
			id: 'minotaur-info-4',
			name: 'Mintaur Languages',
			description: 'Most minotaurs speak Khamish.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'minotaur-malice-1',
			name: 'Bull Rush',
			cost: 3,
			repeatable: true,
			sections: [
				'A minotaur acting this turn for every 3 malice spent has their speed increased by 4 and ignores diﬃcult terrain until the start of their next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'minotaur-malice-2',
			name: 'Cut the… Nonsense!',
			cost: 5,
			sections: [
				'Until the start of their next turn, a minotaur acting this turn halves all incoming damage and can use Knockback as a free triggered action whenever an enemy enters an adjacent square.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'minotaur-malice-3',
			name: 'Moonfall',
			cost: 7,
			sections: [
				'All minotaurs in the encounter fill the area with generations of feeling lost and isolated. Each enemy within 5 of a minotaur is teleported 5 and makes an **Intuition test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Intuition,
					tier1: 'The target can’t establish line of effect beyond 3 squares and frightened of all minotaurs (save ends)',
					tier2: 'The target can’t establish line of effect beyond 3 squares EoT)',
					tier3: 'no effect'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'minotaur-1',
			name: 'Minotaur',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Harrier),
			keywords: [ 'Accursed', 'Humanoid', 'Minotaur' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8),
			stamina: 100,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 0, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-1-feature-1',
						name: 'Flail and Blade',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage; push 1',
							tier2: '11 damage; push 2',
							tier3: '14 damage; push 3'
						}),
						effect: 'Shift 3.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-1-feature-2',
						name: 'Primal Bay',
						type: FactoryLogic.type.createAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 3,
						effect: 'The minotaur has damage immunity 2 and deals an additional 5 damage with their strikes until the end of their next turn. On their next turn, they have access to an additional maneuver.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-1-feature-3',
						name: 'Goring Horns',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '1 creature or object',
						cost: 5,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; I<0 dazed (save ends)',
							tier2: '8 damage; I<1 dazed (save ends)',
							tier3: '9 damage; I<2 dazed (save ends)'
						}),
						effect: 'The potency of this ability increases by 1 if it’s used while charging.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-1-feature-4',
						name: 'Retaliatory Gore',
						type: FactoryLogic.type.createTrigger('The minotaur takes damage from a creature within 8.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Triggering creature',
						effect: 'The minotaur charges the target using Flail and Blade or Goring Horns.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'minotaur-1-feature-6',
					name: 'Minotaur Sense',
					description: 'The minotaur cannot get a result lower than tier 2 when making Tests to navigate, search, or seek.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'minotaur-2',
			name: 'Minotaur Sunderer',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Accursed', 'Humanoid', 'Minotaur' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 2, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-2-feature-1',
						name: 'Spiked Maul',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '8 damage; pull 1',
							tier2: '12 damage; pull 2',
							tier3: '15 damage; pull 3'
						}),
						effect: 'A target is grabbed if they are pulled adjacent to the sunderer.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-2-feature-2',
						name: 'Fearsome Bay',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies in the burst',
						cost: 5,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'I<0 frightened (save ends)',
							tier2: 'I<1 frightened (save ends)',
							tier3: 'I<2 frightened (save ends)'
						}),
						effect: 'The minotaur has damage immunity 2 and deals an additional 5 damage with their strikes until the end of their next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-2-feature-3',
						name: 'Disemboweling Horns',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '1 grabbed creature',
						cost: 3,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; push 1; M<0 bleeding (save ends)',
							tier2: '8 damage; push 3; M<1 bleeding (save ends)',
							tier3: '9 damage; push 5; M<2 bleeding (save ends)'
						}),
						effect: 'The target takes 1d6 damage at the start of each of their turns while bleeding from this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-2-feature-4',
						name: 'Retaliatory Gore',
						type: FactoryLogic.type.createTrigger('The sunderer takes damage from a creature within 8.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Triggering creature',
						effect: 'The sunderer charges the target using Spiked Maul.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'minotaur-2-feature-6',
					name: 'Minotaur Sense',
					description: 'The sunderer cannot get a result lower than tier 2 when making Tests to navigate, search, or seek.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'minotaur-3',
			name: 'Minotaur Bully',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Accursed', 'Humanoid', 'Minotaur' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 14,
			stability: 2,
			freeStrikeDamage: 4,
			withCaptain: 'Strike damage +3',
			characteristics: MonsterLogic.createCharacteristics(4, 2, 0, 3, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-3-feature-1',
						name: 'Javelin and Bellow',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '4 damage',
							tier2: '7 damage',
							tier3: '9 damage; I<4 taunted (EoT) or frightened of all minotaurs (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'minotaur-3-feature-2',
					name: 'Minotaur Sense',
					description: 'The bully cannot get a result lower than tier 2 when making Tests to navigate, search, or seek.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'minotaur-4',
			name: 'Minotaur Lackey',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Accursed', 'Humanoid', 'Minotaur' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8),
			stamina: 13,
			stability: 2,
			freeStrikeDamage: 3,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(3, 4, 0, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-4-feature-1',
						name: 'Horn Vault',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '3 damage',
							tier2: '6 damage; slide 1',
							tier3: '8 damage; slide 3'
						}),
						effect: 'A target that is force moved into an obstacle is M<3 bleeding (save ends).'
					})
				}),
				FactoryLogic.feature.create({
					id: 'minotaur-4-feature-2',
					name: 'Minotaur Sense',
					description: 'The lackey cannot get a result lower than tier 2 when making Tests to navigate, search, or seek.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'minotaur-5',
			name: 'Minotaur Stampede',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
			keywords: [ 'Accursed', 'Humanoid', 'Minotaur', 'Swarm' ],
			encounterValue: 24,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(8),
			stamina: 17,
			stability: 2,
			freeStrikeDamage: 4,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(5, 5, 0, 2, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-5-feature-1',
						name: 'Bull Rush',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 5,
							tier1: '4 damage',
							tier2: '7 damage; prone',
							tier3: '9 damage; prone and M<5 can’t stand (save ends)'
						}),
						effect: 'Each creature that the stampede moves through as a part of charging with this ability is M<4 knocked prone.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'minotaur-5-feature-2',
					name: 'Swarm',
					description: 'The stampede can move through squares as if they were size-2, and can occupy other creatures’ spaces. At the start of the stampede’s turn, they can make a free strike against each creature they share a square with.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'minotaur-6',
			name: 'Minotaur Gorer',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Brute),
			keywords: [ 'Accursed', 'Humanoid', 'Minotaur' ],
			encounterValue: 22,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 60,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-6-feature-1',
						name: 'Gore',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '5 damage',
							tier2: '9 damage',
							tier3: '12 damage; M (strong) prone'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-6-feature-2',
						name: 'Retaliatory Gore',
						type: FactoryLogic.type.createTrigger('The gorer takes damage from a creature within 6.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The gorer charges the target using Gore.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'minotaur-6-feature-3',
					name: 'Minotaur Sense',
					description: 'The gorer cannot get a result lower than tier 2 when making Tests to navigate, search, or seek.'
				})
			],
			retainer: {
				level4: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-6-retainer-4',
						name: 'Horn Toss',
						type: FactoryLogic.type.createTrigger('The gorer damages a creature with their Gore attack.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Attack target',
						effect: 'The target is pushed 3. If the target’s Stability is 0, they are also knocked prone.'
					})
				}),
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-6-retainer-7',
						name: 'Triumphant Bay',
						type: FactoryLogic.type.createManeuver({ qualifiers: [ 'encounter' ] }),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Gain 3 surges and the attacks against the gorer and their mentor suffer a bane until the beginning of the gorer’s next turn.'
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-6-retainer-10',
						name: 'Horn Rake',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '11 damage; M (weak) bleeding (save ends)',
							tier2: '16 damage; M (average) bleeding (save ends)',
							tier3: '21 damage; M (strong) prone (save ends)'
						})
					})
				})
			}
		})
	],
	addOns: []
};
