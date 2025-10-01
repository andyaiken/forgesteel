import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { StatBlockIcon } from '@/enums/stat-block-icon';

export const troll: MonsterGroup = {
	id: 'monster-group-troll',
	name: 'Troll',
	description: 'Ravenous trolls rampage through the wild to quell their fathomless hunger, leaving only destruction in their wake. Tall and gangly, they green skin covered by a mane of matted hair that runs down their neck and back. In many ways, they resemble massive humanoids, but their exaggerated features belie this comparison. A troll’s lower jaw hangs unhinged and distended, and their long arms end in claws that drag along the ground as they walk.',
	picture: null,
	information: [
		{
			id: 'troll-info-1',
			name: 'Hypermetabolism',
			description: 'A troll’s constant hunger and aggression beget a life of violence. Like a grotesque miracle, they quickly assimilate consumed flesh into themselves to regenerate their body. Some scholars think this extreme metabolic process is the source of their hunger, but none know for certain which came first.'
		},
		{
			id: 'troll-info-2',
			name: 'Phases of Destruction',
			description: 'Fortunately for the ecosystems they inhabit, trolls can’t be active all the time. Their natural behavior is to hunt relentlessly for a few days, then return to their dens to rest for as much as a week. Patient troll hunters can wait for this torpor and catch their quarry by surprise—though the cost of waiting can be high thanks to the damage a troll might do in the meantime.'
		},
		{
			id: 'troll-info-3',
			name: 'Strange Mutations',
			description: 'Trolls prefer to prey upon humanoids and animals, but stories tell of them feeding on fetid demons and undead, assimilating those creatures’ flesh to magnificent and horrifying effect. A troll with loose hanging skin, curling nails, or exposed bone might be in better health than their appearance would suggest.'
		},
		{
			id: 'troll-info-4',
			name: 'Limbjumbles',
			description: 'When a suitably large piece of a troll is torn off in battle, it does its very best to keep on living. Deep-seated survival instinct goes into overdrive, causing the detached piece to sprout unthinkable assortments of malformed arms and legs. Though these limbjumbles are ultimately short-lived, they can often be found tumbling awkwardly behind living trolls.'
		},
		{
			id: 'troll-info-7',
			name: 'Troll Languages',
			description: 'Most trolls speak High Kuric or Variac, while a few also know Caelian. Trolls are notably difficult to negotiate with unless heroes can provide more appetizing food than themselves.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'troll-malice-1',
			name: 'Foul Spew',
			cost: 3,
			icon: StatBlockIcon.Area,
			sections: [
				'One troll acting this turn spews out a half-digested meal in a 5 × 1 line within 1 square of them. Each troll in the area regains 3 Stamina. Each enemy in the area makes a **Might test**.',
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
			icon: StatBlockIcon.Melee,
			sections: [
				'Each troll in the encounter can make a free strike against a creature adjacent to them, and regains Stamina equal to the damage dealt.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'troll-malice-3',
			name: 'Bloody Banquet',
			cost: 7,
			icon: StatBlockIcon.AuraBurst,
			sections: [
				'Each winded troll in the encounter disgorges the contents of their stomach onto the ground around them, creating a 1 burst of foul vomitus that lasts until the end of the encounter. Each non-troll who enters this area for the first time in a round or starts their turn there takes 5 acid damage. Each troll in the area has a double edge on power rolls.'
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
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Gain an edge on strikes',
			characteristics: FactoryLogic.createCharacteristics(3, 1, -2, -1, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'troll-1-feature-0',
					modifiers: [
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Acid,
							modifierType: DamageModifierType.Weakness,
							value: 8
						}),
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Fire,
							modifierType: DamageModifierType.Weakness,
							value: 8
						})
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-1-feature-1',
						name: 'Arm and a Leg',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 damage; A<2 prone',
								tier2: '5 damage; A<3 prone',
								tier3: '6 damage; prone'
							})),
							FactoryLogic.createAbilitySectionText('If a target made prone this way is already prone, they are grabbed instead.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'troll-1-feature-2',
					name: 'Hyper-Regeneration',
					description: 'At the start of each of the limbjumble’s squad’s turns, the squad’s Stamina pool increases as if each limbjumble were at full Stamina.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'troll-2',
			name: 'Troll Whelp',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Giant', 'Troll' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 10,
			stability: 3,
			freeStrikeDamage: 3,
			withCaptain: '+2 damage bonus to strikes',
			characteristics: FactoryLogic.createCharacteristics(3, 1, -1, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'troll-2-feature-0',
					modifiers: [
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Acid,
							modifierType: DamageModifierType.Weakness,
							value: 5
						}),
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Fire,
							modifierType: DamageModifierType.Weakness,
							value: 5
						})
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-2-feature-1',
						name: 'Jaws and Claws',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 damage',
								tier2: '6 damage; slide 1',
								tier3: '7 damage; slide 2; M<2 bleeding (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'troll-2-feature-2',
					name: 'Lingering Hunger',
					description: 'Whenever two or more whelps are simultaneously reduced to 0 Stamina by damage that isn’t acid or fire damage, half of those whelps become **troll limbjumbles** with 4 Stamina.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'troll-3',
			name: 'Troll Butcher',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Giant', 'Troll' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(3, 1, 1, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'troll-3-feature-0',
					modifiers: [
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Acid,
							modifierType: DamageModifierType.Weakness,
							value: 5
						}),
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Fire,
							modifierType: DamageModifierType.Weakness,
							value: 5
						})
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-3-feature-1',
						name: 'Savoring Bite',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 damage; M<1 bleeding (save ends)',
								tier2: '14 damage; M<2 bleeding (save ends)',
								tier3: '17 damage; M<3 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'The butcher regains Stamina equal to the damage dealt.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-3-feature-2',
						name: 'Rotten Scraps',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 poison damage; M<1 weakened (save ends)',
								tier2: '9 poison damage; M<2 weakened (save ends)',
								tier3: '11 poison damage; M<3 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Each troll in the area ignores the damage and instead regains 3 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-3-feature-3',
						name: 'Gourmet Flesh',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionText('The butcher enhances their next use of Savoring Bite, changing the damage type and condition imposed to one of the following pairs: corruption damage and dazed, acid damage and restrained, or lightning damage and frightened.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-3-feature-4',
						name: 'Acquired Taste',
						type: FactoryLogic.type.createTrigger('A creature within distance deals damage to the butcher with an ability that gains an edge, has a double edge, or uses a surge.'),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The butcher makes a free strike against the target. Until the end of their next turn, the butcher gains an edge on power rolls and deals an extra 3 damage with strikes.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'troll-3-feature-5',
					name: 'Bloody Feast',
					description: 'Each ally within 5 squares of the butcher gains an edge on power rolls against any enemy affected by a condition.'
				}),
				FactoryLogic.feature.create({
					id: 'troll-3-feature-6',
					name: 'Relentless Hunger',
					description: 'The butcher dies only if they are reduced to 0 Stamina by acid or fire damage, if they end their turn with 0 Stamina, or if they take acid or fire damage while at 0 Stamina.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'troll-4',
			name: 'Troll Glutton',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Giant', 'Troll' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 160,
			stability: 4,
			freeStrikeDamage: 7,
			characteristics: FactoryLogic.createCharacteristics(3, 1, -1, 0, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'troll-4-feature-0',
					modifiers: [
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Acid,
							modifierType: DamageModifierType.Weakness,
							value: 5
						}),
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Fire,
							modifierType: DamageModifierType.Weakness,
							value: 5
						})
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-4-feature-1',
						name: 'Voracious Mastication',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 damage',
								tier2: '15 damage; M<2 slowed (save ends)',
								tier3: '18 damage; M<3 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'The glutton regains Stamina equal to the damage dealt.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-4-feature-2',
						name: 'Crash Through',
						type: FactoryLogic.type.createMain(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('The glutton shifts up to their speed in a straight line, ignoring difficult terrain. The first time during this movement that the glutton moves through the space of a creature or object their size or smaller, that creature or object takes 10 damage, or a creature can choose to fall prone instead. If the glutton moves into a creature or object larger than them and doesn’t knock the creature prone or destroy the object, the glutton’s movement ends and they are dazed until the end of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-4-feature-3',
						name: 'Food Frenzy',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of their next turn, the glutton has a double edge on strikes, and strikes made against them gain an edge')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-4-feature-4',
						name: 'Spiteful Retort',
						type: FactoryLogic.type.createTrigger('The glutton is reduced to 0 Stamina but doesn’t die.', { free: true }),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('The glutton uses Voracious Mastication against an adjacent creature.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'troll-4-feature-5',
					name: 'Insatiable Appetite',
					description: 'Once per turn, the glutton can use the Charge main action as a free maneuver if they target a winded creature.'
				}),
				FactoryLogic.feature.create({
					id: 'troll-4-feature-6',
					name: 'Relentless Hunger',
					description: 'The glutton dies only if they are reduced to 0 Stamina by acid or fire damage, if they end their turn with 0 Stamina, or if they take acid or fire damage while at 0 Stamina.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'troll-5',
			name: 'Troll Crack Trooper',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Giant', 'Troll' ],
			encounterValue: 11,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 15,
			stability: 4,
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(4, 1, -1, 0, 2),
			withCaptain: '+3 bonus to Stamina',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'troll-5-feature-0',
					modifiers: [
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Acid,
							modifierType: DamageModifierType.Weakness,
							value: 5
						}),
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Fire,
							modifierType: DamageModifierType.Weakness,
							value: 5
						})
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-5-feature-1',
						name: 'Charging Chomp',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '5 damage; push 2',
								tier2: '7 damage; push 3; A<3 3 damage',
								tier3: '9 damage; push 4; A<4 5 damage'
							})),
							FactoryLogic.createAbilitySectionText('The crack trooper’s squad’s Stamina pool regains Stamina equal to half the damage dealt.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'troll-5-feature-2',
					name: 'Group Appetite',
					description: 'The crack trooper dies only if their squad’s Stamina pool is reduced to 0 Stamina by acid or fire damage, if they end their turn with 0 Stamina in their squad’s Stamina pool, or if they take acid or fire damage while their squad’s Stamina pool is at 0 Stamina.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'troll-6',
			name: 'Troll Ravager',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Giant', 'Troll' ],
			encounterValue: 11,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8),
			stamina: 15,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: FactoryLogic.createCharacteristics(4, 2, 0, 1, 1),
			withCaptain: '+2 bonus to speed',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'troll-6-feature-0',
					modifiers: [
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Acid,
							modifierType: DamageModifierType.Weakness,
							value: 5
						}),
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Fire,
							modifierType: DamageModifierType.Weakness,
							value: 5
						})
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troll-6-feature-1',
						name: 'Dine and Dash',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '4 damage; the ravager can shift 1 square',
								tier2: '6 damage; the ravager shifts up to 2 squares',
								tier3: '8 damage; the ravager shifts up to 3 squares'
							})),
							FactoryLogic.createAbilitySectionText('The ravager’s squad’s Stamina pool regains Stamina equal to half the damage dealt.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'troll-6-feature-2',
					name: 'Group Appetite',
					description: 'The ravager dies only if their squad’s Stamina pool is reduced to 0 Stamina by acid or fire damage, if they end their turn with 0 Stamina in their squad’s Stamina pool, or if they take acid or fire damage while their squad’s Stamina pool is at 0 Stamina.'
				})
			]
		})
	],
	addOns: []
};
