import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { Terrain } from '../../models/terrain';
import { TerrainCategory } from '../../enums/terrain-category';
import { TerrainRoleType } from '../../enums/terrain-role-type';

export const arrowLauncher: Terrain = {
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 0,
									tier1: '5 damage',
									tier2: '8 damage',
									tier3: '11 damage'
								})
							),
							FactoryLogic.createAbilitySectionText('Arrow Storm cannot be used again until the object is reloaded.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The object is reloaded, allowing Arrow Storm to be used again.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The next use of Arrow Storm has an edge and +10 range.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('This object moves 3 and the adjacent creature using their action moves 3 as long as they end their move adjacent ot this object.')
						]
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
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											bonus: 0,
											tier1: '5 damage; R<0 dazed (save ends)',
											tier2: '8 damage; R<1 dazed (save ends)',
											tier3: '11 damage; R<1 frightened (save ends)'
										})
									),
									FactoryLogic.createAbilitySectionText('Screamers cannot be uses again until the object is reloaded.')
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

export const boilingOilCauldron: Terrain = {
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '5 fire damage; M<1 burning (save ends)',
									tier2: '9 fire damage; M<2 burning (save ends)',
									tier3: '12 fire damage; M<3 burning (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('A burning creature or object takes 1d6 fire damage at the start of each of their turns until the effect ends. Boiling Oil cannot be used again until the object is reloaded.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The object is reloaded, allowing Boiling Oil to be used again.')
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

export const catapult: Terrain = {
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '5 damage',
									tier2: '9 damage; A<0 push 1',
									tier3: '12 damage; A<1 push 2'
								})
							)
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The object is reloaded, allowing Arcing Shot to be used again.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The next use of Arcing Shot has an edge and +10 range.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('This object moves 2 and the adjacent creature using their action moves 2 as long as they end their move adjacent ot this object.')
						]
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

export const explodingMillWheel: Terrain = {
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
						sections: [
							FactoryLogic.createAbilitySectionText('The exploding mill wheel begins to roll. It immediately moves 2 in a straight line, using the Crushing Wheel ability on any creature or object it moves through. At the beginning of every creature’s turn the exploding mill wheel continues to move in a straight line, using the Crushing Wheel ability on any creature of object it moves through. Creatures and objects of size 2 or smaller do not stop the wheel’s movement.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '5 damage; push 1',
									tier2: '9 damage; push 2',
									tier3: '12 damage; push 3'
								})
							),
							FactoryLogic.createAbilitySectionText('Make one power roll against every square the exploding mill wheel enters.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '5 damage; push 1; M<0 burning (save ends)',
									tier2: '9 damage; push 2; M<1 burning (save ends)',
									tier3: '12 damage; push 3; M<2 burning (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('The exploding mill wheel is destroyed.')
						]
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

export const fieldBallista: Terrain = {
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '5 damage',
									tier2: '8 damage; M<1 push 1',
									tier3: '11 damage; M<2 push 2'
								})
							),
							FactoryLogic.createAbilitySectionText('Release Bolt cannot be used again until the object is reloaded.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The object is reloaded, allowing Release Bolt or Chain Bolt to be used again.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The next use of Release Bolt or Chain Bolt has an edge and +10 range.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('This object moves 3 and the adjacent creature using their action moves 3 as long as they end their move adjacent ot this object.')
						]
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
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											bonus: 2,
											tier1: '4 damage',
											tier2: '7 damage; M<1 slowed (save ends)',
											tier3: '10 damage; M<2 slowed (save ends)'
										})
									),
									FactoryLogic.createAbilitySectionText('Chain Bolt cannot be used again until the object is reloaded.')
								]
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
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											bonus: 2,
											tier1: 'pull 1',
											tier2: 'pull 3',
											tier3: 'pull 5'
										})
									),
									FactoryLogic.createAbilitySectionText('This forced movement will trigger opportunity attacks.')
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

export const ironDragon: Terrain = {
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '6 damage; A<0 burning (save ends)',
									tier2: '10 damage; A<1 burning (save ends)',
									tier3: '13 damage; A<2 burning (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('A burning creature or object takes 1D6 fire damage at the start of each of their turns until the effect ends. Gout of Flame cannot be used until the object is reloaded.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The object is reloaded, allowing Gout of Flame to be used again.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The next use of Gout of Flame has an edge and +10 range.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('This object moves 2 and the adjacent creature using their action moves 2 as long as they end their move adjacent ot this object.')
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

export const watchtower: Terrain = {
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
