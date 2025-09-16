import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { Terrain } from '../../models/terrain';
import { TerrainCategory } from '../../enums/terrain-category';
import { TerrainRoleType } from '../../enums/terrain-role-type';

export const angryBeehive: Terrain = {
	id: 'terrain-angry-beehive',
	name: 'Angry Beehive',
	description: 'This beehive is full of angry bees who swarm and attack with little provocation.',
	category: TerrainCategory.Environmental,
	level: 2,
	role: FactoryLogic.createTerrainRole(MonsterRoleType.Harrier, TerrainRoleType.Hazard),
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
			id: 'angry-beehive-details',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: 'The beehive can’t be deactivated. If it takes damage or is destroyed, the hive unleashes a swarm of bees.'
				}),
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description: 'A creature enters the hive’s space or an adjacent space without shifting.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'The hive is removed from the encounter map and a swarm of bees is placed in one square of the space of the triggering creature. Any creature who starts their turn in the swarm’s space takes 3 poison damage. At the start of each round, the swarm moves 1 square and its size increases by 1 square (to 2 squares by 2 squares, 3 squares by 3 squares, and so forth), preferring squares in a creature’s space. After 3 rounds, the swarm dissipates.'
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
			cost: 2,
			text: ' The bees are a particularly aggressive and dangerous species. The hive triggers even if a creature shifts into or while adjacent to it, and the swarm deals 1d6 + 3 poison damage.',
			sections: []
		}
	],
	state: {
		squares: 1,
		staminaDamage: 0
	}
};

export const brambles: Terrain = {
	id: 'terrain-brambles',
	name: 'Brambles',
	description: 'This thicket features close-growing vines tipped with sharp thorns.',
	category: TerrainCategory.Environmental,
	level: 1,
	role: FactoryLogic.createTerrainRole(MonsterRoleType.Defender, TerrainRoleType.Fortification),
	encounterValue: 1,
	area: '10 x 10 thicket',
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
			id: 'brambles-details',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: 'Each square of brambles must be individually destroyed.'
				}),
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description: 'A creature enters a square of brambles without shifting.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'A creature takes 1 damage per square of brambles they enter.'
				})
			]
		}
	],
	upgrades: [
		{
			id: 'poisonous-thorns',
			label: 'Poisonous Thorns',
			cost: 1,
			text: 'The brambles are poisonous. Any creature who takes damage from brambles is also bleeding (save ends).',
			sections: []
		}
	],
	state: {
		squares: 1,
		staminaDamage: 0
	}
};

