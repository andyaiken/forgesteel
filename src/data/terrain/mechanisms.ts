import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { Terrain } from '@/models/terrain';
import { TerrainCategory } from '@/enums/terrain-category';
import { TerrainRoleType } from '@/enums/terrain-role-type';

export const columnOfBlades: Terrain = {
	id: 'terrain-column-of-blades',
	name: 'Column of Blades',
	description:
    'A spinning wooden column is affixed with sharp blades to slash the unwary.',
	category: TerrainCategory.Mechanism,
	level: 3,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Defender,
		TerrainRoleType.Fortification
	),
	encounterValue: 3,
	area: '',
	direction: '',
	link: '',
	stamina: {
		base: 5,
		perSquare: 0
	},
	size: FactoryLogic.createSize(1, 'L'),
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: 'The column of blades must be completely destroyed.'
				})
			]
		},
		{
			id: 'activate',
			content: [
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description:
            'A creature or object moves adjacent to the column of blades.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'The **Spinning Blades** ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'spinning-blades',
						name: 'Spinning Blades',
						type: FactoryLogic.type.createTrigger(
							'A creature or object moves within distance of the column.',
							{ free: true }
						),
						keywords: [
							AbilityKeyword.Melee,
							AbilityKeyword.Weapon,
							AbilityKeyword.Strike
						],
						distance: [ FactoryLogic.distance.createMelee(0) ],
						target: 'The triggering creature or object',
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
					description: `Allies who shift don’t trigger the column. A creature observing an ally shift this way can make an **Intuition test** to shift in imitation of their movements.

* **11 or lower**: The creature triggers the column and the column's ability gains an edge.
* **12-16**: The creature triggers the column.
* **17+**: The creature doesn’t trigger the column.`
				})
			]
		}
	],
	upgrades: [
		{
			id: 'stone-column',
			label: 'Stone Column',
			cost: 1,
			text: 'The column is made of stone and has 8 Stamina',
			sections: []
		},
		{
			id: 'metal-column',
			label: 'Metal Column',
			cost: 1,
			text: 'The column is made of metal and has 11 Stamina.',
			sections: []
		},
		{
			id: 'concealed',
			label: 'Concealed',
			cost: 1,
			text: 'The blades are concealed inside the column, which remains motionless until triggered.',
			sections: []
		},
		{
			id: 'spiked-flails',
			label: 'Spiked Flails',
			cost: 4,
			text: 'Instead of blades, the column is affixed with heavy spiked balls attached by long chains. The **Whirling Flails** ability replaces **Spinning Blades**.',
			sections: [
				{
					id: 'spiked-flails',
					content: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'whirling-flails',
								name: 'Whirling Flails',
								type: FactoryLogic.type.createTrigger(
									'A creature or object moves within distance of the column.',
									{ free: true }
								),
								keywords: [
									AbilityKeyword.Melee,
									AbilityKeyword.Weapon,
									AbilityKeyword.Strike
								],
								distance: [ FactoryLogic.distance.createMelee(0) ],
								target: 'The triggering creature or object',
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
	description: 'A concealed dart thrower hurls missiles at short range.',
	category: TerrainCategory.Mechanism,
	level: 1,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Ambusher,
		TerrainRoleType.Trap
	),
	encounterValue: 1,
	area: '',
	link: '',
	stamina: {
		base: 3,
		perSquare: 0
	},
	direction: 'The dart trap fires in a fixed direction.',
	size: FactoryLogic.createSize(1, 'S'),
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `As a maneuver, a creature adjacent to a dart trap can make an **Agility test**.
			
* **11 or lower**: The creature triggers the trap and is targeted by it.
* **12-16**: The trap is deactivated but the creature is slowed (EoT).
* **17+**: The trap is deactivated and doesn’t trigger.`
				})
			]
		},
		{
			id: 'activate',
			content: [
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description:
            'A pressure plate, switch, or other linked trigger is activated.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'The **Dart** ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'effect-dart',
						name: 'Dart',
						type: FactoryLogic.type.createTrigger(
							'A pressure plate, switch, or other linked trigger is activated.',
							{ free: true }
						),
						keywords: [
							AbilityKeyword.Ranged,
							AbilityKeyword.Weapon,
							AbilityKeyword.Strike
						],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '2 damage',
									tier2: '4 damage',
									tier3: '5 damage'
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
					description: 'The dart trap is hidden until triggered or detected.'
				})
			]
		}
	],
	upgrades: [
		{
			id: 'poison-darts',
			label: 'Poison Darts',
			cost: 2,
			text: 'The darts are tipped with poison. Any creature who takes damage from a dart also takes 1d6 poison damage at the start of each of their turns (save ends).',
			sections: []
		},
		{
			id: 'large-darts',
			label: 'Large Darts',
			cost: 1,
			text: 'Larger, heavier darts impart kinetic force to the trap’s attack. A target of the **Dart** ability is pushed 1 square on a tier 1 outcome, 2 squares on a tier 2 outcome, or 3 squares on a tier 3 outcome.',
			sections: []
		},
		{
			id: 'gatling-darts',
			label: 'Gatling Darts',
			cost: 4,
			text: 'The dart trap is equipped with multiple barrels to launch darts at a high rate of fire. The **Dart** ability loses the Ranged and Strike and takes the Area keyword, its area becomes a 5 × 1 line within 1, and it deals an extra 1d6 damage.',
			sections: []
		}
	],
	state: {
		squares: 1,
		staminaDamage: 0
	}
};

