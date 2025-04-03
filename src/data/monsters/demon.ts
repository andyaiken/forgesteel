import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const demon: MonsterGroup = {
	id: 'monster-group-demon',
	name: 'Demon',
	description: `
Demons spawn in the Abyssal Wasteland, where evil and chaos meet. These creatures of incarnate evil crave violence and suffering in the way most other creatures need food. A demon cares only for themself, and they torture and tear apart lesser demons for fun. 

The bestial appearance of each demon is unique, composed of a chaotic arrangement of teeth, claws, and limbs meant for killing. Even demons of the same kind have unique features. One might bear an extra set of eyes or teeth, while another has a human arm growing from their forehead.`,
	information: [
		{
			id: 'demon-info-1',
			name: 'Mortal Alliances',
			description: 'Demons form temporary alliances with evil mortals in exchange for souls to consume. Such alliances create carnage with alarming efficiency, though they inevitably collapse when the demons decide to devour their foolish partners. The only creature who can truly keep a demon in line is a more powerful demon.'
		},
		{
			id: 'demon-info-2',
			name: 'Soul Reavers',
			description: 'Demons feast not on food or water, but on souls. Souls fuel their anarchic powers, and while starved for souls, a demon can scarcely think. Whenever a demon kills a creature with a soul, they consume that soul and keep its energy within their body. A demon can then burn that soul energy to enact their most devastating abilities.'
		},
		{
			id: 'demon-info-3',
			name: 'Demonic Hierarchy',
			description: `
Mortal scholars have classified demons into ten categories, and the higher a demon’s category, the more powerful the fiend. Though demons don’t use these classifications themselves, this system reflects their hierarchy, as stronger demons bully the weak into service. 

Each time a demon consumes a soul, there’s a chance they might evolve into a more powerful demon. The evolution from one category to the next can be instant, or it can take years. This inconsistency has led to much scholarly debate on whether all souls are equal, or whether demonic evolution is aided by the consumption of souls that are especially corrupt—or heroic.

The following demons have been identified across categories 1-3:
• **Pitlings** resemble rodents or insects, but possess gleaming green eyes and terrible body odor, and disgorge a viscous, toxic phlegm.

• **Ensnarers** are the result of pitlings getting ahold of an unfortunate soul. The pitling is in the process of digesting the soul of a creature, physically boring through its head, and flopping around like an appendage. The body is puppeteered and mid transformation into a demon, with mouths forming on the creature’s hands and arms that shoot out long, barbed tongues as attacks. 

• **Frenzied** are similar to ensnarers, but their transformation into a true demon is more advanced, resulting in a fast and viscous creature full of energy and hunger for more souls. 

• Rumored to be the initial source of the teachings of all shadows through the College of Black Ash, **remasches** are demons whose physical form is blended with the nature of the wastes where they dwell. A remasch teleports around the battlefield, inflicting chaos on their enemies directly or through the minions they control.  

• Possessed of glowing eyes and tendril-ringed maws, **ruinants** breathe with a sickening wheeze and have bodies covered in inflamed scars. A ruinant can inflict fresh wounds and burns on their victims in a pattern mirroring those on the demon’s own body. 

• **Torlases** are piecemeal abominations whose physical forms don’t obey the normal laws of geometry. They control the battlefield by using living flesh and whipping allies and enemies alike into advantageous position. 

• **Bendraks** appear as an amalgamation of flesh and shards of a broken mirror, able to shape their bodies to distract and confuse their foes. A bendrak can divert an enemy’s attack to another enemy or hide themselves or allies behind dazzling reflections. 

• **Mucerons** are the result of an ensnarer going through repeated demon evolutions to become a brutish creature, covered in several mouths that shoot out barbed tongues, pulling an enemy’s attention along with pulling them physically.  

• **Chorogaunts** are terrifying demon leaders. Each is an amalgamation of several demon bodies formed into a mobile, living musical instrument. Several heads are arranged into a chorus embedded in the demon’s chest and its ribs are upturned into a fleshy pipe organ. Their attacks entrance and confuse enemies, making them more vulnerable to other demons.`
		},
		{
			id: 'demon-info-4',
			name: 'Demon Languages',
			description: 'Demons speak Proto-Ctholl'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'demon-malice-1',
			name: 'Soulburn',
			cost: 3,
			sections: [
				'Each demon acting this turn has a double edge on their abilities.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-malice-2',
			name: 'Abyssal Rift',
			cost: 5,
			sections: [
				'Two size 2 rifts to the Abyssal Wasteland appear at locations of your choosing. Any demon can use an abyssal rift as a portal to another abyssal rift in the encounter, moving into any space in one rift and appearing immediately in any unoccupied space in the other rift. A non-demon creature who enters the rift for the ﬁrst time in a round or starts their turn there takes corruption damage equal to the level of the highest-level demon on the encounter map.',
				'An abyssal rift is an immovable object that has Stamina 25, weapon immunity 5, and holy weakness 5. A creature who has the Magic or Psionics skill can make a hard Reason or Intuition test as a maneuver while adjacent to a rift to destabilize it. On success, the rift closes. On failure, the rift regains 5 Stamina. The rift closes when there are no demons remaining on the encounter map.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'demon-malice-3',
			name: 'Abyssal Evolution',
			cost: 7,
			sections: [
				'A demon minion of your choice turns into a non-minion demon of the same level.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'demon-1',
			name: 'Demon Ensnarer',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Melee Distance +2',
			characteristics: MonsterLogic.createCharacteristics(2, 0, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-1-feature-1',
						name: 'Barbed Tongues',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage; pull 1',
							tier2: '4 damage; pull 2',
							tier3: '5 damage; pull 3'
						}),
						effect: 'If the target is pulled adjacent ot the ensarer, the ensnarer makes a free strike against them.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-1-feature-2',
					name: 'Soulsight',
					description: 'Each creature within 2 of the ensnarer can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-1-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-2',
			name: 'Demon Frenzied',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(0, 2, -1, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-2-feature-1',
						name: 'Rip and Tear',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-2-feature-2',
					name: 'Soulsight',
					description: 'Each creature within 2 of the frenzied can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-3',
			name: 'Demon Pitling',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(-2, 2, -2, -2, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-3-feature-1',
						name: 'Spit',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 poison damage',
							tier2: '4 poison damage',
							tier3: '5 poison damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-3-feature-2',
					name: 'Horrid Stench',
					description: 'Any enemy who has three or more pitlings within 2 squares of them can\'t regain Stamina.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-3-feature-3',
					name: 'Soulsight',
					description: 'Each creature within 2 of the pitling can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-3-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-4',
			name: 'Demon Bendrak',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4-feature-1',
						name: 'Warp Perception',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 psychic damage',
							tier2: '5 psychic damage; P<1 weakened (save ends)',
							tier3: '7 psychic damage; P<2 weakened (save ends)'
						}),
						effect: 'If the target makes a strike while weakened this way, the bendrak can choose a second target within distance for the strike, then evenly divides any damage from the strike between the two targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-4-feature-2',
						name: 'Vanish',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one ally',
						effect: 'The target immediately becomes hidden, regardless of whether they have cover or concealment.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-4-feature-3',
					name: 'Lethe',
					description: 'While winded, the bendrak has an edge on strikes, and strikes have an edge against them.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-4-feature-4',
					name: 'Soulsight',
					description: 'Each creature within 2 of the ensnarer can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-4-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-5',
			name: 'Demon Muceron',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 5,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-5-feature-1',
						name: 'Barbed Tongues',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; pull 2',
							tier2: '7 damage; pull 3',
							tier3: '8 damage; pull 4'
						}),
						effect: 'If the target is pulled adjacent to the muceron, the muceron either makes a free strike against them or grabs them.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-5-feature-2',
						name: 'Tongue Pull',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Three creatures',
						effect: 'The muceron pulls each target 5 squares.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-5-feature-3',
					name: 'Lethe',
					description: 'While winded, the muceron has an edge on strikes, and strikes have an edge against them.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-5-feature-4',
					name: 'Soulsight',
					description: 'Each creature within 2 of the muceron can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-5-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-6',
			name: 'Demon Remasch',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Ambusher),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'teleport'),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-6-feature-1',
						name: 'Abyssal Strike',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; the remasch teleports 2 squares',
							tier2: '6 damage; the remasch teleports 3 squares',
							tier3: '8 damage; the remasch teleports 5 squares'
						}),
						spend: [
							{ value: 5, effect: 'The remasch takes an adjacent creature with them when they teleport. The creature appears in an unoccupied space adjacent to the remasch’s destination.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-6-feature-2',
						name: 'Grasping Shadows',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The resmach teleports 2 squares and uses Abyssal Strike.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-6-feature-3',
					name: 'Lethe',
					description: 'While winded, the resmach has an edge on strikes, and strikes have an edge against them.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-6-feature-4',
					name: 'Soulsight',
					description: 'Each creature within 2 of the resmach can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-6-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-7',
			name: 'Demon Ruinant',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-7-feature-1',
						name: 'Bloodletting Claw',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
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
						id: 'demon-7-feature-2',
						name: 'Salt Wounds',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures without Full Stamina',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 corruption damage',
							tier2: '2 corruption damage',
							tier3: '3 corruption damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-7-feature-3',
					name: 'Lethe',
					description: 'While winded, the ruinant has an edge on strikes, and strikes have an edge against them.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-7-feature-4',
					name: 'Soulsight',
					description: 'Each creature within 2 of the ruinant can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-7-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-8',
			name: 'Demon Torlas',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Controller),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-8-feature-1',
						name: 'Floor to Flesh',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy in cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'Slide 3',
							tier2: 'Slide 4',
							tier3: 'Slide 5'
						}),
						effect: 'The area turns into a morass of spongy flesh before the targets are force moved. Until the start of the torlas’s next turn, the area is difficult terrain, and each creature who moves within the area takes 1 damage for each square moved.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-8-feature-2',
						name: 'Grasping Tendons',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						effect: 'The torlas pulls each target 3 squares.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-8-feature-3',
					name: 'Lethe',
					description: 'While winded, the torlas has an edge on strikes, and strikes have an edge against them.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-8-feature-4',
					name: 'Soulsight',
					description: 'Each creature within 2 of the torlas can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-8-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'demon-9',
			name: 'Chorogaunt',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Abyssal', 'Demon' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 2, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-9-feature-1',
						name: 'Agonizing Harmony',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '4 psychic damage; I<1 slowed (save ends)',
							tier2: '7 psychic damage; I<2 slowed (save ends)',
							tier3: '10 psychic damage; I<3 slowed (save ends)'
						}),
						effect: 'An ally within 10 squares of the chorogaunt can shift up to their speed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-9-feature-2',
						name: 'Chaotic Entrancing Harmony',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each enemy in the burst',
						effect: 'Each target slides 3, ignoring their stability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-9-feature-3',
						name: 'I Thrive on Pain',
						cost: 3,
						type: FactoryLogic.type.createTrigger('The chorogaunt is targeted by a strike.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Any damage from the attack is halved, and the chorogaunt deals an additional 3 damage with their abilities until the end of their next turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'demon-9-feature-4',
					name: 'End Effect',
					description: 'At the end of their turn, the chorogaunt can take 5 damage to end one save ends eﬀect aﬀecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-9-feature-5',
					name: 'Lethe',
					description: 'While winded, the chorogaunt has an edge on strikes, and strikes have an edge against them.'
				}),
				FactoryLogic.feature.create({
					id: 'demon-9-feature-6',
					name: 'Soulsight',
					description: 'Each creature within 2 of the chorogaunt can\'t be hidden from them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'demon-9-feature-7',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-9-feature-8',
						name: 'Frightening Tones',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three enemies',
						effect: 'The chorogaunt allows each target to choose between taking 5 psychic damage or being frightened (save ends).'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-9-feature-9',
						name: 'Bully the Weak',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						effect: 'The chorogaunt kills the target, and each other ally deals an additional 3 damage on attacks until the end of the round. The Director gains malice equal to the number of heroes.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'demon-9-feature-10',
						name: 'Running Cacophony',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The chorogaunt shifts up to their speed, uses their Agonizing Harmony, shifts up to their speed, and then uses their Agonizing Harmony again.'
					})
				})
			]
		})
	],
	addOns: []
};
