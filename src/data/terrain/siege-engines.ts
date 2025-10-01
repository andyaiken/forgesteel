import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { Terrain } from '@/models/terrain';
import { TerrainCategory } from '@/enums/terrain-category';
import { TerrainRoleType } from '@/enums/terrain-role-type';

export const arrowLauncher: Terrain = {
	id: 'terrain-arrow-launcher',
	name: 'Arrow Launcher',
	description: 'A small wooden cart uses alchemical rockets to launch up to a hundred arrows at a time across a wide area.',
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
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `
As a maneuver, a creature adjacent to an arrow launcher can make an **Agility test**.

* **11-**: The creature accidentally activates the **Arrow Storm** ability.
* **12-16**: The arrow launcher is deactivated but the creature is slowed (EoT).
* **17+**: The arrow launcher is deactivated and can’t be used.`
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 20 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 0,
									tier1: '5 damage',
									tier2: '8 damage',
									tier3: '11 damage'
								})
							),
							FactoryLogic.createAbilitySectionText('This ability can’t be used again until the arrow launcher is reloaded.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The arrow launcher is reloaded, allowing **Arrow Storm** to be used again. This action can be used only once per round.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The next use of **Arrow Storm** gains an edge and has a +10 bonus to ranged distance. This action can be used only once per round.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The arrow launcher and the creature using this action move together up to 3 squares.')
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
			text: '**Arrow Storm** deals fire damage, and can ignite flammable objects in its area.',
			sections: []
		},
		{
			id: 'screamers',
			label: 'Screamers',
			cost: 3,
			text: 'The arrows make a high-pitched screaming noise as they are fired and descend onto their targets. The Screamers ability replaces **Arrow Storm**.',
			sections: [
				{
					id: 'screamers',
					content: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'screamers',
								name: 'Screamers',
								type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 20 }) ],
								target: 'Each creature and object in the area',
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											bonus: 0,
											tier1: '5 damage; R<0 dazed (save ends)',
											tier2: '8 damage; R<1 dazed (save ends)',
											tier3: '11 damage; R<1 frightened (save ends)'
										})
									),
									FactoryLogic.createAbilitySectionText('This ability can’t be used again until the arrow launcher is reloaded.')
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
	description: 'A large cauldron of boiling oil stands ready to be poured onto enemies.',
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
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `
As a maneuver, a creature adjacent to a boiling oil cauldron can make an **Agility test**.

* **11-**: The creature accidentally activates the **Boiling Oil** ability.
* **12-16**: The boiling oil cauldron is deactivated but the creature is slowed (EoT).
* **17+**: The boiling oil cauldron is deactivated and can’t be used.`
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '5 fire damage; M<1 burning (save ends)',
									tier2: '9 fire damage; M<2 burning (save ends)',
									tier3: '12 fire damage; M<3 burning (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('If the boiling oil is poured down on targets from above, it has high ground and gains an edge on the power roll. A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round. This ability can’t be used again until the boiling oil cauldron is reloaded.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The boiling oil cauldron is reloaded, allowing **Boiling Oil** to be used again. This action can be used only once per round.')
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
	description: 'This massive counterweighted engine hurls a heavy projectile for a devastating assault.',
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
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `
As a maneuver, a creature adjacent to a catapult can make an **Agility test**.

* **11-**: The creature accidentally activates the **Arcing Shot** ability.
* **12-16**: The catapult is deactivated but the creature is slowed (EoT).
* **17+**: The catapult is deactivated and can’t be used.`
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 20 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '5 damage',
									tier2: '9 damage; A<0 push 1',
									tier3: '12 damage; A<1 push 2'
								})
							),
							FactoryLogic.createAbilitySectionText('Line of effect for this ability is an arc that can be traced over obstacles between the catapult and the target area. This ability can’t be used again until the catapult is reloaded.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The catapult is reloaded, allowing **Arcing Shot** to be used again. This action can be used only once per round.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The next use of **Arcing Shot** gains an edge and has a +10 bonus to ranged distance. This action can be used only once per round.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The catapult and the creature using this action move together up to 2 squares.')
						]
					})
				})
			]
		}
	],
	upgrades: [
		{
			id: 'fire-my-boy',
			label: 'Air Assault',
			cost: 2,
			text: 'The side fielding the catapult has trained their forces to safely use the siege engine to launch them across the battlefield. As an adjacent creature main action, the catapult can be used to vertical push 10 any ally of size 1L or less. If the ally lands in an unoccupied space, they take no damage.',
			sections: []
		},
		{
			id: 'i-love-it-here',
			label: 'Flammable',
			cost: 2,
			text: '**Arcing Shot** deals fire damage, and the area of that ability is on fire until the end of the encounter. Any creature who enters the area for the first time in a round or starts their turn there takes 2 fire damage.',
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
	description: 'A massive wooden wheel is loaded with explosives and rolled toward enemy forces or fortifications, ready to explode.',
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
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `
As a maneuver, a creature adjacent to an exploding mill wheel that isn’t rolling can make an **Agility test**.

* **11-**: The creature accidentally activates the **Roll the Wheel** ability.
* **12-16**: The exploding mill wheel is deactivated but the creature is slowed (EoT).
* **17+**: The exploding mill wheel is deactivated and can’t be used.

Once the wheel is rolling, it can’t be deactivated. However, it can be exploded early by destroying it or blocking its movement with a suitably large creature or object.`
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.createSpecial('Special') ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionText(`
When this ability is used and at the start of every turn thereafter, the exploding mill wheel rolls, moving 2 squares in a straight line. Each creature and object of size 2 or smaller in the area defined by the wheel’s movement is targeted by the following power roll. A target force moved this way is moved to either side of the wheel, as the Director determines.

* **11-**: 5 damage; push 1
* **12-16**: 9 damage; push 2
* **17+**: 12 damage; push 3

If the wheel enters the space of any creature or object of size 3 or larger, or if it is reduced to 0 Stamina, its movement stops and it explodes. Each creature and object in a 5 burst centered on the wheel is targeted by the following power roll.

* **11-**: 5 damage; push 1; M<0 burning (save ends)
* **12-16**: 9 damage; push 2; M<1 burning (save ends)
* **17+**: 12 damage; push 3; M<2 burning (save ends)

A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round.`)
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
			text: `
The wheel has been fitted with a control mechanism and a pilot’s seat for a creature of size 1M or smaller. As a move action, the pilot can turn the wheel in any direction while it is moving. As a main action, the pilot can leap out of the pilot’s seat, landing in an adjacent space while the wheel continues moving in a straight line.

Without proper training, determining how to pilot the wheel requires a **Reason test**.

* **11-**: The wheel immediately explodes as if striking a size 3 or larger creature or object.
* **12-16**: The creature fails to pilot the wheel.
* **17+**: The creature can pilot the wheel.

On a natural 19 or 20, a creature can both pilot the wheel and can disarm its explosives as a maneuver.`,
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
	description: 'A massive crossbow fires thick metal bolts with devastating effect.',
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
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `
As a maneuver, a creature adjacent to a field ballista can make an **Agility test**.

* **11-**: The creature accidentally activates the **Release Bolt** ability.
* **12-16**: The field ballista is deactivated but the creature is slowed (EoT).
* **17+**: The field ballista is deactivated and can’t be used.`
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '5 damage',
									tier2: '8 damage; M<1 push 1',
									tier3: '11 damage; M<2 push 2'
								})
							),
							FactoryLogic.createAbilitySectionText('This ability can’t be used again until the field ballista is reloaded.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The field ballista is reloaded, allowing **Release Bolt** to be used again. This action can be used only once per round.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The next use of **Release Bolt** gains an edge and has a +10 bonus to ranged distance. This action can be used only once per round.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The field ballista and the creature using this action move together up to 3 squares.')
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
			text: 'The field ballista targets the nearest two additional creatures or objects in a straight line beyond the initial target.',
			sections: []
		},
		{
			id: 'chain-bolt',
			label: 'chain-bolt',
			cost: 2,
			text: 'The field ballista’s bolts are set with heavy chains that wrap around targets. The **Chain Bolt** ability replaces **Release Bolt**, and the field ballista gains the **Crank the Chain** ability.',
			sections: [
				{
					id: 'chain-bolt',
					content: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'chain-bolt',
								name: 'Chain Bolt',
								type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
								keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
								distance: [ FactoryLogic.distance.createRanged(20) ],
								target: 'One creature or object',
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											bonus: 2,
											tier1: '4 damage',
											tier2: '7 damage; M<1 slowed (save ends)',
											tier3: '10 damage; M<2 slowed (save ends)'
										})
									),
									FactoryLogic.createAbilitySectionText('This ability can’t be used again until the field ballista is reloaded.')
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'crank-chain',
								name: 'Crank Chain',
								type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
								keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
								distance: [ FactoryLogic.distance.createRanged(20) ],
								target: 'One creature',
								sections: [
									FactoryLogic.createAbilitySectionField({
										name: 'Special',
										effect: 'The target must be slowed by the field ballista.'
									}),
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											bonus: 2,
											tier1: 'Pull 1',
											tier2: 'Pull 3',
											tier3: 'Pull 5'
										})
									),
									FactoryLogic.createAbilitySectionText('This forced movement triggers opportunity attacks.')
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
	description: 'A massive metal device uses a bellows system and liquid fuel to shoot out gouts of flame.',
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
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `
As a maneuver, a creature adjacent to an iron dragon can make an **Agility test**.

* **11-**: The creature accidentally activates the **Gout of Flame** ability.
* **12-16**: The iron dragon is deactivated but the creature is slowed (EoT).
* **17+**: The iron dragon is deactivated and can’t be used.`
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 8, value2: 2, within: 1 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '6 fire damage; A < 0 burning (save ends)',
									tier2: '10 fire damage; A < 1 burning (save ends)',
									tier3: '13 fire damage; A < 2 burning (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round. This ability can’t be used again until the iron dragon is reloaded.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The iron dragon is reloaded, allowing **Gout of Flame** to be used again. This action can be used only once per round.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The next use of **Gout of Flame** gains an edge and has a +10 bonus to ranged distance. This action can be used only once per round.')
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
						type: FactoryLogic.type.createMain({ qualifiers: [ 'adjacent creature' ] }),
						sections: [
							FactoryLogic.createAbilitySectionText('The iron dragon and the creature using this action move together up to 2 squares')
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
	description: 'A sturdy wooden tower accessed by interior ladders or stairs provides cover and high ground for attackers.',
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
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: 'The watchtower must be completely destroyed.'
				})
			]
		},
		{
			id: 'high-ground',
			content: [
				FactoryLogic.feature.create({
					id: 'high-ground',
					name: 'High Ground and Cover',
					description: 'Creatures who have access to the watchtower’s interior ladders or stairs have high ground and cover against creatures outside the watchtower.'
				})
			]
		},
		{
			id: 'getting-inside',
			content: [
				FactoryLogic.feature.create({
					id: 'getting-inside',
					name: 'Getting Inside',
					description: `
A creature outside and adjacent to the watchtower can gain access to the interior by climbing it as an Agility test or breaking into it with a **Might test**.

* **11-**: 1d6 damage; the creature remains outside the watchtower
* **12-16**: The creature remains outside the watchtower.
* **17+**: The creature gains access to the watchtower.`
				})
			]
		}
	],
	upgrades: [
		{
			id: 'ballista-empowerment',
			label: 'Ballista Empowerment',
			cost: 12,
			text: 'The watchtower is equipped with a field ballista that can be used by creatures in the watchtower. The ballista can’t be moved.',
			sections: []
		},
		{
			id: 'boiling-oil-cauldron',
			label: 'Boiling Oil Cauldron',
			cost: 17,
			text: 'The watchtower is equipped with a boiling oil cauldron that can be used by creatures in the watchtower.',
			sections: []
		},
		{
			id: 'spyglass',
			label: 'Spyglass',
			cost: 2,
			text: 'Any creature in the watchtower can use the spyglass to search for hidden creatures around the tower, gaining an edge on the Intuition test and increasing the distance at which creatures can be spotted to 15 squares.',
			sections: []
		},
		{
			id: 'stone-tower',
			label: 'Stone Tower',
			cost: 2,
			text: 'The watchtower is reinforced with stone and has 75 Stamina.',
			sections: []
		},
		{
			id: 'iron-tower',
			label: 'Iron Tower',
			cost: 4,
			text: 'The watchtower is reinforced with stone and iron and has 100 Stamina.',
			sections: []
		}
	],
	state: {
		squares: 1,
		staminaDamage: 0
	}
};