export const corrosivePool: Terrain = {
	id: 'terrain-corrosive-pool',
	name: 'Corrosive Pool',
	description: 'This shallow pool bubbles with acid or some other corrosive liquid.',
	category: TerrainCategory.Environmental,
	level: 2,
	role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
	encounterValue: 3,
	area: '10 x 10 pool',
	direction: '',
	link: '',
	stamina: {
		base: 0,
		perSquare: 12
	},
	size: 'One or more squares of difficult terrain',
	damageMods: [],
	sections: [
		{
			id: 'corrosive-pool-damage-immunity',
			content: [
				FactoryLogic.feature.create({
					id: 'damage-immunity',
					name: 'Immunity',
					description: '20 to all damage except cold or fire damage'
				})
			]
		},
		{
			id: 'corrosive-pool-details',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: 'The pool must be completely destroyed'
				}),
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description: 'A creature or object enters the corrosive pool or starts their turn there. The liquid in the pool is also highly volatile (see Explosive Reaction below).'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'A creature or object takes 3 acid damage if they start their turn in the pool, and takes 3 acid damage for each square of the pool they enter.'
				}),
				FactoryLogic.feature.create({
					id: 'allied-awareness',
					name: 'Allied Awareness',
					description: 'Allies who have weapons are equipped with torches. Any ally can use a maneuver to throw a torch up to 5 squares and deal 1 fire damage to the pool, triggering Explosive Reaction.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'effect-explosive-reaction',
						name: 'Explosive Reaction',
						type: FactoryLogic.type.createTrigger('The pool takes fire damage.', { free: true }),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '3 fire damage; M < 1 burning (save ends)',
									tier2: '6 fire damage; M < 2 burning (save ends)',
									tier3: '9 fire damage; M < 3 burning (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('The liquid in the pool is consumed. This ability has a double edge against any target in the pool. A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round. Any target with acid weakness takes extra damage from this ability and while burning as if the fire damage were acid damage. ')
						]
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

export const frozenPond: Terrain = {
	id: 'terrain-frozen-pond',
	name: 'Frozen Pond',
	description: 'A shallow, frozen patch of water features ice thick enough that it won’t break, but its surface is slick and treacherous to navigate.',
	category: TerrainCategory.Environmental,
	level: 1,
	role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
	encounterValue: 1,
	area: '10 x 10 pond',
	direction: '',
	link: '',
	stamina: {
		base: 0,
		perSquare: 3
	},
	size: 'One or more squares of difficult terrain',
	damageMods: [],
	sections: [
		{
			id: 'frozen-pond-immunity',
			content: [
				FactoryLogic.feature.create({
					id: 'damage-immunity',
					name: 'Immunity',
					description: '5 to all damage except fire damage'
				})
			]
		},
		{
			id: 'frozen-pond-details',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: 'Destroying a square of the frozen pond turns the square into shallow icy water.'
				}),
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description: 'A creature moves into a pond’s square without shifting.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'The **Slippery Surface** ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'effect-slippery-surface',
						name: 'Slippery Surface',
						type: FactoryLogic.type.createTrigger('A creature or object enters a square of the frozen pond without shifting.', { free: true }),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(0) ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'Push 1 in the direction the target was moving',
									tier2: 'Push 2 in the direction the target was moving; A < 1 slowed (save ends)',
									tier3: 'Push 3 in the direction the target was moving; A < 2 prone and can’t stand (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('The triggering creature’s movement ends, then they are force moved. If the target triggered this ability by being force moved, this ability gains an edge and any remaining forced movement distance is added to the ability’s forced movement. The ability’s forced movement doesn’t trigger the ability again.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'effect-icy-water',
						name: 'Icy Water',
						type: FactoryLogic.type.createTrigger('A creature or object enters or falls prone in a square of the frozen pond.', { free: true }),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(0) ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'Slide 1',
									tier2: '1 cold damage; M < 1 slowed (save ends)',
									tier3: '3 cold damage; M < 2 restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('The triggering creature’s movement ends, then they are force moved if applicable.')
						]
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
			text: `
The ice covering the pond is thin and the water is deeper. Whenever a creature or object enters or falls prone in a square of the frozen pond, that square is destroyed and replaced with icy water. The Icy Water ability replaces Slippery Surface.

Any creature who starts their turn in the icy water takes 1 cold damage. If the water is deep enough, a creature can swim beneath the surface of the frozen pond, but takes this cold damage while doing so.`,
			sections: []
		}
	],
	state: {
		squares: 1,
		staminaDamage: 0
	}
};

export const lava: Terrain = {
	id: 'terrain-lava',
	name: 'Lava',
	description: 'A patch of blisteringly hot molten rock wells up from the ground, threatening anyone who gets close to it.',
	category: TerrainCategory.Environmental,
	level: 3,
	role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
	encounterValue: 4,
	area: '10 x 10 patch',
	direction: '',
	link: '',
	stamina: {
		base: 0,
		perSquare: 12
	},
	size: 'One or more squares of difficult terrain',
	damageMods: [],
	sections: [
		{
			id: 'lava-immunity',
			content: [
				FactoryLogic.feature.create({
					id: 'damage-immunity',
					name: 'Immunity',
					description: '20 to all damage except cold damage'
				})
			]
		},
		{
			id: 'lava-details',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: 'Each square of lava must be individually destroyed.'
				}),
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description: 'A creature or object enters the lava or starts their turn there, or starts their turn adjacent to the lava.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'The **Liquid Hot Magma** ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'effect-liquid-hot-magma',
						name: 'Liquid Hot Magma',
						type: FactoryLogic.type.createTrigger('A creature or object enters the lava or starts their turn there, or starts their turn adjacent to the lava.', { free: true }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '5 fire damage; M < 1 the tareget is burning (save ends)',
									tier2: '9 fire damage; M < 2 the target is burning (save ends)',
									tier3: '12 fire damage; M < 3 the target is burning (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('If the target is adjacent to lava but not in it, this ability takes a bane. A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round. ')
						]
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
			text: 'The lava is flowing! At the start of each round, add one square of lava adjacent to an existing square of lava.',
			sections: []
		}
	],
	state: {
		squares: 1,
		staminaDamage: 0
	}
};

