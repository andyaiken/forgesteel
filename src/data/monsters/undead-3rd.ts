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

export const undead3rd: MonsterGroup = {
	id: 'monster-group-undead-3rd',
	name: 'Undead — 3rd Echelon',
	description: 'Older, taboo methods of creating devastating undead wildly vary from one another. These wretched creatures can come about by way of accursed blood rituals, terrible operations, a spirited collective resistance to death, or other unspoken methods once thought lost to time.',
	picture: null,
	information: [
		{
			id: 'undead-3rd-info-1',
			name: 'Koptourok',
			description: 'Koptourok is a Variac name that roughly translates to “dead tourist.” It’s given to those who meet their end suffocating in the depths, whether they drowned in a subterranean lake, wandered into a cave of trapped gas, or were crushed by a rockslide. These rasping, slouching undead rise from their grave desperate for the one thing they’ve lost: breath.'
		},
		{
			id: 'undead-3rd-info-2',
			name: 'Haunt',
			description: 'Born of mass death events that leave multiple souls stranded in agony together, a haunt is a violent collective chaos driven by a hatred for the living. A haunt lays claim to the scene of their death, which their grief forbids them from leaving so as to strand them in the mundane world. None of the souls within a haunt are necessarily malicious, and all would individually prefer to move on and find peace. But their accumulated grief drives them to tremendous anger that inspires sadistic acts of violence against the living.'
		},
		{
			id: 'undead-3rd-info-3',
			name: 'Waxen',
			description: 'When a corpse is preserved improperly, its body fat can become a substance known as corpse wax. Necromancers sometimes harvest and use this foul substance to enhance their undead minions, transforming them into waxens. These awkward, loping creatures cake their foes in foul-smelling wax to slow and sicken them. Waxen minions are often set ablaze by unscrupulous masters, sacrificing them to the flames but making them significantly more dangerous in the process.'
		},
		{
			id: 'undead-3rd-info-4',
			name: 'Vampires and Vampire Lords',
			description: 'By drinking the blood of a true vampire, a vampire spawn can transcend their feral beginnings and rise to become a true vampire themself. The path of transformation is daunting, and vampires who end up starved for blood often band together for mutual protection. But with patience and cunning, a vampire can grow old and powerful enough to control vast amounts of territory and countless vassals. The term “vampire lord” thus refers not to a specific age or threshold of physical prowess, but rather to status and influence. A vampire who refers to themself as a lord invites challenges to their title and is prepared to crush all those who seek to end their reign.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'undead-3rd-malice-1',
			name: 'Ravenous Horde',
			cost: 2,
			sections: [
				'At the end of this round, each hero not already adjacent to one or more undead is beset by two **rotting zombies** who burst up from the ground to appear in adjacent unoccupied spaces. Each zombie is winded. This feature can’t be used two rounds in a row.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-3rd-malice-2',
			name: 'Paranormal Fling',
			cost: 3,
			sections: [
				'Up to three unattended objects on the encounter map rise to float 1 square off the ground. Each object is then pulled 5 squares toward the nearest enemy within 3 squares of the object.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-3rd-malice-3',
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
			id: 'undead-3rd-malice-4',
			name: 'Dread March',
			cost: 7,
			sections: [
				'Up to four undead in the encounter move up to their speed and can make a free strike. The number of undead affected increases by 1 for each additional Malice spent on this feature. If an undead is reduced to 0 Stamina during this dread march, they don’t die until the march is resolved.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-3rd-malice-5',
			name: 'Blood Hunger',
			cost: 5,
			sections: [
				'One undead acting this turn uses a signature ability against a creature who is bleeding. As a free triggered action, each undead within 5 squares of the first undead moves up to their speed and can make a free strike against the same target.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'undead-3rd-malice-6',
			name: 'Necrotic Rupture',
			cost: 5,
			sections: [
				'Until the end of the round, whenever an undead is reduced to 0 Stamina, they deal 8 corruption damage to each enemy within 3 squares of them.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'undead-3rd-1',
			name: 'Blood-Starved Vampire',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Undead', 'Vampire' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 12,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(4, 1, -3, 1, -3),
			withCaptain: '+3 bonus to speed',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-3rd-1-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 7 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 7 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-1-feature-2',
						name: 'Feeding Frenzy',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '3 damage',
									tier2: '6 damage',
									tier3: '7 damage; M<4 bleeding (EoT)'
								})
							),
							FactoryLogic.createAbilitySectionText('If a target made bleeding this way is already bleeding, they are instead knocked prone and can’t stand until the end of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-3rd-1-feature-3',
					name: 'Unslakable Bloodthirst',
					description: 'The blood-starved vampire has speed 10 while any creature within 10 squares of them is bleeding. The vampire must use Feeding Frenzy against a bleeding creature on their turn if they are able to.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-3rd-2',
			name: 'Faded Echo Spirit',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Undead' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 10,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(-3, 4, -5, 1, -3),
			withCaptain: 'Gain an edge on strikes',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-3rd-2-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 7 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 7 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-2-feature-2',
						name: 'Hollow Grasp',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '3 corruption damage',
									tier2: '6 corruption damage; P<3 weakened',
									tier3: '7 corruption damage; P<4 weakened'
								})
							),
							FactoryLogic.createAbilitySectionText('This weakened condition ends if an affected target ends their turn with no spirit within 5 squares of them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-3rd-2-feature-3',
					name: 'Corruptive Phasing',
					description: 'The spirit can move through creatures and objects at their usual speed, but can’t end their turn inside a creature or object. The first time in a round that the spirit moves through a creature, that creature takes 4 corruption damage. The spirit doesn’t take damage from being force moved into objects.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-3rd-3',
			name: 'Mummy Rotwrap',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Mummy', 'Undead' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 1,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(4, -2, -2, 1, -2),
			withCaptain: '+3 bonus to melee distance',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-3rd-3-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 7 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 7 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-3-feature-2',
						name: 'Fetid Wrappings',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '4 damage',
									tier2: '7 damage; pull 1',
									tier3: '8 damage; pull 3'
								})
							),
							FactoryLogic.createAbilitySectionText('Each ally gains an edge on strikes made against the target until the end of the round.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-3rd-4',
			name: 'Dirt Mournling',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Undead' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6, 'burrow, climb'),
			stamina: 64,
			stability: 3,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(4, 1, -2, 1, -3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-3rd-4-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 7 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 7 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-4-feature-2',
						name: 'Mudslide',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '7 damage; M<3 grabbed',
									tier2: '10 damage; M<4 grabbed',
									tier3: '11 damage; grabbed'
								})
							),
							FactoryLogic.createAbilitySectionText('A 3-cube area of ground centered on the target is difficult terrain for enemies.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-4-feature-3',
						name: 'Mourning Cry',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '3 corruption damage; I<2 frightened (save ends)',
									tier2: '6 corruption damage; I<3 frightened (save ends)',
									tier3: '7 corruption damage; I<4 frightened (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('A target frightened this way is frightened of all undead. This effect ends early if the mournling is destroyed.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-3rd-4-feature-4',
					name: 'Arise',
					description: 'The first time the mournling is reduced to 0 Stamina by damage that isn’t fire damage or holy damage and their body isn’t destroyed, they instead have 15 Stamina and fall prone.'
				}),
				FactoryLogic.feature.create({
					id: 'undead-3rd-4-feature-5',
					name: 'Immutable Form',
					description: 'The mournling’s shape can’t be changed by any external effect.'
				}),
				FactoryLogic.feature.create({
					id: 'undead-3rd-4-feature-6',
					name: 'Rupture',
					description: 'Whenever the mournling uses the Dig maneuver to breach the surface, they make a free strike against each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-3rd-5',
			name: 'Haunt',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Undead' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6, 'fly, hover'),
			stamina: 40,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(-2, 4, -1, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-3rd-5-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 7 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 7 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-5-feature-2',
						name: 'Lash Out',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '7 damage; slide 2',
									tier2: '10 damage; slide 3',
									tier3: '11 damage; slide 5'
								})
							),
							FactoryLogic.createAbilitySectionText('If the target is force moved into another creature’s space, that creature takes an additional 4 damage and the haunt slides them up to 2 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-5-feature-3',
						name: 'Crushing Despair',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '3 damage; I<2 prone',
									tier2: '6 damage; I<3 prone',
									tier3: '7 damage; I<4 prone'
								})
							),
							FactoryLogic.createAbilitySectionText('A target knocked prone this way can’t use the Stand Up maneuver on themself while any haunt is within 20 squares of them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-3rd-5-feature-4',
					name: 'Invisible Horror',
					description: 'The haunt can move through creatures and objects at their usual speed, but can’t end their turn inside a creature or object. They are invisible while moving using a move action. The haunt doesn’t take damage from being force moved into objects.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-3rd-6',
			name: 'Koptourok',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Undead' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(4, 2, 0, 1, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-3rd-6-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 7 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 7 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-6-feature-2',
						name: 'Choking Grasp',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(5) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '7 damage; M<2 grabbed',
									tier2: '10 damage; M<3 grabbed',
									tier3: '11 damage; M<4 grabbed'
								})
							),
							FactoryLogic.createAbilitySectionText('A creature grabbed this way is suffocating. The koptourok can have up to two creatures grabbed at once.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-6-feature-3',
						name: 'Inhale',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: 'Pull 3; M<2 5 corruption damage',
									tier2: 'Pull 5; M<2 5 corruption damage',
									tier3: 'Pull 7; M<2 5 corruption damage'
								})
							),
							FactoryLogic.createAbilitySectionText('This ability gains an edge against any target grabbed by the koptourok. If one or more targets are pulled adjacent to the koptourok, the koptourok can fly until the end of the encounter.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-3rd-6-feature-4',
					name: 'Exhale',
					description: 'The first time the koptourok is made winded by damage that isn’t fire damage or holy damage, each enemy within 3 squares of them takes 8 corruption damage. Any enemy who takes this damage and has M<3 is also weakened (save ends).'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-3rd-7',
			name: 'Waxen',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
			keywords: [ 'Undead', 'Soulless' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(4),
			stamina: 40,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(4, -2, -4, 1, -2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-3rd-7-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 7 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 7 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-7-feature-2',
						name: 'Wax Fling',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '8 damage',
									tier2: '11 damage',
									tier3: '12 damage; A<4 slowed (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('If a target made slowed this way is already slowed, they are instead restrained (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-7-feature-3',
						name: 'Erupt',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('If the waxen is ignited (see Burn Bright), they shift up to their speed before using this ability. Each target makes an **Agility test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Agility,
									tier1: '10 damage',
									tier2: '8 damage',
									tier3: '5 damage'
								})
							),
							FactoryLogic.createAbilitySectionText('The waxen is then destroyed and the area is difficult terrain for enemies.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-3rd-7-feature-4',
					name: 'Burn Bright',
					description: 'If the waxen takes fire damage, they ignite. While ignited, the waxen takes 4 fire damage at the start of each of their turns and their strikes deal an extra 4 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-3rd-8',
			name: 'Vampire',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Undead', 'Vampire' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 40,
			stability: 3,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(4, 2, 1, 1, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-3rd-8-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 7 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 7 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-8-feature-2',
						name: 'Exsanguinating Bite',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '7 damage; M<2 bleeding (save ends)',
									tier2: '10 corruption damage; M<3 5 corruption damage and bleeding (save ends)',
									tier3: '11 corruption damage; M<4 7 corruption damage and bleeding (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('The vampire regains Stamina equal to any corruption damage dealt.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-8-feature-3',
						name: 'Vicious Pursuit',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '7 damage; A<2 slowed (save ends)',
									tier2: '10 damage; A<3 slowed (save ends)',
									tier3: '117 damage; A<4 slowed (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('If the target is bleeding, the vampire shifts up to their speed before using this ability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-8-feature-4',
						name: 'Reactive Charm',
						type: FactoryLogic.type.createTrigger('A creature makes a strike against the vampire.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One enemy',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionText('The target becomes the new target of the strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-3rd-8-feature-5',
					name: 'Unslakable Bloodthirst',
					description: 'The vampire has speed 10 while any creature within 10 squares of them is bleeding. The vampire must make a strike against a bleeding creature on their turn if they are able to.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'undead-3rd-9',
			name: 'Vampire Lord',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Undead', 'Vampire' ],
			encounterValue: 36,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(12, 'climb, hover, teleport'),
			stamina: 200,
			stability: 3,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(2, 5, 1, 1, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'undead-3rd-9-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 7 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 7 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-9-feature-2',
						name: 'Crimson Embrace',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '13 corruption damage; M<3 bleeding (save ends)',
									tier2: '21 corruption damage; M<3 bleeding (save ends)',
									tier3: '24 corruption damage; M<3 bleeding (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('The vampire regains Stamina equal to half the damage dealt, and can end one effect on them that can be ended by a saving throw.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								repeatable: true,
								effect: 'The vampire shifts 3 after striking the last target, and can target one additional creature for every 2 malice spent.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-9-feature-3',
						name: 'Arise, My Children',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionText('Two **blood-starved vampires** appear in unoccupied spaces within distance.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-9-feature-4',
						name: 'Redirected Charm',
						type: FactoryLogic.type.createTrigger('A creature makes a strike against the vampire.', { free: true }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One enemy',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('The target becomes the new target of the strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'undead-3rd-9-feature-5',
					name: 'Lord’s Bloodthirst',
					description: 'The vampire has speed 15 and an edge on power rolls while any creature within 20 squares of them is bleeding. Any bleeding creature within 5 squares of the vampire can’t hide.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-9-feature-6',
						name: 'Let Us Feast! ',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 20 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target who has P<4 is now bleeding (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-9-feature-7',
						name: 'Red Mist Rising',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '2 damage; M<3 6 corruption damage',
									tier2: '7 damage; M<4 6 corruption damage',
									tier3: '10 damage; M<5 6 corruption damage'
								})
							),
							FactoryLogic.createAbilitySectionText('The vampire turns to mist, filling the area. Until the end of the round, the vampire can’t move or be targeted by abilities, but they can use Crimson Embrace against a target in the area. The vampire reforms in an unoccupied space in the area at the end of the round.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'undead-3rd-9-feature-8',
						name: 'Sacrifice',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Each chosen ally',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target is marked for sacrifice. At the end of the round, each target who isn’t dead or destroyed takes 50 corruption damage. The vampire then uses the following ability.'),
							FactoryLogic.createAbilitySectionText(`
### Wave of Blood (area, magic)

20 burst, each enemy in the area

Each target makes a **Might test**. This ability deals an extra 5 damage for each creature killed by the Sacrifice villain action.

* **11-**: 11 corruption damage
* **12 - 16**: 8 corruption damage
* **17+**: 2 corruption damage`)
						]
					})
				})
			]
		})
	],
	addOns: []
};
