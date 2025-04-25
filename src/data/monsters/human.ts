import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const human: MonsterGroup = {
	id: 'monster-group-human',
	name: 'Human',
	description: 'Humans flourish in every habitable part of the world, from inviting coastal cities to unforgiving mountainous terrain. While most humans live quietly in peaceful communities, some are drawn to adventure by an unquenchable thirst for excitement or power.',
	information: [
		{
			id: 'human-info-1',
			name: 'Villains and Heroes',
			description: `
Recognizing their limited lifespan, humans often set their eyes on immortality. They unfurl empires at the tip of a sword, sacrifice lives to erect grand monuments, and even aspire to godhood, all in hopes their names will be remembered forever.

Violence and greed are close cousins in the human family. Those with power and wealth often strive for more by the sword. Others turn to theft, often driven to desperation by rapacious neighbors. Travelers in human lands are likely to encounter robbers and barons—both exact a toll.

Other humans pursue power more subtly, turning their cunning toward selfish ends. When ambitions exceed circumstances, there is always some ancient evil power to call on. Cultists seek dark desires in exchange for service, sacrificing to forbidden gods and courting apocalypse.

Fortunately, many humans devote themselves to righting wrongs and reshaping the world for the better. Heroes plunge themselves into danger time and time again, standing against natural and supernatural perils in pursuit of justice.`
		},
		{
			id: 'human-info-2',
			name: 'Risks and Rewards',
			description: `
Humans devote as much attention to games and gambling as to more serious pursuits. Perhaps this competitive training explains their renowned knack for seizing the moment—knowing when to risk it all on a throw of the dice. Whether in sport or battle, humans quickly spot their opponent’s mistakes and seize the advantage.

Humans see unrealized potential everywhere, whether envisioning an untamed forest transformed into a prosper-ous village or an ancient dungeon yielding a chest full of coins. Pursuing such ambitions might end in catastrophe, but for these gamblers, it’s a game worth playing.`
		},
		{
			id: 'human-info-3',
			name: 'Swords for Hire',
			description: 'With an appetite for warfare and gold, human adventurers are well represented in most mercenary bands. A human mercenary makes a stout ally… if you can afford their price.'
		},
		{
			id: 'human-info-4',
			name: 'Connected to the Natural World',
			description: 'Humans are connected to the natural world in a way that other species are not. As such, they have an uncanny knack for detecting when nearby creatures, objects, and phenomena are created by magic and psionics. This same sense allows them to resist supernatural abilities and effects.'
		},
		{
			id: 'human-info-5',
			name: 'Human Languages',
			description: 'Most humans speak Caelian and one Vaslorian human language.'
		}
	],
	malice: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'human-malice-1',
				name: 'Alchemical Device',
				type: FactoryLogic.type.createManeuver({ qualifiers: [ 'Non-minion' ] }),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
				target: 'Each enemy in the cube',
				powerRoll: FactoryLogic.createPowerRoll({
					tier1: '4 corruption damage; A<0 slowed (save ends)',
					tier2: '6 corruption damage; A<1 slowed (save ends)',
					tier3: '9 corruption damage; A<2 restrained (save ends)'
				})
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'human-malice-2',
			name: 'Exploit Opening',
			cost: 5,
			sections: [
				'Until the end of their turn, each human acting this turn has an edge on their abilities, or a double edge if their ability targets an enemy affected by a condition.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'human-malice-3',
			name: 'Staying Power',
			cost: 7,
			sections: [
				'Each non-minion human in the encounter regains Stamina equal to 5 times their level.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'human-1',
			name: 'Human Apprentice Mage',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Ranged distance +5',
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-1-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-1-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-1-feature-3',
						name: 'Lightning Strike',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 lightning damage',
							tier2: '3 lightning damage',
							tier3: '5 lightning damage'
						}),
						effect: 'If the apprentice mage doesn’t use a maneuver or a move action this turn, the target is slowed (EoT).'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-1-4',
					name: 'Supernatural Insight',
					description: 'The apprentice mage ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-2',
			name: 'Human Guard',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-2-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-2-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-2-feature-3',
						name: 'Halberd',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						}),
						effect: 'If the guard is flanked, they can make a free strike against an additional target adjacent to them.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-2-4',
					name: 'Supernatural Insight',
					description: 'The guard ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-3',
			name: 'Human Archer',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Ranged distance +5',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-3-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-3-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-3-feature-3',
						name: 'Crossbow',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-3-4',
					name: 'Supernatural Insight',
					description: 'The archer ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-4',
			name: 'Human Raider',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-4-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-4-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-4-feature-3',
						name: 'Handaxe',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage'
						}),
						effect: 'If this ability is used while charging, the raider can make a ranged free strike before using the ability.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-4-4',
					name: 'Supernatural Insight',
					description: 'The raider ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-5',
			name: 'Human Death Acolyte',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Ranged Distance +5',
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-5-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-5-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-5-feature-3',
						name: 'Necrotic Bolt',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 corruption damage',
							tier2: '2 corruption damage',
							tier3: '3 corruption damage'
						}),
						effect: 'A creature within 5 squares of the death acolyte regains 1 Stamina.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-5-4',
					name: 'Supernatural Insight',
					description: 'The death acolyte ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-6',
			name: 'Human Rogue',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-6-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-6-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-6-feature-3',
						name: 'Concealed Dagger',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 corruption damage',
							tier2: '4 corruption damage',
							tier3: '5 corruption damage'
						}),
						effect: 'This ability deals an additional 3 damage if the rogue was disguised or hidden before using it.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-6-4',
					name: 'Supernatural Insight',
					description: 'The rogue ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-7',
			name: 'Human Brawler',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Brute),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-7-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-7-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-7-feature-3',
						name: 'Haymaker',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage',
							tier3: '12 damage; M<2 grabbed, target has a bane on escaping the grab'
						}),
						effect: 'The brawler deals an additional 2 damage if the target is already grabbed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-7-feature-4',
						name: 'Throw',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature grabbed by the brawler',
						effect: 'Push 5.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-7-feature-5',
					name: 'Shoot the Hostage',
					description: 'The brawler takes half damage from strikes if they have a creature or object grabbed. The grabbed creature or object takes the other half of the damage.'
				}),
				FactoryLogic.feature.create({
					id: 'human-7-feature-6',
					name: 'Supernatural Insight',
					description: 'The brawler ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-8',
			name: 'Human Knave',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Defender),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 1, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-8-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-8-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-8-feature-3',
						name: 'Morningstar & Javelin',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage',
							tier3: '12 damage; M<2 the target has a double bane on their next power roll'
						}),
						effect: 'Taunted (EoT).'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-8-feature-4',
					name: 'I\'m Your Enemy',
					description: 'The knave can make a free strike against an adjacent creature they have taunted whenever the creature deals damage to a creature other than the knave.'
				}),
				FactoryLogic.feature.create({
					id: 'human-8-feature-5',
					name: 'Overwhelm',
					description: 'An enemy who starts their turn adjacent to the knave can’t shift.'
				}),
				FactoryLogic.feature.create({
					id: 'human-8-feature-6',
					name: 'Supernatural Insight',
					description: 'The knave ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-9',
			name: 'Human Death Cultist',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Support),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-9-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-9-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-9-feature-3',
						name: 'Death Scythe',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage',
							tier3: '12 damage; I<2 weakened (save ends)'
						}),
						spend: [
							{
								value: 2,
								effect: 'The death cultist regains Stamina equal to half the damage dealt by this ability.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-9-feature-4',
						name: 'Rise, My Minions',
						type: FactoryLogic.type.createManeuver({ qualifiers: [ '1 malice per minion' ] }),
						cost: 1,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'One or more dead minions (each target must have died during this encounter)',
						effect: 'Each target revives with their full Stamina. They immediately die at the end of the encounter or if the death cultist is killed. A target can be revived multiple times by this ability.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-9-feature-5',
					name: 'Supernatural Insight',
					description: 'The death cultist ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-10',
			name: 'Human Scoundrel',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-10-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-10-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-10-feature-3',
						name: 'Rapier & Dagger',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: 'One creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage',
							tier3: '12 damage'
						}),
						effect: 'This ability deals an additional 2 damage if the scoundrel has an edge on the power roll.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-10-feature-4',
						name: 'Dagger Storm',
						type: FactoryLogic.type.createAction(),
						keywords: [],
						distance: [],
						target: '',
						cost: 5,
						effect: 'The scoundrel uses Rapier & Dagger targeting three creatures or objects. They can shift 2 before or after each strike.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-10-feature-5',
					name: 'Supernatural Insight',
					description: 'The scoundrel ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-11',
			name: 'Human Storm Mage',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Controller),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 2, 0, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-11-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-11-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-11-feature-3',
						name: 'Lightning Bolt',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic,  AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createRanged(15)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 lightning damage',
							tier2: '10 lightning damage',
							tier3: '13 lightning damage'
						}),
						spend: [
							{
								value: 5,
								effect: 'The ability takes the Area keyword and becomes a 10 × 1 line that targets each enemy and object in the area.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-11-feature-4',
						name: 'Gust of Wind',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 1 }) ],
						target: 'All enemies and objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'Slide 2; M<0 slowed (save ends)',
							tier2: 'Slide 4; M<1 slowed (save ends)',
							tier3: 'Slide 6; M<2 slowed (save ends)'
						}),
						effect: 'The gust of wind disperses gas or vapor and extinguishes any flames, including persistent effects.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-11-feature-5',
					name: 'Arcane Shield',
					description: 'The mage imposes a bane on incoming melee strikes and abilities. Whenever the mage takes damage from an adjacent enemy, the enemy takes 2 lightning damage and is R<1 pushed 2.'
				}),
				FactoryLogic.feature.create({
					id: 'human-11-feature-6',
					name: 'Supernatural Insight',
					description: 'The storm mage ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-12',
			name: 'Human Trickshot',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Artillery),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-12-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-12-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-12-feature-3',
						name: 'Trick Crossbow',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(15)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage',
							tier3: '12 damage'
						}),
						effect: 'The trickshot ignores cover and concealment.',
						spend: [
							{
								value: 3,
								effect: 'The trickshot targets an additional creature or object.'
							}
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-12-feature-4',
					name: 'Supernatural Insight',
					description: 'The trickshot ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-13',
			name: 'Human Blackguard',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 80,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 2, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-13-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-13-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-13-feature-3',
						name: 'Zweihander Swing',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
						],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage; M<1 slowed (save ends)',
							tier2: '6 damage; M<2 slowed (save ends)',
							tier3: '8 damage; M<3 slowed (save ends)'
						}),
						effect: 'An ally within 10 of the blackguard can make a free strike.',
						spend: [
							{ value: 1, effect: 'The ally can use their signature action instead.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-13-feature-4',
						name: 'You!',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy',
						effect: 'The target is marked until the start of the blackguard’s next turn. The blackguard and each of their allies gain an edge on abilities used against targets marked by the blackguard.'

					})
				}),
				FactoryLogic.feature.create({
					id: 'human-13-feature-5',
					name: 'End Effect',
					description: 'At the end of their turn, the blackguard can take 5 damage to end one save ends effect affecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'human-13-feature-6',
					name: 'Supernatural Insight',
					description: 'The blackguard ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-13-feature-7',
						name: 'Parry!',
						type: FactoryLogic.type.createTrigger('A creature targets the blackguard or an ally adjacent to the blackguard with a strike.'),
						keywords: [],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: 'Self or one ally',
						effect: 'The damage is halved.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-13-feature-8',
						name: 'Advance!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The blackguard shifts up to their speed. During or after this movement, they can use their Zweihander Swing twice.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-13-feature-9',
						name: 'Back!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All enemies in the burst',
						effect: 'Slide 5.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-13-feature-10',
						name: 'I Can Throw My Blade and So Should You!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
						target: 'Each enemy in the cube',
						effect: 'The blackguard uses their Zweihander Swing against each enemy in the area. Each ally within 5 of the area can make a free strike against any enemy in the area.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-14',
			name: 'Human Bandit Chief',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 3, 2, 3, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'human-14-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'human-14-2',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-14-feature-3',
						name: 'Whip & Magic Longsword',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'Two enemies or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; pull 1',
							tier2: '12 damage; pull 2',
							tier3: '15 damage; pull 3'
						}),
						effect: 'A target who is adjacent to the bandit chief after the ability resolves takes 5 corruption damage.',
						spend: [
							{ value: 2, effect: 'The bandit chief targets an additional enemy or object.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-14-feature-4',
						name: 'Kneel, Peasant!',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One enemy or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: 'Push 1; M<1 prone',
							tier2: 'Push 2; M<2 prone',
							tier3: 'Push 3; M<3 prone'
						}),
						spend: [
							{ value: 2, effect: 'This ability targets each enemy adjacent to the bandit chief.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-14-feature-5',
						name: 'Bloodstones',
						type: FactoryLogic.type.createTrigger('The bandit chief makes a power roll.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [
							FactoryLogic.distance.createSelf()
						],
						target: 'Self',
						effect: 'The bandit chief takes 4 corruption damage and increases the result of the power roll by one tier.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-14-feature-6',
					name: 'End Effect',
					description: 'At the end of their turn, the bandit chief can take 5 damage to end one save ends effect affecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'human-14-feature-7',
					name: 'Supernatural Insight',
					description: 'The blackguard ignores concealment if it’s granted by a supernatural effect, or the target is supernatural.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-14-feature-8',
						name: 'Shoot!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All allies in the hurst',
						effect: 'Each target makes a ranged free strike'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-14-feature-9',
						name: 'Form UP!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All allies in the burst',
						effect: 'Each target shifts up to their speed. Until the end of the encounter, the bandit chief and all allies have damage immunity 2 while adjacent to a target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-14-feature-10',
						name: 'Lead From the Front',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Shift 10. During or after this movement, the bandit chief can use their Whip & Magic Longsword against up to four targets. Each ally adjacent to a target can make a free strike against them.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-15',
			name: 'Giant Hawk',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Mount),
			keywords: [ 'Human', 'Animal' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(7, 'flying'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 2, -3, 1, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-15-feature-1',
						name: 'Talons',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: 'One creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage',
							tier2: '7 damage',
							tier3: '9 damage; grabbed'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-15-feature-2',
						name: 'Dive',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [],
						target: '',
						effect: 'The hawk moves up to their speed.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-15-feature-3',
					name: 'Mounted Platform',
					description: 'Any creature riding the hawk can make a free strike during or after the hawk’s movement.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-16',
			name: 'Human Warrior',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Defender),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 15,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 3,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-16-feature-1',
						name: 'Chop',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}),
						effect: 'The attack gains an edge if the warrior is adjacent to their mentor.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-16-feature-2',
					name: 'Supernatural Insight',
					description: 'The warrior ignores concealment if it’s granted by a supernatural effect, or if the target is supernatural.'
				})
			],
			retainer: {
				level4: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-16-retainer-4',
						name: '‘Scuse Me, Boss',
						type: FactoryLogic.type.createTrigger('The warrior’s mentor is targeted with an attack.', { qualifiers: [ 'encounter' ] }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'The warrior’s mentor',
						effect: 'The warrior and the mentor switch places. The warrior becomes the attack’s new target and gains 2 shields against the attack.'
					})
				}),
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-16-retainer-7',
						name: 'Defensive Fighting',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '7 damage',
							tier2: '11 damage',
							tier3: '16 damage'
						}),
						effect: 'Until the start of the warrior’s next turn, the warrior and allies within 1 gain 1 shield.'
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-16-retainer-10',
						name: 'Whirlwind of Steel',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Charge, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '12 damage',
							tier2: '18 damage',
							tier3: '24 damage'
						})
					})
				})
			}
		})
	],
	addOns: []
};
