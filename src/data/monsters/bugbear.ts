import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const bugbear: MonsterGroup = {
	id: 'monster-group-bugbear',
	name: 'Bugbear',
	description: `
Bugbears are the bu’gath in the Khelt language, or “the bearers of the great fear.” Modern bugbears come from early goblins who first stepped into the wode centuries ago. Fey magic twisted their bodies, making them grow imposingly tall and hairy while removing all sound from their footsteps.

 Many bugbears become legendary hunters and mercenaries. Many more become reclusive and hide their whole lives in the shadows. A rare few dive into their magic potential and become living nightmares who haunt the wode.`,
	picture: null,
	information: [
		{
			id: 'bugbear-info-1',
			name: 'Thrown Into The Fray',
			description: `
Bugbears seldom seek the settlements of others for trade or allyship, and are known to tenaciously defend their own homes or their neighbors’ homes. This has given them a reputation of being covert, insurgent warriors, when in reality, bugbears simply fight to maintain their quiet solitude.

When bugbears are compelled to take action, they take to the high ground and use their powerful arms to throw anything they can down at the problem. This includes daggers, heavy iron balls, each other, and sometimes throwing the enemy at the enemy.`
		},
		{
			id: 'bugbear-info-2',
			name: 'Goblin Bond',
			description: 'Bugbears value their shared origin with goblins and hobgoblins despite the three lines branching apart so dramatically. They think of themselves as goblinoids first and humanoids second, with that relationship providing a sense of common ground when cloistered bugbears come out of isolation. '
		},
		{
			id: 'bugbear-info-3',
			name: 'Bu’gathic Magic',
			description: 'Most bugbears have some control over their inherent magic, enabling them to perform a trick or two. Dedicated bugbear channelers have learned to evoke powerful shadow and rot magic. These mages can reshape the appearance of the world around them and temporarily alter their foes as defensive tactics, providing ample warning to enemies that they are capable of far worse if those enemies push onward. Bu’gathic magic also enables bugbears to hide their settlements behind shadowy veils within canyons and impenetrable swamplands.'
		},
		{
			id: 'bugbear-info-4',
			name: 'Bugbear Languages',
			description: 'Most bugbears speak Caelian, Khelt, and Szetch.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'bugbear-malice-1',
			name: 'Goblin Malice Features',
			cost: 1,
			repeatable: true,
			sections: [
				'The bugbear activates a Malice Feature available to goblins.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'bugbear-malice-2',
			name: 'Grab Iron Ball',
			cost: 3,
			repeatable: true,
			sections: [
				'For every 3 Malice spent, one non-minion bugbear acting this turn grabs an iron ball and can use a maneuver to throw it at a creature within 5 squares of them. The creature takes damage equal to  8 – the number of squares the iron ball was thrown, and if they have M<1, they are slowed (save ends).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'bugbear-malice-3',
			name: 'Grab Javelin',
			cost: 5,
			repeatable: true,
			sections: [
				' For every 5 Malice spent, one non-minion bugbear acting this turn grabs a javelin and can use a maneuver to throw it at a creature within 5 squares of them. The creature takes damage equal to  12 – the number of squares the javelin was thrown, and if they have M<1, they are bleeding (save ends). While a creature is bleeding this way, any ally of the bugbear within 2 squares of them can use a free maneuver to pull the bleeding creature up to 2 squares.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'bugbear-malice-4',
			name: 'Show Them the Great Fear',
			cost: 10,
			sections: [
				' A bugbear infuses the encounter map with bu’gathic magic. Until the end of the encounter, all bugbears and allies have their speed doubled and can automatically climb at full speed while moving. Additionally, if the target of any bugbear or ally’s strike has I<1, the target is also frightened (save ends) and must move their speed in a straight line away from the creature who made the strike.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'bugbear-1',
			name: 'Bugbear Channeler',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 16,
			speed: FactoryLogic.createSpeed(5),
			stamina: 60,
			stability: 0,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 1, 2, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-1',
						name: 'Shadow Drag',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'Two creatures or objects on the ground',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage; pull 2',
								tier2: '10 damage; pull 3',
								tier3: '13 damage; pull 4'
							})),
							FactoryLogic.createAbilitySectionText('Each target must be on the ground, and each square a target is pulled through is difficult terrain for enemies.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-2',
						name: 'Blistering Element',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage; M<0 bleeding (save ends)',
								tier2: '3 damage; M<1 bleeding (save ends)',
								tier3: '4 damage; M<2 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The channeler chooses one of the following damage types for the damage: acid, cold, corruption, fire, or poison.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-3',
						name: 'Twist Shape',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 corruption damage; P<0 slowed (save ends)',
								tier2: '8 corruption damage; P<1 the target is shapechanged (save ends)',
								tier3: '11 corruption damage; P<2 the target is shapechanged (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A shapechanged creature is slowed and has fire weakness 10 as their limbs stretch and their skin becomes paper thin.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-4',
						name: 'Throw',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('*Special*: The target must be grabbed by the channeler.'),
							FactoryLogic.createAbilitySectionText('The target is vertical pushed up to 3 squares. An ally doesn’t take damage from being force moved this way.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-5',
						name: 'Catcher',
						type: FactoryLogic.type.createTrigger('A size 1 creature or object is force moved within distance, or a size 1 ally willingly moves within distance.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is grabbed by the channeler.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-6',
						name: 'Shadow Veil',
						type: FactoryLogic.type.createTrigger('An ally within distance takes damage.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'The triggering ally',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('The target is wrapped in shadow and halves the damage. The target can’t be targeted by strikes until the start of their next turn.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-2',
			name: 'Bugbear Commander',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Support),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 16,
			speed: FactoryLogic.createSpeed(5),
			stamina: 80,
			stability: 0,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 2, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-2-feature-1',
						name: 'Inspiring Swordplay',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage',
								tier2: '10 damage',
								tier3: '13 damage; one target is grabbed'
							})),
							FactoryLogic.createAbilitySectionText('One ally within 5 squares of the commander gains an edge on their next strike until the start of the commander’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-2-feature-2',
						name: 'You Next!',
						type: FactoryLogic.type.createMain(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target moves up to their speed and uses a signature action.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-2-feature-3',
						name: 'Fall Back!',
						type: FactoryLogic.type.createMain(),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each ally in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target shifts up to their speed, then can use the Throw maneuver.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-2-feature-4',
						name: 'Throw',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('*Special*: The target must be grabbed by the commander.'),
							FactoryLogic.createAbilitySectionText('The target is vertical pushed up to 4 squares. An ally doesn’t take damage from being force moved this way.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-2-feature-5',
						name: 'Catcher',
						type: FactoryLogic.type.createTrigger('A size 1 creature or object is force moved within distance, or a size 1 ally willingly moves within distance.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is grabbed by the commander.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-2-feature-6',
					name: 'The Commander’s Watching',
					description: 'Any ally who has line of effect to the commander can end one condition on themself at the start of each of their turns.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-3',
			name: 'Bugbear Roughneck',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 16,
			speed: FactoryLogic.createSpeed(6),
			stamina: 109,
			stability: 0,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-3-feature-1',
						name: 'Haymaker',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage',
								tier2: '11 damage; one target is grabbed; one target is pushed up to 2 squares',
								tier3: '14 damage; one target is grabbed; one target is vertical pushed up to 3 squares'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 5,
								effect: 'The ability takes the Area keyword and loses the Strike keyword, its distance becomes a 1 burst, and it targets each enemy in the area.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-3-feature-2',
						name: 'Leaping Fury',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '8 damage; M<1 prone',
								tier2: '13 damage; M<2 prone',
								tier3: '16 damage; M<3 prone'
							})),
							FactoryLogic.createAbilitySectionText('The roughneck can jump up to 5 squares to an unoccupied space within distance of the target before making this strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-3-feature-3',
						name: 'Drag Through Hell',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('*Special*: The target must be grabbed by the roughneck.'),
							FactoryLogic.createAbilitySectionText('The roughneck moves up to their speed across the ground, dragging the target with them. The target takes 2 damage for each square they were dragged through. When this movement ends, the target is no longer grabbed and falls prone. Each square the target was dragged through is difficult terrain for enemies.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-3-feature-4',
						name: 'Throw',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('*Special*: The target must be grabbed by the roughneck.'),
							FactoryLogic.createAbilitySectionText('The target is vertical pushed up to 5 squares. An ally doesn’t take damage from being force moved this way.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-3-feature-5',
						name: 'Catcher',
						type: FactoryLogic.type.createTrigger('A size 1 creature or object is force moved within distance, or a size 1 ally willingly moves within distance.', { free: true }),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is grabbed by the roughneck.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-3-feature-6',
						name: 'Flying Sawblade',
						type: FactoryLogic.type.createTrigger('The roughneck is vertical force moved by another creature.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The roughneck uses Haymaker against a creature or object at any point during the forced movement, or after falling as a result of it.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-4',
			name: 'Bugbear Sneak',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Ambusher),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 16,
			speed: FactoryLogic.createSpeed(7),
			stamina: 80,
			stability: 0,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-4-feature-1',
						name: 'Sucker Punch',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '8 damage; A<1 grabbed',
								tier2: '13 damage; A<2 grabbed',
								tier3: '16 damage; grabbed'
							})),
							FactoryLogic.createAbilitySectionText('The target can’t use triggered actions until the start of the next round. Additionally, if the sneak started their turn hidden from the target, this ability deals an extra 4 damage. ')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-4-feature-2',
						name: 'Shadow Cloak',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage; I<0 the sneak has concealment from the target (save ends)',
								tier2: '3 damage; I<1 the sneak has concealment from the target (save ends)',
								tier3: '4 damage; I<2 the sneak has concealment from the target (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The sneak shifts up to their speed and can attempt to hide.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-4-feature-3',
						name: 'Carving Dagger',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage; M<0 bleeding (save ends)',
								tier2: '11 damage; M<1 bleeding (save ends)',
								tier3: '14 damage; M<2 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('While bleeding this way, the target can’t hide from the sneak or their allies.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-4-feature-4',
						name: 'Throw',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('*Special*: The target must be grabbed by the sneak.'),
							FactoryLogic.createAbilitySectionText('The target is vertical pushed up to 4 squares. An ally doesn’t take damage from being force moved this way')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-4-feature-5',
						name: 'Catcher',
						type: FactoryLogic.type.createTrigger('A size 1 creature or object is force moved within distance, or a size 1 ally willingly moves within distance.', { free: true }),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is grabbed by the sneak.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-4-feature-6',
						name: 'Clever Trick',
						type: FactoryLogic.type.createTrigger('The sneak is targeted by a strike.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One enemy',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('The sneak chooses one enemy within distance of the strike to become the target of the strike.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-5',
			name: 'Bugbear Knightmare',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 10,
			speed: FactoryLogic.createSpeed(5),
			stamina: 12,
			stability: 2,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(4, 3, 1, 1, 4),
			withCaptain: 'Gain an edge on strikes',
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-5-feature-1',
						name: 'Corrosive Blade',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '3 corruption damage',
								tier2: '6 corruption damage; P<3 bleeding (save ends)',
								tier3: '8 corruption damage; grabbed; P<4 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A target grabbed this way or already grabbed by the knightmare can be vertical pushed up to 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-5-feature-2',
					name: 'Bu’gathic Inspiration',
					description: 'Any ally has a +1 bonus to power rolls, saving throws, or damage rolled as a d6 or a d3 for each knightmare adjacent to them. '
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-5-feature-3',
					name: 'Magic Terror',
					description: 'Each enemy has a −1 penalty to power rolls, saving throws, or damage rolled as a d6 or a d3 for each knightmare adjacent to them.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-6',
			name: 'Bugbear Mob',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 7,
			speed: FactoryLogic.createSpeed(6),
			stamina: 10,
			stability: 2,
			size: FactoryLogic.createSize(3),
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(3, -1, 0, 1, 0),
			withCaptain: '+2 damage bonus to strikes',
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-6-feature-1',
						name: 'Mug and Tear',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 damage; pull 2',
								tier2: '6 damage; pull 3',
								tier3: '7 damage; pull 4; grabbed'
							})),
							FactoryLogic.createAbilitySectionText('If the target is pulled into the mob, that forced movement deals damage only at the Director’s determination.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-6-feature-2',
					name: 'Swarm',
					description: 'The mob can move through spaces as if they were a size 1L creature, and can occupy other creatures’ spaces. At the start of each of the mob’s turns, they can make a free strike against each creature whose space they share.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-7',
			name: 'Bugbear Snare',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 7,
			speed: FactoryLogic.createSpeed(6),
			stamina: 9,
			stability: 2,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 3, 0, 0, 1),
			withCaptain: '+3 bonus to speed',
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-7-feature-1',
						name: 'Cut Em Low!',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 damage',
								tier2: '6 damage',
								tier3: '7 damage; A<3 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If the snare started their turn hidden from the target, the target is automatically grabbed. A target grabbed this way or already grabbed by the snare can be vertical pushed up to 4 squares.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
