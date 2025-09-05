import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const minotaur: MonsterGroup = {
	id: 'monster-group-minotaur',
	name: 'Minotaur',
	description: 'The fearsome minotaur is a study in contrasts. Their imposing humanoid body is muscular with patches of thick hair. Their head is that of a massive horned bull, and their soft eyes convey a soulful intelligence mingled with smoldering intensity.',
	picture: null,
	information: [
		{
			id: 'minotaur-info-1',
			name: 'Primal Rage',
			description: 'Minotaurs burn with fury. Some constantly desire to unleash this destructive energy on the world, and they attack anyone or anything that crosses their path. Others make it a point of pride to control their rage, only fighting when survival demands it. Regardless, once combat begins, minotaurs relish charging at foes with their great horns. In the heat of battle, a minotaur charges from one foe to the next, only retreating if victory is impossible.'
		},
		{
			id: 'minotaur-info-2',
			name: 'Labyrinthine Origins',
			description: `
The first minotaur was once the human warrior Thesia “The Bull” Danaria, who dared challenge the Beast Lords of Kham. When her revolution was crushed, the Lords of Kham used their beastmagics to twist Thesia’s mortal body into a human-bull hybrid prone to fits of violent rage. The Beast Lords placed this minotaur at the center of a vast labyrinth and sent captured rebels to attack the monster. Many fell to Thesia’s anger—until a prisoner named Velathri took a chance, speaking to the minotaur instead of brandishing steel. He befriended Thesia, and in retribution, the Beast Lords made him a minotaur as well. This act was their undoing, for Thesia and Velathri fell in love.

New minotaurs were born, and decades later, hundreds charged out of the maze together. These minotaurs reduced Kham to ruins, then they spread far and wide, fearing reprisal from neighboring lands. Even today, many minotaurs shun civilization, preferring to live in winding canyons, twisting ruins, bewildering dungeons, or other labyrinthine terrain where they can continue to hunt. However, small numbers of minotaurs can be found in nearly any terrain or settlement.`
		},
		{
			id: 'minotaur-info-3',
			name: 'Deep Bonds',
			description: 'Even evil minotaurs can be fiercely loyal friends, gladly charging into certain death for those they trust. These chosen friends never suffer the creature’s ire—but gods help them if they betray the minotaur.'
		},
		{
			id: 'minotaur-info-4',
			name: 'Mintaur Languages',
			description: 'Most minotaurs speak their own dialect of Khamish.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'minotaur-malice-1',
			name: 'Bull Rush',
			cost: 3,
			repeatable: true,
			sections: [
				'For each 3 Malice spent, one minotaur acting this turn gains a +4 bonus to speed and ignores difficult terrain until the start of their next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'minotaur-malice-2',
			name: 'Cut the… Nonsense!',
			cost: 5,
			sections: [
				'One minotaur acting this turn halves any damage they take, and can use the Knockback maneuver as a free triggered action whenever an enemy comes adjacent to them, all until the start of their next turn.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'minotaur-malice-3',
			name: 'Bullseye',
			cost: 7,
			sections: [
				'All minotaurs in the encounter fill the area around them with psychic impressions of feeling lost and isolated. Each enemy within 5 squares of a minotaur is teleported up to 5 squares and makes an **Intuition test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Intuition,
					tier1: 'The target has line of effect only within 3 squares and is frightened of all minotaurs (save ends).',
					tier2: 'The target has line of effect only within 3 squares (EoT).',
					tier3: 'No effect.'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'minotaur-1',
			name: 'Minotaur',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
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
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage; push 1',
								tier2: '11 damage; push 2',
								tier3: '14 damage; push 3'
							})),
							FactoryLogic.createAbilitySectionText('The minotaur shifts up to 3 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-1-feature-2',
						name: 'Primal Bay',
						type: FactoryLogic.type.createMain(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of their next turn, the minotaur has damage immunity 2 and deals an extra 5 damage with strikes. On their next turn, the minotaur can use one additional maneuver.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-1-feature-3',
						name: 'Goring Horns',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; I<0 dazed (save ends)',
								tier2: '8 damage; I<1 dazed (save ends)',
								tier3: '9 damage; I<2 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If this ability is used as part of the Charge main action, its potency increases by 1.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-1-feature-4',
						name: 'Retaliatory Strike',
						type: FactoryLogic.type.createTrigger('A creature within distance deals damage to the minotaur.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The minotaur uses the Charge main action and either Flail and Blade or Goring Horns against the target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'minotaur-1-feature-6',
					name: 'Minotaur Sense',
					description: 'The minotaur can’t obtain less than a tier 2 outcome when making tests to navigate, search, or seek.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'minotaur-2',
			name: 'Minotaur Sunderer',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
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
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '8 damage; pull 1',
								tier2: '12 damage; pull 2',
								tier3: '15 damage; pull 3'
							})),
							FactoryLogic.createAbilitySectionText('A target pulled adjacent to the sunderer is automatically grabbed.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-2-feature-2',
						name: 'Fearsome Bay',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'I<0 frightened (save ends)',
								tier2: 'I<1 frightened (save ends)',
								tier3: 'I<2 frightened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Until the end of their next turn, the minotaur has damage immunity 2 and deals an extra 5 damage with strikes.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-2-feature-3',
						name: 'Disemboweling Horns',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionField({
								name: 'Special',
								effect: 'The target must be grabbed by the sunderer.'
							}),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; M<0 bleeding (save ends)',
								tier2: '8 damage; M<1 bleeding (save ends)',
								tier3: '9 damage; M<2 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('While bleeding this way, the target takes 1d6 damage at the start of each of their turns.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-2-feature-4',
						name: 'Retaliatory Strike',
						type: FactoryLogic.type.createTrigger('A creature within distance deals damage to the sunderer.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(6) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The sunderer uses the Charge main action and Spiked Maul against the target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'minotaur-2-feature-6',
					name: 'Minotaur Sense',
					description: 'The sunderer can’t obtain less than a tier 2 outcome when making tests to navigate, search, or seek.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'minotaur-3',
			name: 'Minotaur Bully',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Accursed', 'Humanoid', 'Minotaur' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 14,
			stability: 2,
			freeStrikeDamage: 4,
			withCaptain: '+3 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(4, 2, 0, 3, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-3-feature-1',
						name: 'Javelin and Bellow',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 damage',
								tier2: '7 damage',
								tier3: '9 damage; I<4 taunted (EoT) or frightened of all minotaurs (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'minotaur-3-feature-2',
					name: 'Minotaur Sense',
					description: 'The bully can’t obtain less than a tier 2 outcome when making tests to navigate, search, or seek.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'minotaur-4',
			name: 'Minotaur Lackey',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Accursed', 'Humanoid', 'Minotaur' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8),
			stamina: 13,
			stability: 2,
			freeStrikeDamage: 3,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(3, 4, 0, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-4-feature-1',
						name: 'Horn Vault',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '3 damage',
								tier2: '6 damage; slide 1',
								tier3: '8 damage; slide 3'
							})),
							FactoryLogic.createAbilitySectionText('A target that is force moved into an obstacle is M<3 bleeding (save ends).')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'minotaur-4-feature-2',
					name: 'Minotaur Sense',
					description: 'The lackey can’t obtain less than a tier 2 outcome when making tests to navigate, search, or seek.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'minotaur-5',
			name: 'Minotaur Stampede',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
			keywords: [ 'Accursed', 'Humanoid', 'Minotaur', 'Swarm' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(8),
			stamina: 17,
			stability: 2,
			freeStrikeDamage: 4,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(5, 5, 0, 2, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-5-feature-1',
						name: 'Bull Rush',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '4 damage',
								tier2: '7 damage; prone',
								tier3: '9 damage; prone; M<5 can’t stand (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If this ability is used as part of the Charge main action, each creature the stampede moves through who has M<4 is knocked prone.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'minotaur-5-feature-2',
					name: 'Swarm',
					description: 'The stampede can move through spaces as if they were a size 2 creature, and can occupy other creatures’ spaces. At the start of each of the stampede’s turns, they can make a free strike against each creature whose space they share.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'minotaur-6',
			name: 'Minotaur Gorer',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Brute),
			keywords: [ 'Accursed', 'Humanoid', 'Minotaur' ],
			encounterValue: 0,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 39,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-6-feature-1',
						name: 'Gore',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '5 damage',
								tier2: '9 damage',
								tier3: '12 damage; M < (strong) prone'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-6-feature-2',
						name: 'Retaliatory Strike',
						type: FactoryLogic.type.createTrigger('A creature within distance deals damage to the gorer.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(6) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The gorer uses the Charge main action and Gore against the target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'minotaur-6-feature-3',
					name: 'Minotaur Sense',
					description: 'The gorer can’t obtain less than a tier 2 outcome when making tests to navigate, search, or seek.'
				})
			],
			retainer: {
				level4: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-6-retainer-4',
						name: 'Horn Toss',
						type: FactoryLogic.type.createTrigger('The gorer damages a creature within distance using Gore.', { free: true }),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is pushed up to 3 squares. If the target has stability 0, they are also knocked prone.')
						]
					})
				}),
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-6-retainer-7',
						name: 'Triumphant Bay',
						type: FactoryLogic.type.createManeuver({ qualifiers: [ 'encounter' ] }),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The gorer gains 3 surges, and until the start of the gorer’s next turn, strikes made against them and their mentor take a bane.')
						]
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'minotaur-6-retainer-10',
						name: 'Horn Rake',
						type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '11 damage; M < [weak] bleeding (save ends)',
								tier2: '16 damage; M < [average] bleeding (save ends)',
								tier3: '21 damage; M < [strong] prone and can’t stand (save ends).'
							}))
						]
					})
				})
			}
		})
	],
	addOns: []
};
