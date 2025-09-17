import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const warDog3rd: MonsterGroup = {
	id: 'monster-group-wardog-3rd',
	name: 'War Dog — 3rd Echelon',
	description: 'As a war dog proves their loyalty and gains the favor of their superiors, they might be rewarded with special attention from the flesh sculptors of the Body Banks, smoothing out their construction and supplying them with higher-quality parts. War dogs who have risen through the ranks this way pride themselves on their nearly ordinary appearances.',
	picture: null,
	information: [
		{
			id: 'wardog-3rd-info-warning',
			name: 'Content Warning: Brainwashing and Body Horror',
			description: 'War dogs are explicitly evil soldiers built from the body parts of other humanoids. Check in with your players before running war dogs to make sure that they’re okay with battling brainwashed soldiers with an appearance akin to Frankenstein’s monster if he were built to be a shock trooper. If anyone is uncomfortable, modify the appearance and lore of the war dogs as you see fit.'
		},
		{
			id: 'wardog-3rd-info-1',
			name: 'Happy Accidents',
			description: 'Making war dogs is more art than science, and happy little accidents can create war dogs with unusual characteristics. These war dogs are given great attention by the flesh sculptors, both to further improve the abilities of these deviants and to learn how to replicate their creation.'
		},
		{
			id: 'wardog-3rd-info-2',
			name: 'Made to Order',
			description: `War dogs are most often made by playing the odds, with each new resurrection assumed to create certain ratios of infantry, mages, specialists, and so on. However, by radically altering their creation processes and providing special materials, war dogs can be made who bear little resemblance to any humanoid, and who possess power beyond that of any typical conscript.

These monstrous war dogs are developed to fulfill specific roles and combat niches, and are often fused with inorganic materials after their rebirth as living war machines. Monstrous war dogs are uniformly respected for having been chosen for greatness, and they consider their unnatural forms a badge of honor bestowed by Ajax.`
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'wardog-3rd-malice-1',
			name: 'Reconstitute',
			cost: 3,
			sections: [
				'One war dog acting this turn tears apart a nearby corpse of a humanoid and incorporates its body parts into their own. The war dog regains Stamina equal to 5 times their level.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-3rd-malice-2',
				name: 'Fire for Effect',
				type: FactoryLogic.type.createManeuver(),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
				target: 'Each creature in the area',
				sections: [
					FactoryLogic.createAbilitySectionText('Each target makes an **Agility test**. The same condition is imposed on each affected target'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '5 fire damage; slowed or weakened (save ends)',
						tier2: '5 fire damage; slowed or weakened (EoT)',
						tier3: '5 fire damage'
					}))
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'wardog-3rd-malice-3',
			name: 'Fodder Run',
			cost: 7,
			sections: [
				'Each war dog minion in the encounter shifts up to their speed and can make a free strike. A minion who does so is then reduced to 0 Stamina.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-3rd-malice-4',
				name: 'Loyalty Unto Death',
				type: FactoryLogic.type.createManeuver(),
				cost: 5,
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.createRanged(10) ],
				target: 'Two war dogs',
				sections: [
					FactoryLogic.createAbilitySectionText('Each target who has a loyalty collar shifts up to their speed, then is reduced to 0 Stamina. After each target’s Loyalty Collar trait is resolved, each enemy adjacent to either target makes a **Presence test**.'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: 'Push 4; the enemy is frightened of the nearest non-minion war dog (save end)',
						tier2: 'Push 2; the enemy is frightened of the nearest non-minion war dog (EoT)',
						tier3: 'Push 2'
					}))
				]
			})
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-3rd-malice-5',
				name: 'Alchemical Cloud',
				type: FactoryLogic.type.createNoAction(),
				cost: 7,
				keywords: [ ],
				distance: [ ],
				target: '',
				sections: [
					FactoryLogic.createAbilitySectionText('A bank of choking chemicals sweeps across the area of the enácounter map. Each enemy in the encounter makes a **Might test**.'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '8 poison damage; dazed (Eot)',
						tier2: '7 poison damage; weakened (EoT)',
						tier3: '4 poison damage'
					}))
				]
			})
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'wardog-3rd-1',
			name: 'War Dog Draconite',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 13,
			stability: 2,
			freeStrikeDamage: 4,
			withCaptain: '+3 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(4, 1, -2, -1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-1-feature-1',
						name: 'Greatsword and Roar',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 damage',
								tier2: '4 damage; 3 psychic damage',
								tier3: '4 damage; 3 psychic damage; the target must move their speed in a straight line away from the draconite'
							})),
							FactoryLogic.createAbilitySectionText('If this damage leaves the target winded, they are frightened of the draconite until the end of the target’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-1-feature-2',
					name: 'Loyalty Collar',
					description: 'When the draconite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-2',
			name: 'War Dog Saboteur',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 12,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: MonsterLogic.createCharacteristics(-1, 2, 4, 3, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-2-feature-1',
						name: 'Fuse-Iron Bomb',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 fire damage',
								tier2: '7 fire damage; push 1',
								tier3: '8 fire damage; push 3'
							})),
							FactoryLogic.createAbilitySectionText('The space the target occupies fills with dark smoke and blocks line of effect until the start of the saboteur’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-2-feature-2',
					name: 'Loyalty Collar',
					description: 'When the saboteur is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-3',
			name: 'War Dog Shriketroop',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 4,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(1, 4, 3, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-3-feature-1',
						name: 'Canis Shrikegun',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 damage',
								tier2: '7 damage',
								tier3: '8 damage; I < 3 the target is frightened of all shrikestroops (EoT)'
							})),
							FactoryLogic.createAbilitySectionText('The target must move their speed in a straight line away from the shriketroop.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-3-feature-2',
					name: 'Loyalty Collar',
					description: 'When the shriketroop is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-4',
			name: 'War Dog Aerocite',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8, 'Fly'),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 4, 1, 3, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-4-feature-1',
						name: 'Dive Bomb',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 damage',
								tier2: '10 damage; vertical slide 2',
								tier3: '12 damage; vertical slide 3'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'An enemy force moved by this ability is grabbed instead.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-4-feature-2',
						name: 'Caustic Paste Bomb',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5 }) ],
						target: 'Each creature or object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '2 acid damage; M < 2 slowed (save ends)',
								tier2: '4 acid damage; M < 3 slowed (save ends)',
								tier3: '6 acid damage; M < 4 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The area is difficult terrain.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-4-feature-3',
					name: 'Jetwing Agility',
					description: 'If the aerocite moves 5 or more squares on their turn, strikes made against them take a bane until the start of their next turn.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-4-feature-4',
					name: 'Loyalty Collar',
					description: 'When the aerocite is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-5',
			name: 'War Dog Ballistite',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(0),
			stamina: 72,
			stability: 5,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(4, -2, 2, 3, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-5-feature-1',
						name: 'Biokinetic Ballista',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '7 damage; push 1',
								tier2: '10 damage; push 3',
								tier3: '11 damage; push 5'
							})),
							FactoryLogic.createAbilitySectionText('Any target pushed into an obstacle is knocked prone, and if they have <code>M < 3</code> they are restrained (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-5-feature-2',
						name: 'Kill Zone',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, value2: 12 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of the ballistite’s next turn, the area is difficult terrain, and any ranged ability targeting an enemy in the area deals an extra 8 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-5-feature-3',
					name: 'Set Up and Tear Down',
					description: 'At the start of each of the ballistite’s turns, they can gain a +4 bonus to speed until the end of their turn. While their speed is greater than 0 by any means, they can’t use main actions or maneuvers.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-5-feature-4',
					name: 'Loyalty Collar',
					description: 'When the ballistite is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-6',
			name: 'War Dog Blackcap',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'Teleport'),
			stamina: 45,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(1, 4, 4, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-6-feature-1',
						name: 'Flesh-Eater Knife',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(15)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '8 damage',
								tier2: '11 damage',
								tier3: '12 damage; M < 4 bleeding and weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The blackcap can teleport up to their speed before using this ability, creating an ash clone (see below) in their original square.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-6-feature-2',
						name: 'Ashes to Ashes',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Up to three ash clones',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes a free strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-6-feature-3',
					name: 'Ash Clones',
					description: 'An ash clone created by the blackcap has the blackcap’s statistics but has 1 Stamina. Ash clones don’t take turns in combat, but they can act when the blackcap allows them to and can move when the blackcap willingly moves.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-6-feature-4',
					name: 'Duplicating Loyalty Collar',
					description: 'When the blackcap or any of their ash clones is reduced to 0 Stamina, that creature’s loyalty collar explodes, dealing 3d6 poison damage to each adjacent enemy and object. If any adjacent enemy has <code>A < 3</code> they are also weakened (save ends).'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-7',
			name: 'War Dog Breaker',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 36,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 200,
			stability: 4,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, 2, 1, 1, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-7-feature-1',
						name: 'Pile Bunker Gauntlet',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 damage; push 4; prone',
								tier2: '17 damage; slide 4; prone or M < 3 dazed (save ends)',
								tier3: '21 damage; slide 4; prone; M < 4 dazed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-7-feature-2',
						name: 'Surging Power',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of their next turn, the breaker has a double edge on abilities and is automatically affected by all potency effects.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-7-feature-3',
					name: 'Breaking Point',
					description: 'When the breaker would be reduced to 0 Stamina, they delay that effect as they end any conditions affecting them and immediately take a turn, regardless of whether they have already taken a turn this round. The breaker’s abilities deal an extra 5 damage during this turn, at the end of which they are reduced to 0 Stamina.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-7-feature-4',
					name: 'Loyalty Collar',
					description: 'When the breaker is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-8',
			name: 'War Dog Firestarter',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 45,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 3, 4, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-8-feature-1',
						name: 'Twin Flamebelchers',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 1, value2: 1 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '3 fire damage; A < 2 the target is seared (save ends)',
								tier2: '6 fire damage; A < 3 the target is seared (save ends)',
								tier3: '8 fire damage; A < 4 the target is seared (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A seared creature takes a bane on strikes and has damage weakness 5. If this ability obtains a tier 3 outcome against one or more creatures who are already seared, the firestarter can use Enflame as a free triggered action.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-8-feature-2',
						name: 'Enflame',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('This ability targets each enemy within 2 squares of any seared creature within distance.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '2 fire damage',
								tier2: '4 fire damage; A < 3 the target is seared (save ends)',
								tier3: '6 fire damage; A < 4 the target is seared (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-8-feature-3',
					name: 'Loyalty Collar',
					description: 'When the firestarter is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-3rd-8-feature-4',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 8 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-9',
			name: 'War Dog Geomancer',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'Burrow'),
			stamina: 45,
			stability: 3,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 4, 4, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-9-feature-1',
						name: 'Earthwave',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 7, value2: 2, within: 10 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '3 damage; M < 2 push (see effect)',
								tier2: '6 damage; M < 3 push',
								tier3: '8 damage; M < 4 push, prone'
							})),
							FactoryLogic.createAbilitySectionText('This ability ignores stability. The geomancer declares a direction for the area, and any creature pushed by this ability is pushed to the last space in the area in the chosen direction.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The ground beneath the area becomes a 2-square-deep trench after the power roll is resolved.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-9-feature-2',
						name: 'Siegeworks',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 10 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The geomancer raises a wall of stone set with viewing gaps. Creatures have line of effect through the wall while adjacent to it.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-9-feature-3',
					name: 'Dust Cloud',
					description: 'The geomancer is always surrounded by a 2 aura of swirling dust and earthen debris. The geomancer and any ally in the area have concealment. '
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-9-feature-4',
					name: 'Loyalty Collar',
					description: 'When the geomancer is reduced to 0 Stamina, their loyalty collar explodes, dealing 3d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-10',
			name: 'War Dog Iron Priest',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 1, 4, 4),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-10-feature-1',
						name: 'Houndcannon',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 7, value2: 1, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '3 damage',
								tier2: '6 damage; P < 3 bleeding (save ends)',
								tier3: '8 damage; P < 4 the target loses 1 Recovery and is bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Any ally within 2 squares of the iron priest gains an edge on their next strike. If any target lost a Recovery, any affected ally has a double edge instead.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-10-feature-2',
						name: 'Iron Banner',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						repeatable: true,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 4 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText(` For every 2 Malice spent, each target gains one of the following effects until the start of the iron priest’s next turn.
- The target has damage immunity 2.
- The target’s strikes deal an extra 3 holy damage.
- The target has a +3 bonus to speed.`)
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-10-feature-3',
					name: 'Chosen of the Iron Saint',
					description: 'The Director gains 1 Malice whenever an ally within 3 squares of the iron priest obtains a tier 3 outcome on a power roll.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-11',
			name: 'War Dog Prismite',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5, 'Fly, hover'),
			stamina: 82,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(4, 0, 4, 2, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-11-feature-1',
						name: 'Grasping Tonguetacles',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '3 psychic damage',
								tier2: '6 psychic damage; R < 3 grabbed, pull 2',
								tier3: '8 psychic damage; R < 4 grabbed and the target takes a bane on the Escape Grab maneuver, pull 2'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-11-feature-2',
						name: 'Hard Light Field',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, value2: 10 }) ],
						target: 'Each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of the prismite’s next turn, each target has cover and gains a +2 bonus to stability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-11-feature-3',
						name: 'Tractor Beam',
						type: FactoryLogic.type.createTrigger('An enemy within distance uses a melee ability against an ally.'),
						cost: 1,
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is pulled up to 5 squares toward the prismite and any damage from the triggering ability is halved.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-11-feature-4',
					name: 'Prismacore Detonation',
					description: 'When the prismite is reduced to 0 Stamina, they explode, dealing 3d6 psychic damage to each enemy within 2 squares of them.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3rd-12',
			name: 'War Dog Taxiarch',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 44,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'Teleport'),
			stamina: 240,
			stability: 1,
			freeStrikeDamage: 9,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 5, 4, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-12-feature-1',
						name: 'Stunning Surge',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '14 lightning damage; the lightning spreads 1 square; I < 3 dazed (save ends)',
								tier2: '19 lightning damage; the lightning spreads 2 square; I < 4 dazed (save ends)',
								tier3: '23 lightning damage; the lightning spreads 3 square; I < 5 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The spread is the distance the charge arcs from a target to nearby enemies. Each enemy within spread takes 5 lightning damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The lighting spread increases by 2 squares. Additionally, any creature who takes lightning damage from this ability and who has <code>M < 4</code> is slowed until the end of their next turn.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-12-feature-2',
						name: 'Overcharge',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, value2: 10 }) ],
						target: 'Each war dog in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target shifts up to their speed and can make a free strike that deals an extra 5 lightning damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-12-feature-3',
						name: 'Thunderstruck',
						type: FactoryLogic.type.createTrigger('An enemy within distance deals damage to the taxiarch'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'The triggering enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('After the ability is resolved, the target is teleported up to 5 squares and is thunderstruck (save ends). A thunderstruck creature has lightning weakness 5, and the taxiarch gains an edge on power rolls against them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3rd-12-feature-4',
					name: 'End Effect',
					description: 'At the end of each of their turns, the taxiarch can take 15 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-12-feature-5',
						name: 'Magnetic Trickery',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Slide 5, and if the the target has <code>M < 4</code>, they fall prone.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-12-feature-6',
						name: 'Conductor of Combat',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each war dog in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target shifts up to their speed, then can make a free strike or use a maneuver.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3rd-12-feature-7',
						name: 'Unlimited Power!',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Agility,
								tier1: '18 lightning damage; the target is thunderstruck (save ends)',
								tier2: '14 lightning damage; the target is thunderstruck (EoT)',
								tier3: '9 lightning damage'
							})),
							FactoryLogic.createAbilitySectionText('See Thunderstruck. Additionally, until the end of the encounter, any enemy who moves within 3 squares of the taxiarch for the first time in a round or starts their turn there takes 3 lightning damage.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
