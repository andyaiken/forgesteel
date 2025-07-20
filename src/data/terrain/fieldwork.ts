import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { Terrain } from '../../models/terrain';
import { TerrainCategory } from '../../enums/terrain-category';
import { TerrainRoleType } from '../../enums/terrain-role-type';

export const archersStakes: Terrain = {
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
			text: 'A sticky slime or webbing has been applied to the stakes and the ground between them. A creature who enters a square triggers Sticky Stakes in addtion to normal archer\'s stakes effects.',
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
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											bonus: 2,
											tier1: 'no effect',
											tier2: 'A<1 slowed (EoT)',
											tier3: 'A<2 restrained (EoT)'
										})
									)
								]
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

export const bearTrap: Terrain = {
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'shift 1 to closest non trap square',
									tier2: '3 damage; A<1 slowed (save ends)',
									tier3: '5 damage; A<2 slowed (save ends)'
								})
							)
						]
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

export const flammableOil: Terrain = {
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

export const hideyHole: Terrain = {
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

export const paviseShield: Terrain = {
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

export const snareTrap: Terrain = {
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'shift 1 to closest non trap square',
									tier2: '1 damage; A<1 restrained (save ends)',
									tier3: '3 damage; A<2 restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('A creature restrained by this ability is vertically pulled 2 and suspended in the air by the snare line until they save. When they save they will fall.')
						]
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

export const spikeTrap: Terrain = {
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '2 damage; shift 1 to closest non trap square',
									tier2: '5 damage; A<0 prone',
									tier3: '8 damage; A<1 rpone, restrained (EoT)'
								})
							),
							FactoryLogic.createAbilitySectionText('Once the trap has been triggered, any creature that moves into a trap square ends their movement and triggers the Spike Trap ability. The open pit is 2 square deep.')
						]
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
