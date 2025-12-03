import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { StatBlockIcon } from '@/enums/stat-block-icon';

export const human: MonsterGroup = {
	id: 'monster-group-human',
	name: 'Human',
	description: 'Humans flourish in every habitable part of the world, from inviting coastal cities to unforgiving mountainous terrain. While most humans live quietly in peaceful communities, some are drawn to adventure by an unquenchable thirst for excitement or power.',
	picture: null,
	information: [
		{
			id: 'human-info-1',
			name: 'Villains and Heroes',
			description: `
Recognizing their limited lifespans, humans often set their eyes on immortality. They unfurl empires at the tip of a sword, sacrifice lives to erect grand monuments, and even aspire to godhood, all in hopes that their names will be remembered forever. 

Violence and greed are close cousins in the human fam ily. Those with power and wealth often strive for more with might or magic. Others turn to theft, sometimes driven to desperation by rapacious neighbors. Travelers in human lands are likely to encounter robbers and barons both seeking to exact a toll. 

Other humans pursue power more subtly, turning their cunning toward selfish ends. When ambitions exceed circumstances, there is always some ancient evil power to call on. Cultists seek fell power in exchange for service, sacrificing to forbidden gods and courting apocalypse. 

Fortunately, many humans devote themselves to righting wrongs and reshaping the world for the better. Human heroes plunge themselves into danger time and time again, standing against natural and supernatural perils in pursuit of justice. `
		},
		{
			id: 'human-info-2',
			name: 'Risks and Rewards',
			description: `
Humans devote as much atten tion to games and gambling as to more serious pursuits. Perhaps this competitive nature explains their renowned knack for seizing the moment—knowing when to risk all on a throw of the dice. Whether in sport or battle, humans quickly spot their opponent’s mistakes and seize the advantage.

Humans see unrealized potential everywhere, whether envisioning an untamed forest transformed into a prosper ous village, or an ancient dungeon yielding chests filled with coins. Pursuing such ambitions might end in catastrophe, but for these gamblers, it’s a game worth playing.`
		},
		{
			id: 'human-info-3',
			name: 'Swords for Hire',
			description: 'With an appetite for warfare and gold, human adventurers are well represented in most mer cenary bands. A human mercenary makes a stout ally … if you can afford their price.'
		},
		{
			id: 'human-info-4',
			name: 'Connected to the Natural World',
			description: ' Humans are connected to the natural world in a way that many other folk are not. As such, they have an uncanny knack for detecting when nearby creatures, objects, and phenomena have been created by magic and psionics. This same sense allows them to resist supernatural effects.'
		},
		{
			id: 'human-info-5',
			name: 'Human Languages',
			description: 'Most humans speak Caelian and one Vaslorian human language.'
		}
	],
	malice: [
		FactoryLogic.feature.createMaliceAbility({
			ability: FactoryLogic.createAbility({
				id: 'human-malice-1',
				name: 'Alchemical Device',
				type: FactoryLogic.type.createManeuver({ qualifiers: [ 'Non-minion' ] }),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
				target: 'Each enemy and object in the area',
				sections: [
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						tier1: '4 corruption damage; A<0 slowed (save ends)',
						tier2: '6 corruption damage; A<1 slowed (save ends)',
						tier3: '9 corruption damage; A<2 restrained (save ends)'
					}))
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'human-malice-2',
			name: 'Exploit Opening',
			cost: 5,
			icon: StatBlockIcon.Trait,
			sections: [
				'Each human acting this turn gains an edge on abilities until the end of their turn, or has a double edge on any ability that targets an enemy affected by a condition.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'human-malice-3',
			name: 'Staying Power',
			cost: 7,
			icon: StatBlockIcon.Trait,
			sections: [
				' Each non-minion human in the encounter regains Stamina equal to 5 times their level.'
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
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: FactoryLogic.createCharacteristics(0, 1, 0, 0, 2),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 lightning damage',
								tier2: '3 lightning damage',
								tier3: '5 lightning damage'
							})),
							FactoryLogic.createAbilitySectionText('If the apprentice mage doesn’t use a maneuver or a move action this turn, the target is also slowed (EoT).')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-1-4',
					name: 'Supernatural Insight',
					description: 'The apprentice mage ignores concealment if it’s granted by a supernatural effect.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-2',
			name: 'Human Guard',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+2 bonus to speed',
			characteristics: FactoryLogic.createCharacteristics(2, 0, 0, 0, 0),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							})),
							FactoryLogic.createAbilitySectionText('If the guard is flanked, they can make a free strike against a different target adjacent to them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-2-4',
					name: 'Supernatural Insight',
					description: 'The guard ignores concealment if it’s granted by a supernatural effect.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-3',
			name: 'Human Archer',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 0, 0),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-3-4',
					name: 'Supernatural Insight',
					description: 'The archer ignores concealment if it’s granted by a supernatural effect.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-4',
			name: 'Human Raider',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Gain an edge on strikes',
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 0, 0),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage',
								tier2: '2 damage',
								tier3: '3 damage'
							})),
							FactoryLogic.createAbilitySectionText('If this ability is used as part of a charge, the raider can make a ranged free strike before using the ability.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-4-4',
					name: 'Supernatural Insight',
					description: 'The raider ignores concealment if it’s granted by a supernatural effect.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-5',
			name: 'Human Death Acolyte',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: FactoryLogic.createCharacteristics(0, 1, 0, 0, 2),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 corruption damage',
								tier2: '2 corruption damage',
								tier3: '3 corruption damage'
							})),
							FactoryLogic.createAbilitySectionText('One creature within 5 squares regains 1 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-5-4',
					name: 'Supernatural Insight',
					description: 'The death acolyte ignores concealment if it’s granted by a supernatural effect.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'human-6',
			name: 'Human Rogue',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Gain an edge on strikes',
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 0, 1),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 corruption damage',
								tier2: '2 corruption damage',
								tier3: '3 corruption damage'
							})),
							FactoryLogic.createAbilitySectionText('If the rogue is disguised or hidden when they use this ability, it deals an extra 3 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-6-4',
					name: 'Supernatural Insight',
					description: 'The rogue ignores concealment if it’s granted by a supernatural effect.'
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
			characteristics: FactoryLogic.createCharacteristics(2, 1, 0, 0, 0),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '9 damage',
								tier3: '12 damage; M<2 grabbed and the target takes a bane on the Escape Grab maneuver'
							})),
							FactoryLogic.createAbilitySectionText('A target who is already grabbed takes an extra 2 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-7-feature-4',
						name: 'Throw',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature grabbed by the brawler',
						sections: [
							FactoryLogic.createAbilitySectionText('The brawler pushes the target up to 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-7-feature-5',
					name: 'Shoot the Hostage',
					description: 'The brawler halves the damage from any strike if they have a creature or object grabbed of size 1S or larger. The grabbed creature or object takes the remaining damage.'
				}),
				FactoryLogic.feature.create({
					id: 'human-7-feature-6',
					name: 'Supernatural Insight',
					description: 'The brawler ignores concealment if it’s granted by a supernatural effect.'
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
			characteristics: FactoryLogic.createCharacteristics(2, 0, 1, 0, 0),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '9 damage',
								tier3: '12 damage; M<2 the target has a double bane on their next power roll'
							})),
							FactoryLogic.createAbilitySectionText('The target is taunted (EoT).')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-8-feature-4',
					name: 'I\'m Your Enemy',
					description: 'Whenever an adjacent creature the knave has taunted deals damage to a creature other than the knave, the knave can make a free strike against them.'
				}),
				FactoryLogic.feature.create({
					id: 'human-8-feature-5',
					name: 'Overwhelm',
					description: 'An enemy who starts their turn adjacent to the knave can’t shift.'
				}),
				FactoryLogic.feature.create({
					id: 'human-8-feature-6',
					name: 'Supernatural Insight',
					description: 'The knave ignores concealment if it’s granted by a supernatural effect.'
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
			characteristics: FactoryLogic.createCharacteristics(0, 1, 0, 0, 2),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '9 damage',
								tier3: '12 damage; I<2 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The death cultist regains Stamina equal to half the damage dealt.'
							})
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
						target: 'Each dead minion in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target who died during this encounter revives with full Stamina. They immediately die at the end of the encounter or if the death cultist is killed. A target can be revived multiple times by this ability.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-9-feature-5',
					name: 'Supernatural Insight',
					description: 'The death cultist ignores concealment if it’s granted by a supernatural effect.'
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
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 0, 1),
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
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '9 damage',
								tier3: '12 damage'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'If this ability gains an edge or has a double edge, it deals an extra 2 damage.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-10-feature-4',
						name: 'Dagger Storm',
						type: FactoryLogic.type.createMain(),
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('The scoundrel uses Rapier and Dagger against up to three targets. They shift up to 2 squares before or after each strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-10-feature-5',
					name: 'Supernatural Insight',
					description: 'The scoundrel ignores concealment if it’s granted by a supernatural effect.'
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
			characteristics: FactoryLogic.createCharacteristics(0, 0, 2, 0, 1),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createRanged(15)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 lightning damage',
								tier2: '10 lightning damage',
								tier3: '13 lightning damage'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 5,
								effect: 'The ability loses the Ranged and Strike keywords, takes the Area keyword, and is a 10 × 1 line within 15 that targets each enemy and object in the area. '
							})
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
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'Slide 2; M<0 slowed (save ends)',
								tier2: 'Slide 4; M<1 slowed (save ends)',
								tier3: 'Slide 6; M<2 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The gust of wind disperses gas or vapor and extinguishes any flames, including supernatural effects.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-11-feature-5',
					name: 'Arcane Shield',
					description: 'Any melee ability targeting the storm mage takes a bane. Additionally, whenever the mage takes damage from an adjacent enemy, the enemy takes 2 lightning damage, and if they have R<1 they are pushed up to 2 squares.'
				}),
				FactoryLogic.feature.create({
					id: 'human-11-feature-6',
					name: 'Supernatural Insight',
					description: 'The storm mage ignores concealment if it’s granted by a supernatural effect.'
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
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 1, 0),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(15)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '9 damage',
								tier3: '12 damage'
							})),
							FactoryLogic.createAbilitySectionText('This ability ignores cover and concealment.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'This ability targets one additional target.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-12-feature-4',
					name: 'Supernatural Insight',
					description: 'The trickshot ignores concealment if it’s granted by a supernatural effect.'
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
			characteristics: FactoryLogic.createCharacteristics(3, 2, 2, 0, 2),
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
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
						],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 damage; M<1 slowed (save ends)',
								tier2: '6 damage; M<2 slowed (save ends)',
								tier3: '8 damage; M<3 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('One ally within 10 squares can make a free strike.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'One ally within 10 squares can use their signature ability instead.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-13-feature-4',
						name: 'You!',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is marked until the start of the blackguard’s next turn. The blackguard and each of their allies gain an edge on abilities used against targets marked by the blackguard.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-13-feature-5',
					name: 'End Effect',
					description: 'At the end of each of their turns, the blackguard can take 5 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'human-13-feature-6',
					name: 'Supernatural Insight',
					description: 'The blackguard ignores concealment if it’s granted by a supernatural effect.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-13-feature-7',
						name: 'Parry!',
						type: FactoryLogic.type.createTrigger('A creature makes a strike against the blackguard or an ally adjacent to them.'),
						keywords: [ AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: 'Self or one ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The damage is halved.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-13-feature-8',
						name: 'Advance!',
						type: FactoryLogic.type.createVillainAction(1),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The blackguard shifts up to their speed. During or after this movement, they can use their Zweihander Swing twice.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-13-feature-9',
						name: 'Back!',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The blackguard slides each target up to 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-13-feature-10',
						name: 'I Can Throw My Blade and So Should You!',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The blackguard uses their Zweihander Swing against each target. Each ally within 5 squares of the area can then make a free strike against a target (one target per ally).')
						]
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
			characteristics: FactoryLogic.createCharacteristics(2, 3, 2, 3, 2),
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
						name: 'Whip and Magic Longsword',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'Two enemies or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '8 damage; pull 1',
								tier2: '12 damage; pull 2',
								tier3: '15 damage; pull 3'
							})),
							FactoryLogic.createAbilitySectionText('Any target who is adjacent to the bandit chief after the power roll is resolved takes 3 corruption damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'This ability targets one additional target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-14-feature-4',
						name: 'Kneel, Peasant!',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: 'Push 1; M<1 prone',
								tier2: 'Push 2; M<2 prone',
								tier3: 'Push 4; M<3 prone'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The ability takes the Area keyword, loses the Melee keyword, and is a 1 burst that targets each enemy in the area.'
							})
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
						sections: [
							FactoryLogic.createAbilitySectionText('The bandit chief takes 5 corruption damage and increases the outcome of the power roll by one tier. This damage can’t be reduced in any way.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-14-feature-6',
					name: 'End Effect',
					description: 'At the end of each of their turns, the bandit chief can take 5 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'human-14-feature-7',
					name: 'Supernatural Insight',
					description: 'The bandit chief ignores concealment if it’s granted by a supernatural effect.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-14-feature-8',
						name: 'Shoot!',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each artillery ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes a ranged free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-14-feature-9',
						name: 'Form Up!',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target shifts up to their speed. Additionally, until the end of the encounter, while the bandit chief or any ally is adjacent to a target, they have damage immunity 2.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-14-feature-10',
						name: 'Lead From the Front',
						type: FactoryLogic.type.createVillainAction(3),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The bandit chief shifts up to 10 squares regardless of their speed. During or after this movement, they can use their Whip and Magic Longsword against up to four targets. Additionally, one ally adjacent to each target can make a free strike against that target.')
						]
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
			speed: FactoryLogic.createSpeed(5, 'flying'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(2, 2, -3, 1, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-15-feature-1',
						name: 'Talons',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage',
								tier2: '7 damage',
								tier3: '9 damage; grabbed'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'If this ability gains an edge or has a double edge, it deals an extra 2 damage.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'human-15-feature-2',
						name: 'Dive',
						type: FactoryLogic.type.createManeuver(),
						sections: [
							FactoryLogic.createAbilitySectionText('The hawk moves up to their speed.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'human-15-feature-3',
					name: 'Mounted Platform',
					description: 'Once per turn when the hawk moves, any creature riding the hawk can make a free strike during or after the movement.'
				})
			]
		})
	],
	addOns: []
};