export const pillar: Terrain = {
	id: 'terrain-pillar',
	name: 'Pillar',
	description:
    'This stone pillar can be toppled onto unsuspecting foes with the right amount of damage or a well-engineered trigger mechanism.',
	category: TerrainCategory.Mechanism,
	level: 2,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Hexer,
		TerrainRoleType.Hazard
	),
	encounterValue: 3,
	area: '',
	direction: 'The pillar topples in a preset direction.',
	link: '',
	stamina: {
		base: 6,
		perSquare: 0
	},
	size: 'One square that can’t be moved through',
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: 'The pillar’s linked trigger must be deactivated.'
				})
			]
		},
		{
			id: 'trigger-effect',
			content: [
				FactoryLogic.feature.create({
					id: 'trigger',
					name: 'Trigger',
					description:
            'The pillar is destroyed, or a pressure plate, switch, or other linked trigger is activated.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'The **Toppling Pillar** ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'effect-toppling-pillar',
						name: 'Toppling Pillar',
						type: FactoryLogic.type.createTrigger(
							'The pillar is destroyed, or a pressure plate, switch, or other linked trigger is activated.',
							{ free: true }
						),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.create({
								type: AbilityDistanceType.Line,
								value: 4,
								value2: 1,
								within: 1
							})
						],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '4 damage',
									tier2: '6 damage; M<1 restrained (save ends)',
									tier3: '9 damage; M<2 restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText(
								'The area is difficult terrain.'
							)
						]
					})
				})
			]
		}
	],
	upgrades: [
		{
			id: 'metal-pillar',
			label: 'Metal Pillar',
			cost: 1,
			text: 'The pillar is made of metal, has 9 Stamina, and deals 1d6 extra damage.',
			sections: []
		},
		{
			id: 'multiple-pillars',
			label: 'Multiple Pillars',
			cost: 3,
			text: 'Multiple pillars can be used to represent a larger toppling object such as a wall. If triggered by destruction, all individual pillars need to be destroyed before the object falls.',
			sections: []
		}
	],
	state: {
		squares: 1,
		staminaDamage: 0
	}
};

