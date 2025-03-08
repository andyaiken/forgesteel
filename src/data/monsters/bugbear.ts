import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const bugbear: MonsterGroup = {
	id: 'monster-group-bugbear',
	name: 'Bugbear',
	description: `
They are the *Bu’gath* in the Kheltic tongue, or the bearers of the great fear. The modern bugbears come from early goblins who first stepped into the wode centuries ago. Fae magic twisted their bodies until they grew imposingly tall and hairy while removing all sound from their footsteps.

Many bugbears go on to become legendary hunters and mercenaries. Many more become reclusive and hide their whole lives in the shadows. A rare few dive into their magic potential and become living nightmares that haunt the wode.`,
	information: [
		{
			id: 'bugbear-info-1',
			name: 'Thrown Into The Fray',
			description: `
Bugbears seldom seek other civilizations for trade or allyship. They usually appear to defend their own homes or their neighbors' homes. This has given them a reputation of being covert, insurgent warriors, when in reality the bugbears fight to maintain their quiet solitude.

When bugbears are compelled to take action, they take to the high ground and use their powerful arms to throw anything they can down at the problem. This includes daggers, heavy iron balls, each other, and sometimes throwing the enemy *at* the enemy.`
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
			name: 'Show Them the Great Fear',
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
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: '2 creatures or objects on the ground',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage; pull 2',
							tier2: '10 damage; pull 3',
							tier3: '13 damage; pull 4'
						}),
						effect: 'Each square that a target is pulled through becomes difficult terrain for enemies.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-2',
						name: 'Blistering Element',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage; M<0 bleeding (save ends)',
							tier2: '3 damage; M<1 bleeding (save ends)',
							tier3: '4 damage; M<2 bleeding (save ends)'
						}),
						effect: 'The channeler chooses one of the following damage types for the damage: acid, cold, corruption, fire, or poison.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-3',
						name: 'Twist Shape',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 creature',
						cost: 5,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 corruption damage; P<0 slowed (save ends)',
							tier2: '8 corruption damage; P<1 shapechanged (save ends)',
							tier3: '11 corruption damage; P<2 shapechanged (save ends)'
						}),
						effect: 'A shapechanged creature has their limbs violently stretched and their skin becomes paper thin. They are slowed and have fire weakness 10 while they have this effect.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-4',
						name: 'Throw',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object grabbed by the channeler',
						effect: 'Vertical push 3. An ally target doesn’t take damage from being force moved.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-5',
						name: 'Catcher',
						type: FactoryLogic.type.createTrigger('The target is force moved into a square adjacent to the channeler.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 size 1 creature or object',
						effect: 'The target is grabbed by the channeler.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-1-feature-6',
						name: 'Shadow Veil',
						type: FactoryLogic.type.createTrigger('The target takes damage.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 ally',
						cost: 1,
						effect: 'The channeler collapses the target into their shadow and halves the damage. The target can’t be targeted by strikes until they reform from the shadows at the start of their next turn.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-2',
			name: 'Bugbear Commander',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Support),
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
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '10 damage',
							tier3: '13 damage; one target is grabbed'
						}),
						effect: '1 ally within 5 of the commander has an edge on their next attack until the start of the commander’s next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-2-feature-2',
						name: 'You Next!',
						type: FactoryLogic.type.createAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: '1 ally',
						effect: 'The target moves up to their speed and uses a signature action.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-2-feature-3',
						name: 'Fall Back!',
						type: FactoryLogic.type.createAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Self and all allies',
						cost: 5,
						effect: 'Each target shifts up to their speed. Each target can use the Throw maneuver if they are grabbing a creature or object.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-2-feature-4',
						name: 'Throw',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object grabbed by the commander',
						effect: 'Vertical push 4. An ally target doesn’t take damage from being force moved.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-2-feature-5',
						name: 'Catcher',
						type: FactoryLogic.type.createTrigger('The target is force moved into a square adjacent to the commander.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 size 1 creature or object',
						effect: 'The target is grabbed by the commander.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-2-feature-6',
					name: 'The Commander’s Watching',
					description: 'While an ally has line of eﬀect to the commander, the ally can end one condition aﬄicting them at the start of their turn.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-3',
			name: 'Bugbear Roughneck',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
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
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '11 damage; one target is grabbed; one target is pushed 2',
							tier3: '14 damage; one target is grabbed; one target is vertically pushed 3'
						}),
						spend: [
							{
								value: 5,
								effect: 'The distance becomes 1 Burst, the Strike keyword is replaced with Area, and the roughneck targets all enemies instead.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-3-feature-2',
						name: 'Leaping Fury',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; M<1 prone',
							tier2: '13 damage; M<2 prone',
							tier3: '16 damage; M<3 prone'
						}),
						effect: 'The roughneck leaps 5 to an unoccupied space adjacent to the target before making the attack.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-3-feature-3',
						name: 'Drag Through Hell',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object grabbed by the roughneck',
						cost: 3,
						effect: 'The roughneck moves up to their speed, dragging the target across the ground. The target takes 2 damage for each square they were dragged through before being released prone. Each square the target was dragged through becomes difficult terrain for enemies.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-3-feature-4',
						name: 'Throw',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object grabbed by the roughneck',
						effect: 'Vertical push 5. An ally target doesn’t take damage from being force moved.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-3-feature-5',
						name: 'Catcher',
						type: FactoryLogic.type.createTrigger('The target is force moved into a square adjacent to the roughneck.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 size 1 creature or object',
						effect: 'The target is grabbed by the roughneck.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-3-feature-6',
						name: 'Flying Sawblade',
						type: FactoryLogic.type.createTrigger('The roughneck is vertically moved by another creature.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The roughneck uses their Haymaker ability against a creature or object at the end of the movement.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-4',
			name: 'Bugbear Shadow Sneak',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Ambusher),
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
						name: 'Shadow Drag',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: '2 creatures or objects on the ground',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '8 damage; A<1 grabbed',
							tier2: '13 damage; A<2 grabbed',
							tier3: '16 damage; grabbed'
						}),
						effect: 'The target can’t use triggered actions until the start of the next round. This ability deals an additional 4 damage if the sneak started their turn hidden from the target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-4-feature-2',
						name: 'Shadow Cloak',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies in the burst',
						cost: 3,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage; I<0 sneak is concealed from the target (save ends)',
							tier2: '3 damage; I<1 sneak is concealed from the target (save ends)',
							tier3: '4 damage; I<2 sneak is concealed from the target (save ends)'
						}),
						effect: 'The sneak shifts up to their speed and hides after using this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-4-feature-3',
						name: 'Carving Dagger',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: '2 creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage; M<0 bleeding (save ends)',
							tier2: '11 damage; M<1 bleeding (save ends)',
							tier3: '14 damage; M<2 bleeding (save ends)'
						}),
						effect: 'The target can’t hide from the sneak or their allies while bleeding from this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-4-feature-4',
						name: 'Throw',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object grabbed by the sneak',
						effect: 'Vertical push 4. An ally target doesn’t take damage from being force moved.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-4-feature-5',
						name: 'Catcher',
						type: FactoryLogic.type.createTrigger('The target is force moved into a square adjacent to the sneak.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 size 1 creature or object',
						effect: 'The target is grabbed by the sneak.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-4-feature-6',
						name: 'Clever Trick',
						type: FactoryLogic.type.createTrigger('A target attacks the sneak.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 enemy',
						cost: 1,
						effect: 'The sneak chooses an enemy within distance of the attack. The attack targets that enemy instead.'
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
			encounterValue: 20,
			speed: FactoryLogic.createSpeed(5),
			stamina: 12,
			stability: 2,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(4, 3, 1, 1, 4),
			withCaptain: 'Edge on strikes',
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-5-feature-1',
						name: 'Corrosive Blade',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '3 corruption damage',
							tier2: '6 corruption damage; P<3 bleeding (save ends)',
							tier3: '8 corruption damage; grabbed; P<4 bleeding (save ends)'
						}),
						effect: 'A target grabbed by the knightmare can be immediately vertically pushed 5.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-5-feature-2',
					name: 'Bu’gathic Inspiration',
					description: 'Each ally has +1 on dice rolls for each adjacent knightmare.'
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-5-feature-3',
					name: 'Magic Terror',
					description: 'Each enemy has -1 to dice rolls for each adjacent knightmare.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-6',
			name: 'Bugbear Mob',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey', 'Swarm' ],
			encounterValue: 14,
			speed: FactoryLogic.createSpeed(6),
			stamina: 10,
			stability: 2,
			size: FactoryLogic.createSize(3),
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(3, -1, 0, 1, 0),
			withCaptain: 'Strike damage +2',
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-6-feature-1',
						name: 'Mug and Tear',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage; pull 2',
							tier2: '6 damage; pull 3',
							tier3: '7 damage; pull 4; grabbed'
						}),
						effect: 'The target can be pulled into the mob without inflicting damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'bugbear-6-feature-2',
					name: 'Swarm',
					description: 'The mob can move through squares as if they were size-1M, and can occupy other creatures’ spaces. At the start of the mob’s turn, they can make a free strike against each creature they share a square with.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-7',
			name: 'Bugbear Snare',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 14,
			speed: FactoryLogic.createSpeed(6),
			stamina: 9,
			stability: 2,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 3, 0, 0, 1),
			withCaptain: 'Speed +3',
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-7-feature-1',
						name: 'Cut Em Low!',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '3 damage',
							tier2: '6 damage',
							tier3: '7 damage; A<3 slowed (save ends)'
						}),
						effect: 'The target is grabbed if the snare started their turn hidden from them. A target grabbed by the snare can be immediately vertically pushed 4.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'bugbear-8',
			name: 'Bugbear Commando',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Ambusher),
			keywords: [ 'Bugbear', 'Goblin', 'Humanoid', 'Fey' ],
			encounterValue: 17,
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 0,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-8-feature-1',
						name: 'Bear Hug',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '5 damage',
							tier2: '8 damage',
							tier3: '11 damage'
						}),
						effect: 'Gain a surge if the commando started their turn concealed or hidden from the target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-8-feature-2',
						name: 'Throw',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object grabbed by the commando',
						effect: 'Vertical push 5. An ally target doesn’t take damage from being force moved.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-8-feature-3',
						name: 'Catcher',
						type: FactoryLogic.type.createTrigger('The target is force moved into a square adjacent to the commando.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 size 1 creature or object',
						effect: 'The target is grabbed by the commando.'
					})
				})
			],
			retainer: {
				level4: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-8-retainer-4',
						name: 'Face Grab',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '6 damage; M (weak) grabbed',
							tier2: '9 damage; M (average) grabbed',
							tier3: '13 damage; M (strong) grabbed'
						}),
						effect: 'While the target is grabbed by this ability, they can’t speak and every creature and object has concealment from them.'
					})
				}),
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-8-retainer-7',
						name: 'Shadow Drag',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: 'pulled 8',
							tier2: 'pulled 10',
							tier3: 'pulled 12'
						}),
						effect: 'The target takes 1 damage for each square they are pulled.'
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'bugbear-8-retainer-10',
						name: 'Neck Snap',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature grabbed by the commando',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '12 damage',
							tier2: '18 damage',
							tier3: '24 damage'
						}),
						effect: 'The target takes 15 damage, the grab ends, and the target falls prone.'
					})
				})
			}
		})
	],
	addOns: []
};
