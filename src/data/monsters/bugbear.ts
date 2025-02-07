import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const bugbear: MonsterGroup = {
	id: 'monster-group-bugbear',
	name: 'bugbear',
	description: `
They are the Bu’gath in the Kheltic tongue, or the bearers of the great fear. The modern bugbears come from early goblins who first stepped into the wode centuries ago. Fae magic twisted their bodies until they grew imposingly tall and hairy while removing all sound from their footsteps.
Many bugbears go on to become legendary hunters and mercenaries. Many more become reclusive and hide their whole lives in the shadows. A rare few dive into their magic potential and become living nightmares that haunt the wode.`,
	information: [
		{
			id: 'bugbear-info-1',
			name: 'Thrown into the Fray',
			description: `
Bugbears seldom seek other civilizations for trade or allyship. They usually appear to defend their own homes or their neighbors' homes. This has given them a reputation of being covert, insurgent warriors, when in reality the bugbears fight to maintain their quiet solitude.
When bugbears are compelled to take action, they take to the high ground and use their powerful arms to throw anything they can down at the problem. This includes daggers, heavy iron balls, each other, and sometimes throwing the enemy at the enemy.`
		},
		{
			id: 'bugbear-info-2',
			name: 'Goblin Bond',
			description: 'Bugbears value their shared origin with goblins and hobgoblins despite the three branching apart so dramatically. They prefer goblinoid in circles where humanoid is used and it provides a sense of common ground when cloistered bugbears come out of isolation. It’s not uncommon to see bugbears work alongside groups of goblins or hobgoblins.'
		},
		{
			id: 'bugbear-info-3',
			name: 'Bu’gathic Magic',
			description: 'Most bugbears have a minor level over their inherent magic, enabling them to perform a trick or two. Dedicated bugbear channelers have learned to evoke it as powerful shadow and rot magic. These shamans can reshape the appearance of the world around them and temporarily alter their foes as defensive tactics, providing ample warning to offenders that they are capable of far worse if they push onward. Bu’gathic magic also enables bugbears to hide their settlements behind shadowy veils within canyons and impenetrable swamplands.'
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
				'The bugbear activates a malice feature available to goblins.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'bugbear-malice-2',
			name: 'Grab Iron Ball',
			cost: 3,
			repeatable: true,
			sections: [
				'For every 3 malice spent, one bugbear acting this turn grabs an iron ball. The iron ball can be thrown like a creature. A creature hit by the iron ball takes an additional 3 damage and is M<1 slowed (save ends).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'bugbear-malice-3',
			name: 'Grab Javelin',
			cost: 5,
			repeatable: true,
			sections: [
				'For every 5 malice spent, one bugbear acting this turn grabs a javelin. The javelin can be thrown like a creature. A creature hit by the javelin takes an additional 7 damage and is M<1 bleeding (save ends). While bleeding this way, an ally within 2 of the creature can use a free maneuver on their turn to pull the creature 2 squares.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'bugbear-malice-4',
			name: 'Show Them The Great Fear',
			cost: 10,
			sections: [
				'A bugbear infuses the battle map with bu’gathic magic. Until the end of the encounter, each bugbear and ally has their speed doubled, adds the Climb keyword to their speed, and inflicts I<1 frightened (save ends) on their strikes. Each aﬀected creature then moves up to their speed.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'bugbear-1',
			name: 'Bugbear Channeler',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Controller),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 30,
			speed: FactoryLogic.createSpeed(5),
			stamina: 200,
			stability: 2,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 1, -3, 1, -4),
			features: [
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-1',
					name: 'Soft Underbelly',
					description: 'A prone creature gains an edge on melee strikes against the bugbear instead of taking a bane.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-2',
						name: 'Bite',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '13 damage; grabbed',
							tier3: '16 damage; grabbed'
						}),
						effect: 'A size 1 target grabbed this way takes 3 acid damage at the start of each of their turns.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-3',
						name: 'Claws',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; A<1 grabbed',
							tier2: '11 damage; A<2 grabbed',
							tier3: '14 damage; A<3 grabbed'
						}),
						spend: [ {
							value:2,
							effect:'The bugbear can vertical slide each target up to 5 squares.'
						} ]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-4',
						name: 'Spitfire',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 5 })
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 acid damage',
							tier2: '8 acid damage',
							tier3: '11 acid damage'
						}),
						effect: 'The affected area is covered in burning acid. An enemy who enters an affected square for the first time on their turn or starts their turn there takes 2 acid damage. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability:FactoryLogic.createAbility({
						id: 'bugbear-1-feature-5',
						name: 'Earth Eruption',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 })
						],
						target: 'Each enemy in the burst',
						effect: 'The bugbear burrows up to their speed then creates the burst when they breach the surface.',
						powerRoll: FactoryLogic.createPowerRoll({
							tier1: '4 damage',
							tier2: '6 damage',
							tier3: '7 damage; push 2'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-6',
						name: 'Dust Cloud',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
						],
						target: 'Special',
						effect: 'The bugbear kicks up dust into the affected area that blocks line of effect for enemies. The bugbear then shifts or burrows up to their speed. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-7',
						name: 'Skitter',
						type: FactoryLogic.type.createTrigger('A creature damages the bugbear', false),
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Self, value: 0 })
						],
						target: 'Self',
						effect: 'The bugbear shifts up to 3 squares.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-8',
					name: 'Earthwalk',
					description: 'Difficult terrain composed of earth or loose rock doesn’t cost the bugbear extra movement.'
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-9',
					name: 'Tunneler',
					description: 'When the bugbear burrows, they create a size 2 tunnel. The tunnel remains stable for one day, then collapses. '
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-2',
			name: 'Bugbear Commander',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 30,
			speed: FactoryLogic.createSpeed(5),
			stamina: 200,
			stability: 2,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 1, -3, 1, -4),
			features: [
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-1',
					name: 'Soft Underbelly',
					description: 'A prone creature gains an edge on melee strikes against the bugbear instead of taking a bane.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-2',
						name: 'Bite',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '13 damage; grabbed',
							tier3: '16 damage; grabbed'
						}),
						effect: 'A size 1 target grabbed this way takes 3 acid damage at the start of each of their turns.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-3',
						name: 'Claws',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; A<1 grabbed',
							tier2: '11 damage; A<2 grabbed',
							tier3: '14 damage; A<3 grabbed'
						}),
						spend: [ {
							value:2,
							effect:'The bugbear can vertical slide each target up to 5 squares.'
						} ]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-4',
						name: 'Spitfire',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 5 })
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 acid damage',
							tier2: '8 acid damage',
							tier3: '11 acid damage'
						}),
						effect: 'The affected area is covered in burning acid. An enemy who enters an affected square for the first time on their turn or starts their turn there takes 2 acid damage. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability:FactoryLogic.createAbility({
						id: 'bugbear-1-feature-5',
						name: 'Earth Eruption',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 })
						],
						target: 'Each enemy in the burst',
						effect: 'The bugbear burrows up to their speed then creates the burst when they breach the surface.',
						powerRoll: FactoryLogic.createPowerRoll({
							tier1: '4 damage',
							tier2: '6 damage',
							tier3: '7 damage; push 2'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-6',
						name: 'Dust Cloud',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
						],
						target: 'Special',
						effect: 'The bugbear kicks up dust into the affected area that blocks line of effect for enemies. The bugbear then shifts or burrows up to their speed. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-7',
						name: 'Skitter',
						type: FactoryLogic.type.createTrigger('A creature damages the bugbear', false),
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Self, value: 0 })
						],
						target: 'Self',
						effect: 'The bugbear shifts up to 3 squares.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-8',
					name: 'Earthwalk',
					description: 'Difficult terrain composed of earth or loose rock doesn’t cost the bugbear extra movement.'
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-9',
					name: 'Tunneler',
					description: 'When the bugbear burrows, they create a size 2 tunnel. The tunnel remains stable for one day, then collapses. '
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-3',
			name: 'Bugbear Roughneck',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 30,
			speed: FactoryLogic.createSpeed(5),
			stamina: 200,
			stability: 2,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 1, -3, 1, -4),
			features: [
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-1',
					name: 'Soft Underbelly',
					description: 'A prone creature gains an edge on melee strikes against the bugbear instead of taking a bane.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-2',
						name: 'Bite',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '13 damage; grabbed',
							tier3: '16 damage; grabbed'
						}),
						effect: 'A size 1 target grabbed this way takes 3 acid damage at the start of each of their turns.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-3',
						name: 'Claws',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; A<1 grabbed',
							tier2: '11 damage; A<2 grabbed',
							tier3: '14 damage; A<3 grabbed'
						}),
						spend: [ {
							value:2,
							effect:'The bugbear can vertical slide each target up to 5 squares.'
						} ]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-4',
						name: 'Spitfire',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 5 })
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 acid damage',
							tier2: '8 acid damage',
							tier3: '11 acid damage'
						}),
						effect: 'The affected area is covered in burning acid. An enemy who enters an affected square for the first time on their turn or starts their turn there takes 2 acid damage. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability:FactoryLogic.createAbility({
						id: 'bugbear-1-feature-5',
						name: 'Earth Eruption',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 })
						],
						target: 'Each enemy in the burst',
						effect: 'The bugbear burrows up to their speed then creates the burst when they breach the surface.',
						powerRoll: FactoryLogic.createPowerRoll({
							tier1: '4 damage',
							tier2: '6 damage',
							tier3: '7 damage; push 2'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-6',
						name: 'Dust Cloud',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
						],
						target: 'Special',
						effect: 'The bugbear kicks up dust into the affected area that blocks line of effect for enemies. The bugbear then shifts or burrows up to their speed. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-7',
						name: 'Skitter',
						type: FactoryLogic.type.createTrigger('A creature damages the bugbear', false),
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Self, value: 0 })
						],
						target: 'Self',
						effect: 'The bugbear shifts up to 3 squares.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-8',
					name: 'Earthwalk',
					description: 'Difficult terrain composed of earth or loose rock doesn’t cost the bugbear extra movement.'
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-9',
					name: 'Tunneler',
					description: 'When the bugbear burrows, they create a size 2 tunnel. The tunnel remains stable for one day, then collapses. '
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-4',
			name: 'Bugbear Shadow Sneak',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 30,
			speed: FactoryLogic.createSpeed(5),
			stamina: 200,
			stability: 2,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 1, -3, 1, -4),
			features: [
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-1',
					name: 'Soft Underbelly',
					description: 'A prone creature gains an edge on melee strikes against the bugbear instead of taking a bane.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-2',
						name: 'Bite',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '13 damage; grabbed',
							tier3: '16 damage; grabbed'
						}),
						effect: 'A size 1 target grabbed this way takes 3 acid damage at the start of each of their turns.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-3',
						name: 'Claws',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; A<1 grabbed',
							tier2: '11 damage; A<2 grabbed',
							tier3: '14 damage; A<3 grabbed'
						}),
						spend: [ {
							value:2,
							effect:'The bugbear can vertical slide each target up to 5 squares.'
						} ]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-4',
						name: 'Spitfire',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 5 })
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 acid damage',
							tier2: '8 acid damage',
							tier3: '11 acid damage'
						}),
						effect: 'The affected area is covered in burning acid. An enemy who enters an affected square for the first time on their turn or starts their turn there takes 2 acid damage. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability:FactoryLogic.createAbility({
						id: 'bugbear-1-feature-5',
						name: 'Earth Eruption',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 })
						],
						target: 'Each enemy in the burst',
						effect: 'The bugbear burrows up to their speed then creates the burst when they breach the surface.',
						powerRoll: FactoryLogic.createPowerRoll({
							tier1: '4 damage',
							tier2: '6 damage',
							tier3: '7 damage; push 2'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-6',
						name: 'Dust Cloud',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
						],
						target: 'Special',
						effect: 'The bugbear kicks up dust into the affected area that blocks line of effect for enemies. The bugbear then shifts or burrows up to their speed. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-7',
						name: 'Skitter',
						type: FactoryLogic.type.createTrigger('A creature damages the bugbear', false),
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Self, value: 0 })
						],
						target: 'Self',
						effect: 'The bugbear shifts up to 3 squares.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-8',
					name: 'Earthwalk',
					description: 'Difficult terrain composed of earth or loose rock doesn’t cost the bugbear extra movement.'
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-9',
					name: 'Tunneler',
					description: 'When the bugbear burrows, they create a size 2 tunnel. The tunnel remains stable for one day, then collapses. '
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-5',
			name: 'Bugbear Knightmare',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 30,
			speed: FactoryLogic.createSpeed(5),
			stamina: 200,
			stability: 2,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 1, -3, 1, -4),
			features: [
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-1',
					name: 'Soft Underbelly',
					description: 'A prone creature gains an edge on melee strikes against the bugbear instead of taking a bane.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-2',
						name: 'Bite',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '13 damage; grabbed',
							tier3: '16 damage; grabbed'
						}),
						effect: 'A size 1 target grabbed this way takes 3 acid damage at the start of each of their turns.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-3',
						name: 'Claws',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; A<1 grabbed',
							tier2: '11 damage; A<2 grabbed',
							tier3: '14 damage; A<3 grabbed'
						}),
						spend: [ {
							value:2,
							effect:'The bugbear can vertical slide each target up to 5 squares.'
						} ]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-4',
						name: 'Spitfire',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 5 })
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 acid damage',
							tier2: '8 acid damage',
							tier3: '11 acid damage'
						}),
						effect: 'The affected area is covered in burning acid. An enemy who enters an affected square for the first time on their turn or starts their turn there takes 2 acid damage. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability:FactoryLogic.createAbility({
						id: 'bugbear-1-feature-5',
						name: 'Earth Eruption',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 })
						],
						target: 'Each enemy in the burst',
						effect: 'The bugbear burrows up to their speed then creates the burst when they breach the surface.',
						powerRoll: FactoryLogic.createPowerRoll({
							tier1: '4 damage',
							tier2: '6 damage',
							tier3: '7 damage; push 2'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-6',
						name: 'Dust Cloud',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
						],
						target: 'Special',
						effect: 'The bugbear kicks up dust into the affected area that blocks line of effect for enemies. The bugbear then shifts or burrows up to their speed. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-7',
						name: 'Skitter',
						type: FactoryLogic.type.createTrigger('A creature damages the bugbear', false),
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Self, value: 0 })
						],
						target: 'Self',
						effect: 'The bugbear shifts up to 3 squares.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-8',
					name: 'Earthwalk',
					description: 'Difficult terrain composed of earth or loose rock doesn’t cost the bugbear extra movement.'
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-9',
					name: 'Tunneler',
					description: 'When the bugbear burrows, they create a size 2 tunnel. The tunnel remains stable for one day, then collapses. '
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-6',
			name: 'Bugbear Mob',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 30,
			speed: FactoryLogic.createSpeed(5),
			stamina: 200,
			stability: 2,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 1, -3, 1, -4),
			features: [
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-1',
					name: 'Soft Underbelly',
					description: 'A prone creature gains an edge on melee strikes against the bugbear instead of taking a bane.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-2',
						name: 'Bite',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '13 damage; grabbed',
							tier3: '16 damage; grabbed'
						}),
						effect: 'A size 1 target grabbed this way takes 3 acid damage at the start of each of their turns.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-3',
						name: 'Claws',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; A<1 grabbed',
							tier2: '11 damage; A<2 grabbed',
							tier3: '14 damage; A<3 grabbed'
						}),
						spend: [ {
							value:2,
							effect:'The bugbear can vertical slide each target up to 5 squares.'
						} ]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-4',
						name: 'Spitfire',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 5 })
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 acid damage',
							tier2: '8 acid damage',
							tier3: '11 acid damage'
						}),
						effect: 'The affected area is covered in burning acid. An enemy who enters an affected square for the first time on their turn or starts their turn there takes 2 acid damage. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability:FactoryLogic.createAbility({
						id: 'bugbear-1-feature-5',
						name: 'Earth Eruption',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 })
						],
						target: 'Each enemy in the burst',
						effect: 'The bugbear burrows up to their speed then creates the burst when they breach the surface.',
						powerRoll: FactoryLogic.createPowerRoll({
							tier1: '4 damage',
							tier2: '6 damage',
							tier3: '7 damage; push 2'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-6',
						name: 'Dust Cloud',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
						],
						target: 'Special',
						effect: 'The bugbear kicks up dust into the affected area that blocks line of effect for enemies. The bugbear then shifts or burrows up to their speed. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-7',
						name: 'Skitter',
						type: FactoryLogic.type.createTrigger('A creature damages the bugbear', false),
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Self, value: 0 })
						],
						target: 'Self',
						effect: 'The bugbear shifts up to 3 squares.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-8',
					name: 'Earthwalk',
					description: 'Difficult terrain composed of earth or loose rock doesn’t cost the bugbear extra movement.'
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-9',
					name: 'Tunneler',
					description: 'When the bugbear burrows, they create a size 2 tunnel. The tunnel remains stable for one day, then collapses. '
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-7',
			name: 'Bugbear Snare',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Solo),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 30,
			speed: FactoryLogic.createSpeed(5),
			stamina: 200,
			stability: 2,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 1, -3, 1, -4),
			features: [
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-1',
					name: 'Soft Underbelly',
					description: 'A prone creature gains an edge on melee strikes against the bugbear instead of taking a bane.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-2',
						name: 'Bite',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '9 damage',
							tier2: '13 damage; grabbed',
							tier3: '16 damage; grabbed'
						}),
						effect: 'A size 1 target grabbed this way takes 3 acid damage at the start of each of their turns.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-3',
						name: 'Claws',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; A<1 grabbed',
							tier2: '11 damage; A<2 grabbed',
							tier3: '14 damage; A<3 grabbed'
						}),
						spend: [ {
							value:2,
							effect:'The bugbear can vertical slide each target up to 5 squares.'
						} ]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-4',
						name: 'Spitfire',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 5 })
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 acid damage',
							tier2: '8 acid damage',
							tier3: '11 acid damage'
						}),
						effect: 'The affected area is covered in burning acid. An enemy who enters an affected square for the first time on their turn or starts their turn there takes 2 acid damage. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability:FactoryLogic.createAbility({
						id: 'bugbear-1-feature-5',
						name: 'Earth Eruption',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 })
						],
						target: 'Each enemy in the burst',
						effect: 'The bugbear burrows up to their speed then creates the burst when they breach the surface.',
						powerRoll: FactoryLogic.createPowerRoll({
							tier1: '4 damage',
							tier2: '6 damage',
							tier3: '7 damage; push 2'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-6',
						name: 'Dust Cloud',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
						],
						target: 'Special',
						effect: 'The bugbear kicks up dust into the affected area that blocks line of effect for enemies. The bugbear then shifts or burrows up to their speed. '
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-7',
						name: 'Skitter',
						type: FactoryLogic.type.createTrigger('A creature damages the bugbear', false),
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Self, value: 0 })
						],
						target: 'Self',
						effect: 'The bugbear shifts up to 3 squares.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-8',
					name: 'Earthwalk',
					description: 'Difficult terrain composed of earth or loose rock doesn’t cost the bugbear extra movement.'
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-1-feature-9',
					name: 'Tunneler',
					description: 'When the bugbear burrows, they create a size 2 tunnel. The tunnel remains stable for one day, then collapses. '
				})
			]
		})
	]
};
