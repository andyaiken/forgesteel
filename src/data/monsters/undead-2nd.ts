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

export const undead2nd: MonsterGroup = {
	id: 'monster-group-undead-2nd',
	name: 'Undead — 2nd Echelon',
	description: 'More powerful and more self-aware forms of undead rise above the undead horde and lay claim to dark, isolated domains all their own. The longer an undead is allowed to thrive, the stronger they become.',
	picture: null,
	information: [
		{
			id: 'undead-2nd-info-1',
			name: 'Mummies',
			description: 'Mummies are humanoids raised from the dead through a complex series of magical rituals. The process tethers a creature’s soul to their earthly body, preventing them from crossing into true death. As part of the mummification process, a corpse is embalmed and wrapped in cloth imbued with necromantic power. Mummification is reserved for situations of grave import. A great hero might voluntarily be mummified upon death to eternally guard future generations or a holy relic. On the other hand, a great villain could be mummified to prevent them from escaping their crimes through death.'
		},
		{
			id: 'undead-2nd-info-2',
			name: 'Vampire Spawn',
			description: `
Vampirism is a curse of blood that harrows its victims, turning them into mirror-mockeries of life that nonetheless hunger for life’s essence: blood. With that hunger comes power everlasting over life and death. By feeding, a vampire passes this curse onto their victims.

Though vampires are fundamentally changed from their living forms, they retain the intellect and memories of their mortal selves. A vampire’s power grows as they spend time in undeath. Vampire spawn, the youngest of their ilk, are barely separated from their mortal selves. They are driven by their thirst for blood and their master’s orders. Few spawn survive long enough to become true vampires.`
		},
		{
			id: 'undead-2nd-info-3',
			name: 'Mournlings',
			description: `
Powered by sorrow and rage, these hulking amalgamations of dirt or flesh defend the homes of their creators, brutally attacking intruders while sobbing uncontrollably. Mournlings express far more emotion than many other undead guardians, for their makers imbued them with sadness and loss. Though their druidic creators are long-dead, some original mournlings still defend forests, meadows, and other natural places they were built to protect.

Outside of battle, mournlings patrol for interlopers in a trance-like state. When an unknown creature creates a disturbance or approaches them, the mournling unleashes a primal cry that conveys the very essence of suffering, then bursts into violence. They continue to sob and moan even as they viciously beat their enemies to a pulp.`
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'undead-2nd-malice-1',
			name: 'Ravenous Horde',
			cost: 2,
			sections: [
				'At the end of this round, each hero not already adjacent to one or more undead is beset by two **rotting zombies** who burst up from the ground to appear in adjacent unoccupied spaces. Each zombie is winded. This feature can’t be used two rounds in a row.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-2nd-malice-2',
			name: 'Paranormal Fling',
			cost: 3,
			sections: [
				'Up to three unattended objects on the encounter map rise to float 1 square off the ground. Each object is then pulled 5 squares toward the nearest enemy within 3 squares of the object.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-2nd-malice-3',
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
			id: 'undead-2nd-malice-4',
			name: 'Dread March',
			cost: 7,
			sections: [
				'Up to four undead in the encounter move up to their speed and can make a free strike. The number of undead affected increases by 1 for each additional Malice spent on this feature. If an undead is reduced to 0 Stamina during this dread march, they don’t die until the march is resolved.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-2nd-malice-5',
			name: 'Blood Hunger',
			cost: 5,
			sections: [
				'One undead acting this turn uses a signature ability against a creature who is bleeding. As a free triggered action, each undead within 5 squares of the first undead moves up to their speed and can make a free strike against the same target.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'undead-2nd-1',
			name: 'Fleshflayed Shambler Zombie',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Undead', 'Soulless' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 9,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: '+2 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(3, -1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-2nd-1-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 4 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-1-feature-2',
						name: 'Bone Carvers',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 3,
									tier1: '3 damage',
									tier2: '5 damage',
									tier3: '7 damage'
								})
							),
							FactoryLogic.createAbilitySectionText('If this ability gains an edge or has a double edge, the target is bleeding (save ends).')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-1-feature-3',
					name: 'Fleshfused Spines',
					description: 'Any adjacent enemy who grabs the fleshflayed shambler or uses a melee ability against them takes 2 damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-2',
			name: 'Ghoul Craver',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Undead' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'climb'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+2 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(3, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-2nd-2-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 4 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-2-feature-2',
						name: 'Taste',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 3,
									tier1: '2 damage',
									tier2: '4 damage',
									tier3: '6 damage'
								})
							),
							FactoryLogic.createAbilitySectionText('This ability has a double edge against a bleeding target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-2-feature-3',
					name: 'Ever So Hungry',
					description: 'Any enemy adjacent to three or more ghoul cravers can’t shift.'
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-2-feature-4',
					name: 'Hunger',
					description: 'When the ghoul craver uses the Charge main action, they gain a +2 bonus to speed until the end of their turn.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-3',
			name: 'Hollowbone Launcher',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Undead', 'Soulless' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: MonsterLogic.createCharacteristics(-2, 3, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-2nd-3-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 4 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-3-feature-2',
						name: 'Hollowbone Slug',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 3,
									tier1: '3 damage',
									tier2: '5 damage',
									tier3: '7 damage; M<3 bleeding (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('Each creature adjacent to the target takes 2 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-3-feature-3',
					name: 'Brittle Revenge',
					description: 'The hollowbone launcher explodes when they are reduced to 0 Stamina, dealing 2 damage to each adjacent creature.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-4',
			name: 'Flesh Mournling',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Defender),
			keywords: [ 'Undead' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 35,
			stability: 2,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(3, 1, 0, 2, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-2nd-4-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 4 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-4-feature-2',
						name: 'Multiarm Strike',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 3,
									tier1: '5 damage',
									tier2: '7 damage',
									tier3: '9 damage'
								})
							),
							FactoryLogic.createAbilitySectionText('The target can’t shift until the end of their next turn.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'This ability targets one additional target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-4-feature-3',
						name: 'Horrid Wail',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 3,
									tier1: '2 psychic damage',
									tier2: '3 psychic damage; I<2 frightened (save ends)',
									tier3: '4 psychic damage; I<3 frightened (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('A target who is still frightened this way at the end of the encounter can’t take a respite activity during their next respite.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-4-feature-4',
					name: 'Arise',
					description: 'The first time the mournling is reduced to 0 Stamina by damage that isn’t fire damage or holy damage and their body isn’t destroyed, they instead have 10 Stamina and fall prone.'
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-4-feature-5',
					name: 'Immutable Form',
					description: 'The mournling’s shape can’t be changed by any external effect.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-5',
			name: 'Giant Zombie',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Undead', 'Soulless' ],
			encounterValue: 24,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 140,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, -1, -2, 1, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-2nd-5-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 4 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-5-feature-2',
						name: 'Rotten Smash',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 3,
									tier1: '9 damage',
									tier2: '14 damage; A<2 grabbed',
									tier3: '17 damage; A<3 grabbed'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-5-feature-3',
						name: 'Knocking Heads',
						type: FactoryLogic.type.createTrigger('The giant zombie grabs two creatures or objects, or starts their turn with two creatures or objects grabbed.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Two creatures or objects',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('The creatures or objects are smashed together using Rotten Smash, which has a double edge.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-5-feature-4',
					name: 'Endless Knight',
					description: 'The first time the giant zombie is reduced to 0 Stamina by damage that isn’t fire damage or holy damage and their body isn’t destroyed, they instead have 50 Stamina and fall prone.'
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-5-feature-5',
					name: 'Negative Nerves',
					description: 'When the giant zombie is targeted by an ability that deals rolled damage, they halve the damage from a tier 1 outcome.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-6',
			name: 'Mummy',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Mummy', 'Undead' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 50,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(3, -1, 1, 3, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-2nd-6-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 4 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 4 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Weakness, value: 5 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-6-feature-2',
						name: 'Accursed Bindings',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 3,
									tier1: '6 corruption damage; pull 1',
									tier2: '8 corruption damage; pull 2',
									tier3: '10 corruption damage; pull 2; M<3 restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('The next ability the mummy uses against the target has any potency increased by 1 for the target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-6-feature-3',
						name: 'Eldritch Curse',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 3,
									tier1: '3 corruption damage; I<1 the target is cursed (save ends)',
									tier2: '5 corruption damage; I<2 the target is cursed (save ends)',
									tier3: '7 corruption damage; I<3 the target is cursed (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('A cursed target is bleeding and weakened, and allies gain an edge on strikes made against them.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-6-feature-4',
						name: 'Blast of Mummy Dust',
						type: FactoryLogic.type.createTrigger('The mummy comes within distance of a restrained creature or starts their turn within distance of one.'),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: '1 restrained target',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('The target takes 8 poison damage.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-7',
			name: 'Vampire Spawn',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Undead', 'Vampire' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(2, 3, -1, 1, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-2nd-7-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 4 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-7-feature-2',
						name: 'Exsanguinating Bite',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 3,
									tier1: '5 damage',
									tier2: '7 corruption damage; M<2 bleeding (save ends)',
									tier3: '9 corruption damage; M<3 bleeding (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('The vampire spawn regains Stamina equal to any corruption damage dealt.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'The target takes an additional 3 corruption damage.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-7-feature-3',
						name: 'Vampire Celerity',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The vampire spawn can shift 1 square, then move up to their speed. The next ability the vampire uses before the start of their next turn gains an edge.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-7-feature-4',
					name: 'Unslakable Bloodthirst',
					description: 'The vampire spawn has speed 10 while any creature within 10 squares of them is bleeding. The vampire spawn must use Exsanguinating Bite against a bleeding creature on their turn if they are able to.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-8',
			name: 'Wraith',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Undead' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8, 'fly, hover'),
			stamina: 25,
			stability: 1,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(-2, 2, 1, 1, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-2nd-8-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 4 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-8-feature-2',
						name: 'Chilling Gravetouch',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 3,
									tier1: '5 cold damage; P<1 slowed (save ends)',
									tier2: '7 cold damage; P<2 slowed (save ends)',
									tier3: '9 cold damage; P<3 slowed (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('Any living creature who dies from this damage rises at the start of the next round as a **ghoul craver** under the Director’s control.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-8-feature-3',
						name: 'Hidden Movement',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The wraith turns invisible, moves up to their speed, and is visible again.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-8-feature-4',
						name: 'Stolen Vitality',
						type: FactoryLogic.type.createTrigger('An enemy within distance regains Stamina.', { free: true }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'The triggering creature',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('The target regains only half the Stamina, and the wraith regains the remaining Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-8-feature-5',
					name: 'Agonizing Phasing',
					description: 'The wraith can move through creatures and objects at their usual speed, but can’t end their turn inside a creature or object. The first time in a round that the wraith moves through a creature, that creature takes 5 corruption damage and takes a bane on their next strike. The wraith doesn’t take damage from being force moved into objects.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-9',
			name: 'Mummy Lord',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Mummy', 'Undead' ],
			encounterValue: 24,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 155,
			stability: 4,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(4, 0, 2, 4, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-2nd-9-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 6 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 6 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-2',
						name: 'Accursed Slam',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '10 corruption damage; I<2 bleeding (save ends)',
									tier2: '14 corruption damage; I<3 bleeding (save ends)',
									tier3: '17 corruption damage; I<4 bleeding (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('While the target is bleeding this way, the potency of any ability used against them increases by 1 for the target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-3',
						name: 'Binding Curse',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '7 corruption damage; I<2 frightened (save ends)',
									tier2: '12 corruption damage; I<3 frightened (save ends)',
									tier3: '16 corruption damage; I<4 frightened (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('While frightened this way, a target takes 4 psychic damage whenever they use a move action.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								repeatable: true,
								effect: 'This ability targets one additional target for each 2 Malice spent.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-4',
						name: 'Summon My Guard!',
						type: FactoryLogic.type.createTrigger('The mummy lord is made winded for the first time in the encounter.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionText('One **mummy** or four **ghoul cravers** appear within distance.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-5',
						name: 'Cursed Transference',
						distance: [],
						keywords: [],
						target: '',
						type: FactoryLogic.type.createNoAction(),
						sections: [
							FactoryLogic.createAbilitySectionText('At the end of each of their turns, the mummy lord can take 10 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 5,
								effect: 'The effect that is ended is transferred to another creature within 10 squares.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-6',
						name: 'Plague of Flies',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '5 poison damage',
									tier2: '8 poison damage',
									tier3: '10 poison damage'
								})
							),
							FactoryLogic.createAbilitySectionText('Each target takes a bane on their next strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-7',
						name: 'Land’s Guardian',
						type: FactoryLogic.type.createVillainAction(2),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The mummy lord gains a +2 bonus to speed and can automatically burrow at full speed while moving. They can then use the Dig maneuver. The next time the mummy lord breaches the surface, each enemy within 2 squares of the mummy lord makes an **Agility test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Agility,
									tier1: 'Prone and can’t stand (EoT)',
									tier2: 'Prone',
									tier3: 'no effect'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-9',
						name: 'Unbound Horrors',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '5 corruption damage; I<2 frightened (save ends)',
									tier2: '8 corruption damage; I<3 frightened (save ends)',
									tier3: '10 corruption damage; I<4 frightened and restrained (save ends)'
								})
							)
						]
					})
				})
			]
		})
	],
	addOns: []
};
