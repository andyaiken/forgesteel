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

export const hobgoblin: MonsterGroup = {
	id: 'monster-group-hobgoblin',
	name: 'Hobgoblin',
	description: `
Also known as demogoblins, hobgoblins descend from ancient goblins who made a pact with an infernal power in exchange for increased size and strength. Each hobgoblin has fang-like tusks, and one or more horns protrude from their head.

Like other humanoids, hobgoblins have no special inclination toward conquest, battle, or cruelty, and they can be found in all walks of life. But when the wicked among them fall on desperate times, some use their talents for the violence and subjugation of others.`,
	information: [
		{
			id: 'hobgoblin-info-1',
			name: 'Synergized Tactics',
			description: 'Hobgoblin magic and talents complement one another in a fight. Wise commanders put these strategies to good use and scout the battlefield before combat to gain every advantage. Thanks to their emphasis on tactics, hobgoblin armies are often second to none.'
		},
		{
			id: 'hobgoblin-info-2',
			name: 'Playing With Fire',
			description: 'The infernal heritage of hobgoblins allows them to live in extreme heat that many other humanoids can’t tolerate. Hobgoblins often settle in deserts, tropics, and other hot areas. Their heritage also allows them to bend fire to their will, and many choose professions that make use of fire, such as smithing or glassblowing.'
		},
		{
			id: 'hobgoblin-info-3',
			name: 'Innate Magic',
			description: 'Infernal magic runs through the veins of every hobgoblin, though their gifts vary. Many can harness the power of fire or corruptive energy, while others can turn allies invisible or run like Hell.'
		},
		{
			id: 'hobgoblin-info-4',
			name: 'Binding Bargains',
			description: 'Many hobgoblins still hold to the infernal concept of being true to their word when entering into agreements. Even spoken contracts are considered unbreakable, and hobgoblin communities scorn any creature - hobgoblin or otherwise - who degrades themself by breaking their word.'
		},
		{
			id: 'hobgoblin-info-5',
			name: 'Grilp',
			description: 'The grilp - a green-skinned devil about the size of a housecat - can change the color and texture of their skin to blend in with their surroundings. They often serve as scouts, spies, messengers, and errand-runners for high-ranking hobgoblins. Beyond these covert skills, however, hobgoblins value grilps most highly for their magic-laced saliva, which weakens the defenses of other creatures.'
		},
		{
			id: 'hobgoblin-info-6',
			name: 'Slaughter Demon',
			description: `
When evil hobgoblins who embrace their fiendish heritage need to wipe an enemy off the map, their war mages ritualistically beseech an archdevil for the service of a grack’tanar, known as a slaughter demon in the Common tongue. Once summoned, this towering, serpent-bodied, six-clawed demon slithers to war alongside the hobgoblins who summoned them.

Devils captured the grack’tanars eons ago. Broken, these demons wait for a call to war, hungry and frothing in the Seven Cities of Hell. Their archdevil captors reward loyal hobgoblins by allowing the mortals to hold a grack’tanar’s reins for a time. These slaughter demons are eager to kill and please their captors so they might be sent out again, and they rarely turn on hobgoblins unless they fall into lethe.`
		},
		{
			id: 'hobgoblin-info-7',
			name: 'Hobgoblin Languages',
			description: 'Most hobgoblins speak Caelian, Anjali and Szetch.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'hobgoblin-malice-0',
			name: 'Goblin Malice Features',
			cost: 1,
			repeatable: true,
			sections: [
				'The hobgoblin activates a malice feature available to goblins.'
			]
		}),
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
				'All hobgoblins shift up to their speed and take the Defend action.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'hobgoblin-malice-3',
			name: 'Operation Earthsear',
			cost: 7,
			sections: [
				'The ground throughout the encounter map becomes blazing hot until the end of the round. An enemy takes 1 fire damage for each affected square they enter. An enemy that ends their turn in an affected square has fire weakness 2 until the start of their next turn.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'hobgoblin-1',
			name: 'Grilp',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Devil', 'Hobgoblin', 'Infernal' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(7, 'fly'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(-1, 3, 0, 1, 0),
			withCaptain: 'Speed +2',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-1-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-1-2',
						name: 'Flyby Bite',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage; shift 2'
						}),
						effect: 'The grilp moves up to their speed and hides after attacking.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-1-3',
					name: 'Bat Out Of Hell',
					description: 'Each enemy has -1 on their saving throws for each adjacent grilp.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-1-4',
					name: 'Shifting Camouflage',
					description: 'The grilp can hide even if they don’t have cover or concealment.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-2',
			name: 'Hobgoblin Brandbearer',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 2, 0, 3),
			withCaptain: 'Edge on strikes',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-2-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-2-2',
						name: 'Searing Grasp',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '2 fire damage',
							tier2: '4 fire damage; M<2 fire weakness 5 (save ends)',
							tier3: '6 fire damage; M<3 fire weakness 5 (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-2-3',
					name: 'Open Furnace',
					description: 'An enemy that takes fire damage receives 1 additional fire damage for each adjacent brandbearer.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-2-4',
					name: 'Infernal Ichor',
					description: 'If the brandbearer’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the brandbearer takes 2 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-3',
			name: 'Hobgoblin Lancer',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 2, 0),
			withCaptain: 'Strike damage +2',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-3-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-3-2',
						name: 'Grim Thrust',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2),
							FactoryLogic.distance.createRanged(5)
						],
						target: '1 creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '2 corruption damage',
							tier2: '4 corruption damage; push 1',
							tier3: '6 corruption damage; push 2'
						}),
						effect: 'The lancer deals an additional 2 damage if they strike the target from 1 or more squares above.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-3-3',
					name: 'Infernal Ichor',
					description: 'If the lancer’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the lancer takes 2 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-4',
			name: 'Hobgoblin Recruit',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 9,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 0, 0, 1),
			withCaptain: '34 temporary Stamina',
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-4-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-4-2',
						name: 'Sword Lunge',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage; grabbed or prone'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-4-3',
					name: 'Tactical Positioning',
					description: 'A non-minion ally deals 1 additional damage for each adjacent recruit.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-4-4',
					name: 'Infernal Ichor',
					description: 'If the recruit’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the recruit takes 2 fire damage.'
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
			characteristics: MonsterLogic.createCharacteristics(0, 1, 2, 2, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-5-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-5-2',
						name: 'Soul Burn',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 fire or corruption damage; P<1 weakened (save ends)',
							tier2: '12 fire or corruption damage; P<2 weakened (save ends)',
							tier3: '15 fire or corruption damage; P<3 weakened (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-5-3',
						name: 'Burning Legion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.createRanged(10)
						],
						target: '3 creatures',
						cost: 1,
						effect: 'Teleport 5. Each creature within 1 of a target where they appear takes 3 fire damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-5-4',
					name: 'Infernal Ichor',
					description: 'If the burning witch’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the burning witch takes 3 fire damage.'
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
			characteristics: MonsterLogic.createCharacteristics(2, 0, 1, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-6-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-6-2',
						name: 'Blightblade',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage',
							tier2: '8 damage; 4 corruption damage',
							tier3: '8 damage; 7 corruption damage'
						}),
						effect: 'The next strike made against the target has a double edge.',
						spend: [
							{
								value: 3,
								effect: '1 ally adjacent to the target uses their signature action.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-6-3',
						name: 'On My Mark!',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 ally',
						cost: 0,
						effect: 'The target moves up to their speed and makes a free strike.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-6-4',
					name: 'Battle Ready',
					description: 'The death captain and each ally within 2 impose a bane on strikes made against them by hidden creatures.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-6-5',
					name: 'Infernal Ichor',
					description: 'If the death captain’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the death captain takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-7',
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
			characteristics: MonsterLogic.createCharacteristics(3, 2, 3, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-7-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 6 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-7-2',
						name: 'Tower Shield Smash',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '14 damage',
							tier3: '17 damage; prone'
						}),
						spend: [
							{
								value: 3,
								effect: 'Each ally adjacent to a target that is knocked prone can make a free strike.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-7-3',
						name: 'Thunder Rush',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 1, value2: 2, within: 1 }) ],
						target: 'All enemies or objects',
						cost: 3,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '6 damage',
							tier2: '11 damage',
							tier3: '14 damage'
						}),
						effect: 'Push 10. The grandguard shifts into every 2 squares left behind by targets.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-7-4',
					name: 'Wide Guard',
					description: 'The grandguard imposes a bane on strikes against each ally within 2.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-7-5',
					name: 'Infernal Ichor',
					description: 'If the grandguard’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the grandguard takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-8',
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
			characteristics: MonsterLogic.createCharacteristics(2, 3, 1, 1, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-8-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-8-2',
						name: 'Flaming Kick',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 fire damage',
							tier2: '13 fire damage',
							tier3: '16 fire damage; A<3 dazed (EoT)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-8-3',
						name: 'Blazing Trail',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 0,
						effect: 'The firerunner moves up to their speed and creates a 8 wall of fire. Each segment must include one of the squares the firerunner touched. Creatures can enter and pass through the wall. Any enemy who enters the wall for the first time in a round or starts their turn there takes 5 fire damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-8-4',
					name: 'Hot to Go',
					description: 'The firerunner ignores diﬃcult terrain. Whenever the firerunner takes fire damage, their speed and the wall they can create with Blazing Trail increases by 4 until the end of their next turn.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-8-5',
					name: 'Infernal Ichor',
					description: 'If the firerunner’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the firerunner takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-9',
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
			characteristics: MonsterLogic.createCharacteristics(1, 3, 0, 2, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-9-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-9-2',
						name: 'Fire Crossbow',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 fire damage',
							tier2: '14 fire damage',
							tier3: '17 fire damage; A<3 burning (save ends)'
						}),
						effect: 'A burning target takes 1d6 fire damage at the start of each of their turns until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-9-3',
						name: 'Fire Ball Volley',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'All enemies and objects',
						cost: 3,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 fire damage; A<1 burning (save ends)',
							tier2: '9 fire damage; A<2 burning (save ends)',
							tier3: '11 fire damage; prone; A<3 burning (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-9-4',
					name: 'Raining Cinders',
					description: 'The ranged free strike of each ally within 3 of the incendiarist has a distance of 10 and it now deals fire damage.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-9-5',
					name: 'Infernal Ichor',
					description: 'If the incendiarist’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the incendiarist takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-10',
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
			characteristics: MonsterLogic.createCharacteristics(0, 2, 2, 3, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-10-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 6 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-10-2',
						name: 'Eye Flash',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 corruption damage; P<1 slowed (save ends)',
							tier2: '14 corruption damage; P<2 restrained (save ends)',
							tier3: '17 corruption damage; P<3 restrained (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-10-3',
						name: 'Glare of the Old Judgements',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature',
						cost: 5,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 corruption damage',
							tier2: '10 corruption damage or P<2 Target is judged',
							tier3: 'Target is judged'
						}),
						effect: 'A judged target takes 10 corruption damage for each turn they’ve taken during the encounter. The target then regains 5 Stamina for each recovery they enabled a creature to spend during the encounter.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-10-4',
					name: 'Infernal Ichor',
					description: 'If the redglare’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the redglare takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-11',
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
			characteristics: MonsterLogic.createCharacteristics(1, 3, 2, 1, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-11-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-11-2',
						name: 'Choking Bolt',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(4) ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 fire damage',
							tier2: '14 fire damage',
							tier3: '17 fire damage; R<3 slowed (save ends)'
						}),
						effect: 'If the smokebinder had an edge on the power roll, the target cannot communicate with anyone until the end of their next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-11-3',
						name: 'Smoke Bomb',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies in the burst',
						cost: 3,
						preEffect: 'Each target makes a **Might test**.',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '11 damage; target has a double bane on their next power roll',
							tier2: '9 damage; target has a bane on their next power roll',
							tier3: '5 damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-11-4',
					name: 'Essence of Smoke',
					description: 'The smokebinder can move through other creatures and objects at normal speed. The smokebinder automatically hides at the end of their turn if they didn’t take any damage since their last turn.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-11-5',
					name: 'Infernal Ichor',
					description: 'If the smokebinder’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the smokebinder takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-12',
			name: 'Hobgoblin Soldier',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Brute),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 70,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-12-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-12-2',
						name: 'Fire Flail',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 fire damage',
							tier2: '10 fire damage',
							tier3: '13 fire damage'
						}),
						effect: 'The soldier doesn’t provoke opportunity attacks from each target until the end of the trooper’s turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-12-3',
						name: 'Fight Me, Coward!',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 creature',
						cost: 0,
						effect: 'The target is P<2 taunted (EoT). While taunted by this ability, a creature takes 1d6 fire damage whenever they use an ability or attack that doesn’t target the soldier.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-12-4',
					name: 'Infernal Ichor',
					description: 'If the soldier’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the soldier takes 3 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-13',
			name: 'Hobgoblin War Mage',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Controller),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'teleport, hover'),
			stamina: 120,
			stability: 0,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 3, 2, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-13-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-13-2',
						name: 'Hellfire',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'All enemies in the cube',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 fire damage; M<1 weakened (save ends)',
							tier2: '9 fire damage; M<2 weakened (save ends)',
							tier3: '11 fire damage; M<3 weakened (save ends)'
						}),
						effect: 'The war mage can teleport a creature within 10 up to 2 squares before using this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-13-3',
						name: 'Enchantments of War',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '2 allies',
						cost: 0,
						effect: 'Each target gains 10 temporary Stamina and has a double edge on their next power roll. The war mage can spend any amount of their Stamina to increase the temporary Stamina each target gains by an equivalent amount.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-13-4',
						name: 'Unhallowed Ground',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
						target: 'Special',
						cost: 3,
						effect: 'The war mage consecrates the affected area and causes it to smolder. Until the end of the encounter, the affected area is considered difficult terrain and enemies have fire weakness 10 while occupying an affected square.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-13-5',
						name: 'Magic Siphon',
						type: FactoryLogic.type.createTrigger('A creature within distance uses a strike or ability with the magic keyword'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Triggering creature',
						cost: 'signature',
						effect: 'Any damage dealt or Stamina regained by the attack or ability is halved. The war mage regains Stamina equal to the remainder.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-13-6',
					name: 'Infernal Ichor',
					description: 'If the war mage’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the war mage takes 3 fire damage.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-13-7',
					name: 'Despair, You Who Faces Death',
					description: 'Each enemy has -2 on saving throws while within 2 squares of the war mage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-14',
			name: 'Slaughter Demon',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon', 'Hobgoblin' ],
			encounterValue: 24,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(7, 'burrow'),
			stamina: 140,
			stability: 3,
			freeStrikeDamage: 6,
			characteristics: MonsterLogic.createCharacteristics(3, 0, -1, 1, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-14-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-14-2',
						name: 'Steely Skewer',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '14 damage; A<2 bleeding (save ends)',
							tier3: '17 damage; A<3 bleeding and restrained (save ends)'
						}),
						effect: 'A creature restrained by this attack moves along with the slaughter demon until the condition ends. The slaughter demon can have up to 6 creatures or objects restrained on their weapons.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-14-3',
						name: 'Tail Stinger',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(5) ],
						target: '1 creature or object',
						cost: 3,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '10 poison damage; M<1 weakened (save ends)',
							tier2: '16 poison damage; M<2 weakened (save ends)',
							tier3: '20 poison damage; M<3 weakened (save ends)'
						}),
						effect: 'A target weakened by this ability has damage weakness 3 until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-14-4',
						name: 'Drag Below',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: '1 creature or object',
						cost: 0,
						effect: 'The slaughter demon makes a free strike against the target and burrows up to their speed. The target is pulled the same number of squares the slaughter demon burrows into, including vertically.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-14-5',
						name: 'Devour Soul',
						type: FactoryLogic.type.createTrigger('A creature with a soul dies.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Triggering creature',
						cost: 0,
						effect: 'The target can’t be brought back to life. The slaughter demon gains an edge on all power rolls for the rest of the encounter.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-14-6',
					name: 'Soulsight',
					description: 'Each creature within 2 of the slaughter demon can’t be hidden from them.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-14-7',
					name: 'Lethe',
					description: 'While winded, the slaughter demon has an edge on strikes, and strikes have an edge against them.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-15',
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
			characteristics: MonsterLogic.createCharacteristics(4, 2, 2, 3, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-15-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 6 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-15-2',
						name: 'Soul Sword',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '11 corruption damage; P<2 bleeding (save ends)',
							tier2: '16 corruption damage; P<3 bleeding (save ends)',
							tier3: '19 corruption damage; P<4 bleeding (save ends)'
						}),
						spend: [
							{
								value: 2,
								effect: 'Each target is marked until they die or the end of the encounter. Allies have an edge on strikes against marked targets. The bloodlord can only have up to 3 targets marked this way, removing the oldest mark first.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-15-3',
						name: 'Take Point!',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 ally',
						cost: 0,
						effect: 'The target moves up to their speed and uses a signature action.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-15-4',
						name: 'An Army From Blood',
						type: FactoryLogic.type.createTrigger('The target takes damage'),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 non-minion hobgoblin',
						cost: 3,
						effect: '3 hobgoblin recruits crawl out of the target’s blood and appear in unoccupied spaces adjacent to the target.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-15-5',
					name: 'Infernal Ichor',
					description: 'If the bloodlord’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the bloodlord takes 3 fire damage.'
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-15-6',
					name: 'End Effect',
					description: 'At the end of their turn, the bloodlord can take 10 damage to end one save ends eﬀect aﬀecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-15-7',
						name: 'Advance!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 })
						],
						target: 'Self and all allies',
						cost: 0,
						effect: 'Each target gains 10 temporary Stamina, moves up to their speed, and makes a free strike.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-15-8',
						name: 'Skulls Abound',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
						target: 'Self',
						cost: 0,
						effect: 'The bloodlord surrounds themselves with a storm of flying skulls until the end of the encounter. An enemy that first enters the aura or starts their turn there takes 8 corruption damage and has a bane on their next power roll until the start of their next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-15-9',
						name: 'I am Fire! I am Death!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All enemies in the burst',
						cost: 0,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '5 fire damage; P<2 2 fire damage; push 2, prone',
							tier2: '5 fire damage; P<3 7 fire damage; push 3, prone',
							tier3: '5 fire damage; P<4 10 fire damage; push 5, prone'
						}),
						effect: 'The bloodlord is wreathed in black flames until the end of the encounter. When an adjacent enemy touches or uses a melee ability against the bloodlord, they take 5 corruption damage.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'hobgoblin-16',
			name: 'Hobgoblin Flameslinger',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Controller),
			keywords: [ 'Goblin', 'Hobgoblin', 'Humanoid', 'Infernal' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 2, 1, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'hobgoblin-16-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-16-2',
						name: 'Fire Curse',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '5 fire damage',
							tier2: '9 fire damage',
							tier3: '12 fire damage; A (strong) burning (save ends)'
						}),
						effect: 'A burning target takes 1d6 fire damage at the start of each of their turns until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-16-3',
						name: 'Fuel for the Fire',
						type: FactoryLogic.type.createAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature',
						effect: 'The target gains fire weakness 10 until the end of the flameslinger’s next turn. If the target is the flameslinger’s mentor, they instead gain fire immunity 10.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'hobgoblin-16-5',
					name: 'Infernal Ichor',
					description: 'If the flameslinger’s Stamina drops to 0, they spray burning blood. Each creature within 1 of the flameslinger takes 3 fire damage.'
				})
			],
			retainer: {
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-16-retainer-7',
						name: 'Unholy Attraction',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '8 damage; pull 1',
							tier2: '12 damage; pull 2',
							tier3: '16 damage; pull 4'
						}),
						effect: 'A creature pulled adjacent to the flameslinger is P (medium) prone.'
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'hobgoblin-16-retainer-10',
						name: 'Fire Spiral',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '8 fire damage; push 2',
							tier2: '12 fire damage; push 3',
							tier3: '16 fire damage; push 5'
						}),
						effect: 'If the fireslinger’s mentor is within 10, the mentor can be the source of the burst instead of the fireslinger.'
					})
				})
			}
		})
	],
	addOns: []
};
