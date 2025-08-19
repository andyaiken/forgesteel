import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { Terrain } from '../../models/terrain';
import { TerrainCategory } from '../../enums/terrain-category';
import { TerrainRoleType } from '../../enums/terrain-role-type';

export const columnOfBlades: Terrain = {
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
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '4 damage',
									tier2: '6 damage; M<2 bleeding (save ends)',
									tier3: '9 damage; M<3 bleeding (save ends)'
								})
							)
						]
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
								target: 'One creature or object',
								sections: [
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											bonus: 2,
											tier1: '5 damage',
											tier2: '8 damage; M<2 dazed (save ends)',
											tier3: '11 damage; M<3 dazed (save ends)'
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

export const dartTrap: Terrain = {
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
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '1 damage',
									tier2: '2 damage',
									tier3: '3 damage'
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

export const hiddenPortcullis: Terrain = {
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '3 damage; slide 1 (ignores stability)',
									tier2: '7 damage; restrained (EoT)',
									tier3: '10 damage; restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('The portcullis blocks movement through its squares. There is a 50% chance that a slid target winds up on either side of the portcullis. When the restrained condition ends for a creature, the creature shifts 1 out of the hidden portcullis squares.')
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

export const pillar: Terrain = {
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '4 damage',
									tier2: '6 damage; M<1 restrained (EoT)',
									tier3: '9 damage; M<2 restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('The squares affected become difficult terrain.')
						]
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

export const pressurePlate: Terrain = {
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

export const pulley: Terrain = {
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

export const ram: Terrain = {
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
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '3 damage; slide 1 (ignores stability)',
									tier2: '6 damage; push 3',
									tier3: '9 damage; push 5'
								})
							),
							FactoryLogic.createAbilitySectionText('There is a 50% chance that a slid target winds up on either side of the ram.')
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

export const switchTerrain: Terrain = {
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
