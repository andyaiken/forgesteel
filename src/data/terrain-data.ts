import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { DamageModifierType } from '../enums/damage-modifier-type';
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
		]
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
		]
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
		stamina: {
			base: 12,
			perSquare: 0
		},
		size: '1 or more squares of difficult terrain',
		damageMods: [
			FactoryLogic.damageModifier.create({
				damageType: 'All non-fire or non-cold damage',
				modifierType: DamageModifierType.Immunity,
				value: 5
			})
		],
		sections: [
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
		upgrades: []
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
		stamina: {
			base: 0,
			perSquare: 3
		},
		size: '1 or more squares of difficult terrain',
		damageMods: [
			FactoryLogic.damageModifier.create({
				damageType: 'All non-fire damage',
				modifierType: DamageModifierType.Immunity,
				value: 5
			})
		],
		sections: [
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
		]
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
		stamina: {
			base: 0,
			perSquare: 12
		},
		size: '1 or more squares of difficult terrain',
		damageMods: [
			FactoryLogic.damageModifier.create({
				damageType: 'All non-cold damage',
				modifierType: DamageModifierType.Immunity,
				value: 5
			})
		],
		sections: [
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
		]
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
		upgrades: []
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
		]
	};

	//#endregion

	//#region Fieldworks

	// Archer's Stakes

	// Bear Trap

	// Flammable Oil

	// Hidey-Hole

	// Pavise Shield

	// Snare Trap

	// Spike Trap

	//#endregion

	//#region Mechanisms

	// Column of Blades

	// Dart Trap

	// Hidden Portcullis

	// Pillar

	// Pressure Plate

	// Pulley

	// Ram

	// Switch

	//#endregion

	//#region Siege Engines

	// Arrow Launcher

	// Boiling Oil Cauldron

	// Catapult

	// Exploding Mill Wheel

	// Field Ballista

	// Iron Dragon

	// Watchtower

	//#endregion

	//#region Arcane Objects

	// The Black Obelisk

	// The Chronal Hypercube

	// The Throne of A'An

	//#endregion

	//#region Power Fixtures

	// Psionic Shard

	// Holy Idol

	// Tree of Might

	//#endregion
}
