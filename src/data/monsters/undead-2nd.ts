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

export const undead2nd: MonsterGroup = {
	id: 'monster-group-undead-2nd',
	name: 'Undead — 2nd Echelon',
	description: `
*When the dead rise, all of hell rises with them.*
*LADY DEMELZA, COURSER*`,
	information: [
		{
			id: 'undead-2nd-info-1',
			name: 'Mummies',
			description: 'Mummies are humanoids raised from the dead via a complex series of magical rituals. The process tethers a creature’s soul to their earthly body, preventing them from crossing into true death. As part of the mummification process, a corpse is embalmed and wrapped in cloth imbued with necromantic power. Mummification is reserved for situations of grave import. A great hero may voluntarily be mummified upon death to eternally guard future generations or a holy relic. On the other hand, a great villain may be mummified to prevent them from escaping their crimes through death.'
		},
		{
			id: 'undead-2nd-info-2',
			name: 'Vampire Spawn',
			description: `
Vampirism is a curse of blood. A curse that harrows its victims, turning them into mirror-mockeries of life that nonetheless hunger for life’s essence: blood. With that hunger comes power everlasting over life and death. By feeding, a vampire passes this curse onto their victims.

Though vampires are fundamentally changed from their mortal forms, they retain the intellect and memories of their mortal selves. A vampire’s power grows as they spend time in undeath. Vampire spawn, the youngest of their ilk, are barely separated from their mortal selves. They are driven by their thirst for blood and their master’s orders. Few spawn survive long enough to become true vampires.`
		},
		{
			id: 'undead-2nd-info-3',
			name: 'Mournlings',
			description: `
Powered by sorrow and rage, these hulking amalgamations of dirt or flesh defend the homes of their creators, brutally attacking intruders while sobbing uncontrollably.

Mournlings express far more emotion than many other undead guardians, for their makers imbued them with sadness and loss. Though their druidic creators are long-dead, some original mournlings still defend forests, meadows, and other natural places they were built to protect.

Outside of battle, mournlings patrol for interlopers in a trance-like state. When an unknown creature creates a disturbance or approaches them, the mournling unleashes a primal cry that conveys the very essence of suffering, then they burst into violence. They continue to sob and moan even as they viciously beat their enemies to a pulp.`
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'undead-2nd-malice-1',
			name: 'Prior Malice Features',
			cost: 1,
			repeatable: true,
			sections: [
				'The undead activates a malice feature available to undead level 3 or lower.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-2nd-malice-3',
			name: 'Blood Hunger',
			cost: 5,
			sections: [
				'As a part of the next signature action used on a bleeding creature, all undead creatures within 5 can move up to their speed and make a free strike on the same target.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'undead-2nd-1',
			name: 'Fleshflayed Shambler',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Undead' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 9,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Strike damage +2',
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}),
						effect: 'The target is bleeding (save ends) if the shambler has an edge on this ability.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-1-feature-3',
					name: 'Fleshfused Spines',
					description: 'Whenever an enemy makes physical contact with the shambler or uses a melee ability against the shambler, they take 2 damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-2',
			name: 'Ghoul Craver',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Undead' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'climb'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Stike damage +2',
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '6 damage'
						}),
						effect: 'The ghoul craver has a double edge on this ability when targeting bleeding creatures.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-2-feature-3',
					name: 'Ever So Hungry',
					description: 'While 3 or more ghoul cravers are adjacent to an enemy, that enemy can’t shift.'
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-2-feature-4',
					name: 'Hunger',
					description: 'The ghoul craver’s speed increases by 2 while charging, until the end of their turn.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-3',
			name: 'Hollowbone Launcher',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Undead' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Ranged distance +5',
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
						name: 'Hollowbone Sling',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage; M<3 bleeding (save ends)'
						})
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
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Defender),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 damage',
							tier2: '7 damage',
							tier3: '9 damage'
						}),
						effect: 'The target can\'t shift away from the mounling until the end of their next turn.',
						spend: [
							{ value: 1, effect: 'The mournling targets an additional creature.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-4-feature-3',
						name: 'Horrid Wail',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '2 psychic damage',
							tier2: '3 psychic damage; I<2 frightened (save ends)',
							tier3: '4 psychic damage; I<3 frightened (save ends)'
						}),
						effect: 'If a target is still frightened by this ability at the end of the encounter, they cannot take a respite activity during their next respite.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-4-feature-4',
					name: 'Immutable Form',
					description: 'The mournling’s shape can’t change via any external effects.'
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-4-feature-5',
					name: 'Arise',
					description: 'The ﬁrst time in an encounter that the mournling is reduced to Stamina 0 with non-fire/non-holy damage and their body isn’t destroyed, they regain half their Stamina and fall prone.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-5',
			name: 'Giant Zombie',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Undead' ],
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '14 damage; A<2 grabbed',
							tier3: '17 damage; M<3 grabbed'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-5-feature-3',
						name: 'Knocking Heads',
						type: FactoryLogic.type.createTrigger('The giant zombie grabs both targets or starts their turn with each target grabbed.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Two creatures or objects',
						effect: 'The giant zombie smashes the targets together, using their Rotten Smash against both targets with a double edge.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-5-feature-4',
					name: 'Negative Nerves',
					description: 'When the giant zombie is targeted by an ability, they halve the damage from any tier-1 results.'
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-5-feature-5',
					name: 'Arise',
					description: 'The ﬁrst time in an encounter that the giant zombie is reduced to Stamina 0 with non-fire/non-holy damage and their body isn’t destroyed, they regain half their Stamina and fall prone.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-6',
			name: 'Mummy',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Brute),
			keywords: [ 'Undead' ],
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 corruption damage; pull 1',
							tier2: '8 corruption damage; pull 2',
							tier3: '10 corruption damage; pull 2; M<3 restrained (save ends)'
						}),
						effect: 'The potency of the mummy\'s next ability used against the target increases by 1.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-6-feature-3',
						name: 'Eldritch Curse',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 corruption damage; I<1 cursed (save ends)',
							tier2: '5 corruption damage; I<2 cursed (save ends)',
							tier3: '7 corruption damage; I<3 cursed (save ends)'
						}),
						effect: 'A cursed target is bleeding and weakened, and allies have an edge on strikes made against them.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-6-feature-4',
						name: 'Blast of Mummy Dust',
						type: FactoryLogic.type.createTrigger('The mummy comes within distance of the target or starts their turn within distance of the target'),
						cost: 1,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: '1 restrained target',
						effect: '8 poison damage.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-7',
			name: 'Vampire Spawn',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Harrier),
			keywords: [ 'Undead' ],
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 damage',
							tier2: '7 corruption damage; M<2 bleeding (save ends)',
							tier3: '9 corruption damage; M<3 bleeding (save ends)'
						}),
						effect: 'The vampire spawn regains Stamina equal to the corruption damage they deal.',
						spend: [
							{ value: 1, effect: 'The target takes an additional 3 corruption damage.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-7-feature-3',
						name: 'Vampire Celerity',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The vampire spawn shifts 1 and then moves up to their speed. The next ability the vampire uses before the start of their next turn has an edge.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-7-feature-4',
					name: 'Unslakable Bloodthirst',
					description: 'The vampire spawn has a speed of 10 while a creature is bleeding within 10. The vampire spawn must strike a bleeding creature on their turn if they are able to.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-8',
			name: 'Wraith',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Hexer),
			keywords: [ 'Undead' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8, 'fly, hover'),
			stamina: 25,
			stability: 0,
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 cold damage; P<1 slowed (save ends)',
							tier2: '7 cold damage; P<2 slowed (save ends)',
							tier3: '9 cold damage; P<3 slowed (save ends)'
						}),
						effect: 'Living creatures killed by this ability return as a ghoul craver the next round, under the Director\'s control.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-8-feature-3',
						name: 'Hidden Movement',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The wraith truns invisible, moves up to their speed, and becomes visible again.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-8-feature-4',
						name: 'Stolen Vitality',
						type: FactoryLogic.type.createTrigger('The target regains Stamina.', { free: true }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One enemy',
						cost: 1,
						effect: 'The target only regains half the Stamina they would normally. The wraith regains the remaining Stamina.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-2nd-8-feature-5',
					name: 'Agonizing Phasing',
					description: 'The wraith can move through other creatures and objects at normal speed. The ﬁrst time in a round that the shade passes through a creature, that creature takes 5 corruption damage and has a bane on their next attack. The wraith doesn’t take damage from being force moved into objects.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-2nd-9',
			name: 'Mummy Lord',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Undead' ],
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
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 6 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Weakness, value: 5 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-2',
						name: 'Accursed Slam',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '10 corruption damage; I<2 bleeding (save ends)',
							tier2: '14 corruption damage; I<3 bleeding (save ends)',
							tier3: '17 corruption damage; I<4 bleeding (save ends)'
						}),
						effect: 'The potency of ability used against a target bleeding from this ability increase by 1.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-3',
						name: 'Binding Curse',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						cost: 1,
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '7 corruption damage; I<2 frightened (save ends)',
							tier2: '12 corruption damage; I<3 frightened (save ends)',
							tier3: '16 corruption damage; I<4 frightened (save ends)'
						}),
						effect: 'A target frightened by this ability takes 4 psychic damage whenever they use a move action until the condition ends.',
						spend: [
							{ value: 2, repeatable: true, effect: 'The mummy lord targets an addtional creature for every 2 malice spent.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-4',
						name: 'Summon My Guard!',
						cost: 2,
						type: FactoryLogic.type.createTrigger('The Mummy Lord becomes winded for the first time.'),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						effect: 'Two **mummies** and 4 **ghoul carvers** appear within distance.'
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
						effect: 'At the end of their turn, the mummy lord can take 10 damage to end one save ends effect affecting them. This damage can\'t be reduced in any way.',
						spend: [
							{ value: 5, effect: 'The effect is transferred to a creature within 10.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-6',
						name: 'Plague of Flies',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '5 poison damage',
							tier2: '8 poison damage',
							tier3: '10 poison damage'
						}),
						effect: 'Each target has a bane on their next strike.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-7',
						name: 'Land\'s Guardian',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						preEffect: 'The mummy lord’s speed increases by 2 and adds the burrow keyword to their movement. The mummy lord burrows up to their speed. Each enemy within 2 squares of the mummy lord’s movement must make an **Agility test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Agility,
							tier1: 'Prone, can\'t stand (EoT)',
							tier2: 'Prone',
							tier3: 'no effect'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-2nd-9-feature-9',
						name: 'Unbound Horrors',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '5 corruption damage; I<2 frightened (save ends)',
							tier2: '8 corruption damage; I<3 frightened (save ends)',
							tier3: '10 corruption damage; I<4 frightened and restrained (save ends)'
						})
					})
				})
			]
		})
	],
	addOns: []
};