export const hiddenPortcullis: Terrain = {
	id: 'terrain-portcullis',
	name: 'Portcullis',
	description:
    'A portcullis is hidden in the ceiling of a passage or choke point waiting to drop when activated.',
	category: TerrainCategory.Mechanism,
	level: 3,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Ambusher,
		TerrainRoleType.Trap
	),
	encounterValue: 4,
	area: '2 × 1-square area, up to a 4 × 2-square area',
	direction: '',
	link: '',
	stamina: {
		base: 0,
		perSquare: 9
	},
	size: 'The area of the corridor to be blocked',
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `As a maneuver, a creature adjacent to a portcullis can make an **Agility test**.

* **11 or lower**: The creature triggers the portcullis and is affected as if in its area.
* **12-16**: The portcullis is deactivated but the creature is slowed (EoT).
* **17+**: The portcullis is deactivated and doesn’t trigger.`
				})
			]
		},
		{
			id: 'activate',
			content: [
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description:
            'A pressure plate, switch, or other linked trigger is activated.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'The **Heavy Gate** ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'effect-heavy-gate',
						name: 'Heavy Gate',
						type: FactoryLogic.type.createTrigger(
							'A pressure plate, switch, or other linked trigger is activated.',
							{ free: true }
						),
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.createSpecial(
								'The area of this ability is the area directly beneath the portcullis when it falls.'
							)
						],
						target: 'All creatures and objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '3 damage; slide 1, ignoring stability',
									tier2: '7 damage; a<2] restrained (save ends)',
									tier3: '10 damage; a<3] restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText(
								' The portcullis blocks movement from one side of it to the other. A target slid by the portcullis ends up on one side of it or the other (choose randomly). The portcullis must be manually reset.'
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
					description: 'The portcullis is hidden until triggered or detected.'
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

export const pressurePlate: Terrain = {
	id: 'terrain-pressure-plate',
	name: 'Pressure Plate',
	description:
    'This mechanism acts as a trigger for another linked mechanism, and is skillfully hidden from view in the floor.',
	category: TerrainCategory.Mechanism,
	level: 1,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Support,
		TerrainRoleType.Trigger
	),
	encounterValue: 2,
	area: 'One square, up to a 4 × 4-square area',
	direction: '',
	stamina: {
		base: 0,
		perSquare: 0
	},
	size: 'Any area',
	link: 'A pressure plate is linked to another mechanism that it activates when triggered.',
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `As a maneuver, a creature adjacent to a pressure plate can make an **Agility test**.

* **11 or lower**: The creature triggers the pressure plate.
* **12-16**: The pressure plate is deactivated but the creature is slowed (EoT).
* **17+**: The pressure plate is deactivated and doesn’t trigger.`
				})
			]
		},
		{
			id: 'activate',
			content: [
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description:
            'The pressure plate is calibrated to be triggered by creatures or objects of a particular size. The pressure plate triggers when a creature or object of the appropriate size enters its area.'
				})
			]
		},
		{
			id: 'effect',
			content: [
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description:
            'The linked mechanism is activated. A pressure plate automatically resets and can be triggered repeatedly.'
				})
			]
		},
		{
			id: 'hidden',
			content: [
				FactoryLogic.feature.create({
					id: 'hidden',
					name: 'Hidden',
					description:
            'The pressure plate is hidden until triggered or detected.'
				})
			]
		}
	],
	upgrades: [
		{
			id: 'tripwire',
			label: 'Tripwire',
			cost: -1,
			text: 'The pressure plate is a tripwire, which can trigger once and must be manually reset. A concealed tripwire can be discovered with an **easy Intuition test**.',
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
	description:
    'A counterweighted pulley system can be used to quickly ascend to the top of a wall, scaffold, tower, or other structure.',
	category: TerrainCategory.Mechanism,
	level: 1,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Support,
		TerrainRoleType.Trigger
	),
	encounterValue: 1,
	area: '',
	direction: '',
	link: '',
	stamina: {
		base: 1,
		perSquare: 0
	},
	size: FactoryLogic.createSize(1, 'S'),
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `As a maneuver, a creature adjacent to a pulley can make an **Agility test**.
			
* **11 or lower**: The creature triggers the pulley.
* **12-16**: The pulley is deactivated but the creature is slowed (EoT).
* **17+**: The pulley is deactivated and doesn’t trigger.`
				})
			]
		},
		{
			id: 'activate',
			content: [
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description:
            'A creature adjacent to the pulley uses a maneuver to release the pulley.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description:
            'The triggering creature is lifted to the top of the structure the pulley is attached to. The pulley must be manually reset.'
				})
			]
		},
		{
			id: 'Climbable',
			content: [
				FactoryLogic.feature.create({
					id: 'climbable',
					name: 'Climbable',
					description:
            'A creature adjacent to the pulley can climb its ropes with an **easy Agility test** to ascend to the top of the structure it’s attached to.'
				})
			]
		}
	],
	upgrades: [
		{
			id: 'looped-chain',
			label: 'Looped Chain',
			cost: 1,
			text: 'Instead of a rope and pulley, the system uses a counterweighted looped chain. A looped chain automatically resets and can be triggered repeatedly.',
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
	description:
    'A heavy wooden ram drops down or swings into the fray, crushing all in its path.',
	category: TerrainCategory.Mechanism,
	level: 2,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Ambusher,
		TerrainRoleType.Trap
	),
	encounterValue: 3,
	area: '1 × 3-square area or a 2 × 2-square area',
	link: '',
	stamina: {
		base: 0,
		perSquare: 3
	},
	size: 'Any area; the area can’t be moved through',
	direction: 'One side of the ram is defined as the front.',
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `As a maneuver, a creature adjacent to a ram can make an **Agility test**.

* **11 or lower**: The creature triggers the ram and is affected as if in it's space
* **12-16**: The ram is deactivated but the creature is slowed (EoT).
* **17+**: The ram is deactivated and doesn't trigger.`
				})
			]
		},
		{
			id: 'trigger-effect',
			content: [
				FactoryLogic.feature.create({
					id: 'trigger',
					name: 'Trigger',
					description:
            'A pressure plate, switch, or other linked trigger is activated.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'The **Ram** ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'effect-ram',
						name: 'Ram',
						type: FactoryLogic.type.createTrigger(
							'A pressure plate, switch, or other linked trigger is activated.',
							{ free: true }
						),
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.createSpecial(
								'The area of this ability is the path the ram moves through from its starting position.'
							)
						],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '3 damage; slide 1, ignoring stability',
									tier2: '6 damage; push 3',
									tier3: '9 damage; push 5'
								})
							),
							FactoryLogic.createAbilitySectionText(
								'A target slid by the ram ends up on one side of it or the other (choose randomly). The ram must be manually reset.'
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
					description: 'The ram is hidden until triggered or detected.'
				})
			]
		}
	],
	upgrades: [
		{
			id: 'stone',
			label: 'Stone',
			cost: 1,
			text: ' The ram is made of stone, has 6 Stamina per square, and deals an extra 1d3 damage.',
			sections: []
		},
		{
			id: 'metal',
			label: 'Metal',
			cost: 2,
			text: 'The ram is made of metal, has 9 Stamina per square, and deals an extra 1d6 damage.',
			sections: []
		},
		{
			id: 'repeating',
			label: 'Repeating',
			cost: 1,
			text: 'The ram automatically resets at the start of each round.',
			sections: []
		},
		{
			id: 'rapid-repeating',
			label: 'Rapid Repeating',
			cost: 3,
			text: 'The ram automatically resets at the start of each turn.',
			sections: []
		},
		{
			id: 'multiple-rams ',
			label: 'Multiple Rams ',
			cost: 3,
			text: 'Multiple rams can be used to represent a larger mechanism, such as a stack of tumbling logs.',
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
	description:
    'Set into any surface, this mechanism acts as a trigger for another linked mechanism.',
	category: TerrainCategory.Mechanism,
	level: 1,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Support,
		TerrainRoleType.Trigger
	),
	encounterValue: 1,
	area: '',
	direction: '',
	stamina: {
		base: 3,
		perSquare: 0
	},
	size: FactoryLogic.createSize(1, 'T'),
	link: 'A switch is linked to another mechanism that it activates when triggered',
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `As a maneuver, a creature adjacent to a switch can make an **Agility test.**
			
* **11 or lower**: The creature triggers the switch.
* **12-16**: The switch is deactivated but the creature is slowed (EoT).
* **17+**: The switch is deactivated and doesn’t trigger.`
				})
			]
		},
		{
			id: 'activate',
			content: [
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description:
            'A creature adjacent to the switch uses a maneuver to trigger it.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description:
            'The linked mechanism is activated. A switch automatically resets and can be triggered repeatedly.'
				})
			]
		}
	],
	upgrades: [
		{
			id: 'concealed',
			label: 'Concealed',
			cost: 1,
			text: 'The switch is hidden until triggered or detected.',
			sections: []
		}
	],
	state: {
		squares: 1,
		staminaDamage: 0
	}
};
