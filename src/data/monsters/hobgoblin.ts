import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const hobgoblin: MonsterGroup = {
	id: 'monster-group-hobgoblin',
	name: 'Hobgoblin',
	description: `
Also known as demogoblins, hobgoblins descend from ancient goblins who made a pact with an infernal power in exchange for increased size and strength. Each hobgoblin has fang-like tusks and one or more horns protruding from their head.

Many hobgoblin settlements constantly and aggressively test each other’s boundaries. This isn’t normally a problem for other humanoids, but once or twice every generation, a wicked hobgoblin rallies their people and decides it’s time to take over everyone else’s lands—THEN it’s a problem. `,
	picture: null,
	information: [
		{
			id: 'hobgoblin-info-1',
			name: 'Synergized Tactics',
			description: 'Hobgoblin magic and talents complement one another in a fight. Wise commanders put these strategies to good use and scout the battlefield before combat to gain every advantage. Thanks to their emphasis on tactics, hobgoblin armies can hold their own against other forces with ease.'
		},
		{
			id: 'hobgoblin-info-2',
			name: 'Playing With Fire',
			description: 'The infernal heritage of hobgoblins allows them to live in extreme heat many other humanoids can’t tolerate. They often settle in deserts, tropics, and other hot areas. Their heritage also allows them to bend fire to their will, and many choose professions that make use of fire, such as smithing or glassblowing.'
		},
		{
			id: 'hobgoblin-info-3',
			name: 'Innate Magic',
			description: 'Infernal magic runs through the veins of every hobgoblin, though their gifts vary. Many can harness the power of fire or corruptive energy, while others can teleport across the battlefield or run like the fastest predators.'
		},
		{
			id: 'hobgoblin-info-4',
			name: 'Binding Bargains',
			description: 'Many hobgoblins still hold to the infernal concept of being true to their word when entering into agreements. Even spoken contracts are considered unbreakable, and hobgoblin communities scorn any creature—hobgoblin or otherwise—who degrades themself by breaking their word.'
		},
		{
			id: 'hobgoblin-info-5',
			name: 'Grilp',
			description: 'The grilp—a green-skinned devil about the size of a housecat—can change the color and texture of their skin to blend in with their surroundings. They often serve as scouts, spies, messengers, and errand-runners for high-ranking hobgoblins. Beyond the grilp’s covert skills, however, hobgoblins value these creatures most highly for their magic-laced saliva, which weakens the defenses of other creatures.'
		},
		{
			id: 'hobgoblin-info-6',
			name: 'Slaughter Demon',
			description: `
When evil hobgoblins who embrace their fiendish heritage need to wipe an enemy off the map, their war mages ritualistically beseech an archdevil for the service of a grack’tanar, known as a slaughter demon in the Caelian language. Once summoned, this towering, serpent-bodied, six-clawed demon slithers to war alongside the hobgoblins who summoned them.

Devils captured the grack’tanars eons ago. Broken, these demons wait for a call to war, hungry and frothing in the Seven Cities of Hell. Slaughter demons are eager to kill and please their devil captors so they might be sent out again, and they rarely turn on hobgoblins unless they fall into lethe (see the Demons section).`
		},
		{
			id: 'hobgoblin-info-7',
			name: 'Hobgoblin Languages',
			description: 'Most hobgoblins speak Anjali, Caelian, and Szetch.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'hobgoblin-malice-1',
			name: 'Operation Goblin Mode',
			cost: 3,
			sections: [
				'Each goblin in the encounter gains a +3 bonus to speed until the end of the round.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'hobgoblin-malice-2',
			name: 'Operation Tactical Swarm',
			cost: 5,
			sections: [
				'Each hobgoblin in the encounter shifts up to their speed and can take the Defend main action.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'hobgoblin-malice-3',
			name: 'Operation Earthsear',
			cost: 7,
			sections: [
				'Until the end of the round, the ground throughout the encounter map becomes blazing hot. Any enemy takes 1 fire damage for each square of the ground they enter. Any enemy who ends their turn on the ground has fire weakness 2 until the start of their next turn.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'hobgoblin-1',
			name: 'Hobgoblin Brandbearer',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: FactoryLogic.createCharacteristics(0, 1, 2, 0, 3),
			withCaptain: 'Gain an edge on strikes',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-1-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-1-feature-2',
						name: 'Searing Grasp',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 fire damage',
								tier2: '4 fire damage; M < 2 fire weakness 5 (save ends)',
								tier3: '6 fire damage; M < 3 fire weakness 5 (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-1-feature-3',
					name: 'Open Furnace',
					description: 'Whenever an enemy takes fire damage, they take 1 extra fire damage for each brandbearer adjacent to them.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-1-feature-4',
					name: 'Infernal Ichor',
					description: 'When the brandbearer is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the brandbearer takes 2 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-2',
			name: 'Hobgoblin Lancer',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: FactoryLogic.createCharacteristics(1, 3, 0, 2, 0),
			withCaptain: '+2 damage bonus to strikes',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-2-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-2-feature-2',
						name: 'Grim Thrust',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 corruption damage',
								tier2: '4 corruption damage; push 1',
								tier3: '6 corruption damage; push 2'
							})),
							FactoryLogic.createAbilitySectionText('The lancer deals an additional 2 damage if they strike the target from 1 or more squares above.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-2-feature-3',
					name: 'Infernal Ichor',
					description: 'When the lancer is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the lancer takes 2 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-3',
			name: 'Hobgoblin Recruit',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 9,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(3, 2, 0, 0, 1),
			withCaptain: '+4 bonus to Stamina',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-3-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-3-feature-2',
						name: 'Sword Lunge',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 damage',
								tier2: '5 damage',
								tier3: '7 damage; grabbed or prone'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-3-feature-3',
					name: 'Tactical Positioning',
					description: 'Any non-minion ally deals 1 extra damage for each recruit adjacent to them.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-3-feature-4',
					name: 'Infernal Ichor',
					description: 'When the recruit is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the recruit takes 2 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-4',
			name: 'Grilp',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Devil', 'Hobgoblin', 'Infernal' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(7, 'fly'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(-1, 3, 0, 1, 0),
			withCaptain: '+2 bonus to speed',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-4-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-4-feature-2',
						name: 'Flyby Bite',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 damage',
								tier2: '5 damage',
								tier3: '7 damage; the grilp shifts up to 2 squares'
							})),
							FactoryLogic.createAbilitySectionText('The grilp moves up to their speed and can attempt to hide.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-4-feature-3',
					name: 'Bat Out Of Hell',
					description: 'Any enemy who makes a saving throw takes a −1 penalty to the saving throw for each grilp adjacent to them.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-4-feature-4',
					name: 'Shifting Camouflage',
					description: 'The grilp has concealment from all creatures.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-5',
			name: 'Hobgoblin Burning Witch',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Controller),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'teleport'),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(0, 1, 2, 2, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-5-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-5-feature-2',
						name: 'Soul Burn',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '4 corruption or fire damage',
								tier2: '6 corruption or fire damage',
								tier3: '8 corruption or fire damage'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'Each target who has <code>P < 2</code> is weakened (save ends). Any enemy who starts their turn within 3 squares of a target weakened this way and who has <code>P < 2</code> is weakened (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-5-feature-3',
						name: 'Burning Legion',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createRanged(10)
						],
						target: 'Three creatures',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target can teleport up to 5 squares. Each creature adjacent to a target at their destination takes 3 fire damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-5-feature-4',
					name: 'Infernal Ichor',
					description: 'When the burning witch is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the burning witch takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-6',
			name: 'Hobgoblin Death Captain',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Support),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 60,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(3, 0, 1, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-6-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-6-feature-2',
						name: 'Blightblade',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '8 damage',
								tier2: '8 damage, 4 corruption damage',
								tier3: '8 damage, 7 corruption damage'
							})),
							FactoryLogic.createAbilitySectionText('The next strike made against the target has a double edge.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'One ally adjacent to the target can use their signature ability.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-6-feature-3',
						name: 'On My Mark!',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target moves up to their speed and can make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-6-feature-4',
					name: 'Battle Ready',
					description: 'Any hidden creature who makes a strike against the death captain or any ally within 2 squares of the death captain takes a bane on the strike.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-6-feature-5',
					name: 'Infernal Ichor',
					description: 'When the death captain is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the death captain takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-7',
			name: 'Hobgoblin Firerunner',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Harrier),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 14,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 70,
			stability: 0,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(2, 3, 1, 1, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-7-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-7-feature-2',
						name: 'Flaming Kick',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 fire damage',
								tier2: '13 fire damage',
								tier3: '16 fire damage; A < 3 dazed (EoT)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-7-feature-3',
						name: 'Blazing Trail',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The firerunner moves up to their speed and creates an 8 wall of fire along the path of their movement. Creatures can enter and pass through the wall. Any enemy who enters the wall for the first time in a round or starts their turn there takes 5 fire damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-7-feature-4',
					name: 'Hot to Go',
					description: 'Whenever the firerunner takes fire damage for the first time in a round, their speed and the size of the wall they can create with Blazing Trail increases by 4 until the end of their next turn.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-7-feature-5',
					name: 'Kindlestep',
					description: 'The firerunner ignores difficult terrain.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-7-feature-6',
					name: 'Infernal Ichor',
					description: 'When the firerunner is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the firerunner takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-8',
			name: 'Hobgoblin Grandguard',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Defender),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(4),
			stamina: 111,
			stability: 4,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(3, 2, 3, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-8-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 6 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-8-feature-2',
						name: 'Tower Shield Smash',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 damage',
								tier2: '14 damage',
								tier3: '17 damage; prone'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'Each ally adjacent to a prone target can make a free strike against that target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-8-feature-3',
						name: 'Thunder Rush',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Charge, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 1, value2: 2, within: 1 }) ],
						target: 'Each enemy or object in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 damage',
								tier2: '11 damage',
								tier3: '14 damage'
							})),
							FactoryLogic.createAbilitySectionText('Each target is pushed up to 10 squares in the same direction, and the grandguard shifts into the area left behind by the targets.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-8-feature-4',
					name: 'Wide Guard',
					description: 'Any strike made against an ally within 2 squares of the grandguard takes a bane.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-8-feature-5',
					name: 'Infernal Ichor',
					description: 'When the grandguard is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the grandguard takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-9',
			name: 'Hobgoblin Hell Trooper',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Brute),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 70,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(3, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-9-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-9-feature-2',
						name: 'Fire Flail',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 fire damage',
								tier2: '10 fire damage',
								tier3: '13 fire damage'
							})),
							FactoryLogic.createAbilitySectionText('Until the end of their turn, the trooper doesn’t provoke opportunity attacks from any target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-9-feature-3',
						name: 'Fight Me, Coward',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionText('If the target has <code>P < 2</code>, they are taunted (EoT). While taunted this way, the target takes 1d6 fire damage whenever they use an ability or strike that doesn’t target the trooper.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-9-feature-4',
					name: 'Infernal Ichor',
					description: 'When the trooper is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the trooper takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-10',
			name: 'Hobgoblin Incendiarist',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Artillery),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 14,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 60,
			stability: 0,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(1, 3, 0, 2, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-10-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-10-feature-2',
						name: 'Fire Crossbow',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 fire damage',
								tier2: '14 fire damage',
								tier3: '17 fire damage; A<3 burning (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-10-feature-3',
						name: 'Fire Ball Volley',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'Each enemy or object in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 fire damage; A < 1 burning (save ends)',
								tier2: '9 fire damage; A < 2 burning (save ends)',
								tier3: '11 fire damage; prone; A < 3 burning (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-10-feature-4',
					name: 'Raining Cinders',
					description: 'The ranged free strike of each ally within 3 squares of the incendiarist has a distance of 10 and deals fire damage.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-10-feature-5',
					name: 'Infernal Ichor',
					description: 'When the incendiarist is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the incendiarist takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-11',
			name: 'Hobgoblin Redglare',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Hexer),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5, 'teleport'),
			stamina: 70,
			stability: 4,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(0, 2, 2, 3, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-11-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 6 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-11-feature-2',
						name: 'Eye Flash',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 corruption damage; P < 1 slowed (save ends)',
								tier2: '14 corruption damage; P < 2 restrained (save ends)',
								tier3: '17 corruption damage; P < 3 restrained (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-11-feature-3',
						name: 'Glare of the Old Judgements',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 corruption damage',
								tier2: '10 corruption damage, or if the target has P < 2 they are judged',
								tier3: 'The target is judged'
							})),
							FactoryLogic.createAbilitySectionText('Until the end of the encounter, a judged target takes 10 corruption damage at the start of each of their turns, and regains 5 Stamina each time they use an ability or other effect that allows another creature to spend a Recovery.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-11-feature-4',
					name: 'Infernal Ichor',
					description: 'When the redglare is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the redglare takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-12',
			name: 'Hobgoblin Smokebinder',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 14,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7, 'fly, hover'),
			stamina: 70,
			stability: 0,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(1, 3, 2, 1, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-12-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-12-feature-2',
						name: 'Choking Bolt',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 fire damage',
								tier2: '14 fire damage',
								tier3: '17 fire damage; R < 3 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If this ability gains an edge or has a double edge, the target can’t communicate with anyone until the end of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-12-feature-3',
						name: 'Smoke Bomb',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes a **Might test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Might,
								tier1: '11 damage; the target has a double bane on their next power roll',
								tier2: '9 damage; the target has a bane on their next power roll',
								tier3: '5 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-12-feature-4',
					name: 'Essence of Smoke',
					description: 'The smokebinder can move through spaces as if they were size 1T and can occupy another creature or object’s space. At the end of their turn, the smokebinder can attempt to hide if they haven’t taken any damage since their last turn.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-12-feature-5',
					name: 'Infernal Ichor',
					description: 'When the smokebinder is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the smokebinder takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-13',
			name: 'Hobgoblin War Mage',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'hover, teleport'),
			stamina: 120,
			stability: 0,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(0, 2, 3, 2, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-13-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-13-feature-2',
						name: 'Hellfire',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy in the area',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 fire damage; M < 1 weakened (save ends)',
								tier2: '9 fire damage; M < 2 weakened (save ends)',
								tier3: '11 fire damage; M < 3 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Before using this ability, the war mage can teleport a creature within 10 squares of them up to 2 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-13-feature-3',
						name: 'Enchantments of War',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two allies',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target gains 10 temporary Stamina and has a double edge on their next power roll. The war mage can spend any amount of their current Stamina to increase the temporary Stamina each target gains by an equivalent amount.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-13-feature-4',
						name: 'Unhallowed Ground',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
						target: 'Special',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('The war mage consecrates the area and causes it to smolder until the end of the encounter. The area is difficult terrain and any enemy in the area has fire weakness 10.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-13-feature-5',
						name: 'Magic Siphon',
						type: FactoryLogic.type.createTrigger('A creature within distance uses a magic ability.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('Any damage dealt or Stamina regained from the creature’s ability is halved. The war mage regains Stamina equal to the remaining damage dealt or Stamina regained.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-13-feature-6',
					name: 'Infernal Ichor',
					description: 'When the war mage is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the war mage takes 3 fire damage.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-13-feature-7',
					name: 'Despair, You Who Faces Death',
					description: 'Any enemy within 2 squares of the war mage has a −2 penalty to saving throws.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-14',
			name: 'Hobgoblin Bloodlord',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'teleport'),
			stamina: 180,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: FactoryLogic.createCharacteristics(4, 2, 2, 3, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-14-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 6 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-14-feature-2',
						name: 'Soul Sword',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '11 corruption damage; P < 2 bleeding (save ends)',
								tier2: '16 corruption damage; P < 3 bleeding (save ends)',
								tier3: '19 corruption damage; P < 4 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'Each target is marked until the end of the encounter or until they die. The bloodlord’s allies gain an edge on strikes against any target marked this way. The bloodlord can have up to three targets marked this way. If they mark a new target who would exceed the limit, the oldest mark ends.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-14-feature-3',
						name: 'Take Point!',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target moves up to their speed and can use a signature ability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-14-feature-4',
						name: 'An Army From Blood',
						type: FactoryLogic.type.createTrigger('A non-minion hobgoblin within distance takes damage.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering creature',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('Three hobgoblin recruits manifest from the target’s blood into unoccupied spaces adjacent to the target. ')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-14-feature-5',
					name: 'Infernal Ichor',
					description: 'When the bloodlord is reduced to 0 Stamina, they spray burning blood. Each creature adjacent to the bloodlord takes 3 fire damage.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-14-feature-6',
					name: 'End Effect',
					description: 'At the end of each of their turns, the bloodlord can take 10 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-14-feature-7',
						name: 'Advance!',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target gains 10 temporary Stamina and can move up to their speed. Then each non-minion target can make a free strike. ')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-14-feature-8',
						name: 'Skulls Abound',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter, the bloodlord surrounds themself with a storm of flying skulls. Any enemy who enters the area for the first time in a round or starts their turn there takes 8 corruption damage and takes a bane on their next power roll until the start of their next turn. ')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-14-feature-9',
						name: 'I am Fire! I am Death!',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '5 fire damage; P < 2 2 fire damage; push 2, prone',
								tier2: '5 fire damage; P < 3 7 fire damage; push 3, prone',
								tier3: '5 fire damage; P < 4 10 fire damage; push 5, prone'
							})),
							FactoryLogic.createAbilitySectionText('Until the end of the encounter, the bloodlord is wreathed in black flames. Whenever any adjacent enemy grabs the bloodlord or uses a melee ability against them, that enemy takes 5 corruption damage.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-15',
			name: 'Slaughter Demon',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon', 'Hobgoblin' ],
			encounterValue: 24,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(7, 'burrow'),
			stamina: 140,
			stability: 3,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(3, 0, -1, 1, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-15-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-15-feature-2',
						name: 'Steely Skewer',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 damage',
								tier2: '14 damage; A < 2 bleeding (save ends)',
								tier3: '17 damage; A < 3 bleeding and restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A creature restrained this way moves with the slaughter demon. The slaughter demon can have up to six creatures or objects restrained at once.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-15-feature-3',
						name: 'Tail Stinger',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(5) ],
						target: 'One creature or object',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 poison damage; M < 1 weakened (save ends)',
								tier2: '16 poison damage; M < 2 weakened (save ends)',
								tier3: '20 poison damage; M < 3 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A target weakened this way also has damage weakness 3.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-15-feature-4',
					name: 'Drag Below',
					description: 'The slaughter demon can make a free strike as part of using the Dig maneuver. If the target of the free strike has <code>M < 2</code>, they are grabbed and take a bane on the Escape Grab maneuver.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-15-feature-5',
						name: 'Devour Soul',
						type: FactoryLogic.type.createTrigger('A creature within distance who has a soul dies.'),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target can’t be brought back to life. Until the end of the encounter, the slaughter demon gains an edge on power rolls.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-15-feature-6',
					name: 'Soulsight',
					description: 'Any creature within 2 squares of the slaughter demon can’t be hidden from them.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-15-feature-7',
					name: 'Lethe',
					description: 'While the slaughter demon is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
				})
			]
		})
	],
	addOns: []
};
