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

export const undead: MonsterGroup = {
	id: 'monster-group-undead',
	name: 'Undead',
	description: `
Some serve as mindless soldiers and workers under the control of a necromancer. Others rise when they die a bitter death in a place infused with cursed magic. For a few, it was a choice to become something other than a mortal. No matter the reason for their creation, all undead were once living creatures who walk the land after death in defiance of the natural order. 

Rotting zombies, seductive vampires, wailing wraiths, and more undead stalk the widespread horror stories nobles and commoners alike tell each another around low-burning hearths. Even the most isolated hermits know that the dead can rise, eager to kill. These popular tales fuel many people’s fears of the undead. Mere rumors of a nearby ghoul pack can send an entire community into a panic. When open graves appear in the churchyard or a translucent spirit is spotted on the street, local leaders are quick to hire adventurers to deal with the threat.`,
	information: [
		{
			id: 'undead-info-1',
			name: 'Dark Places',
			description: 'For many undead, sunlight is a nuisance that they naturally avoid. While it is rarely harmful to them, the sun’s golden rays make them uncomfortable and seems to shine far too bright to their dead eyes. Walking in the light of day also makes it easier for fearful mortals to spot an undead. Many undead avoid the sun entirely, hiding in tombs or ruins until nightfall when they can freely stalk their victims.'
		},
		{
			id: 'undead-info-2',
			name: 'Encountered Together',
			description: 'Undead creatures are often encountered in groups that include more than just a single kind of creature. A necromancer might raise zombies, skeletons, and ghouls to protect their mansion, as each serves a different function as a guardian. A lich could have wraiths as messengers and wights as laboratory assistants. An ancient tomb might have mummies and vampires within. The undead don’t need to drink, eat, sleep, or breathe, and many share an affinity for lightless places, leading to these congregations.'
		},
		{
			id: 'undead-info-3',
			name: 'Corporeal Undead',
			description: `
At their most innocuous, corporeal undead are a mockery of life, a body dragged along by unnatural strings. At their worst, they are a violent scourge hungry for slaughter, a perverse reflection of the mortal desire to exist for eternity. Ghouls, skeletons, wights, and zombies number among the lesser corporeal undead. Most lack a soul, and many can’t think beyond the orders of their creators (unlike more powerful corporeal undead, such as liches and vampires). Those who aren’t controlled by others typically have a singular focus: the destruction of all living things. 

The magic that animates a corpse removes the need for air, sleep, and sustenance. These spells also halt decay, preserving the undead at the stage of deterioration when magic touched them. While most corporeal undead are brought to unlife by a creator, there are tales of zombies suddenly rising from graveyards during rare astrological occurrences, skeletal soldiers emerging from mass graves on the anniversary of their death, and other seemingly spontaneous acts of necromancy.`
		},
		{
			id: 'undead-info-4',
			name: 'Incorporeal ndead',
			description: `
Umbral stalkers. Specters. Wraiths. Spectral undead come in many forms. One might be formed by a person’s vile actions in life, while another could be a soul lost to a necromancer’s dark art. Powerful undead can even manifest these shadowy beings into existence through sheer will. Regardless of how they come to be, spectral undead are malice incarnate. 

Spectral undead who naturally formed from the souls of malicious, hate-filled humanoids usually haunt the places where they died, while those manifested by another being serve their creator. Left to their own devices, spectral undead stop at nothing to kill the living they encounter, with some stalking their quarry over miles of wilderness.`
		},
		{
			id: 'undead-info-5',
			name: 'Undead Languages',
			description: 'Most undead speak the languages they knew in life.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'undead-malice-1',
			name: 'Paranormal Fling',
			cost: 3,
			sections: [
				'Up to three objects on the encounter map that aren’t held or tethered to the ground ﬂoat 1 square oﬀ the ground. Each object is then pulled 5 squares toward the nearest enemy within 3 squares of the object.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-malice-2',
			name: 'Abyssal Rift',
			cost: 5,
			sections: [
				'Ravenous and rotting undead arms burst forth from 9 connected squares of a vertical or horizontal surface. A creature who ends their turn adjacent to an aﬀected square makes an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '5 damage; restrained (save ends)',
					tier2: '5 damage; restrained (EoT)',
					tier3: '5 damage'
				}),
				'A creature who starts their turn restrained by the arms takes 1d6 damage.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-malice-3',
			name: 'Dread March',
			cost: 7,
			sections: [
				'Each undead creature in the encounter moves up to their speed and makes a free strike. If an undead creature is reduced to Stamina 0 during this dread march, they don’t die until their movement and attacks are resolved.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-malice-4',
			name: 'Intensity Tally',
			cost: 3,
			sections: [
				'At the end of each round, keep an intensity tally of the number of living heroes not adjacent to one or more undead creatures. When the tally reaches the number of heroes in the encounter, you can spend malice to activate the following feature.',
				'**Ravenous Horde (3 Malice)** Each living hero in the encounter is beset by two winded **rotting zombies** who burst out of unoccupied spaces 4 squares away. The number of rotting zombies increases to three per hero when three or fewer heroes remain alive in the encounter. The intensity tally resets to 0.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'undead-1',
			name: 'Crawling Claw',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Undead' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(0, 2, -5, -1, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-1-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-1-feature-2',
						name: 'Fingernails',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage'
						}),
						effect: 'The crawling claw shifts a number of squares equal to the damage dealt.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-1-feature-3',
					name: 'Disorganizaed',
					description: 'The crawling claw can’t grant the flanking benefit to allies.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2',
			name: 'Decrepit Skeleton',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Undead' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 2, -2, 0, -2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-2-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2-feature-2',
						name: 'Bone Bow',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						}),
						effect: 'The decrepit skeleton chooses one other target within distance to take 1 damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2-feature-3',
					name: 'Bonetrops',
					description: 'When the decrepit skeleton is reduced to Stamina 0, their square becomes diﬃcult terrain. The ﬁrst time any enemy enters this space, they take 1 damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-3',
			name: 'Rotting Zombie',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Undead' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Strike damage +1',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-3-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3-feature-2',
						name: 'Rotting Fist',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage; M<2 prone if size 1, slowed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-3-feature-3',
					name: 'Death Grasp',
					description: 'When the rotting zombie is reduced to Stamina 0, their square becomes diﬃcult terrain. The ﬁrst time any enemy enters this space, they are M<2 slowed (save ends).'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-4',
			name: 'Shade',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Undead' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 4,
			stability: 1,
			freeStrikeDamage: 2,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(-5, 1, 0, 0, +2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-4-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-4-feature-2',
						name: 'Life Drain',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 corruption damage',
							tier2: '4 corruption damage',
							tier3: '5 corruption damage; the target moves up to their speed away from all shades'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-4-feature-3',
					name: 'Corruptive Phasing',
					description: 'The shade can move through other creatures and objects at normal speed. The first time in a round that the shade passes through a creature, that creature takes 2 corruption damage. The shade doesn\'t take damage from being force moved into objects.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-5',
			name: 'Ghoul',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Harrier),
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
					id: 'undead-5-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-5-feature-2',
						name: 'Razor Claws',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '4 damage',
							tier3: '5 damage; M<2 bleeding (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-5-feature-3',
						name: 'Leap',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The ghoul jumps 3 squares. If they land on a size 1 enemy, that enemy is knocked prone and the ghoul makes a free strike against them.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-5-feature-4',
					name: 'Hunger',
					description: 'If the ghoul charges, their speed increases by 2 until the end of their turn.'
				}),
				FactoryLogic.feature.create({
					id: 'undead-5-feature-5',
					name: 'Arise',
					description: 'The ﬁrst time the ghoul is reduced to Stamina 0 by damage that isn’t ﬁre damage or holy damage and their body isn’t destroyed, they regain half their Stamina and fall prone.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-6',
			name: 'Skeleton',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Artillery),
			keywords: [ 'Undead' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 1, 0, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-6-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-6-feature-2',
						name: 'Bone Shards',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage',
							tier2: '6 damage',
							tier3: '7 damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-6-feature-3',
						name: 'Bone Spur',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy in burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage; M<0 bleeding (save ends)',
							tier2: '2 damage; M<1 bleeding (save ends)',
							tier3: '3 damage; M<2 bleeding (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-6-feature-4',
					name: 'Arise',
					description: 'The ﬁrst time the skeleton is reduced to Stamina 0 by damage that isn’t ﬁre damage or holy damage and their body isn’t destroyed, they regain half their Stamina and fall prone.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-7',
			name: 'Specter',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Hexer),
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
					id: 'undead-7-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-7-feature-2',
						name: 'Decaying Touch',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 corruption damage; P<0 weakened (save ends)',
							tier2: '4 corruption damage; P<1 weakened (save ends)',
							tier3: '5 corruption damage; P<2 weakened (save ends)'
						}),
						spend: [
							{ value: 2, effect: 'The potency of this ability increases by 1. A living creature killed by this ability becomes a **specter** who appears in the target\'s space under the Director\'s control.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-7-feature-3',
						name: 'Hidden Movement',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The specter turns invisible, moves up to their speed, and becomes visible again.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-7-feature-4',
					name: 'Corruptive Phasing',
					description: 'The specter can move through other creatures and objects at normal speed. The ﬁrst time in a round that the specter passes through a creature, that creature takes 2 corruption damage. The specter doesn’t take damage from being force moved into objects.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-8',
			name: 'Umbral Stalker',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Ambusher),
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
					id: 'undead-8-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-8-feature-2',
						name: 'Chilling Grasp',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 cold damage',
							tier2: '6 cold damage',
							tier3: '7 cold damage'
						}),
						effect: 'The umbral stalker shifts 2 before or after using this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-8-feature-3',
						name: 'Freezing Dark',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						cost: 3,
						target: 'Each enemy in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 cold damage',
							tier2: '3 cold damage',
							tier3: '4 cold damage'
						}),
						effect: 'Until the end of the umbral stalker’s next turn, the area is concealed and blocks line of effect for all enemies.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-8-feature-4',
						name: 'Shadow Jump',
						type: FactoryLogic.type.createManeuver({ free: true }),
						keywords: [],
						distance: [],
						target: '',
						cost: 1,
						effect: 'The umbral stalker teleports to an unoccupied space in concealment within 10 squares. '
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-8-feature-5',
					name: 'Corruptive Phasing',
					description: 'The umbral stalker can move through other creatures and objects at normal speed. The ﬁrst time in a round that the umbral stalker passes through a creature, that creature takes 2 corruption damage. The umbral stalker doesn’t take damage from being force moved into objects.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-9',
			name: 'Wight',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Hexer),
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
					id: 'undead-9-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-9-feature-2',
						name: 'Lifestealer Longsword',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 corruption damage',
							tier2: '4 corruption damage; M<1 slowed (save ends)',
							tier3: '5 corruption damage; M<2 slowed and weakened (save ends)'
						}),
						effect: 'The target appears to rapidly age each time they take damage from this ability. The target regains their former appearance when the wight is destroyed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-9-feature-3',
						name: 'Raise',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(3) ],
						target: 'One dead ally',
						effect: 'The target revives with half their Stamina. The wight can\'t use this maneuver again until they attack a creature with their lifestealer longsword.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-9-feature-4',
					name: 'Arise',
					description: 'The ﬁrst time the wight is reduced to Stamina 0 by damage that isn’t ﬁre damage or holy damage and their body isn’t destroyed, they regain half their Stamina and fall prone.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-10',
			name: 'Zombie',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Brute),
			keywords: [ 'Undead' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(2, 1, -5, -2, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-10-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 1 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-10-feature-2',
						name: 'Clobber and Clutch',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage',
							tier2: '6 damage',
							tier3: '7 damage; grabbed'
						}),
						effect: 'A target who starts their turn grabbed by the zombie takes 2 corruption damage. If a creature takes 5 or more corruption damage this way, they become insatiably hungry for flesh. The target must complete the Find a Cure project to end this effect.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-10-feature-3',
						name: 'Breakfall',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 corruption damage',
							tier2: '3 corruption damage; M<1 weakened (save ends)',
							tier3: '4 corruption damage; M<2 dazed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-10-feature-4',
					name: 'Endless Knight',
					description: 'The ﬁrst time the zombie is reduced to Stamina 0 by damage that isn’t ﬁre damage or holy damage and their body isn’t destroyed, they regain their full Stamina and fall prone.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-11',
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
					id: 'undead-11-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 3 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-11-feature-2',
						name: 'Heat Death',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Two creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 cold damage; P<1 slowed (save ends)',
							tier2: '10 cold damage; P<2 slowed (save ends)',
							tier3: '13 cold damage; P<3 slowed (save ends)'
						}),
						effect: 'The next strike made against the target has an edge.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-11-feature-3',
						name: 'Haunt',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'Self or one incorporeal ally',
						effect: 'The target shifts up to their speed.',
						spend: [
							{ value: 2, effect: 'The ghost chooses one additional target.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-11-feature-4',
						name: 'Shriek',
						type: FactoryLogic.type.createTrigger('A creature within distance targets the ghost with a strike.'),
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature',
						effect: 'The ghost halves the incoming damage and the target takes 2 sonic damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-11-feature-5',
					name: 'Phantom Flow',
					description: 'Each incorporeal undead creature within 10 squares of the ghost ignores diﬃcult terrain.'
				}),
				FactoryLogic.feature.create({
					id: 'undead-11-feature-6',
					name: 'Corruptive Phasing',
					description: 'The ghost can move through other creatures and objects at normal speed. The ﬁrst time in a round that the ghost passes through a creature, that creature takes 2 corruption damage. The ghost doesn’t take damage from being force moved into objects.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-11-feature-7',
						name: 'Paranormal Activity',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each size 1S or larger object in the burst',
						effect: 'Each target floats 1 square into the air and is pulled 5 squares toward the nearest enemy within 3 squares of them.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-11-feature-8',
						name: 'Spirited Away',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'P<1 levitated (EoT) (see effect)',
							tier2: 'P<2 levitated (EoT)',
							tier3: 'P<3 levitated for the rest of the encounter'
						}),
						effect: 'A levitated target floats 1 square off the ground when they are first affected, then rises 1 square at the end of each of their turns. If a levitated target can’t already fly, they can fly but are slowed and weakened while flying in this way.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-11-feature-9',
						name: 'Awful Wail',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 sonic damage',
							tier2: '5 sonic damage',
							tier3: '8 sonic damage'
						}),
						effect: 'P<2 the target is reduced to 1 Stamina if they have 2 or more Stamina after taking damage.'
					})
				})
			]
		})
	],
	addOns: []
};
