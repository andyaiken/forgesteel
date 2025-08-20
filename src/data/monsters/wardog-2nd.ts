import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const warDog2nd: MonsterGroup = {
	id: 'monster-group-wardog-2nd',
	name: 'War Dog - 2nd Echelon',
	description: 'War dogs, like any soldiers, are outfitted to carry out warfare with weapons, armor, and no end of ghastly tools. But Ajax’s war dog forces are no ordinary army, and they bear extraordinary equipment.',
	picture: null,
	information: [
		{
			id: 'wardog-2nd-info-warning',
			name: 'Content Warning: Brainwashing and Body Horror',
			description: 'War dogs are explicitly evil soldiers built from the body parts of other humanoids. Check in with your players before running war dogs to make sure that they’re okay with battling brainwashed soldiers with an appearance akin to Frankenstein’s monster if he were built to be a shock trooper. If anyone is uncomfortable, modify the appearance and lore of the war dogs as you see fit.'
		},
		{
			id: 'wardog-2nd-info-1',
			name: 'Shrikeguns',
			description: 'The shrikegun is a new kind of weapon fit for a new kind of soldier. Each shrikegun is a rapid-firing bolt-thrower that replaces the draw of a crossbow with the compact energy of torsion springs. When loosed, a standard shrikegun throws a five-inch, iron-tipped wooden stake hard enough to reliably pierce steel plate at 50 yards. The stabilization grooves cut into the stakes create a shrill whistle when they are fired, leading to many less-disciplined armies breaking upon hearing the “shrike scream” of a loosed volley.'
		},
		{
			id: 'wardog-2nd-info-2',
			name: 'Fuse-Iron',
			description: 'Some war dogs use fuse-iron weapons that emit flames or cause explosions. While the exact properties of fuse-iron depend on its specific alloy and shape, the material is known for turning physical force into heat and light. Special arrangements of fuse-iron utilize crush cavities to create concussive detonations that are incredibly powerful, if not particularly reliable. Fuse-iron is expensive, accident-prone, and almost impossible to work with in large quantities, so that fuse-iron equipment is granted only to war dog specialists.'
		},
		{
			id: 'wardog-2nd-info-3',
			name: 'Houndweapons',
			description: 'Insubordinate war dogs are usually punished with a trip back to the Body Banks, but individuals who need to be made an example of are condemned to an even harsher fate: becoming a houndweapon. These living weapons are horrific blends of flesh, machine, and spirit created as powerful and terribly cruel tools of war. Only the highest-ranking and most capable war dogs can requisition houndweapons, given those living armaments’ power and the time and difficulty involved in making them.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'wardog-2nd-malice-1',
			name: 'Reconstitute',
			cost: 3,
			sections: [
				'One war dog acting this turn tears apart a nearby corpse of a humanoid and incorporates its body parts into their own. The war dog regains Stamina equal to 5 times their level.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-2nd-malice-2',
				name: 'Fire for Effect',
				type: FactoryLogic.type.createManeuver(),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
				target: 'Each creature in the area',
				sections: [
					FactoryLogic.createAbilitySectionText('**Effect:** Each target makes an **Agility test**. The same condition is imposed on each affected target'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '5 fire damage; slowed or weakened (save ends)',
						tier2: '5 fire damage; slowed or weakened (EoT)',
						tier3: '5 fire damage'
					}))
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'wardog-2nd-malice-3',
			name: 'Fodder Run',
			cost: 7,
			sections: [
				'Each war dog minion in the encounter shifts up to their speed and can make a free strike. A minion who does so is then reduced to 0 Stamina.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-2nd-malice-4',
				name: 'Loyalty Unto Death',
				type: FactoryLogic.type.createManeuver(),
				cost: 5,
				keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.createRanged(10) ],
				target: 'Two war dogs',
				sections: [
					FactoryLogic.createAbilitySectionText('**Effect:** Each target who has a loyalty collar shifts up to their speed, then is reduced to 0 Stamina. After each target’s Loyalty Collar trait is resolved, each enemy adjacent to either target makes a **Presence test**.'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: 'Push 4; the enemy is frightened of the nearest non-minion war dog (save end)',
						tier2: 'Push 2; the enemy is frightened of the nearest non-minion war dog (EoT)',
						tier3: 'Push 2'
					}))
				]
			})
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'wardog-2nd-1',
			name: 'War Dog Sparkslinger',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Lightning Spread increases by 1 square',
			characteristics: MonsterLogic.createCharacteristics(0, 0, 3, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-1-feature-1',
						name: 'Galvanic Arc',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(7) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 lightning damage',
								tier2: '5 lightning damage; the lightning spreads 1 square',
								tier3: '7 lightning damage; the lightning spreads 2 squares'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The lightning’s spread is the distance it arcs from a target to nearby enemies. Each enemy within that distance takes 2 lightning damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-1-feature-2',
					name: 'Loyalty Collar',
					description: 'When the sparkslinger is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-2nd-1-feature-3',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Lightning, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-2',
			name: 'War Dog Sweeper',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 3, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-2-feature-1',
						name: 'Shrikegun Shot',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(3)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 damage',
								tier2: '4 damage; push 1',
								tier3: '6 damage; push 3'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** Any target within 2 squares of the sweeper takes an extra 3 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-2-feature-2',
					name: 'Shrapnel-Laced Loyalty Collar',
					description: 'When the sweeper is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each enemy and object within 2 squares of them.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-3',
			name: 'War Dog Frog',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'Climb, swim'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(-1, 3, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-3-feature-1',
						name: 'Poisoned Dagger',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(4)
						],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 poison damage',
								tier2: '5 poison damage',
								tier3: '7 poison damage'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The war frog can jump 3 squares before or after making the strike. If they end this jump in cover or concealment, they can attempt to hide.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-3-feature-2',
					name: 'Loyalty Collar',
					description: 'When the war frog is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-2nd-3-feature-3',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 4 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-4',
			name: 'War Dog Arachnite',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5, 'Climb'),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(0, 3, 2, 2, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-4-feature-1',
						name: 'Longarm Shrikegun',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 damage',
								tier2: '4 damage; push 1',
								tier3: '6 damage; push 3'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** This ability ignores cover and concealment. The arachnite chooses one of the following damage types when making the strike: acid, cold, fire, lightning, poison, psychic, or sonic.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: ' The arachnite can use this ability as if they were in the space of any ally within distance.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-4-feature-2',
						name: 'Web Vial',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, value2: 10 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The area is difficult terrain until the end of the encounter.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-4-feature-3',
					name: 'Eight-Eyed Sight',
					description: 'At the start of each of their turns, the arachnite automatically knows the location of each hidden creature within 10 squares of them.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-4-feature-4',
					name: 'Loyalty Collar',
					description: 'When the arachnite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-2nd-4-feature-5',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 6 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-5',
			name: 'War Dog Doomtheif',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(3, -1, 0, 3, 1),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-5-feature-1',
					name: 'Loyalty Collar',
					description: 'When the doomthief is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-5-feature-2',
					name: 'Doom Magnet',
					description: 'The doomthief emits a 3 aura of warped fate that blocks line of effect for any enemy ability that doesn’t include them as a target.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-5-feature-3',
						name: 'Ripper Shrikegun',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 3, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 damage; push 1',
								tier2: '5 damage; push 3',
								tier3: '6 damage; push 5; A < 3 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The doomthief can’t willingly move on the same turn they use this ability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-5-feature-4',
						name: 'Expanding Doom',
						cost: 4,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The doomthief has damage immunity 4 and the size of the aura from their Doom Magnet trait increases by 3, both until the start of their next turn.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-6',
			name: 'War Dog Equivite',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(8),
			stamina: 53,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(3, 3, -1, -2, 0),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-6-feature-1',
					name: 'Loyalty Collar',
					description: 'When the equivite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-6-feature-2',
						name: 'Fuse-Iron Lance',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 damage',
								tier2: '8 damage',
								tier3: '10 damage; I < 3 frightened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** This ability gains an edge while charging.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The ability deals an extra 3 fire damage to the target and each enemy adjacent to the target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-6-feature-3',
						name: 'Blazing Charge',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The equivite moves up to their speed and ignores difficult terrain. Any mundane size 1 object whose space they move through is destroyed. The equivite makes one power roll against each enemy whose space they move through for the first time.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '2 damage; push 1',
								tier2: '4 damage; push 2',
								tier3: '5 damage; push 3; M < 3 prone'
							}))
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-7',
			name: 'War Dog Hypokrite',
			level: 4,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 0, 0, 2),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-7-feature-1',
					name: 'Loyalty Collar',
					description: 'When the hypokrite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-7-feature-2',
						name: 'Needle-Knife',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 damage',
								tier2: '8 damage; A < 2 bleeding (save ends)',
								tier3: '10 damage; A < 3 bleeding and weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** This ability deals an extra 6 damage if the hypokrite is hidden or disguised.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-7-feature-3',
						name: 'Feign Death',
						cost: 2,
						type: FactoryLogic.type.createTrigger('The hypokrite takes damage'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The hypokrite detonates their loyalty collar to deal 2d6 damage to each adjacent enemy, but teleports to an unoccupied space adjacent to an ally within distance and remains alive.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-7-feature-4',
					name: 'Face in the Crowd',
					description: 'The hypokrite is invisible while adjacent to any ally who isn’t hidden, and they can attempt to hide even while observed. Whenever they use the Hide maneuver, the hypokrite can disguise themself as another creature within line of effect.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-8',
			name: 'War Dog Mischievite',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 3, 0, 2, 0),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-8-feature-1',
					name: 'Loyalty Collar',
					description: 'When the mischievite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-8-feature-2',
						name: 'Fuse-Iron Knives',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'Two creatures',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 damage',
								tier2: '7 damage',
								tier3: '8 damage; R < 3 the target is dazzled (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** A dazzled target takes a bane on strikes and has line of effect only within 1 square.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-8-feature-3',
						name: 'Misdirection',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(3) ],
						target: 'One ally or dazzled creature',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The mischievite swaps positions with the target. An ally targeted by this ability can make a free strike before or after being swapped.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'The mischievite can use this ability as a triggered action when they are targeted by an ability. If they do, the swapped target becomes the new target of the triggering ability.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-8-feature-4',
					name: 'Crafty',
					description: 'The mischievite doesn’t provoke opportunity attacks by moving.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-9',
			name: 'War Dog Thanatite',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 35,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 1, 2, 3, 1),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-9-feature-1',
					name: 'Loyalty Collar',
					description: 'When the thanatite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-9-feature-2',
						name: 'Snaking Entrails',
						cost: 'signature',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The target dies and the thanatite makes one power roll against each enemy within 2 squares of the target.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '3 corruption damage; A < 1 slowed (save ends)',
								tier2: '5 corruption damage; A < 2 slowed (save ends)',
								tier3: '7 corruption damage; A < 3 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'If an affected enemy is adjacent to any corpse, they are frightened of the thanatite (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-9-feature-3',
						name: 'Wall of Flesh',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 10, within: 10 }) ],
						target: 'One corpse',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The target spawns a wall of bloody muscle and pulsing viscera that must share one or more squares with the target. Each enemy in the area when the wall is created vertically slides up to 2 squares and is knocked prone. Each square of the wall has 3 Stamina.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-10',
			name: 'War Dog Tormentite',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 2, 3, 0),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-10-feature-1',
					name: 'Loyalty Collar',
					description: 'When the tormentite is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-10-feature-2',
						name: 'Mark of Agony',
						cost: 'signature',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 corruption damage',
								tier2: '8 corruption damage; the target is marked (save ends)',
								tier3: '9 corruption damage; the target is marked (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** Strikes made against a target marked this way gain an edge. Additionally, whenever the tormentite takes damage, each target marked by them takes 3 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-10-feature-3',
						name: 'Vortex of Pain',
						cost: 3,
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '2 corruption damage',
								tier2: '4 corruption damage',
								tier3: '5 corruption damage; one ally in the area can end one effect on them that can be ended by a saving throw, and can give that effect to one target'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The tormentite regains 2 Stamina for each creature targeted by this ability.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-10-feature-4',
					name: 'Persistent Pain',
					description: 'From the start of the encounter, the tormentite takes 1 damage at the start of each of their turns.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-11',
			name: 'War Dog War Doc',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 7,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 35,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 3, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-11-feature-1',
						name: 'Syringe Crossbow',
						cost: 'signature',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 poison damage',
								tier2: '8 poison damage',
								tier3: '9 poison damage; M < 3 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** A target enemy is subject to this ability’s power roll. A target ally instead gains 5 temporary Stamina and can make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-11-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-11-feature-3',
						name: 'Sanguine Stimulants',
						cost: 1,
						type: FactoryLogic.type.createTrigger('One ally within distance dies'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each ally adjacent to the dead ally deals an extra 6 damage on their next strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2nd-11-feature-4',
					name: 'Body Bank Branch Manager',
					description: 'If the war doc uses the Reconstitute war dog Malice feature, it costs 1 Malice less. Additionally, allies can treat the living war doc as a corpse when using the Reconstitute feature.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2nd-12',
			name: 'War Dog Tetrarch',
			level: 6,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 32,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 180,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: MonsterLogic.createCharacteristics(4, 3, 2, 3, 4),
			features: [
				FactoryLogic.feature.create({
					id: 'wardog-2nd-12-feature-1',
					name: 'End Effect',
					description: 'At the end of each of their turns, the tetrarch can take 10 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-12-feature-2',
						name: 'Houndblade',
						cost: 'signature',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(3)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '11 damage',
								tier2: '16 damage; taunted (EoT)',
								tier3: '19 damage; taunted (EoT)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** A creature taunted this way takes a bane on strikes.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'Each target loses 1d3 Recoveries.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-12-feature-3',
						name: 'Get Them, You Dolts!',
						cost: 1,
						repeatable: true,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures (1 Malice per target)',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each target shifts up to their speed and can make a free strike. If the free strike targets an enemy taunted by the tetrarch, it deals an extra 4 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-12-feature-4',
						name: 'Sneering Disregard',
						type: FactoryLogic.type.createTrigger('A creature within distance who is not taunted by the tetrarch targets the tetrarch with a power roll.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The power roll has a double bane. If the target obtains a tier 1 outcome, the tetrarch ignores any of the power roll’s effects other than damage and the target is frightened of the tetrarch (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-12-feature-5',
						name: 'Enter the Fray',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The tetrarch can jump up to 7 squares before using this ability.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: 'Push 2; I < 2 frightened (save ends)',
								tier2: 'Push 4; I < 3 frightened (save ends)',
								tier3: 'Push 5; I < 4 frightened (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-12-feature-6',
						name: 'Lay Waste',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSpecial('Five 2 cubes within 20') ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '7 fire damage; A < 2 slowed (EoT)',
								tier2: '13 fire damage; A < 3 slowed (save ends)',
								tier3: '16 fire damage; A < 4 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The area is set ablaze until the end of the encounter. While ablaze, the area is difficult terrain, and any creature takes 2 fire damage for each square in the area they enter for the first time in a round.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2nd-12-feature-7',
						name: 'You Would Dare?!',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Until the end of the encounter, the tetrarch has damage immunity 2, and their Houndblade ability targets three creatures or objects.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
