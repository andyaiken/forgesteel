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

export const undead1st: MonsterGroup = {
	id: 'monster-group-undead-1st',
	name: 'Undead - 1st Echelon',
	description: `
Some serve as mindless soldiers and workers under the control of a necromancer. Others rise when they die a bitter death in a place infused with cursed magic. For a few, it was a choice to become something beyond mortal. However they arose, all undead were once living creatures who now walk the land after death in defiance of the natural order.

Rotting zombies, seductive vampires, wailing wraiths, and more undead stalk the widespread horror stories nobles and commoners alike tell each another around low-burning hearths. Even the most isolated hermits know that the dead can rise, eager to kill. These popular tales fuel many people’s fears of the undead. Mere rumors of a nearby ghoul pack can send an entire community into a panic. When open graves appear in the churchyard or a translucent spirit is spotted on the street, local leaders are quick to hire adventurers to deal with the threat.`,
	picture: null,
	information: [
		{
			id: 'undead-1st-info-1',
			name: 'Dark Places',
			description: 'For many undead, sunlight is a nuisance that they naturally avoid. While rarely harmful to them, the sun’s golden rays make them uncomfortable and shine far too bright to their dead eyes. Walking in the light of day also makes it easier for undead to be spotted by fearful mortals. Many undead avoid the sun entirely, hiding in tombs or ruins until nightfall when they can freely stalk their victims.'
		},
		{
			id: 'undead-1st-info-2',
			name: 'Encountered Together',
			description: ' Undead are often encountered in groups that include more than just a single kind of creature. A necromancer might raise zombies, skeletons, and ghouls to protect their mansion, as each serves a different function as a guardian. A lich could have wraiths as messengers and soulwights as laboratory assistants. An ancient tomb might have mummies and vampires within. The undead don’t need to drink, eat, sleep, or breathe, and many share an affinity for lightless places, leading to these congregations.'
		},
		{
			id: 'undead-1st-info-3',
			name: 'Corporeal Undead',
			description: `
At their most innocuous, corporeal undead are a mockery of life, a body hoisted and dragged along by unnatural strings. At their worst, they are a violent scourge hungry for slaughter, and a perverse reflection of the mortal desire to exist for eternity. Ghouls, skeletons, soulwights, and zombies number among the lesser corporeal undead. Many lack a soul, and many can’t think beyond the orders of their creators—unlike more powerful corporeal undead such as liches and vampires. Those who aren’t controlled by others typically have a singular focus: the destruction of all living things.

The magic that animates a corpse removes the need for air, sleep, and sustenance. This magic also halts decay, preserving the undead at the stage of deterioration before they were animated. While most corporeal undead are brought to unlife by a creator, tales abound of zombies suddenly rising from graveyards during rare astronomical occurrences, skeletal soldiers emerging from mass graves on the anniversary of their death, and other seemingly spontaneous acts of necromancy.`
		},
		{
			id: 'undead-1st-info-4',
			name: 'Spectral Undead',
			description: `
Umbral stalkers. Specters. Wraiths. Spectral undead come in many forms. One might be spawned by a person’s vile actions in life, while another could be a soul lost to a necromancer’s fell arts. Powerful undead can even manifest these shadowy beings into existence through sheer will. Regardless of how they come to be, though, all spectral undead are malice incarnate.

Spectral undead who are formed naturally from the souls of malicious, hate-filled creatures usually haunt the places where they died, while those manifested by another being typically dwell where ordered to by their creator. Left to their own devices, spectral undead stop at nothing to kill the living they encounter, with some stalking their quarry through miles of ruins or wilderness.`
		},
		{
			id: 'undead-1st-info-5',
			name: 'Undead Languages',
			description: ' Most undead speak (or at least understand) the languages they knew in life.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'undead-1st-malice-1',
			name: 'Ravenous Horde',
			cost: 2,
			sections: [
				'At the end of this round, each hero not already adjacent to one or more undead is beset by two **rotting zombies** who burst up from the ground to appear in adjacent unoccupied spaces. Each zombie is winded. This feature can’t be used two rounds in a row.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-1st-malice-2',
			name: 'Paranormal Fling',
			cost: 3,
			sections: [
				'Up to three unattended objects on the encounter map rise to float 1 square off the ground. Each object is then pulled 5 squares toward the nearest enemy within 3 squares of the object.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-1st-malice-3',
			name: 'The Grasping, The Hungry',
			cost: 5,
			sections: [
				'Ravenous and rotting undead arms burst forth from 9 connected squares of a vertical or horizontal surface. Any creature who ends their turn adjacent to an affected square makes an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '5 damage; restrained (save ends)',
					tier2: '5 damage; restrained (EoT)',
					tier3: '5 damage'
				}),
				'While restrained this way, a creature takes 1d6 damage at the start of each of their turns.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-1st-malice-4',
			name: 'Dread March',
			cost: 7,
			sections: [
				'Up to four undead in the encounter move up to their speed and can make a free strike. The number of undead affected increases by 1 for each additional Malice spent on this feature. If an undead is reduced to 0 Stamina during this dread march, they don’t die until the march is resolved.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'undead-1st-1',
			name: 'Crawling Claw',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Undead', 'Soulless' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(0, 2, -5, -1, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-1st-1-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-1-feature-2',
						name: 'Fingernails',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage',
								tier2: '2 damage',
								tier3: '3 damage'
							})),
							FactoryLogic.createAbilitySectionText('The crawling claw shifts up to a number of squares equal to the damage dealt.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-1-feature-3',
					name: 'Disorganized',
					description: 'Allies can’t flank with the crawling claw.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-1st-2',
			name: 'Decrepit Skeleton',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Undead', 'Soulless' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 2, -2, 0, -2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-1st-2-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-2-feature-2',
						name: 'Bone Bow',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							})),
							FactoryLogic.createAbilitySectionText('The decrepit skeleton chooses one other target within distance, who takes 1 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-2-feature-3',
					name: 'Bonetrops',
					description: 'When the decrepit skeleton is reduced to 0 Stamina, their space is difficult terrain. The first time any enemy enters this space, they take 1 damage and the effect ends.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-1st-3',
			name: 'Rotting Zombie',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Undead', 'Soulless' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Strike damage +1',
			characteristics: MonsterLogic.createCharacteristics(2, -2, -5, -2, -3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-1st-3-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-3-feature-2',
						name: 'Rotting Fist',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage; M<2 prone if size 1, or slowed (save ends) otherwise'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-3-feature-3',
					name: 'Death Grasp',
					description: 'When the rotting zombie is reduced to 0 Stamina, their space is difficult terrain. The first time any enemy who has m<2] enters this space, they are slowed (save ends) and the effect ends.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-1st-4',
			name: 'Shade',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Undead' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 4,
			stability: 1,
			freeStrikeDamage: 2,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(-5, 1, 0, 0, +2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-1st-4-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-4-feature-2',
						name: 'Life Drain',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 corruption damage',
								tier2: '4 corruption damage',
								tier3: '5 corruption damage; the target must move up to their speed and can’t end that movement closer to any shade'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-4-feature-3',
					name: 'Shadow Phasing',
					description: 'The shade can move through creatures and objects at their usual speed, but can’t end their turn inside a creature or object. The first time in a round that the shade moves through a creature, that creature takes 1 corruption damage. The shade doesn’t take damage from being force moved into objects.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-1st-5',
			name: 'Ghoul',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Undead' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(0, 2, -2, 0, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-1st-5-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-5-feature-2',
						name: 'Razor Claws',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage',
								tier2: '4 damage',
								tier3: '5 damage; M<2 bleeding (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-5-feature-3',
						name: 'Leap',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The ghoul jumps up to 3 squares. If they land on a size 1 enemy, that enemy is knocked prone and the ghoul can make a free strike against them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-5-feature-4',
					name: 'Hunger',
					description: 'When the ghoul uses the Charge main action, they gain a +2 bonus to speed until the end of their turn.'
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-5-feature-5',
					name: 'Arise',
					description: 'The first time the ghoul is reduced to 0 Stamina by damage that isn’t fire damage or holy damage and their body isn’t destroyed, they instead have 1 Stamina and fall prone.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-1st-6',
			name: 'Skeleton',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
			keywords: [ 'Undead', 'Soulless' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 1, 0, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-1st-6-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-6-feature-2',
						name: 'Bone Shards',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage',
								tier2: '6 damage',
								tier3: '7 damage'
							})),
							FactoryLogic.createAbilitySectionText('Until the start of the skeleton’s next turn, the target takes 2 damage the first time they willingly move on their turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-6-feature-3',
						name: 'Bone Spur',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage; M<0 bleeding (save ends)',
								tier2: '2 damage; M<1 bleeding (save ends)',
								tier3: '3 damage; M<2 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Each target takes a bane on their next strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-6-feature-4',
					name: 'Arise',
					description: 'The first time the skeleton is reduced to 0 Stamina by damage that isn’t fire damage or holy damage and their body isn’t destroyed, they instead have 1 Stamina and fall prone.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-1st-7',
			name: 'Specter',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Undead' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 10,
			stability: 1,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(-5, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-1st-7-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-7-feature-2',
						name: 'Decaying Touch',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 corruption damage; P<0 weakened (save ends)',
								tier2: '4 corruption damage; P<1 weakened (save ends)',
								tier3: '5 corruption damage; P<2 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The potency increases by 1. Any living creature who dies from this damage rises at the start of the next round in the target’s space as a **specter** under the Director’s control.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-7-feature-3',
						name: 'Hidden Movement',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The specter turns invisible, moves up to their speed, and is visible again.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-7-feature-4',
					name: 'Corruptive Phasing',
					description: 'The specter can move through creatures and objects at their usual speed, but can’t end their turn inside a creature or object. The first time in a round that the specter moves through a creature, that creature takes 2 corruption damage. The specter doesn’t take damage from being force moved into objects.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-1st-8',
			name: 'Umbral Stalker',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Undead' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'climb'),
			stamina: 15,
			stability: 1,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-1st-8-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-8-feature-2',
						name: 'Chilling Grasp',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 cold damage',
								tier2: '6 cold damage; the stalker can shift 1 square',
								tier3: '7 cold damage; the stalker shifts up to 2 squares'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-8-feature-3',
						name: 'Freezing Dark',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						cost: 3,
						target: 'Each enemy in the cube',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 cold damage',
								tier2: '3 cold damage',
								tier3: '4 cold damage'
							})),
							FactoryLogic.createAbilitySectionText('Until the end of the stalker’s next turn, the area provides concealment, and blocks line of effect for enemies.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-8-feature-4',
						name: 'Shadow Jump',
						type: FactoryLogic.type.createManeuver({ free: true }),
						keywords: [],
						distance: [],
						target: '',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('The umbral stalker teleports to an unoccupied space in an area of concealment within 10 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-8-feature-5',
					name: 'Corruptive Phasing',
					description: 'The umbral stalker can move through creatures and objects at their usual speed, but can’t end their turn inside a creature or object. The first time in a round that the umbral stalker moves through a creature, that creature takes 2 corruption damage. The umbral stalker doesn’t take damage from being force moved into objects.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-1st-9',
			name: 'Soulwight',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Undead' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-1st-9-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-9-feature-2',
						name: 'Soulstealer Longsword',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 corruption damage',
								tier2: '4 corruption damage; M<1 slowed (save ends)',
								tier3: '5 corruption damage; M<2 slowed and weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The target appears to rapidly age each time they take damage from this ability. The target regains their former appearance when the soulwight is destroyed.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-9-feature-3',
						name: 'Stolen Vitality',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(3) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target regains 10 Stamina. The soulwight can’t use this maneuver again until after they strike a creature with their Soulstealer Longsword.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-9-feature-4',
					name: 'Arise',
					description: 'The first time the soulwight is reduced to 0 Stamina by damage that isn’t fire damage or holy damage and their body isn’t destroyed, they instead have 1 Stamina and fall prone.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-1st-10',
			name: 'Zombie',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Undead' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 1,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(2, 1, -5, -2, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-1st-10-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-10-feature-2',
						name: 'Clobber and Clutch',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage',
								tier2: '6 damage',
								tier3: '7 damage; grabbed'
							})),
							FactoryLogic.createAbilitySectionText('A target who starts their turn grabbed by the zombie takes 2 corruption damage. A creature who takes 5 or more corruption damage this way becomes insatiably hungry for flesh, and must complete the Find a Cure downtime project in Draw Steel: Heroes to end this effect.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-10-feature-3',
						name: 'Zombie Dust',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The zombie falls prone, expelling a wave of rot and dust.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 corruption damage',
								tier2: '3 corruption damage; M<1 weakened (save ends)',
								tier3: '4 corruption damage; M<2 dazed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-10-feature-4',
					name: 'Endless Knight',
					description: 'The first time the zombie is reduced to 0 Stamina by damage that isn’t fire damage or holy damage and their body isn’t destroyed, they instead have 10 Stamina and fall prone. '
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-1st-11',
			name: 'Ghost',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Undead' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'fly, hover'),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(-2, 2, 0, 0, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-1st-11-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 3 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-11-feature-2',
						name: 'Heat Death',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Two creatures',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 cold damage; P<1 slowed (save ends)',
								tier2: '10 cold damage; P<2 slowed (save ends)',
								tier3: '13 cold damage; P<3 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The next strike made against the target gains an edge.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-11-feature-3',
						name: 'Haunt',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'Self or one ally with a Phasing trait',
						sections: [
							FactoryLogic.createAbilitySectionText('The target shifts up to their speed.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The ghost chooses one additional target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-11-feature-4',
						name: 'Shriek',
						type: FactoryLogic.type.createTrigger('A creature within distance targets the ghost with a strike.'),
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The ghost halves the damage from the strike and the target takes 2 sonic damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-11-feature-5',
					name: 'Phantom Flow',
					description: 'Each undead with a Phasing trait within 10 squares of the ghost can’t be made slowed or weakened.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-11-feature-6',
						name: 'Paranormal Activity',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each size 3 or smaller object in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target rises 1 square into the air and is vertically pulled up to 5 squares toward the nearest enemy within 3 squares of the target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-11-feature-7',
						name: 'Spirited Away',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'P<1 the target is levitated (EoT)',
								tier2: 'P<2 the target is levitated (EoT)',
								tier3: 'P<3 the target is levitated until the end of the encounter'
							})),
							FactoryLogic.createAbilitySectionText('A levitated target floats 1 square off the ground when first affected, then rises 1 square at the end of each of their turns. If a levitated target can’t already fly, they can fly but are slowed and weakened while flying this way.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1st-11-feature-8',
						name: 'Awful Wail',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 sonic damage',
								tier2: '5 sonic damage',
								tier3: '8 sonic damage'
							})),
							FactoryLogic.createAbilitySectionText('A target who has p<2] is reduced to 1 Stamina if they are winded after taking this damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1st-11-feature-9',
					name: 'Corruptive Phasing',
					description: 'The ghost can move through creatures and objects at their usual speed, but can’t end their turn inside a creature or object. The first time in a round that the ghost moves through a creature, that creature takes 2 corruption damage. The ghost doesn’t take damage from being force moved into objects.'
				})
			]
		})
	],
	addOns: []
};
