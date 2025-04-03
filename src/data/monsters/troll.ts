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

export const troll: MonsterGroup = {
	id: 'monster-group-troll',
	name: 'Troll',
	description: 'The embodiment of carnivorous hunger, trolls rampage through the wild, leaving destruction in their wake. Tall and gangly, their mottled green skin is covered by a mane of matted hair that runs around their neck and down their back. In many ways, they resemble massive humanoids, but their exaggerated features belie this comparison; their lower jaw hangs unhinged and distended, and their long arms end in claws which drag along the ground as they walk.',
	information: [
		{
			id: 'troll-info-1',
			name: 'Hypermetabolism',
			description: 'A troll’s constant hunger and aggression begets a life of violence. Like a grotesque miracle, they quickly assimilate consumed flesh into themselves to regenerate their body. Some scholars think this extreme metabolic process is the source of their hunger, but none know for certain which came first.'
		},
		{
			id: 'troll-info-2',
			name: 'Phases of Destruction',
			description: 'Fortunately for the ecosystems they inhabit, trolls can’t be active all the time. Their natural behavior is to hunt relentlessly for a few days, then return to their dens to rest for as much as a week. Patient troll hunters can wait for this hibernation and catch the trolls by surprise—though the cost of waiting can be high, thanks to the damage the trolls might do in the meantime'
		},
		{
			id: 'troll-info-3',
			name: 'Strange Mutations',
			description: 'Trolls prefer to prey upon humanoids and animals, but stories have circulated of them feeding on fetid demons and undead, assimilating their flesh to magnificent and horrifying effect. A troll with loose hanging skin, curling nails, or exposed bone might be in better health than their appearance would suggest.'
		},
		{
			id: 'troll-info-4',
			name: 'Limbjumbles',
			description: 'When a suitably large piece of mutated troll is torn off in battle, it does its very best to keep on living. Mutation and deep-seated survival instinct go into overdrive, sprouting unthinkable assortments of malformed arms and legs. Though these limbjumbles are ultimately short-lived, they can often be found tumbling awkwardly behind living trolls.'
		},
		{
			id: 'troll-info-7',
			name: 'Troll Languages',
			description: 'Most trolls speak Variac or High Kuric, while a few also know Caelian. Trolls are difficult to negotiate with unless a hero can provide more appetizing food than themselves.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'troll-malice-1',
			name: 'Foul Spew',
			cost: 3,
			sections: [
				'A troll acting on this turn spews out a half-digested meal in a 1 x 5 line within 1. Each troll in the line regains 3 Stamina. Each enemy in the line must make a **Might test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Might,
					tier1: '12 acid damage; dazed (EoT)',
					tier2: '10 acid damage; weakened (EoT)',
					tier3: '6 acid damage'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'troll-malice-2',
			name: 'Emergency Meal',
			cost: 5,
			sections: [
				'Each troll in the encounter makes a free strike against an adjacent creature and regains Stamina equal to the damage dealt.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'troll-malice-3',
			name: 'Blood Banquet',
			cost: 7,
			sections: [
				'Each winded troll in the encounter disgorges the content of their stomach onto the ground around them in a 1 burst that lingers until the end of the encounter. Each non-troll that enters or starts their turn in an aﬀected square takes 5 acid damage. Each troll has a double edge on power rolls while occupying an aﬀected square.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'troll-1',
			name: 'Troll Limbjumble',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Troll' ],
			encounterValue: 14,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(3, 1, -2, -1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-1-feature-1',
						name: 'Arm and a Leg',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage; A<2 prone',
							tier2: '5 damage; A<3 prone',
							tier3: '6 damage; prone'
						}),
						effect: 'If the target is already prone, they are grabbed instead.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'troll-1-feature-2',
					name: 'Hyper Regeneration',
					description: 'The limbjumble regains 2 Stamina at the start of each of their turns. The limbjumble instantly dies if they take acid or fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'troll-2',
			name: 'Troll Whelp',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Troll' ],
			encounterValue: 14,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 10,
			stability: 3,
			freeStrikeDamage: 3,
			withCaptain: 'Strike damage +2',
			characteristics: MonsterLogic.createCharacteristics(3, 1, -1, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-2-feature-1',
						name: 'Jaws and Claws',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage',
							tier2: '6 damage; slide 1',
							tier3: '7 damage; slide 2; M<2 bleeding (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'troll-2-feature-2',
					name: 'Lingering Hunger',
					description: 'Whenever two or more whelps are simultaneously reduced to 0 Stamina with non-acid or ﬁre damage, half of the killed whelps become troll limbjumbles with 4 Stamina.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'troll-3',
			name: 'Troll Butcher',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Hexer),
			keywords: [ 'Troll' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 1, 1, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-3-feature-1',
						name: 'Savoring Bite',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage; M<1 bleeding (save ends)',
							tier2: '14 damage; M<2 bleeding (save ends)',
							tier3: '17 damage; M<3 bleeding (save ends)'
						}),
						spend: [
							{ value: 1, effect: 'The butcher regains Stamina equal to the damage.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-3-feature-2',
						name: 'Rotten Scraps',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 poison damage; M<1 weakened (save ends)',
							tier2: '9 poison damage; M<2 weakened (save ends)',
							tier3: '11 poison damage; M<3 weakened (save ends)'
						}),
						effect: 'Each troll in the cube regains 3 Stamina.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-3-feature-3',
						name: 'Gourmet Flesh',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The butcher enhances their next Savoring Bite ability, changing the damage type and inflicted condition to one of the following combinations: corruption and dazed, acid and restrained, or lightning and frightened.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-3-feature-4',
						name: 'Acquired Taste',
						type: FactoryLogic.type.createTrigger('A creature deal damage to the butcher with an Edge or a Surge.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Triggering creature',
						effect: 'The butcher makes a free strike against the target. The butcher has an edge on power rolls and deals an additional 3 damage on strikes until the end of their next turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'troll-3-feature-5',
					name: 'Bloody Feast',
					description: 'Each ally within 5 of the gourmand has an edge on power rolls that target an enemy suﬀering from a condition.'
				}),
				FactoryLogic.feature.create({
					id: 'troll-3-feature-6',
					name: 'Relentless Hunger',
					description: 'The butcher only dies when they are reduced to 0 Stamina by acid or fire damage, end their turn with 0 Stamina, or take acid or fire damage while at 0 Stamina.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'troll-3-feature-7',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Weakness, value: 5 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Weakness, value: 5 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'troll-4',
			name: 'Troll Glutton',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Troll' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 160,
			stability: 4,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(3, 1, -1, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-4-feature-1',
						name: 'Voracious Mastication',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 damage',
							tier2: '15 damage',
							tier3: '18 damage'
						}),
						spend: [
							{ value: 1, effect: 'The glutton regains Stamina equal to the damage.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-4-feature-2',
						name: 'Crash Through',
						cost: 3,
						type: FactoryLogic.type.createAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The glutton shifts up to their speed in a straight line, ignoring difficult terrain. A creature can choose to fall prone or take 10 damage the first time the glutton passes through their space during the movement. If the glutton moves into a creature or object larger than them and the glutton doesn’t knock the creature prone or destroy the object, the glutton’s movement stops early and they become dazed until the end of their next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-4-feature-3',
						name: 'Food Frenzy',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The glutton has a double edge on strikes and strikes have an edge against them, until the start of their next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-4-feature-4',
						name: 'Spiteful Retort',
						type: FactoryLogic.type.createTrigger('The glutton is reduced to 0 Stamina but doesn\'t die.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Self',
						effect: 'The glutton uses their Voracious Mastication ability against an adjacent creature.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'troll-4-feature-5',
					name: 'Insatiable Appetite',
					description: 'Once per turn, the glutton can take the Charge action as a free maneuver if they target a winded creature.'
				}),
				FactoryLogic.feature.create({
					id: 'troll-4-feature-6',
					name: 'Relentless Hunger',
					description: 'The glutton only dies when they are reduced to 0 Stamina by acid or fire damage, end their turn with 0 Stamina, or take acid or fire damage while at 0 Stamina.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'troll-4-feature-7',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Weakness, value: 5 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Weakness, value: 5 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'troll-5',
			name: 'Troll Mercenary',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Brute),
			keywords: [ 'Troll' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 80,
			stability: 4,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 1, -1, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-5-feature-1',
						name: 'Big Bite',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '6 damage',
							tier2: '11 damage',
							tier3: '14 damage'
						}),
						effect: 'The mercenary regains Stamina equal to half the damage dealt.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-5-feature-2',
						name: 'Troll Roar',
						type: FactoryLogic.type.createManeuver({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: 'P (weak) frightened (save ends)',
							tier2: 'P (average) frightened (save ends)',
							tier3: 'P (strong) frightened (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'troll-5-feature-3',
					name: 'Relentless Hunger',
					description: 'The mercenary only dies when they are reduced to 0 Stamina by acid or ﬁre damage, end their turn with 0 Stamina, or take acid or ﬁre damage while at 0 Stamina.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'troll-5-feature-4',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Weakness, value: 5 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Weakness, value: 5 })
					]
				})
			],
			retainer: {
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-15-retainer-7',
						name: 'Hangry Frenzy',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '3 creatures',
						effect: 'While winded, the mercenary uses Big Bite against each target.'
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-15-retainer-10',
						name: 'Fire Bad',
						type: FactoryLogic.type.createTrigger('An ability deals fire or acid damage to the mercenary.', { qualifiers: [ 'encounter' ] }),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The mercenary moves their speed. If this movement takes them out of range or area of the ability that damaged them, the ability doesn\'t affect them.'
					})
				})
			}
		})
	],
	addOns: []
};
