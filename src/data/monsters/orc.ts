import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const orc: MonsterGroup = {
	id: 'monster-group-orc',
	name: 'Orc',
	description: `
In a long-lost language, the word oruk—“blood fire”—described the glowing appearance of the orc people when they push themselves to their limits. While orcs know one another as kanin (“the people”) in their own language, they also use “orc” with great pride, especially when dealing with other folk.

Orc history spans the world and all its ages. They’ve settled into villages and cities, hot and cold climates, high in the mountains and deep underground. Most orcs live in diverse humanoid societies, though a few live secluded in the tropics. Though they are no more likely to stand in the way of adventurers’ than any other folk, orcs who do fill the same roles as other humanoids: mercenaries, bounty hunters, garroters, guards, cultists, and corrupt kings`,
	picture: null,
	information: [
		{
			id: 'orc-info-1',
			name: 'Relentlessly Tough',
			description: `
Orcs grow to impressive heights. The veins that commonly stripe their tough-skinned faces can appear more vibrant when they’re excited or driven. Their hair, which ranges from coarse to fine, extends from their heads and drapes across their shoulders like royal mantles. Strong tusks extend past their lips and guard the rest of their teeth.

Few other humanoids can match the endurance of an orc, and orcs who train for hunting and combat can rally themselves to move faster and prevail longer. Should an orc find themself on the brink of death, their veins instinctively surge with “blood fire,” glowing brightly and invigorating them to perform one last attack. Blood fire often appears red, though orcs from the mountains and underground glow blue and white, respectively.`
		},
		{
			id: 'orc-info-2',
			name: 'Innate Power',
			description: 'The intense power of an orc’s spirit occasionally manifests as raw magic. Orc eyes of Grole hone their magic into a singular elemental affinity for focused manipulation. Orc terranovas move their magic through their feet, surging into the earth. Orc godcallers use song to spark the magic inherent in every creature’s spirit.'
		},
		{
			id: 'orc-info-3',
			name: 'Mohlers',
			description: `
Mohlers are spined, pig-like animals who corkscrew through the ground as fast as they can run. Native to deserts and forests, these burrowing creatures produce shallow networks of tunnels just below the surface. Where orcs go, mohlers are sure to follow. In times of peace, orcs domesticate them to plow the earth and eat pests — and in times of war, mohlers reshape the battlefield to knock the orcs’ enemies off their feet.

When an orc community has exceptional gratitude for the deeds of one of their own or an outsider, they bestow the companionship of a mohler upon the individual. Treated kindly, mohlers make steadfast companions, protecting their caregivers with their lives. If mistreated, a mohler returns to their original den, and the orcs hunt the responsible party.`
		},
		{
			id: 'orc-info-4',
			name: 'Scyza',
			description: 'Orcs rely on giant bipedal lizards called scyzas to carry them over great distances. They adorn these mounts, which originated in the tropics, with great harnesses that allow dozens of orcs to ride a scyza at the same time. The lizards are fearless in the face of danger, making them perfect battle mounts. A scyza’s trunk-like legs and claws cleave through the ground and kick up terrible dust storms. Worse still are their battering head crests, which emit a terrible, bone-shaking ringing sound.'
		},
		{
			id: 'orc-info-5',
			name: 'Orc Languages',
			description: 'Most orcs speak Caelian and Kalliak.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'orc-malice-1',
			name: 'Overwhelming March',
			cost: 3,
			sections: [
				'Each orc shifts up to their speed, moving through enemy spaces if they can. Each enemy passed through during this movement makes a **Might test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Might,
					tier1: '6 damage; prone',
					tier2: '4 damage; prone',
					tier3: 'Push 2'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'orc-malice-2',
			name: 'Mohler Trench',
			cost: 5,
			sections: [
				'An orc acting this turn summons 2 **mohlers** out of the ground, who dig a trench that is a 10 × 1 line within 10 squares when they appear. The trench is 2 squares deep and is difficult terrain. The trench can’t be created directly underneath creatures.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'orc-malice-3',
			name: 'Mohler Cavity',
			cost: 7,
			sections: [
				'The ground shakes as a group of mohlers dig a 5 cube pit beneath an area where at least one creature is on the ground. The area is difficult terrain. Each orc in the area can shift into the nearest unoccupied space outside the pit before it is completed. Each nonorc in the area makes an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '4 damage; target falls prone can’t stand (EoT)',
					tier2: '4 damage; target falls',
					tier3: 'The target can shift into the nearest unoccupied space outside the pit.'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'orc-1',
			name: 'Mohler',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Animal', 'Orc' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(7, 'burrow'),
			stamina: 4,
			stability: 1,
			freeStrikeDamage: 2,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(0, 2, -4, 1, -3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-1-feature-1',
						name: 'Earth Bump',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The distance increases to melee 2. If the mohler is 1 or more squares beneath the target before they use this ability, a target who has <code>M < 1</code> is also knocked prone.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-1-feature-2',
					name: 'Seismic Sense',
					description: 'The mohler doesn’t need line of effect to use abilities against creatures or objects touching the ground.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-1-feature-3',
					name: 'Ground Grinder',
					description: 'The mohler can use the Dig maneuver at the start of the encounter. Additionally, while the mohler burrows within 1 square below the ground, the ground above where they burrow is difficult terrain.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-2',
			name: 'Orc Blitzer',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: '+2 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-2-feature-1',
						name: 'Lugged Spear',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage',
								tier2: '2 damage',
								tier3: '3 damage'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** A target who starts their next turn adjacent to three or more blitzers takes 3 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-2-feature-2',
					name: 'Bloodfire Burn',
					description: 'If the blitzer is reduced to 0 Stamina, they can make a free strike before dying.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-3',
			name: 'Orc Bloodspark',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+2 bonus to forced movement distance',
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-3-feature-1',
						name: 'Explosive Mote',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage; push 1, or the bloodspark can shift 1 square away from the target',
								tier2: '4 damage; push 2, or the bloodspark can shift 2 square away from the target',
								tier3: '5 damage; push 4, or the bloodspark can shift 4 square away from the target'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-3-feature-2',
					name: 'Bloodfire Burn',
					description: 'If the bloodspark is reduced to 0 Stamina, they can make a free strike before dying.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-4',
			name: 'Orc Glorifier',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-4-feature-1',
						name: 'Call to Victory',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 sonic damage',
								tier2: '2 sonic damage; P < 1 slowed (save ends)',
								tier3: '3 sonic damage; P < 2 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** Allies gain an edge on melee strikes against the target until the glorifier and each other glorifier in their squad are killed.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-4-feature-2',
					name: 'Bloodfire Burn',
					description: 'If the glorifier is reduced to 0 Stamina, they can make a free strike before dying.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-5',
			name: 'Orc Razor',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+1 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-5-feature-1',
						name: 'Boot and Blade',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage; push 3',
								tier3: '5 damage; push 3 or prone'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The razor gains an edge against any target affected by a condition.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-5-feature-2',
					name: 'Bloodfire Burn',
					description: 'If the razor is reduced to 0 Stamina, they can make a free strike before dying'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-6',
			name: 'Orc Bloodrunner',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 0, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-6-feature-1',
						name: 'Shield Bash',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage; push special',
								tier2: '10 damage; push special',
								tier3: '13 damage; push special or prone'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The forced movement distance is equal to the number of squares the bloodrunner moved on their turn before using this ability. An ally targeted by this ability ignores the damage and can move up to that same distance.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'An ally targeted by this ability can make a free strike after the forced movement is resolved.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-6-feature-2',
					name: 'Unimpeded',
					description: 'The bloodrunner can end their movement in a prone creature’s space. The first time on a turn that a bloodrunner enters any creature’s space, that creature takes 3 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-6-feature-3',
					name: 'Relentless',
					description: 'If the bloodrunner is reduced to 0 Stamina, they can make a free strike before dying. If the target of the free strike is reduced to 0 Stamina, the bloodrunner is reduced to 1 Stamina instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-7',
			name: 'Orc Chainlock',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 1, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-7-feature-1',
						name: 'Hook and Chain',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; pull 1; M < 0 the target is hooked (save ends)',
								tier2: '7 damage; pull 2; M < 1 the target is hooked (save ends)',
								tier3: '9 damage; pull 3; M < 2 the target is hooked (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** A hooked target can’t move more than 3 squares away from the chainlock’s position when this ability is used.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-7-feature-2',
						name: 'Heavy Crossbolt',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; A < 0 slowed (save ends)',
								tier2: '7 damage; A < 1 slowed (save ends)',
								tier3: '9 damage; prone; A < 2 slowed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-7-feature-3',
					name: 'Chain Link',
					description: 'Whenever the chainlock is force moved by a creature’s melee ability, the creature is pulled the same distance toward the chainlock after the forced movement is resolved.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-7-feature-4',
					name: 'Relentless',
					description: 'If the chainlock is reduced to 0 Stamina, they can make a free strike before dying. If the target of the free strike is reduced to 0 Stamina, the chainlock is reduced to 1 Stamina instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-8',
			name: 'Orc Eye of Grole',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(1, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.create({
					id: 'orc-8-feature-1',
					name: 'Elemental Affinity',
					description: 'The eye has an affinity for one of the following damage types: cold, fire, or lightning. The chosen type determines the eye’s damage immunity and the damage dealt by their abilities.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-8-feature-2',
						name: 'Elemental Discharge',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage; push 2, or the eye shifts up to 2 squares away from the target',
								tier2: '9 damage; slide 4, or the eye shifts up to 4 squares away from the target',
								tier3: '12 damage; slide 6, or the eye shifts up to 6 squares away from the target'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** This ability deals cold, fire, or lightning damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-8-feature-3',
						name: 'Elemental Discharge',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 2, within: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage; push 2',
								tier2: '5 damage; push 3',
								tier3: '3 damage; push 4, prone'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** This ability deals cold, fire, or lightning damage, and any enemy targeted by the ability has damage weakness 3 to the same damage type (save ends). ')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-8-feature-4',
					name: 'Relentless',
					description: 'If the eye is reduced to 0 Stamina, they can make a free strike before dying. If the target of the free strike is reduced to 0 Stamina, the eye is reduced to 1 Stamina instead.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'orc-8-feature-5',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Cold, modifierType: DamageModifierType.Immunity, value: 5 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }),
						FactoryLogic.damageModifier.create({ damageType: DamageType.Lightning, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-9',
			name: 'Orc Garroter',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-9-feature-1',
						name: 'Dagger Feint',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage; the garroter can shift 1',
								tier2: '9 damage; the garroter can shift 2',
								tier3: '12 damage; the garroter can shift 3'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** If this ability gains an edge or has a double edge, it deals an extra 4 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-9-feature-2',
						name: 'Strangle',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '9 damage; I < 1 dazed (save ends)',
								tier3: '12 damage; grabbed; I < 2 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** While grabbed this way, a target can’t communicate or use magic abilities.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-9-feature-3',
						name: 'Chroma Cloak',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [],
						target: '',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('The garroter turns invisible until the end of their turn. This invisibility ends early if they take damage or use an ability.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-9-feature-4',
					name: 'Relentless',
					description: 'If the garroter is reduced to 0 Stamina, they can make a free strike before dying. If the target of the free strike is reduced to 0 Stamina, the garroter is reduced to 1 Stamina instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-10',
			name: 'Orc Godcaller',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-10-feature-1',
						name: 'Power Chord',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 sonic damage',
								tier2: '7 sonic damage',
								tier3: '9 sonic damage; P < 2 weakened (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-10-feature-2',
						name: 'Cadenza',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The target moves up to their speed and can use a main action'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'The godcaller targets a second ally.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-10-feature-3',
						name: 'Rally Ostinato',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self and three allies',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each target regains 15 Stamina and ignores difficult terrain until the end of the encounter.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-10-feature-4',
					name: 'Relentless',
					description: 'If the godcaller is reduced to 0 Stamina, they can make a free strike before dying. If the target of the free strike is reduced to 0 Stamina, the godcaller is reduced to 1 Stamina instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-11',
			name: 'Orc Juggernaut',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 60,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 2, -1, -1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-11-feature-1',
						name: 'Haymaker Greataxe',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage',
								tier2: '11 damage; prone',
								tier3: '14 damage; prone; M < 2 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** A target who is already prone takes an extra 6 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-11-feature-2',
						name: 'Hrraaaaaagh!',
						type: FactoryLogic.type.createTrigger('The juggernaut takes damage.', { free: true }),
						cost: 1,
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The juggernaut moves up to their speed and can make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-11-feature-3',
					name: 'Blood in the Water',
					description: 'Whenever the juggernaut willingly moves, they can move 3 additional squares if they end their movement closer to a prone creature.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-11-feature-4',
					name: 'Relentless',
					description: 'If the juggernaut is reduced to 0 Stamina, they can make a free strike before dying. If the target of the free strike is reduced to 0 Stamina, the juggernaut is reduced to 1 Stamina instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-12',
			name: 'Orc Rampart',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 59,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 2, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-12-feature-1',
						name: 'My Spear, My Foe',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '9 damage; taunted (EoT)',
								tier3: '12 damage; taunted (EoT)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** This ability has a double edge against any target who dealt damage to the rampart this round.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-12-feature-2',
						name: 'Castling',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The rampart moves or shifts up to their speed adjacent to the target, then can swap places with the target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-12-feature-3',
						name: 'No.',
						type: FactoryLogic.type.createTrigger('A creature targets an ally adjacent to the rampart with an ability that doesn’t also target the rampart.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The rampart becomes the target of the triggering ability instead.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-12-feature-4',
					name: 'Relentless',
					description: 'If the rampart is reduced to 0 Stamina, they can make a free strike before dying. If the target of the free strike is reduced to 0 Stamina, the rampart is reduced to 1 Stamina instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-13',
			name: 'Orc Terranova',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6, 'burrow'),
			stamina: 30,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(1, 1, 0, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-13-feature-1',
						name: 'Earth Pillar',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage; A < 0 prone and can’t stand (save ends)',
								tier2: '9 damage; A < 1 prone and can’t stand (save ends)',
								tier3: '12 damage; A < 2 prone and can’t stand (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** Each target must be on the ground, and the ground in each target’s space rises 1 square.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-13-feature-2',
						name: 'Sinkhole',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage; M < 0 restrained (save ends)',
								tier2: '7 damage; M < 1 restrained (save ends)',
								tier3: '10 damage; M < 2 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The area is difficult terrain.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-13-feature-3',
					name: 'Seismic Step',
					description: 'The terranova ignores difficult terrain. Additionally, they don’t need line of effect to use abilities against creatures touching the ground.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-13-feature-4',
					name: 'Relentless',
					description: 'If the terranova is reduced to 0 Stamina, they can make a free strike before dying. If the target of the free strike is reduced to 0 Stamina, the terranova is reduced to 1 Stamina instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-14',
			name: 'Orc Warleader',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 1, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-1',
						name: 'Go.',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The target moves up to their speed and can use a main action.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'The warleader targets two allies.'
							}),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'The warleader targets one ally and a minion squad.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-2',
						name: 'Mace Lariat',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Each enemy',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 damage; push 1; M < 1 dazed (save ends)',
								tier2: '10 damage; push 3; M < 2 dazed (save ends)',
								tier3: '13 damage; push 5; M < 3 dazed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-3',
						name: 'Lockdown',
						type: FactoryLogic.type.createManeuver(),
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'Self and three allies',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each target moves up to their speed and can use the Grab maneuver, which gains an edge.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-4',
						name: 'Courtesy Call',
						type: FactoryLogic.type.createTrigger('The target obtains a tier 1 outcome on one power roll.'),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The target has a double edge on their next power roll before the end of the encounter')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-5',
						name: 'Close In',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All allies',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each target moves up to their speed. Each enemy adjacent to a target after this move makes an **Intuition test.**'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Intuition,
								tier1: 'Frightened of the warleader (save ends)',
								tier2: 'Frightened of the warleader (EoT)',
								tier3: 'No effect.'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-5',
						name: 'Familial Reinforcements',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The warleader shifts up to their speed, and four orc blitzers appear in unoccupied spaces within distance.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-7',
						name: 'I’ll Do This Myself',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Three times in succession, the warleader shifts up to their speed and can use Mace Lariat.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-14-feature-8',
					name: 'End Effect',
					description: 'At the end of their turn, the warleader can take 5 damage to end one save ends effect affecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-14-feature-9',
					name: 'Relentless',
					description: 'If the warleader’s Stamina drops to 0, they can make a free strike before dying. If the target is reduced to 0 Stamina or killed by the strike, the warleader lives and their Stamina is reduced to 1 instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-15',
			name: 'Scyza',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Mount),
			keywords: [ 'Animal', 'Orc' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(6),
			stamina: 100,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, -1, -4, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-15-feature-1',
						name: 'Clawed Kick',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage',
								tier2: '11 damage; prone',
								tier3: '14 damage; prone'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The scyza roars, and if the target has <code>I < 2</code>, they are frightened (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-15-feature-2',
						name: 'Whiptail',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '8 damage',
								tier2: '13 damage; prone',
								tier3: '16 damage; A < 2 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** Against a target on top of the scyza, this ability gains an edge, and the target is pushed into an unoccupied adjacent square and knocked prone.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-15-feature-3',
						name: 'Crestfall',
						type: FactoryLogic.type.createMain(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage; 1 sonic damage; R < 0 dazed (save ends)',
								tier2: '7 damage; 2 sonic damage; R < 1 dazed (save ends)',
								tier3: '9 damage; 3 sonic damage; R < 2 dazed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-15-feature-4',
						name: 'Sandstorm',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The scyza kicks up a sandstorm, granting concealment to themself and any ally in the area until the end of the scyza’s next turn. Each enemy in the area makes an **Intuition test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: Characteristic.Intuition,
								tier1: '10 damage; prone; slowed (EoT)',
								tier2: '7 damage; slowed (EoT)',
								tier3: '4 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-15-feature-5',
						name: 'Brace and Break',
						type: FactoryLogic.type.createTrigger('The scyza or an ally riding the scyza is targeted by an ability.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Any damage dealt by the triggering ability is halved. If the creature or object who used the ability is within 3 squares of the scyza, the scyza can make a free strike against them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-15-feature-6',
					name: 'Terrible Beast',
					description: 'The scyza deals an extra 6 damage with abilities used against objects.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-15-feature-7',
					name: 'War Harness',
					description: 'While riding the scyza, three size 1 allies can occupy the same space.'
				})
			]
		})
	],
	addOns: []
};