export const quicksand: Terrain = {
	id: 'terrain-quicksand',
	name: 'Quicksand',
	description: 'When this patch of sand is stepped on, it is revealed to be a slurry saturated by water—and ready to draw creatures down to their doom.',
	category: TerrainCategory.Environmental,
	level: 3,
	role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
	encounterValue: 3,
	area: '10 x 10 patch',
	direction: '',
	link: '',
	stamina: {
		base: 0,
		perSquare: 0
	},
	size: 'One or more squares of terrain',
	damageMods: [],
	sections: [
		{
			id: 'quicksand-details',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: '—'
				}),
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description: 'A creature or object enters the quicksand or starts their turn there.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'The **Grasping Depths** ability.'
				}),
				FactoryLogic.feature.create({
					id: 'hidden',
					name: 'Hidden',
					description: 'The quicksand is hidden until triggered or detected.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'effect-grasping-depths',
						name: 'Grasping Depths',
						type: FactoryLogic.type.createTrigger('A creature or object enters the quicksand or starts their turn there.', { free: true }),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(0) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'M < 0 slowed (save ends)',
									tier2: 'M < 1 restrained (save ends)',
									tier3: 'M < 2 restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('This ability takes a bane if a triggering creature shifted into the quicksand. A character who starts their turn restrained this way is suffocating.')
						]
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

export const toxicPlants: Terrain = {
	id: 'terrain-toxic-plants',
	name: 'Toxic Plants',
	description: 'Colorful mushrooms or lovely flowering plants release a cloud of spores or pollen when disturbed, causing creatures to fall into a magical slumber.',
	category: TerrainCategory.Environmental,
	level: 2,
	role: FactoryLogic.createTerrainRole(MonsterRoleType.Hexer, TerrainRoleType.Hazard),
	encounterValue: 2,
	area: '10 x 10 field',
	direction: '',
	link: '',
	stamina: {
		base: 0,
		perSquare: 3
	},
	size: 'One or more squares of terrain',
	damageMods: [],
	sections: [
		{
			id: 'toxic-plants-details',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: 'Each square of plants must be individually destroyed.'
				}),
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description: 'A creature starts their turn in the area of the toxic plants, or enters a square of toxic plants without shifting.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'The **Sleep Spores** ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'effect-sleep-spores',
						name: 'Sleep Spores',
						type: FactoryLogic.type.createTrigger('A creature starts their turn in the area of the toxic plants, or enters a square of toxic plants without shifting.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'M < 0 dazed (save ends)',
									tier2: 'M < 1 dazed (save ends)',
									tier3: 'M < 2 dazed (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('While dazed this way, a target who starts their turn in the area of the toxic plants falls prone and can’t stand.')
						]
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
			text: 'Any creature dazed by this hazard takes 1d6 poison damage at the start of each of their turns.',
			sections: []
		},
		{
			id: 'carnivorous-plants',
			label: 'Carnivorous Plants',
			cost: 2,
			text: ' The plants are carnivorous and attempt to slowly digest any creature who falls among them. Any creature who starts their turn prone in the area takes 4 acid damage.',
			sections: []
		}
	],
	state: {
		squares: 1,
		staminaDamage: 0
	}
};
