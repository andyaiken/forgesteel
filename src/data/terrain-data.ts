import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { FactoryLogic } from '../logic/factory-logic';
import { MonsterRoleType } from '../enums/monster-role-type';
import { Terrain } from '../models/terrain';
import { TerrainCategory } from '../enums/terrain-category';
import { TerrainRoleType } from '../enums/terrain-role-type';

export class TerrainData {
	//#region Environmental Hazards

	static angryBeehive: Terrain = {
		id: 'terrain-angry-beehive',
		name: 'Angry Beehive',
		description: 'A beehive full of angry bees that will swarm and attack with little provocation.',
		category: TerrainCategory.Environmental,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
		encounterValue: 2,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 3,
			perSquare: 0
		},
		size: '1S',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Cannot be disabled, if the beehive is attacked or destroyed, it will unleash the swarm of bees.'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature moves into the hive or an adjacent square without shifting.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The hive is removed and a swarm is placed on the square of the triggering creature. Any creature who begins their turn in the same space as the swarm takes 3 poison damage. At the start of each round, the swarm spreads to a random adjacent square preferring squares that contain a creature. After 3 rounds the swarm dissipates.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'concealed-beehive',
				label: 'Concealed Beehive',
				cost: 1,
				text: 'The hive is hidden until the swarm is unleashed.',
				sections: []
			},
			{
				id: 'killer-bees',
				label: 'Killer Bees',
				cost: 1,
				text: 'The bees are a particularly aggressive and dangerous species. The hive triggers even if a creature shifts adjacent to the hive. The swarm also deals +1D6 poison damage.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	static brambles: Terrain = {
		id: 'terrain-brambles',
		name: 'Brambles',
		description: 'A thicket of vines with sharp thorns.',
		category: TerrainCategory.Environmental,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Defender, TerrainRoleType.Fortification),
		encounterValue: 1,
		area: '10x10',
		direction: '',
		link: '',
		stamina: {
			base: 0,
			perSquare: 3
		},
		size: '1 or more squares of difficult terrain',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Only through destruction of each square of brambles.'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature moves into a brambles square without shifting.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature takes 1 damage per square of brambles they move through.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'poisonous-thorns',
				label: 'Poisonous Thorns',
				cost: 1,
				text: 'The brambles are poisonous. A creature who takes damage from a square gains bleeding (save ends).',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	static corrosivePool: Terrain = {
		id: 'terrain-corrosive-pool',
		name: 'Corrosive Pool',
		description: 'A shallow pool of acid or other corrosive liquid.',
		category: TerrainCategory.Environmental,
		level: 2,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
		encounterValue: 3,
		area: '10x10',
		direction: '',
		link: '',
		stamina: {
			base: 12,
			perSquare: 0
		},
		size: '1 or more squares of difficult terrain',
		damageMods: [],
		sections: [
			{
				id: 'damage-immunity',
				content: [
					FactoryLogic.feature.create({
						id: 'damage-immunity',
						name: 'Damage Immunity',
						description: 'Immunity 5 to all non-fire or non-cold damage.'
					})
				]
			},
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Only through destruction.'
					})
				]
			},
			{
				id: 'trigger-effect-1',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature begins their turn in or moves through a square of the corrosive pool.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The creature takes 3 acid damage starting their turn in the pool and for each square of the pool they move through.'
					})
				]
			},
			{
				id: 'trigger-effect-2',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'The liquid in the pool is highly volatile. When the pool takes any fire damage the pool uses the Explosive Reaction ability and is consumed.'
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'effect-explosive-reaction',
							name: 'Explosive Reaction',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Area ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
							target: 'All creatures and objects',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 fire damage; M<1 burning (save ends)',
								tier2: '6 fire damage; M<2 burning (save ends)',
								tier3: '9 fire damage; M<3 burning (save ends)'
							}),
							effect: 'A burning creature or object takes 1D6 fire damage at the start of each of their turns until the effect ends. Creatures or objects on a pool square are also targeted with a double edge. Creatures or objects with acid weakness take extra damage from this attack and burning effect as if it was acid.'
						})
					})
				]
			},
			{
				id: 'awareness',
				content: [
					FactoryLogic.feature.create({
						id: 'allied-awareness',
						name: 'Allied Awareness',
						description: 'When you use this object, allies with weapons are equipped with torches. An ally can use a maneuver to throw a torch up to 5 squares and ignite the corrosive pool.'
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	static frozenPond: Terrain = {
		id: 'terrain-frozen-pond',
		name: 'Frozen Pond',
		description: 'A shallow, frozen patch of water. The ice is thick enough that it won’t break but the surface is slick and treacherous to navigate.',
		category: TerrainCategory.Environmental,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
		encounterValue: 1,
		area: '10x10',
		direction: '',
		link: '',
		stamina: {
			base: 0,
			perSquare: 3
		},
		size: '1 or more squares of difficult terrain',
		damageMods: [],
		sections: [
			{
				id: 'damage-immunity',
				content: [
					FactoryLogic.feature.create({
						id: 'damage-immunity',
						name: 'Damage Immunity',
						description: 'Immunity 5 to all non-fire damage.'
					})
				]
			},
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Destroying a square of the frozen pond turns the square into icy water.'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature moves into a pond’s square without shifting.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature’s movement ends and they suffer the Slippery Surface ability.'
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'effect-slippery-surface',
							name: 'Slippery Surface',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'push 1 the direction target was moving',
								tier2: 'push 2 the direction target was moving; A<1 slowed (save ends)',
								tier3: 'push 3 the direction the target was moving; A<2 prone (save ends)'
							}),
							effect: 'If the target triggered this ability by being force moved, this ability has an edge and adds the remaining force movement distance to the push value. Forced movement from this ability does not retrigger Frozen Pond.'
						})
					})
				]
			}
		],
		upgrades: [
			{
				id: 'thin-ice',
				label: 'Thin Ice',
				cost: 1,
				text: 'The ice covering the pond is thin and the water is a little deeper.',
				sections: [
					{
						id: 'thin-ice',
						content: [
							FactoryLogic.feature.create({
								id: 'trigger',
								name: 'Trigger',
								description: 'A creature enters a square of icy water or becomes prone on a square of frozen pond with the thin ice upgrade.'
							}),
							FactoryLogic.feature.create({
								id: 'effect',
								name: 'Effect',
								description: 'The square of frozen pond is destroyed and replaced with icy water. The triggering creature’s movement ends and they suffer the Icy Water ability.'
							}),
							FactoryLogic.feature.create({
								id: 'swimming',
								name: 'Swimming Under the Ice',
								description: 'If the Director rules the water is deep enough, creatures can swim under squares of frozen pond. Normal swimming rules apply, and the creature takes 1 cold damage at the beginning of each of their turns in the cold water under the frozen pond.'
							}),
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'effect-icy-water',
									name: 'Icy Water',
									type: FactoryLogic.type.createTrigger(''),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: '1 creature or object',
									powerRoll: FactoryLogic.createPowerRoll({
										bonus: 2,
										tier1: 'slide 1',
										tier2: '1 cold damage; slowed (EoT)',
										tier3: '3 cold damage; restrained (save ends)'
									})
								})
							})
						]
					}
				]
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	static lava: Terrain = {
		id: 'terrain-lava',
		name: 'Lava',
		description: 'A patch of liquid hot magma welling up from a crack in the ground. Not only dangerous to those who are unfortunate enough to step into it but to anyone who gets close to it.',
		category: TerrainCategory.Environmental,
		level: 3,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
		encounterValue: 4,
		area: '10x10',
		direction: '',
		link: '',
		stamina: {
			base: 0,
			perSquare: 12
		},
		size: '1 or more squares of difficult terrain',
		damageMods: [],
		sections: [
			{
				id: 'damage-immunity',
				content: [
					FactoryLogic.feature.create({
						id: 'damage-immunity',
						name: 'Damage Immunity',
						description: 'Immunity 5 to all non-cold damage.'
					})
				]
			},
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Only through destruction of each square of Lava.'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature begins their turn in a square of lava, adjacent to a square of lava, or moves through at least one square of lava.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature suffers the Liquid Hot Magma ability.'
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'effect-liquid-hot-magma',
							name: 'Liquid Hot Magma',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 fire damage; M<1 burning (save ends)',
								tier2: '9 fire damage; M<2 burning (save ends)',
								tier3: '12 fire damage; M<3 burning (save ends)'
							}),
							effect: 'A burning creature or object takes 1D6 fire damage at the start of each of their turns until the effect ends. This ability has a bane if the target is adjacent to a square of lava and not in or moving through lava.'
						})
					})
				]
			}
		],
		upgrades: [
			{
				id: 'magma-flow',
				label: 'Magma Flow',
				cost: 4,
				text: 'The lava is flowing! At the beginning of each round of combat add one square of lava adjacent to an existing square of lava.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	static quicksand: Terrain = {
		id: 'terrain-quicksand',
		name: 'Quicksand',
		description: 'A patch of sand saturated by water. It appears to be a normal patch of sand until it is stepped on.',
		category: TerrainCategory.Environmental,
		level: 3,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
		encounterValue: 3,
		area: '10x10',
		direction: '',
		link: '',
		stamina: {
			base: 0,
			perSquare: 0
		},
		size: '1 or more squares of terrain',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'May not be disabled.'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature moves through a square of quicksand or begins their turn in a square of quicksand.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature suffers the Grasping Depths ability.'
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'effect-grasping-depths',
							name: 'Grasping Depths',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'M<0 slowed (save ends)',
								tier2: 'M<1 restrained (save ends)',
								tier3: 'M<2 restrained (save ends)'
							}),
							effect: 'This ability has a bane if the target triggered it by shifting into a square of quicksand. A character who started their turn restrained in a quicksand square begins to suffocate. You can hold your breath for a number of rounds equal to your Might score (minimum 1 round). At the end of each round after that, you take 1d6 damage while holding your breath.'
						})
					})
				]
			},
			{
				id: 'hidden',
				content: [
					FactoryLogic.feature.create({
						id: 'hidden',
						name: 'Hidden',
						description: 'The quicksand begins the encounter hidden.'
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	static toxicPlants: Terrain = {
		id: 'terrain-toxic-plants',
		name: 'Toxic Plants',
		description: 'A field of colorful mushrooms or lovely flowering plants that releases a cloud of spores when they are disturbed. Breathing in the spores will cause the victim to fall into a deep slumber.',
		category: TerrainCategory.Environmental,
		level: 2,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
		encounterValue: 2,
		area: '10x10',
		direction: '',
		link: '',
		stamina: {
			base: 0,
			perSquare: 3
		},
		size: '1 or more squares of terrain',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Only through destruction of each square of toxic plants.'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature begins their turn in a square of toxic plants, or moves into at least one square of toxic plants without shifting.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature suffers the Sleep Spores ability.'
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'effect-sleep-spores',
							name: 'Sleep Spores',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'M<0 dazed (save ends)',
								tier2: 'M<1 dazed (save ends)',
								tier3: 'M<2 dazed (save ends)'
							}),
							effect: 'The spores begin to put the target into a deep slumber. A target who starts their turn dazed in a toxic plants square gets sluggish and drowsier and becomes prone while dazed and cannot stand until the dazed effect ends.'
						})
					})
				]
			}
		],
		upgrades: [
			{
				id: 'poisonous-spores',
				label: 'Poisonous Spores',
				cost: 2,
				text: 'The spores are also poisonous. Creatures that begin their turn dazed by this hazard take 1d6 poison damage.',
				sections: []
			},
			{
				id: 'carnivorous-plants',
				label: 'Carnivorous Plants',
				cost: 2,
				text: 'The plants are carnivorous and will try to slowly digest anyone who was unfortunate enough to lay among them. Anyone who is prone in a toxic plants square will take 4 acid damage at the beginning of their turn.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	//#endregion

	//#region Fieldwork

	// Archer's Stakes
	static archersStakes: Terrain = {
		id: 'terrain-archers-stakes',
		name: 'Archer\'s Stakes',
		description: 'A series of sharp stakes have been placed into a palisade to protect defenders against charges and other attacks. The stakes point in one direction, towards the front of the object.',
		category: TerrainCategory.Fieldwork,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Defender, TerrainRoleType.Fortification),
		encounterValue: 1,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 0,
			perSquare: 3
		},
		size: '1 or more squares of difficult terrain, generally 4x1',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Only through destruction of each square of stakes.'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature moves into a square of stakes.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature takes 2 damage per square of stakes they move through and an additional 3 damage if the movement is forced movement.'
					})
				]
			},
			{
				id: 'allied-awareness',
				content: [
					FactoryLogic.feature.create({
						id: 'allied-awareness',
						name: 'Allied Awareness',
						description: 'Allies of this object ignore the difficult terrain, damaging effects unless force moved, and benefit from cover in a square of archer’s stakes.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'poison',
				label: 'Poison',
				cost: 2,
				text: 'The tips of the stakes have poison applied to them. A creature damaged from a square will become poisoned (save ends). A poisoned creature will take 1d6 poison damage at the beginning of their turn until the effect ends.',
				sections: []
			},
			{
				id: 'sticky',
				label: 'Sticky',
				cost: 3,
				text: 'A sticky slime or webbing has been applied to the stakes and the ground between them. A creature who enders a square triggers Sticky Stakes in addtion to normal archer\'s stakes effects.',
				sections: [
					{
						id: 'sticky',
						content: [
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'effect-sticky-stakes',
									name: 'Sticky Stakes',
									type: FactoryLogic.type.createTrigger(''),
									keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Strike ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: '1 creature or object',
									powerRoll: FactoryLogic.createPowerRoll({
										bonus: 2,
										tier1: 'no effect',
										tier2: 'A<1 slowed (EoT)',
										tier3: 'A<2 restrained (EoT)'
									})
								})
							})
						]
					}
				]
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Bear Trap
	static bearTrap: Terrain = {
		id: 'terrain-bear-trap',
		name: 'Bear Trap',
		description: 'Steel jaws attached to the ground by a chain. They will snap shut when stepped on, dealing damage and restraining the target.',
		category: TerrainCategory.Fieldwork,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Ambusher, TerrainRoleType.Trap),
		encounterValue: 2,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 6,
			perSquare: 0
		},
		size: '1 squares terrain',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Agility test when you are adjacent to the bear trap. On a success the trap is jammed and will not trigger when a creature steps on it. Failure with a consequence means you slide 1 into a trap square and trigger it. Success with a consequence means the trap is jammed, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'The defenders calibrate the trap for a size at emplacement that triggers the trap. For example, goblins and kobolds typically calibrate these traps for size 1M. When a creature of the correct size or greater moves onto the trap, it triggers.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature ends their movement and suffers the Bear Trap ability.'
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'effect-bear-trap',
							name: 'Bear Trap',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'shift 1 to closest non trap square',
								tier2: '3 damage; A<1 slowed (save ends)',
								tier3: '5 damage; A<2 slowed (save ends)'
							})
						})
					})
				]
			},
			{
				id: 'hidden',
				content: [
					FactoryLogic.feature.create({
						id: 'hidden',
						name: 'Hidden',
						description: 'The bear trap begins the encounter hidden.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'chain',
				label: 'Chain',
				cost: 1,
				text: 'The bear trap is attached to the ground by a steel chain. The target becomes restrained instead of slowed.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Flammable Oil
	static flammableOil: Terrain = {
		id: 'terrain-flammable-oil',
		name: 'Flammable Oil',
		description: 'A patch of flammable oil or pitch on the ground.',
		category: TerrainCategory.Fieldwork,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Ambusher, TerrainRoleType.Trap),
		encounterValue: 2,
		area: '10x10',
		direction: '',
		link: '',
		stamina: {
			base: 0,
			perSquare: 0
		},
		size: '1 or more squares of terrain',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'A character with appropriate knowledge, such as a College of Caustic Alchemy Shadow with the Alchemy skill, can attempt to disable an adjacent patch of flammable oil as a medium Agility test. Failure with a consequence means that you slide 1 onto the closest flammable oil square which ignites. Success with a consequence means the patch is disabled but you take 3 fire damage; burning (save ends). A burning creature or object takes 1D6 fire damage at the start of each of their turns until the effect ends.'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature or object in a square of oil takes fire damage or a creature or object enters a square of burning oil or begins their turn in a square of burning oil.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'Each creature and object in a square of oil immediately takes 3 fire damage; burning (save ends). A burning creature or object takes 1D6 fire damage at the start of each of their turns until the effect ends.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'concealed',
				label: 'Concealed',
				cost: 1,
				text: 'The oil is concealed.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Hidey-Hole
	static hideyHole: Terrain = {
		id: 'terrain-hidey-hole',
		name: 'Hidey Hole',
		description: 'A hidden cavity in a floor, wall, or ceiling of the environment',
		category: TerrainCategory.Fieldwork,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Ambusher, TerrainRoleType.Trap),
		encounterValue: 1,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 0,
			perSquare: 0
		},
		size: '1 square of terrain',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Might test when you are adjacent to the hidey-hole. Sabotage will generally apply. On a success the hidey-hole collapses and can no longer be used during combat. Failure with a consequence means you are restrained (EoT). Success with a consequence means the hidey-hole collapses, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature begins the encounter in a square or ends their turn in a square of the hidey-hole.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature can hide as a free triggered action.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'network',
				label: 'Network',
				cost: 1,
				text: 'The hidey-hole is connected to a tunnel network. A creature familiar with the network can move to any square adjacent to another connected hidey-hole if they have movement available equal to the straight-line distance to that square. Creatures unfamiliar with the network can use a maneuver to make a hard Intuition test to discover a connected hidey-hole.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Pavise Shield
	static paviseShield: Terrain = {
		id: 'terrain-pavise-shield',
		name: 'Pavise Shield',
		description: 'A reinforced metal shield embedded in the terrain that acts as mobile cover and can be repositioned with a lot of effort.',
		category: TerrainCategory.Fieldwork,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Defender, TerrainRoleType.Fortification),
		encounterValue: 1,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 9,
			perSquare: 0
		},
		size: '1M',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'As a maneuver, make a hard Might test when you are adjacent to the pavise shield in use by another creature. On success you take control of the shield. On failure with a consequence the creature using the shield makes an opportunity attack against you.'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature uses a maneuver to grab the pavise.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'While a creature has the pavise grabbed they have cover and take half damage from attacks that trace line of effect through it. The pavise takes the other half of the damage.'
					}),
					FactoryLogic.feature.create({
						id: 'movement',
						name: 'Movement',
						description: 'While you have a pavise grabbed your movement is halved and you move it like a grabbed creature.'
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Snare Trap
	static snareTrap: Terrain = {
		id: 'terrain-snare-trip',
		name: 'Snare Trap',
		description: 'A rope snare that will grab a target, leaving them hanging upside down.',
		category: TerrainCategory.Fieldwork,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Ambusher, TerrainRoleType.Trap),
		encounterValue: 1,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 1,
			perSquare: 0
		},
		size: '1 squares of terrain',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'As a maneuver, make a medium Agility test when you are adjacent to the snare trap. On a success the trap is jammed and will not trigger when a creature steps on it. Failure with a consequence means you slide 1 into a trap square and trigger it. Success with a consequence means the trap is jammed, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'The defenders calibrate the trap for a size at emplacement that triggers the trap. For example, goblins and kobolds typically calibrate these traps for size 1M. When a creature of the correct size or greater moves onto the trap, it triggers.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature ends their movement and suffers the snare ability.'
					})
				]
			},
			{
				id: 'effect-snare',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'effect-snare',
							name: 'Snare',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'shift 1 to closest non trap square',
								tier2: '1 damage; A<1 restrained (save ends)',
								tier3: '3 damage; A<2 restrained (save ends)'
							}),
							effect: 'A creature restrained by this ability is vertically pulled 2 and suspended in the air by the snare line until they save. When they save they will fall.'
						})
					})
				]
			},
			{
				id: 'hidden',
				content: [
					FactoryLogic.feature.create({
						id: 'hidden',
						name: 'Hidden',
						description: 'The snare trap begins the encounter hidden.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'net-trap',
				label: 'Net Trap',
				cost: 1,
				text: 'Upgrade the snare to a net. Increase the Stamina to 3 and the size to 2x2, the Snare attack gains the area keyword, when triggered, it will attack anyone in the trap area. Any creature who makes their save to end the restrained effect will end it for all affected creatures.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Spike Trap
	static spikeTrap: Terrain = {
		id: 'terrain-spike-trap',
		name: 'Spike Trap',
		description: 'A pit dug out of the terrain, filled with spikes, and camouflaged to avoid detection.',
		category: TerrainCategory.Fieldwork,
		level: 2,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Ambusher, TerrainRoleType.Trap),
		encounterValue: 3,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 6,
			perSquare: 0
		},
		size: '2x2',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'As a maneuver, make a medium Agility test when you are adjacent to the spike trap. On a success the trap is jammed and will not trigger when a creature steps on it. Failure with a consequence means you slide 1 into a trap square and trigger it. Success with a consequence means the trap is jammed, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'The defenders calibrate the trap for a size at emplacement that triggers the trap. For example, goblins and kobolds typically calibrate these traps for size 1M. When a creature of the correct size or greater moves onto the trap, it triggers.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature ends their movement and suffers the spike trap ability.'
					})
				]
			},
			{
				id: 'effect-spike-trap',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'effect-spike-trap',
							name: 'Snare',
							type: FactoryLogic.type.createTrigger('', { free: true }),
							keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Area ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage; shift 1 to closest non trap square',
								tier2: '5 damage; A<0 prone',
								tier3: '8 damage; A<1 rpone, restrained (EoT)'
							}),
							effect: 'Once the trap has been triggered, any creature that moves into a trap square ends their movement and triggers the Spike Trap ability. The open pit is 2 square deep.'
						})
					})
				]
			},
			{
				id: 'hidden',
				content: [
					FactoryLogic.feature.create({
						id: 'hidden',
						name: 'Hidden',
						description: 'The spike trap begins the encounter hidden.'
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	//#endregion

	//#region Mechanisms

	// Column of Blades
	static columnOfBlades: Terrain = {
		id: 'terrain-column-of-blades',
		name: 'Column of Blades',
		description: 'A spinning wooden column affixed with sharp blades.',
		category: TerrainCategory.Mechanism,
		level: 3,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Defender, TerrainRoleType.Fortification),
		encounterValue: 3,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 5,
			perSquare: 0
		},
		size: '1L',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Direct damage only.'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature enters a square adjacent to the column of blades.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature suffers the Spinning Blades ability.'
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'spinning-blades',
							name: 'Sticky Stakes',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage',
								tier2: '6 damage; M<2 bleeding (save ends)',
								tier3: '9 damage; M<3 bleeding (save ends)'
							})
						})
					})
				]
			},
			{
				id: 'allied-awareness',
				content: [
					FactoryLogic.feature.create({
						id: 'allied-awareness',
						name: 'Allied Awareness',
						description: 'Allies of this object can shift through triggering squares and avoid the fortification’s effects. A creature observing this can make a Hard Intuition test and try to shift through triggering squares. On a success they avoid the fortification’s effects. On a failure they suffer the ability. On a failure with a consequence they suffer the ability with an edge.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'stone-column',
				label: 'Stone Column',
				cost: 1,
				text: 'Upgrade the column to stone. Increase the Stamina to 8.',
				sections: []
			},
			{
				id: 'metal-column',
				label: 'Metal Column',
				cost: 1,
				text: 'Upgrade the column to metal. Increase the Stamina to 11.',
				sections: []
			},
			{
				id: 'concealed',
				label: 'Concealed',
				cost: 1,
				text: 'The column is motionless and the blades are concealed inside of the column until it is triggered at which point it becomes revealed.',
				sections: []
			},
			{
				id: 'spiked-flails',
				label: 'Spiked Flails',
				cost: 4,
				text: 'Instead of blades the column is affixed with heavy spiked balls attached to it by chains. The fortification triggers against any creatures that enter a square up to 2 squares from it and inflicts Whirling Flails instead of Spinning Blades.',
				sections: [
					{
						id: 'spiked-flails',
						content: [
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'whirling-flails',
									name: 'Whirling Flails',
									type: FactoryLogic.type.createTrigger(''),
									keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Strike ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: '1 creature or object',
									powerRoll: FactoryLogic.createPowerRoll({
										bonus: 2,
										tier1: '5 damage',
										tier2: '8 damage; M<2 dazed (save ends)',
										tier3: '11 damage; M<3 dazed (save ends)'
									})
								})
							})
						]
					}
				]
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Dart Trap
	static dartTrap: Terrain = {
		id: 'terrain-dart-trap',
		name: 'Dart Trap',
		description: 'A concealed short ranged dart thrower.',
		category: TerrainCategory.Mechanism,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Ambusher, TerrainRoleType.Trap),
		encounterValue: 1,
		area: '',
		link: '',
		stamina: {
			base: 3,
			perSquare: 0
		},
		direction: 'the dart trap has a direction its ability faces',
		size: '1S, can be placed in a wall',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Agility test when you are adjacent to the object. On a success the object is jammed and will not trigger when a creature steps on it. Failure with a consequence means you slide 1 into a square the object can target and trigger it. Success with a consequence means the object is jammed, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature enters a square in a 1x5 line the dart trap is facing.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature suffers the Dart ability.'
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'effect-dart',
							name: 'Dart',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createRanged(5) ],
							target: '1 creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage',
								tier2: '2 damage',
								tier3: '3 damage'
							})
						})
					})
				]
			},
			{
				id: 'hidden',
				content: [
					FactoryLogic.feature.create({
						id: 'hidden',
						name: 'Hidden',
						description: 'The dart trap begins the encounter hidden.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'poison-darts',
				label: 'Poison Darts',
				cost: 2,
				text: 'The darts are poisoned. A creature who takes damage from a dart will become poisoned (save ends). A poisoned creature will take 1d6 poison damage at the beginning of their turn until the effect ends.',
				sections: []
			},
			{
				id: 'large-darts',
				label: 'Large Darts',
				cost: 1,
				text: 'The darts are slightly larger and add push 1 / push 2/ push 3 to the power roll.',
				sections: []
			},
			{
				id: 'gatling-darts',
				label: 'Gatling Darts',
				cost: 4,
				text: 'The dart trap is equipped with multiple barrels capable of launching darts at a high rate of fire. The Dart ability becomes Area 5x1 within 1 line instead of a Strike and does +1d6 damage.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Hidden Portcullis
	static hiddenPortcullis: Terrain = {
		id: 'terrain-hidden-portcullis',
		name: 'Hidden Portcullis',
		description: 'A portcullis is hidden in the ceiling of a passage or chokepoint that drops when activated.',
		category: TerrainCategory.Mechanism,
		level: 3,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Ambusher, TerrainRoleType.Trap),
		encounterValue: 4,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 0,
			perSquare: 9
		},
		size: '2x1 up to 4x1 squares',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Agility test when you are adjacent to the object. On a success the object is jammed and will not trigger when a creature steps on it. Failure with a consequence means you slide 1 into an object square and trigger it. Success with a consequence means the object is jammed, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: ' A creature is standing on a portcullis square when it is activated by another mechanism, such as a pressure plate.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature suffers the Heavy Gate ability.'
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'effect-heavy-gate',
							name: 'Heavy Gate',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Area ],
							distance: [ FactoryLogic.distance.createSpecial('Squares under the mechanism') ],
							target: 'All creatures and objects',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage; slide 1 (ignores stability)',
								tier2: '7 damage; restrained (EoT)',
								tier3: '10 damage; restrained (save ends)'
							}),
							effect: 'The portcullis blocks movement through its squares. There is a 50% chance that a slid target winds up on either side of the portcullis. When the restrained condition ends for a creature, the creature shifts 1 out of the hidden portcullis squares.'
						})
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Pillar
	static pillar: Terrain = {
		id: 'terrain-pillar',
		name: 'Pillar',
		description: 'A stone pillar that can be toppled with the right amount of damage or from a well-engineered trigger .',
		category: TerrainCategory.Mechanism,
		level: 2,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
		encounterValue: 3,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 6,
			perSquare: 0
		},
		size: '1 square breakaway',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Direct damage only.'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'The pillar is destroyed or a linked trigger is activated.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The pillar topples in the direction opposite of the creature that destroyed it or, if triggered, in a direction defined when the pillar was placed in the encounter. The Toppling Pillar ability activates in the direction the pillar toppled.'
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'effect-toppling-pillar',
							name: 'Toppling Pillar',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Area ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 1, within: 1 }) ],
							target: 'All creatures and objects',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage',
								tier2: '6 damage; M<1 restrained (EoT)',
								tier3: '9 damage; M<2 restrained (save ends)'
							}),
							effect: 'The squares affected become difficult terrain.'
						})
					})
				]
			}
		],
		upgrades: [
			{
				id: 'sturdier-materials',
				label: 'Sturdier Materials',
				cost: 1,
				text: 'Upgrade the pillar to metal. Increase the Stamina to 9 and deal 1d6 extra damage when toppling on a creature.',
				sections: []
			},
			{
				id: 'falling-wall',
				label: 'Falling Wall',
				cost: 0,
				text: 'Multiple pillars can be bought together to represent a larger toppling object, like a wall. All pillars need to be destroyed before it falls if this is the case, and toppling direction is predefined when the objects are placed.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Pressure Plate
	static pressurePlate: Terrain = {
		id: 'terrain-pressure-plate',
		name: 'Pressure Plate',
		description: 'This mechanism acts as a trigger for another linked mechanism. It begins the encounter concealed from enemies.',
		category: TerrainCategory.Mechanism,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Support, TerrainRoleType.Trigger),
		encounterValue: 2,
		area: '',
		direction: '',
		stamina: {
			base: 0,
			perSquare: 0
		},
		size: '1x1 up to 4x4 squares of terrain',
		link: 'A pressure plate is linked to another mechanism that it activates when triggered.',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Agility test when you are adjacent to the object. On a success the object is jammed and will not trigger when a creature steps on it. Failure with a consequence means you slide 1 into an object square and trigger it. Success with a consequence means the object is jammed, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'effect',
				content: [
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The pressure plate is set for a specific triggering size, usually 1S or 1M. When a creature of that size or larger moves onto a pressure plate square, the linked mechanism activates.'
					})
				]
			},
			{
				id: 'hidden',
				content: [
					FactoryLogic.feature.create({
						id: 'hidden',
						name: 'Hidden',
						description: 'The pressure plate begins the encounter hidden.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'tripwire',
				label: 'Tripwire',
				cost: -1,
				text: 'The pressure plate is a tripwire, which only triggers once. It is still concealed, but can be discovered with an easy test.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Pulley
	static pulley: Terrain = {
		id: 'terrain-pulley',
		name: 'Pulley',
		description: 'This is a simple rope and pulley system that may be used to quickly ascend to the top of another structure such as a wall, scaffolding, or tower.',
		category: TerrainCategory.Mechanism,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Support, TerrainRoleType.Trigger),
		encounterValue: 1,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 1,
			perSquare: 0
		},
		size: '1S,  attached to a structure of some sort such as a wall, tower or scaffolding',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Agility test when you are adjacent to the object. On a success the object is jammed and will not trigger when a creature tries to activate it. Failure with a consequence means you slide 1 into an object square and trigger it. Success with a consequence means the object is jammed, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature adjacent to the pulley uses a maneuver to cut the rope.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The triggering creature is sent to the top of the structure the pulley is attached to. Once used in this manner the pulley is disabled and may not be used again.'
					})
				]
			},
			{
				id: 'Climbable',
				content: [
					FactoryLogic.feature.create({
						id: 'climbable',
						name: 'Climbable',
						description: 'A creature adjacent to the pulley may make a climb test and use it to climb to the top of the structure it’s attached to.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'chain',
				label: 'Chain',
				cost: 1,
				text: 'Instead of a rope and pulley the system uses a chain. The pulley is not disabled after use.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Ram
	static ram: Terrain = {
		id: 'terrain-ram',
		name: 'Ram',
		description: 'A heavy wooden ram that drops or swings into the encounter area. Multiple rams can be bought together to represent larger mechanisms, such as a stack of tumbling logs.',
		category: TerrainCategory.Mechanism,
		level: 2,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Ambusher, TerrainRoleType.Trap),
		encounterValue: 3,
		area: '',
		link: '',
		stamina: {
			base: 0,
			perSquare: 3
		},
		size: 'Up to 4 squares (2x2, 1x3, 1x4) breakaway',
		direction: 'The ram has a defined facing it moves into',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Agility test when you are adjacent to the object. Sabotage will generally apply. On a success the object is jammed and will not trigger when a creature steps on it. Failure with a consequence means you slide 1 into an object square and trigger it. Success with a consequence means the object is jammed, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'Activated by a linked mechanism.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The ram moves up to 3 squares from its starting position using the Ram ability against any target it moves through.'
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'effect-ram',
							name: 'Ram',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Area ],
							distance: [ FactoryLogic.distance.createSpecial('Squares the ram moves into') ],
							target: 'All creatures and objects',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage; slide 1 (ignores stability)',
								tier2: '6 damage; push 3',
								tier3: '9 damage; push 5'
							}),
							effect: 'There is a 50% chance that a slid target winds up on either side of the ram.'
						})
					})
				]
			},
			{
				id: 'hidden',
				content: [
					FactoryLogic.feature.create({
						id: 'hidden',
						name: 'Hidden',
						description: 'The ram plate begins the encounter hidden.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'stone',
				label: 'Stone',
				cost: 1,
				text: 'Increase the stamina per square to 6. Do an extra 1d3 damage.',
				sections: []
			},
			{
				id: 'metal',
				label: 'Metal',
				cost: 2,
				text: 'Increase the stamina per square to 9. Do an extra 1d6 damage.',
				sections: []
			},
			{
				id: 'chompers',
				label: 'Chompers',
				cost: 1,
				text: 'The ram can be upgraded to be a repeating mechanism. The ram re-triggers at the beginning of every round.',
				sections: []
			},
			{
				id: 'rapid-chompers',
				label: 'Rapid Chompers',
				cost: 3,
				text: 'The ram can be upgraded to a rapid repeating mechanism. The ram re-triggers at the beginning of every turn.',
				sections: []
			},
			{
				id: 'ceiling',
				label: 'Ceiling',
				cost: 1,
				text: 'The ram can be mounted in the ceiling and ram the squares below it when it is triggered. Creatures are pushed away by the ram’s squares. This can be used to create chain reactions with other terrain objects that trigger when creatures are moved into them. For example, when a ceiling ram drops onto a creature in a spike trap the spike trap ability is triggered again.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Switch
	static switch: Terrain = {
		id: 'terrain-switch',
		name: 'Switch',
		description: 'This mechanism acts as a trigger for another linked mechanism. You can place this mechanism on a floor or wall.',
		category: TerrainCategory.Mechanism,
		level: 1,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Support, TerrainRoleType.Trigger),
		encounterValue: 1,
		area: '',
		direction: '',
		stamina: {
			base: 3,
			perSquare: 0
		},
		size: '1T built into a floor or a wall',
		link: 'A switch is linked to another mechanism that it activates when triggered',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Agility test when you are adjacent to the object. Sabotage will generally apply. On a success the object is jammed and will not trigger when a creature steps on it. Failure with a consequence means you slide 1 into an object square and trigger it. Success with a consequence means the object is jammed, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A creature uses a maneuver while adjacent to the switch or the switch is destroyed.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The linked mechanism is activated.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'hidden',
				label: 'Hidden',
				cost: 1,
				text: 'The switch is hidden, requiring a hard Intuition test to find before it can be attacked or used.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	//#endregion

	//#region Siege Engines

	// Arrow Launcher
	static arrowLauncher: Terrain = {
		id: 'terrain-arrow-launcher',
		name: 'Arrow Launcher',
		description: 'A small wooden cart that uses rockets to launch up to 100 arrows at one time. While it is inaccurate it makes up for it by spreading a large volume of projectiles over a wide area.',
		category: TerrainCategory.SiegeEngine,
		level: 2,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Artillery, TerrainRoleType.SiegeEngine),
		encounterValue: 8,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 30,
			perSquare: 0
		},
		size: '1L',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Agility test when you are adjacent to the object. On a success the object is jammed and will not trigger when a creature steps on it. Failure with a consequence means the object attacks you, if it is loaded. Success with a consequence means the object is disabled, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'arrow-storm',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'arrow-storm',
							name: 'Arrow Storm',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 20 }) ],
							target: 'All creatures or objects',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 0,
								tier1: '5 damage',
								tier2: '8 damage',
								tier3: '11 damage'
							}),
							effect: 'Arrow Storm cannot be used again until the object is reloaded.'
						})
					})
				]
			},
			{
				id: 'reload',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'reload',
							name: 'Reload',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'The object is reloaded, allowing Arrow Storm to be used again.'
						})
					})
				]
			},
			{
				id: 'spot',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'spot',
							name: 'Spot',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'The next use of Arrow Storm has an edge and +10 range.'
						})
					})
				]
			},
			{
				id: 'move',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'move',
							name: 'Move',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'This object moves 3 and the adjacent creature using their action moves 3 as long as they end their move adjacent ot this object.'
						})
					})
				]
			}
		],
		upgrades: [
			{
				id: 'flaming-arrows',
				label: 'Flaming Arrows',
				cost: 1,
				text: 'The arrows now deal fire damage and will ignite flammable objects in the area of effect.',
				sections: []
			},
			{
				id: 'screamers',
				label: 'Screamers',
				cost: 3,
				text: 'The rockets are designed to make a distinct high pitched screaming noise as they are fired and descend onto their targets. The arrow launcher ability has the Screamers ability instead of Arrow Storm.',
				sections: [
					{
						id: 'screamers',
						content: [
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'screamers',
									name: 'Screamers',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Area ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 20 }) ],
									target: 'All creatures and objects',
									powerRoll: FactoryLogic.createPowerRoll({
										bonus: 0,
										tier1: '5 damage; R<0 dazed (save ends)',
										tier2: '8 damage; R<1 dazed (save ends)',
										tier3: '11 damage; R<1 frightened (save ends)'
									}),
									effect: 'Screamers cannot be uses again until the object is reloaded.'
								})
							})
						]
					}
				]
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Boiling Oil Cauldron
	static boilingOilCauldron: Terrain = {
		id: 'terrain-boiling-oil-cauldron',
		name: 'Boiling Oil Cauldron',
		description: 'A large cauldron of boiling oil that can be poured onto an enemy. Ideally placed above an area to gain an edge on attack rolls.',
		category: TerrainCategory.SiegeEngine,
		level: 3,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Defender, TerrainRoleType.Fortification),
		encounterValue: 10,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 50,
			perSquare: 0
		},
		size: '1L',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Agility test when you are adjacent to the object. On a success the object is jammed and will not trigger when a creature steps on it. Failure with a consequence means the object attacks you, if it is loaded. Success with a consequence means the object is disabled, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'boiling-oil',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'boiling-oil',
							name: 'Boiling Oil',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
							target: 'All creatures and objects',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 fire damage; M<1 burning (save ends)',
								tier2: '9 fire damage; M<2 burning (save ends)',
								tier3: '12 fire damage; M<3 burning (save ends)'
							}),
							effect: 'A burning creature or object takes 1d6 fire damage at the start of each of their turns until the effect ends. Boiling Oil cannot be used again until the object is reloaded.'
						})
					})
				]
			},
			{
				id: 'reload',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'reload',
							name: 'Reload',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'The object is reloaded, allowing Boiling Oil to be used again.'
						})
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Catapult
	static catapult: Terrain = {
		id: 'terrain-catapult',
		name: 'Catapult',
		description: 'A large weapon that throws a projectile in an arc. A catapult can attack without line of sight as long as an ally has line of sight to the target square and there is a path above the target.',
		category: TerrainCategory.SiegeEngine,
		level: 3,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Artillery, TerrainRoleType.SiegeEngine),
		encounterValue: 10,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 50,
			perSquare: 0
		},
		size: '2',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Agility test when you are adjacent to the object. On a success the object is jammed and will not trigger when a creature steps on it. Failure with a consequence means the object attacks you, if it is loaded. Success with a consequence means the object is disabled, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'arcing-shot',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'arcing-shot',
							name: 'Arcing Shot',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 20 }) ],
							target: 'All creatures and objects',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage',
								tier2: '9 damage; A<0 push 1',
								tier3: '12 damage; A<1 push 2'
							}),
							effect: ''
						})
					})
				]
			},
			{
				id: 'reload',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'reload',
							name: 'Reload',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'The object is reloaded, allowing Arcing Shot to be used again.'
						})
					})
				]
			},
			{
				id: 'spot',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'spot',
							name: 'Spot',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'The next use of Arcing Shot has an edge and +10 range.'
						})
					})
				]
			},
			{
				id: 'move',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'move',
							name: 'Move',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'This object moves 2 and the adjacent creature using their action moves 2 as long as they end their move adjacent ot this object.'
						})
					})
				]
			}
		],
		upgrades: [
			{
				id: 'fire-my-boy',
				label: 'Fire Me Boy!',
				cost: 2,
				text: 'The side fielding the catapult has trained their forces to safely use the catapult to deliver an assault across the battlefield. Instead of attacking, a creature can use the catapult to vertical push 10 any ally within 2 squares of the catapult of size 1L or less. If the tossed ally lands in an empty square, they take no damage.',
				sections: []
			},
			{
				id: 'i-love-it-here',
				label: 'I Love it Here, it’s so Flammable',
				cost: 2,
				text: 'The arcing shot does fire damage. Any squares targeted by the arcing shot are burning until the end of the encounter. When a creature begins their turn in a square or first enters a square that’s burning on a turn, they take 2 fire damage.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Exploding Mill Wheel
	static explodingMillWheel: Terrain = {
		id: 'terrain-exploding-mill-wheel',
		name: 'Exploding Mill Wheel',
		description: 'A massive wooden wheel loaded with explosives. During sieges it is rolled towards fortifications where it will explode, causing massive damage.',
		category: TerrainCategory.SiegeEngine,
		level: 3,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Artillery, TerrainRoleType.SiegeEngine),
		encounterValue: 10,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 25,
			perSquare: 0
		},
		size: '2',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Before the wheel is rolling you may make a medium Agility test when you are adjacent to the object. On a success the object is jammed and will not trigger when a creature steps on it. Failure with a consequence means the object attacks you, if it is loaded. Success with a consequence means the object is disabled, but you are slowed (EoT). Once the wheel is rolling, the only thing that can disable it is it exploding due to hitting a size 3 or larger object, being triggered with the spot action, or being destroyed by damage.'
					})
				]
			},
			{
				id: 'roll-the-wheel',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'roll-the-wheel',
							name: 'Roll the Wheel',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'The exploding mill wheel begins to roll. It immediately moves 2 in a straight line, using the Crushing Wheel ability on any creature or object it moves through. At the beginning of every creature’s turn the exploding mill wheel continues to move in a straight line, using the Crushing Wheel ability on any creature of object it moves through. Creatures and objects of size 2 or smaller do not stop the wheel’s movement.'
						})
					})
				]
			},
			{
				id: 'crushing-wheel',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'crushing-wheel',
							name: 'Crushing Wheel',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Area ],
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'All creature and objects',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; push 1',
								tier2: '9 damage; push 2',
								tier3: '12 damage; push 3'
							}),
							effect: 'Make one power roll against every square the exploding mill wheel enters.'
						})
					})
				]
			},
			{
				id: 'massive-explosion',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'massive-explosion',
							name: 'Massive Explosion',
							type: FactoryLogic.type.createTrigger('The exploding mill wheel attempts to move into an object or creature that is size 3 or larger or is reduced to 0 Stamina.', { free: true }),
							keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Area ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
							target: 'All creature and objects',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; push 1; M<0 burning (save ends)',
								tier2: '9 damage; push 2; M<1 burning (save ends)',
								tier3: '12 damage; push 3; M<2 burning (save ends)'
							}),
							effect: 'The exploding mill wheel is destroyed.'
						})
					})
				]
			}
		],
		upgrades: [
			{
				id: 'piloted',
				label: 'Piloted',
				cost: 4,
				text: 'The wheel has been fitted with a control mechanism and a pilot’s seat for an ally of size 1M or smaller. This allows the wheel to be turned in any direction while it is moving. At any time during its movement, the pilot may take an action to eject out of the wheel landing in an adjacent space while the wheel continues moving in a straight line.  Piloting the wheel takes knowledge and some skill but a player could figure it out and pilot it with a hard reason test. On a success the character may pilot the wheel. Failure with a consequence means the wheel immediately explodes. Success with a reward means that the player has even figured out how to disarm the explosives and may disable that aspect of the wheel.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Field Ballista
	static fieldBallista: Terrain = {
		id: 'terrain-field-ballista',
		name: 'Field Ballista',
		description: 'A large weapon that uses a mechanism similar to a crossbow. Attacking with a ballista releases a large bolt.',
		category: TerrainCategory.SiegeEngine,
		level: 2,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Artillery, TerrainRoleType.SiegeEngine),
		encounterValue: 8,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 40,
			perSquare: 0
		},
		size: '2',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Agility test when you are adjacent to the object. On a success the object is jammed and will not trigger when a creature steps on it. Failure with a consequence means the object attacks you, if it is loaded. Success with a consequence means the object is disabled, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'release-bolt',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'release-bolt',
							name: 'Release Bolt',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Strike, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.createRanged(20) ],
							target: '1 creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage',
								tier2: '8 damage; M<1 push 1',
								tier3: '11 damage; M<2 push 2'
							}),
							effect: 'Release Bolt cannot be used again until the object is reloaded.'
						})
					})
				]
			},
			{
				id: 'reload',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'reload',
							name: 'Reload',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'The object is reloaded, allowing Release Bolt or Chain Bolt to be used again.'
						})
					})
				]
			},
			{
				id: 'spot',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'spot',
							name: 'Spot',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'The next use of Release Bolt or Chain Bolt has an edge and +10 range.'
						})
					})
				]
			},
			{
				id: 'move',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'move',
							name: 'Move',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'This object moves 3 and the adjacent creature using their action moves 3 as long as they end their move adjacent ot this object.'
						})
					})
				]
			}
		],
		upgrades: [
			{
				id: 'penetrating-bolt',
				label: 'Penetrating Bolt',
				cost: 2,
				text: 'The field ballista is outfitted with penetrating bolts. The ballista targets 2 additional creatures or objects in a straight line behind the initial target. This affects any creatures, including allies, and must affect the first two creatures or objects in range.',
				sections: []
			},
			{
				id: 'chain-bolt',
				label: 'chain-bolt',
				cost: 2,
				text: 'The field ballista has the Chain Bolt ability instead of the Release Bolt ability.',
				sections: [
					{
						id: 'chain-bolt',
						content: [
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'chain-bolt',
									name: 'Chain Bolt',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Strike, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(20) ],
									target: '1 creature or object',
									powerRoll: FactoryLogic.createPowerRoll({
										bonus: 2,
										tier1: '4 damage',
										tier2: '7 damage; M<1 slowed (save ends)',
										tier3: '10 damage; M<2 slowed (save ends)'
									}),
									effect: 'Chain Bolt cannot be used again until the object is reloaded.'
								})
							}),
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'crank-chain',
									name: 'Crank Chain',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Strike, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(20) ],
									target: '1 creature slowed by the field ballista',
									powerRoll: FactoryLogic.createPowerRoll({
										bonus: 2,
										tier1: 'pull 1',
										tier2: 'pull 3',
										tier3: 'pull 5'
									}),
									effect: 'This forced movement will trigger opportunity attacks.'
								})
							})
						]
					}
				]
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Iron Dragon
	static ironDragon: Terrain = {
		id: 'terrain-iron-dragon',
		name: 'Iron Dragon',
		description: 'A large metal device that uses a bellows system and liquid fuel to shoot out a gout of flame.',
		category: TerrainCategory.SiegeEngine,
		level: 4,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Artillery, TerrainRoleType.SiegeEngine),
		encounterValue: 12,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 60,
			perSquare: 0
		},
		size: '2',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a medium Agility test when you are adjacent to the object. Sabotage will generally apply. On a success the object is jammed and will not trigger when a creature steps on it. Failure with a consequence means the object attacks you, if it is loaded. Success with a consequence means the object is disabled, but you are slowed (EoT).'
					})
				]
			},
			{
				id: 'gout-of-flame',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'gout-of-flame',
							name: 'Gout of Flame',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 8, value2: 2, within: 1 }) ],
							target: 'All creatures and objects',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage; A<0 burning (save ends)',
								tier2: '10 damage; A<1 burning (save ends)',
								tier3: '13 damage; A<2 burning (save ends)'
							}),
							effect: 'A burning creature or object takes 1D6 fire damage at the start of each of their turns until the effect ends. Gout of Flame cannot be used until the object is reloaded.'
						})
					})
				]
			},
			{
				id: 'reload',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'reload',
							name: 'Reload',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'The object is reloaded, allowing Gout of Flame to be used again.'
						})
					})
				]
			},
			{
				id: 'spot',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'spot',
							name: 'Spot',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'The next use of Gout of Flame has an edge and +10 range.'
						})
					})
				]
			},
			{
				id: 'move',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'move',
							name: 'Move',
							type: FactoryLogic.type.createAction(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'This object',
							effect: 'This object moves 2 and the adjacent creature using their action moves 2 as long as they end their move adjacent ot this object.'
						})
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Watchtower
	static watchtower: Terrain = {
		id: 'terrain-watchtower',
		name: 'Watchtower',
		description: 'A sturdy wooden tower that provides cover and high ground. The tower is accessed by a set of ladders or stairs leading up to the top.',
		category: TerrainCategory.SiegeEngine,
		level: 2,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Defender, TerrainRoleType.Fortification),
		encounterValue: 8,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 50,
			perSquare: 0
		},
		size: '3',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Direct damage only.'
					})
				]
			},
			{
				id: 'high-ground',
				content: [
					FactoryLogic.feature.create({
						id: 'high-ground',
						name: 'High Ground',
						description: 'The watchtower is accessible by ladders and acts as high ground and cover for creatures inside of it.'
					})
				]
			}
		],
		upgrades: [
			{
				id: 'ballista-empowerment',
				label: 'Ballista Empowerment',
				cost: 12,
				text: 'The watchtower is equipped with a ballista emplacement. The Ballista emplacement follows all rules for the Field Ballista.',
				sections: []
			},
			{
				id: 'boiling-oil-cauldron',
				label: 'Boiling Oil Cauldron',
				cost: 17,
				text: 'The watchtower is equipped with a boiling oil cauldron which follows all the normal rules for the boiling oil cauldron.',
				sections: []
			},
			{
				id: 'spyglass',
				label: 'Spyglass',
				cost: 2,
				text: 'A creature in the watchtower may use a spot action to make a search for hidden creatures gaining an edge on the roll and increasing the range to 15.',
				sections: []
			},
			{
				id: 'stone-tower',
				label: 'Stone Tower',
				cost: 2,
				text: 'The watchtower is reinforced with stone. Increase stamina to 50.',
				sections: []
			},
			{
				id: 'iron-tower',
				label: 'Iron Tower',
				cost: 4,
				text: 'The watchtower is reinforced with stone and iron. Increase stamina to 100.',
				sections: []
			}
		],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	//#endregion

	//#region Arcane Objects

	// The Black Obelisk
	static theBlackObelisk: Terrain = {
		id: 'terrain-the-black-obelisk',
		name: 'The Black Obelisk',
		description: 'A foreboding black obelisk that knows more about you than you would like.',
		category: TerrainCategory.ArcaneObject,
		level: 3,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Controller, TerrainRoleType.Relic),
		encounterValue: 20,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 100,
			perSquare: 0
		},
		size: '2',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Make a hard Reason test when you are adjacent to the object. Magic will generally apply. On a success the object is disabled for the rest of the encounter. Failure with a consequence means you immediately trigger Your Fears Become Manifest with a bane. Success with a consequence means the object is disabled, but you are slowed (save ends).'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'A round begins.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'Each enemy within 10 of the Black Obelisk suffers the Your Fears Become Manifest ability.'
					}),
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'your-fears-become-manifest',
							name: 'Your Fears Become Manifest',
							type: FactoryLogic.type.createTrigger(''),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Object ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
							target: 'All enemies',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'P<1 slowed (EoT)',
								tier2: 'P<2 slowed (EoT), weakened (EoT)',
								tier3: 'P<3 slowed (EoT), weakened (EoT), frightened (EoT)'
							}),
							effect: 'The target is pushed 2.'
						})
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// The Chronal Hypercube
	static theChronalHypercube: Terrain = {
		id: 'terrain-the-chronal-hypercube',
		name: 'The Chronal Hypercube',
		description: 'A shape that is impossible for most creatures to understand.',
		category: TerrainCategory.ArcaneObject,
		level: 3,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Controller, TerrainRoleType.Relic),
		encounterValue: 20,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 80,
			perSquare: 0
		},
		size: '1M',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Only a creature trained in Psionics can attempt to disable the Chronal Hypercube. Make a hard Reason test when within 10 of the Hypercube. On a success, the Hypercube teleports adjacent to your square at the start of the next round and becomes your ally. On a failure with a consequence you take 1d6 psychic damage.'
					})
				]
			},
			{
				id: 'dimensional-flicker',
				content: [
					FactoryLogic.feature.create({
						id: 'dimensional-flicker',
						name: 'Dimensional Flicker',
						description: 'At the start of the round, roll 1d10. On a 7+ the Hypercube teleports to a square of your choice within 10 and is hidden. A creature with the Psionics skill can use those skills to attempt to ﬁnd it.'
					})
				]
			},
			{
				id: 'chronal-superhighway',
				content: [
					FactoryLogic.feature.create({
						id: 'chronal-superhighway',
						name: 'Chronal Superhighway',
						description: 'Allies within 10 squares of the Hypercube can teleport in place of any normal movement they take, using the same distance as the normal movement. They have an edge on any attacks they make after teleporting.'
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// The Throne of A'An
	static theThroneOfAAn: Terrain = {
		id: 'terrain-the-throne-of-aan',
		name: 'The Throne of A\'An',
		description: 'A’An was the Sun God of the Antical Protectorate in what was now Vanigar. She was slain along with the other Nine Star Gods, ending the Age of Suns, plunging the region into eternal winter.',
		category: TerrainCategory.ArcaneObject,
		level: 4,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Controller, TerrainRoleType.Relic),
		encounterValue: 24,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 140,
			perSquare: 0
		},
		size: '2',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'The Throne can only be disabled by attuning to it, casting out the current occupant, and sitting in it, becoming the new Hierophant of A’An. The Hierophant can make a hard Presence test with a bane to disable the Throne. Failure with a consequence triggers Nova.'
					})
				]
			},
			{
				id: 'light-of-the-northern-sun',
				content: [
					FactoryLogic.feature.create({
						id: 'light-of-the-northern-sun',
						name: 'Light of the Northern Sun',
						description: `
In the Age of Suns there was no darkness and no night. Even among the many suns of that time, the light of A’An was the brightest.
The Throne manifests the Sun powers of A’An, even when no one is seated in it. The following eﬀects occur within 10 squares of the Throne: 
• The Throne casts a bright light, preventing any form of concealment or darkness from existing or manifesting, even from a god. 
• No creature can hide. 
• Any creature with cold immunity gains fire weakness 10. 
• Any creature that uses an ability that does cold damage takes 11 fire damage.`
					})
				]
			},
			{
				id: 'sitting-on-the-throne',
				content: [
					FactoryLogic.feature.create({
						id: 'sitting-on-the-throne',
						name: 'Sitting on the Throne',
						description: `
“Awaken me! The Sun must shine again!” 
Only a creature attuned to the throne can sit in it. A creature can attune to the throne as an action, if adjacent to the Throne, by succeeding at a hard Presence test. Failing this test with a consequence inﬂicts 11 ﬁre damage. 

A creature seated in the throne becomes the Hierophant of A’An and gains the following beneﬁts: 
• The Hierophant, and their allies within 10 squares, gain fire immunity 10 
• The Hierophant, and their allies within 10 squares, can choose to do fire damage instead of their normal damage 
• You gain +5 stability and all attacks against you suffer a bane, unless the attacker is also attuned to the Throne. 
• They gain the Primordial Flare and Solar Accretion abilities.`
					})
				]
			},
			{
				id: 'primordial-flare',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'primordial-flare',
							name: 'Primordial Flare',
							type: FactoryLogic.type.createManeuver(),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createRanged(20) ],
							target: 'One creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 fire damage',
								tier2: '11 fire damage',
								tier3: '14 fire damage'
							}),
							effect: 'The target gains fire weakness 10 until the beginning of the Hierophant’s next turn.'
						})
					})
				]
			},
			{
				id: 'solar-accretion',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'solar-accretion',
							name: 'Solar Accretion',
							type: FactoryLogic.type.createTrigger('A target within distance is winded or reduced to 0 Stamina by fire damage.', { free: true }),
							keywords: [ AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: 'One creature or object',
							effect: 'If the Hierophant is a hero, they gain 3 heroic resources. If Hierophant is a villain, the Director gains 3 malice. '
						})
					})
				]
			},
			{
				id: 'nova',
				content: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'nova',
							name: 'Nova',
							type: FactoryLogic.type.createTrigger('The Throne is destroyed or the Hierophant fails with a consequence when disabling it.', { free: true }),
							keywords: [ AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
							target: 'All creatures and objects',
							effect: 'Targets take 14 fire damage. The Hierophant gains the Incubator of A’An complication. If there is no Hierophant, a creature within 10 squares of the Throne, and chosen by the Director, gains the Incubator of A’An complication.'
						})
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	//#endregion

	//#region Power Fixtures

	// Psionic Shard
	static psionicShard: Terrain = {
		id: 'psionic-shard',
		name: 'Psionic Shard',
		description: 'A massive crystal that hums and makes the air feel thick.',
		category: TerrainCategory.PowerFixture,
		level: 5,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Defender, TerrainRoleType.Fortification),
		encounterValue: 7,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 40,
			perSquare: 0
		},
		size: '2',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Direct damage only.'
					})
				]
			},
			{
				id: 'trigger-effect',
				content: [
					FactoryLogic.feature.create({
						id: 'trigger',
						name: 'Trigger',
						description: 'The shard is destroyed.'
					}),
					FactoryLogic.feature.create({
						id: 'effect',
						name: 'Effect',
						description: 'The shard releases a shockwave that briefly tightens the barrier around each creature affected by Psionic Barrier, inflicting dazed (EoT). '
					})
				]
			},
			{
				id: 'psionic-barrier',
				content: [
					FactoryLogic.feature.create({
						id: 'psionic-barrier',
						name: 'Psionic Barrier',
						description: 'While at least one psionic shard is intact, the damage dealt to each ally creature is halved.'
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Holy Idol
	static holyIdol: Terrain = {
		id: 'holy-idol',
		name: 'Holy Idol',
		description: 'An empowering monument to the higher power that enables the villain’s machinations.',
		category: TerrainCategory.PowerFixture,
		level: 5,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Support, TerrainRoleType.Relic),
		encounterValue: 7,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 35,
			perSquare: 0
		},
		size: '2',
		damageMods: [],
		sections: [
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Direct damage only.'
					})
				]
			},
			{
				id: 'empowered-will',
				content: [
					FactoryLogic.feature.create({
						id: 'empowered-will',
						name: 'Empowered Will',
						description: 'At the start of each round while the holy idol is intact, the Director gains a d6 that lasts until the end of the round. When an ally creature deals or takes damage, the Director can roll the d6 to increase the damage the creature deals or reduce the damage the creature takes by an amount equal to the result (to a minimum of 2). Only one d6 can be applied to any one instance of damage.'
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	// Tree of Might
	static treeOfMight: Terrain = {
		id: 'terrain-tree-of-might',
		name: 'Tree of Might',
		description: 'A gnarled tree with unearthed roots that writhe and curl.',
		category: TerrainCategory.PowerFixture,
		level: 5,
		role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
		encounterValue: 14,
		area: '',
		direction: '',
		link: '',
		stamina: {
			base: 60,
			perSquare: 0
		},
		size: '3',
		damageMods: [],
		sections: [
			{
				id: 'damage-immunity',
				content: [
					FactoryLogic.feature.create({
						id: 'damage-immunity',
						name: 'Damage Immunity',
						description: 'Immunity 5 to all non-fire or non-corruption damage.'
					})
				]
			},
			{
				id: 'disable',
				content: [
					FactoryLogic.feature.create({
						id: 'disable',
						name: 'Disable',
						description: 'Direct damage only.'
					})
				]
			},
			{
				id: 'trees-nourishment',
				content: [
					FactoryLogic.feature.create({
						id: 'trees-nourishment',
						name: 'Tree\'s Nourishment',
						description: 'At the start of each round while at least one tree of might is intact, each enemy touching the ground takes M<0 10 corruption damage and the tree of might grows a fruit. The potency increases by 1 each subsequent round.'
					})
				]
			},
			{
				id: 'mighty-fruit',
				content: [
					FactoryLogic.feature.create({
						id: 'mighty-fruit',
						name: 'Mighty Fruit',
						description: 'Once per round, an adjacent creature can take some fruit from the tree of might and eat it as a free action. The creature gains 10 temporary Stamina and has their Might score increased by 1 (to a maximum of 6) until the end of the encounter.'
					})
				]
			}
		],
		upgrades: [],
		state: {
			squares: 1,
			staminaDamage: 0
		}
	};

	//#endregion
}
