import { AbilityKeyword } from '@/enums/ability-keyword';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { Terrain } from '@/models/terrain';
import { TerrainCategory } from '@/enums/terrain-category';
import { TerrainRoleType } from '@/enums/terrain-role-type';

export const archersStakes: Terrain = {
	id: 'terrain-archers-stakes',
	name: 'Archer\'s Stakes',
	description:
    'A series of sharp stakes have been placed point-out to protect defenders against charges and other direct attacks.',
	category: TerrainCategory.Fieldwork,
	level: 1,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Defender,
		TerrainRoleType.Fortification
	),
	encounterValue: 1,
	area: '4 x 1-square area',
	direction: 'One side of the stakes is defined as the front.',
	link: '',
	stamina: {
		base: 0,
		perSquare: 3
	},
	size: 'One or more squares of difficult terrain',
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: 'Each square of stakes must be individually destroyed.'
				})
			]
		},
		{
			id: 'activate',
			content: [
				FactoryLogic.feature.create({
					id: 'activate',
					name: 'Activate',
					description: 'A creature enters an area of stakes from the front.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description:
            'The triggering creature takes 2 damage per square of stakes they enter. If they are force moved into an area of stakes, they take an additional 3 damage.'
				})
			]
		},
		{
			id: 'allied-awareness',
			content: [
				FactoryLogic.feature.create({
					id: 'allied-awareness',
					name: 'Allied Awareness',
					description:
            'Allies of this object ignore the difficult terrain created by the stakes, take no damage from moving through the stakes unless they are force moved, and have cover while in an area of archer’s stakes.'
				})
			]
		}
	],
	upgrades: [
		{
			id: 'poison',
			label: 'Poison',
			cost: 2,
			text: 'The tips of the stakes have poison applied to them. Any creature who takes damage from the stakes also takes 1d6 poison damage at the start of each of their turns (save ends).',
			sections: []
		},
		{
			id: 'sticky',
			label: 'Sticky',
			cost: 3,
			text: 'A sticky slime or webbing has been applied to the stakes and the ground between them. Any creature who enters an area or stakes triggers the *Sticky Stakes* ability in addtion to suffering the stake\'s other effects.',
			sections: [
				{
					id: 'sticky',
					content: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'effect-sticky-stakes',
								name: 'Sticky Stakes',
								type: FactoryLogic.type.createTrigger(
									'A creature or object enters an area of sticky stakes.',
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
											tier1: 'no effect',
											tier2: 'A<1 slowed (save ends)',
											tier3: 'A<2 restrained (save ends)'
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
	description:
    'A set of spring-loaded steel jaws stands ready to snap shut when stepped on.',
	category: TerrainCategory.Fieldwork,
	level: 1,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Ambusher,
		TerrainRoleType.Trap
	),
	encounterValue: 2,
	area: '',
	direction: '',
	link: '',
	stamina: {
		base: 6,
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
					description: `As a maneuver, a creature adjacent to a bear trap can make an *Agility test.*

* **11 or lower**: The creature triggers the trap and is affected as if in its space.
* **12-16**: The trap is deactivated but the creature is slowed (EoT).
* **17+:** The trap is deactivated and doesn’t trigger.`
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
            'The bear trap is calibrated to be triggered by creatures or objects of a particular size or larger. The trap triggers when a creature or object of the appropriate size enters its space.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description:
            'A triggering creature or object ends their movement and is targeted by the *Bear Trap* ability.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'effect-bear-trap',
						name: 'Bear Trap',
						type: FactoryLogic.type.createTrigger(
							'A creature or object of the appropriate size enters the trap’s space.',
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
									tier1: 'The target shifts 1 square away from the trap.',
									tier2: '3 damage; A<1 slowed (save ends)',
									tier3: '5 damage; A<2 slowed (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText(
								'The bear trap must be manually reset.'
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
					description: 'The bear trap is hidden until triggered or detected.'
				})
			]
		}
	],
	upgrades: [
		{
			id: 'chain',
			label: 'Chain',
			cost: 1,
			text: 'The bear trap is attached to the ground by a steel chain. A target who would be made slowed by the trap is restrained instead.',
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
	description:
    'A patch of flammable oil or pitch on the ground is ready to be ignited.',
	category: TerrainCategory.Fieldwork,
	level: 1,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Ambusher,
		TerrainRoleType.Trap
	),
	encounterValue: 2,
	area: '10x10',
	direction: '',
	link: '',
	stamina: {
		base: 0,
		perSquare: 0
	},
	size: 'One or more squares',
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `As a maneuver, a creature adjacent to a patch of flammable oil can make an **Agility test**.

* **11 or lower**: The creature ignites the oil and is affected as if in its area.
* **12-16**: The oil temporarily ignites before safely burning out, and the creature takes 3 fire damage and is burning (save ends).
* * **17+**: The oil is rendered safe and can’t be ignited.`
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
            'A creature or object in a square of oil takes fire damage, or a creature or object enters a square of burning oil or starts their turn there.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description:
            'The triggering creature or object takes 3 fire damage and is burning (save ends). A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round.'
				})
			]
		},
		{
			id: 'allied-awareness',
			content: [
				FactoryLogic.feature.create({
					id: 'allied-awareness',
					name: 'Allied Awareness',
					description:
            'Allies who have weapons are equipped with torches. Any ally can use a maneuver to throw a torch up to 5 squares and ignite the flammable oil.'
				})
			]
		}
	],
	upgrades: [
		{
			id: 'concealed',
			label: 'Concealed Oil',
			cost: 1,
			text: 'The oil is hidden until it ignites.',
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
	description:
    'A cavity in a floor, wall, or ceiling might hold hidden threats.',
	category: TerrainCategory.Fieldwork,
	level: 1,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Ambusher,
		TerrainRoleType.Fortification
	),
	encounterValue: 1,
	area: '',
	direction: '',
	link: '',
	stamina: {
		base: 0,
		perSquare: 0
	},
	size: 'One or more squares',
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `As a maneuver, a creature adjacent to a hidey-hole can make a **Might test**.

* **11 or lower**: The creature is restrained (save ends).
* **12-16**: The hidey-hole collapses but the creature is slowed (save ends).
* * **17+**: The hidey-hole collapses and can no longer be used until repaired.`
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
            'A creature starts the encounter in the hidey-hole or ends their turn their.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description:
            'The triggering creature can attempt to hide as a free triggered action.'
				})
			]
		}
	],
	upgrades: [
		{
			id: 'network',
			label: 'Network',
			cost: 1,
			text: 'The hidey-hole is connected to a tunnel network. A creature familiar with the network can move from one hidey-hole to any space adjacent to a connected hidey-hole if they have movement available equal to the straight-line distance to that space. A creature unfamiliar with the network can use a maneuver to make a hard *Intuition test* to discover a connected hidey-hole.',
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
	description:
    'A reinforced metal shield embedded in the ground that acts as cover the creature controlling it',
	category: TerrainCategory.Fieldwork,
	level: 1,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Defender,
		TerrainRoleType.Fortification
	),
	encounterValue: 1,
	area: '',
	direction: '',
	link: '',
	stamina: {
		base: 9,
		perSquare: 0
	},
	size: FactoryLogic.createSize(1, 'M'),
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `As a maneuver, a creature adjacent to a pavise shield controlled by another creature can make a **Might test**.
			
* **11 or lower:** The creature controlling the shield retains control of it and can make an opportunity attack against the creature making the test.
* **12-16**: The creature controlling the shield retains control of it.
* *17+*: The creature making the test grabs the shield and takes control of it.`
				})
			]
		},
		{
			id: 'trigger-effect',
			content: [
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description:
            'While a creature has the pavise grabbed they have cover and take half damage from from abilities whose line of effect extends through the shield. The pavise takes the other half of the damage.'
				}),
				FactoryLogic.feature.create({
					id: 'movement',
					name: 'Movement',
					description:
            'While a creature has a pavise shield grabbed, their speed is halved and they move the shield like a grabbed creature.'
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
	description:
    'A rope snare is set to grab a target, leaving them hanging up-side down.',
	category: TerrainCategory.Fieldwork,
	level: 1,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Ambusher,
		TerrainRoleType.Trap
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
					description: `As a maneuver, a creature adjacent to a snare trap can make an **Agility test**.
			
* **11 or less**: The creature triggers the trap and is affected as if in its space.
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
            'The snare trap is calibrated to be triggered by creatures or objects of a particular size or larger. The trap triggers when a creature or object of the appropriate size enters its space.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description:
            'A triggering creature or object ends their movement and is targeted by the *Snare* ability.'
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
						type: FactoryLogic.type.createTrigger(
							'A creature or object of the appropriate size enters the trap’s space.',
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
									tier1: 'The target shifts 1 square away from the snare.',
									tier2: '1 damage; A<1 restrained (save ends)',
									tier3: '3 damage; A<2 restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText(
								'A creature restrained by this ability is vertically pulled 2 and suspended in the air by the snare line. On a successful save, the snare is cut or breaks and the creature falls to the ground. The snare must be manually reset.'
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
					description: 'The snare trap is hidden until triggered or detected.'
				})
			]
		}
	],
	upgrades: [
		{
			id: 'net-trap',
			label: 'Net Trap',
			cost: 1,
			text: 'The snare becomes a net that can wrap up multiple targets. The net has 3 Stamina and fills an area of 3 squares by 3 squares. The Snare ability loses its existing keywords, gains the Area keyword, and targets each creature or object in the area. The trap can be triggered by a target moving through one specific square, or by requiring multiple squares to be moved through. Any creature who makes their save to end the restrained effect ends that effect for all targets, who all fall to the ground.',
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
	description:
    'A pit dug into the ground is filled with spikes, and camouflaged to avoid detection.',
	category: TerrainCategory.Fieldwork,
	level: 2,
	role: FactoryLogic.createTerrainRole(
		MonsterRoleType.Ambusher,
		TerrainRoleType.Trap
	),
	encounterValue: 3,
	area: '2 x 2-square area',
	direction: '',
	link: '',
	stamina: {
		base: 6,
		perSquare: 0
	},
	size: 'One or more squares',
	damageMods: [],
	sections: [
		{
			id: 'deactivate',
			content: [
				FactoryLogic.feature.create({
					id: 'deactivate',
					name: 'Deactivate',
					description: `As a maneuver, a creature adjacent to a spike trap can make an **Agility test**.

* **11 or lower**: The creature triggers the trap and is affected as if in its area.
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
            'The spike trap is calibrated to be triggered by creatures or objects of a particular size or larger. The trap triggers when a creature or object of the appropriate size enters its area.'
				}),
				FactoryLogic.feature.create({
					id: 'effect',
					name: 'Effect',
					description: 'The *Spike Trap* ability.'
				})
			]
		},
		{
			id: 'effect-spike-trap',
			content: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'effect-spike-trap',
						name: 'Spike Trap',
						type: FactoryLogic.type.createTrigger(
							'A creature or object of the appropriate size enters the trap’s area.',
							{ free: true }
						),
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1:
                    '3 damage; the target shifts 1 square away from the trap',
									tier2: '4 damage; the target falls into the pit; a<0] prone',
									tier3:
                    '6 damage; the target falls into the pit; a<1] prone; restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText(
								'The target ends their movement when they enter the trap’s area. The pit is typically 2 squares deep. The trap must be manually reset.'
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
					description: 'The spike trap is hidden until triggered or detected.'
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
