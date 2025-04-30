import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const orc: MonsterGroup = {
	id: 'monster-group-orc',
	name: 'Orc',
	description: `
In a long-lost language, the word oruk—“blood fire”—described the glowing appearance of the orc people when they push themselves to their limits. While orcs know one another as kanin in their own tongue, they also use “orc” with great pride, especially when dealing with other folk.

Orc history spans the world and all its ages. They’ve settled into villages and cities, hot and cold climates, high in the mountains and deep underground. Most orcs live in diverse humanoid societies, though a few live secluded in the tropics.

Though orcs are no more likely to stand in the adventurers’ way than any other folk, those who do fill the same roles as other humanoids: mercenaries, bounty hunters, garroters, guards, cultists, and corrupt kings.`,
	information: [
		{
			id: 'orc-info-1',
			name: 'Relentlessly Tough',
			description: `
Orcs grow to impressive heights. The veins that commonly stripe their tough-skinned faces can appear more vibrant when they’re excited or driven. Their hair, which can range from coarse to fine, extends from their heads and drapes across their shoulders like royal mantles. Strong tusks extend past their lips and guard the rest of their teeth.

Few other humanoids can match the endurance of an orc, and orcs who train for hunting and combat can rally themselves to move faster and prevail longer. Should an orc find themself on the brink of death, their veins instinctively surge with “blood fire,” glowing brightly and invigorating them to perform one last attack. Blood fire often appears red, though orcs from the mountains and underground glow blue and white respectively.`
		},
		{
			id: 'orc-info-2',
			name: 'Innate Power',
			description: 'Short, lithe, and long armed, goblins are built for mobility, stealth, and climbing. Goblins who dwell in untamed wilderness and twisting caves utilize their natural agility to hide from threats and flee when found. These Bloodfire Burn skirmishers might run wild through battle, hacking at their enemies’ knees, or unleash arrows as they dart from tree to tree.'
		},
		{
			id: 'orc-info-3',
			name: 'Orc Magic',
			description: 'The intense power of an orc’s spirit occasionally manifests as raw magic. Orc dynamos hone their magic into singular affinities that are easy to manipulate. Orc terranovas move their magic through their feet, surging into the earth. Orc godcallers use song to spark the magic inherent in every creature’s spirit.'
		},
		{
			id: 'orc-info-4',
			name: 'Mohlers',
			description: `
Mohlers are spined, pig-like beasts that corkscrew through the ground faster than they can run. Originating from deserts and forests, these burrowing creatures produce shallow networks of tunnels just below the surface. Where orcs go, mohlers are sure to follow. In times of peace, orcs domesticate them to plow the earth and eat pests—and in times of war, mohlers reshape the battlefield and knock the orcs’ enemies off their feet. 

When an orc community has exceptional gratitude for the deeds of one of their own or an outsider, they bestow the companionship of a mohler upon the individual. Treated kindly, mohlers make steadfast companions, protecting their caregivers with their lives. If mistreated, a mohler returns to their original den, and the orcs hunt the responsible party.`
		},
		{
			id: 'orc-info-5',
			name: 'Scyza',
			description: `
Orcs rely on giant bipedal lizards called scyzas to carry them over great distances. Orcs adorn these mounts, which originated in the tropics, with great harnesses that allow dozens of orcs to ride the scyza at the same time. The lizards are fearless in the face of danger, making them perfect battle mounts. 

The scyza’s trunk-like legs and claws cleave through the ground and kick up terrible dust storms. Worse still are their battering head crests, which emit a terrible, bone-shaking ringing sound.`
		},
		{
			id: 'orc-info-6',
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
				'Each orc shifts up to their speed, moving through enemy squares if they can. Each enemy that was passed through during this movement makes a **Might test**.',
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
				'An orc acting this turn summons 2 **mohlers** out of the ground to dig a 1 × 10 line trench within 10 and join the encounter. The trench is 2 squares deep and is considered diﬃcult terrain. The trench cannot be created directly underneath creatures.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'orc-malice-3',
			name: 'Mohler Cavity',
			cost: 7,
			sections: [
				'The ground shakes as a group of mohlers dig a 5 cube pit beneath an area where at least one character is standing. The mohlers leave, and the area is considered diﬃcult terrain. Each orc in the area can shift into the nearest unoccupied square outside of the pit before it is completed. Each non-orc in the area makes an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '9 damage; target falls; prone can\'t stand (EoT)',
					tier2: '6 damage; target falls',
					tier3: 'Target can shift into the nearest unoccupied square outside of the pit'
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
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(7, 'burrow'),
			stamina: 4,
			stability: 1,
			freeStrikeDamage: 2,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(0, 2, -4, 1, -3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-1-feature-1',
						name: 'Earth Bump',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						}),
						effect: 'The target is knocked prone if the mohler is striking from 1 or more squares below.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-1-feature-2',
					name: 'Ground Grinder',
					description: 'The ground within 1 square of where the mohler moves while burrowing becomes difficult terrain.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-2',
			name: 'Orc Blitzer',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-2-feature-1',
						name: 'Lugged Spear',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage'
						}),
						effect: 'The target takes 3 damage if they start their next turn adjacent to 3 or more blizters.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-2-feature-2',
					name: 'Bloodfire Burn',
					description: 'If the blitzer\'s Stamina drops to 0, they can make a free strike before dying.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-3',
			name: 'Orc Bloodspark',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Forced movement +2',
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, +2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-3-feature-1',
						name: 'Explosive Mote',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage; push 1 or shift 1 away from target',
							tier2: '4 damage; push 2 or shift 2 away from target',
							tier3: '5 damage; push 4 or shift 4 away from target'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-3-feature-2',
					name: 'Bloodfire Burn',
					description: 'If the bloodspark\'s Stamina drops to 0, they can make a free strike before dying.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-4',
			name: 'Orc Glorifier',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-4-feature-1',
						name: 'Call to Victory',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 sonic damage',
							tier2: '2 sonic damage; P<1 slowed (save ends)',
							tier3: '3 sonic damage; P<2 slowed (save ends)'
						}),
						effect: 'Each ally has an edge on melee strikes against the target until the glorifier and all other glorifiers in their square are killed.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-4-feature-2',
					name: 'Bloodfire Burn',
					description: 'If the glorifier\'s Stamina drops to 0, they can make a free strike before dying.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-5',
			name: 'Orc Razor',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-5-feature-1',
						name: 'Boot and Blade',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage; push 3',
							tier3: '5 damage; push 3 or prone'
						}),
						effect: 'The razor has an edge on strikes against targets already affected by a condition.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-5-feature-2',
					name: 'Bloodfire Burn',
					description: 'If the razor\'s Stamina drops to 0, they can make a free strike before dying.'
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
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 0, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-6-feature-1',
						name: 'Shield Bash',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage (enemy only); Push X',
							tier2: '10 damage (enemy only); Push X',
							tier3: '13 damage (enemy only); Push X'
						}),
						effect: 'Push X is equal to the number of squares the bloodrunner moved on their turn before using this ability.',
						spend: [
							{ value: 2, effect: 'An ally pushed by this ability can make a free strike on a creature.' }
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-6-feature-2',
					name: 'Unimpeded',
					description: 'The bloodrunner can share a prone creature\'s square. The first time a bloodrunner enters a creature\'s square on their turn, that creature takes 3 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-6-feature-3',
					name: 'Relentless',
					description: 'If the blitzer\'s Stamina drops to 0, they can make a free strike before dying. If the target is reduced to 0 Stamina or killed by the strike, the bloodrunner lives and their Stamina is reduced to 1 instead.'
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
			size: FactoryLogic.createSize(1, 'M'),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; pull 1; M<0 hooked (save ends)',
							tier2: '7 damage; pull 2; M<1 hooked (save ends)',
							tier3: '9 damage; pull 3; M<2 hooked (save ends)'
						}),
						effect: 'A hooked target can\'t move more than 3 squares away from the chainlock\'s original position until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-7-feature-2',
						name: 'Heavy Crossbolt',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						cost: 3,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; A<0 slowed (save ends)',
							tier2: '7 damage; A<1 slowed (save ends)',
							tier3: '9 damage; A<2 slowed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-7-feature-3',
					name: 'Chain Link',
					description: 'Whenever the chainlock is force moved by a creature’s melee ability, the creature is pulled the same distance towards the chainlock.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-7-feature-4',
					name: 'Relentless',
					description: 'If the chainlock\'s Stamina drops to 0, they can make a free strike before dying. If the target is reduced to 0 Stamina or killed by the strike, the chainlock lives and their Stamina is reduced to 1 instead.'
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
					name: 'Affinity',
					description: 'The eye has an aﬃnity for one of the following damage types: cold, ﬁre, or lightning. This type determines the eye’s aﬃnity immunity and the damage type of their attacks.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-8-feature-2',
						name: 'Elemental Discharge',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 affinity damage; push 2 or shift 2 away from target',
							tier2: '9 affinity damage; push 4 or shift 4 away from target',
							tier3: '12 affinity damage; push 6 or shift 6 away from target'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-8-feature-3',
						name: 'Power Burst',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 2, within: 1 }) ],
						target: 'All enemies in the line',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 affinity damage; push 2',
							tier2: '5 affinity damage; push 3',
							tier3: '8 affinity damage; push 4; prone'
						}),
						effect: 'An enemy has affinity weakness 3 in the affected area.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-8-feature-4',
					name: 'Relentless',
					description: 'If the eye\'s Stamina drops to 0, they can make a free strike before dying. If the target is reduced to 0 Stamina or killed by the strike, the eye lives and their Stamina is reduced to 1 instead.'
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage; shift 1',
							tier2: '9 damage; shift 2',
							tier3: '12 damage; shift 3'
						}),
						effect: 'This ability deals an additional 4 damage when it\'s made with an edge'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-9-feature-2',
						name: 'Strangle',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage; I<1 dazed (save ends)',
							tier3: '12 damage; grabbed; I<2 dazed (save ends)'
						}),
						effect: 'The target can\'t speak or use magical abilities while grabbed.'
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
						effect: 'The garroter turns invisible. The eﬀect ends when the garroter uses an ability, takes damage, or at the end of their turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-9-feature-4',
					name: 'Relentless',
					description: 'If the garroter\'s Stamina drops to 0, they can make a free strike before dying. If the target is reduced to 0 Stamina or killed by the strike, the garroter lives and their Stamina is reduced to 1 instead.'
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 sonic damage',
							tier2: '7 sonic damage',
							tier3: '9 sonic damage; P<2 weakened (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-10-feature-2',
						name: 'Cadenza',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						effect: 'The target moves up to their speed and uses an action.',
						spend: [
							{ value: 3, effect: 'The godcaller targets a second ally.' }
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
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'Self and up to three allies',
						effect: 'Each target regains 15 Stamina and ignores difficult terrain until the end of the encounter.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-10-feature-4',
					name: 'Relentless',
					description: 'If the godcaller\'s Stamina drops to 0, they can make a free strike before dying. If the target is reduced to 0 Stamina or killed by the strike, the godcaller lives and their Stamina is reduced to 1 instead.'
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '11 damage; prone',
							tier3: '14 damage; prone; M<2 bleeding (save ends)'
						}),
						effect: 'The ability deals an additional 6 damage against already prone targets.'
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
						effect: 'The juggernaut moves up to their speed and makes a free strike.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-11-feature-3',
					name: 'Blood in the Water',
					description: 'The juggernaut can move 3 additional squares if they end their movement closer to a prone creature.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-11-feature-4',
					name: 'Relentless',
					description: 'If the juggernaut\'s Stamina drops to 0, they can make a free strike before dying. If the target is reduced to 0 Stamina or killed by the strike, the juggernaut lives and their Stamina is reduced to 1 instead.'
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage; taunted (EoT)',
							tier3: '12 damage; taunted (EoT)'
						}),
						effect: 'This ability has a double edge if the target dealt damage to the rampart this round.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-12-feature-2',
						name: 'Castling',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: '1 ally',
						effect: 'The rampart moves or shifts up to their speed to a square adjacent to the target and then swamps places with the target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-12-feature-3',
						name: 'No.',
						type: FactoryLogic.type.createTrigger('A creature targets an adjacent ally with an ability'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The rampart becomes the new target.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-12-feature-4',
					name: 'Relentless',
					description: 'If the rampart\'s Stamina drops to 0, they can make a free strike before dying. If the target is reduced to 0 Stamina or killed by the strike, the rampart lives and their Stamina is reduced to 1 instead.'
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures touching the ground',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage; A<0 prone can\'t stand (save ends)',
							tier2: '9 damage; A<1 prone can\'t stand (save ends)',
							tier3: '12 damage; A<2 prone can\'t stand (save ends)'
						}),
						effect: 'The ground beneath each target rises 1 square.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-13-feature-2',
						name: 'Sinkhole',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage; M<0 restrained (save ends)',
							tier2: '7 damage; M<1 restrained (save ends)',
							tier3: '10 damage; M<2 restrained (save ends)'
						}),
						effect: 'The affected area is considered difficult terrain.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-13-feature-3',
					name: 'Seismic Step',
					description: 'The terranova ignores difficult terrain. The terranova doesn\'t need line of effect to target creatures touching the ground with abilities.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-13-feature-4',
					name: 'Relentless',
					description: 'If the terranova\'s Stamina drops to 0, they can make a free strike before dying. If the target is reduced to 0 Stamina or killed by the strike, the terranova lives and their Stamina is reduced to 1 instead.'
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						effect: 'The target moves up to their speed and uses an action.',
						spend: [
							{ value: 1, effect: 'The warleader targets a second ally.' },
							{ value: 3, effect: 'The warleader targets a squad instead of a second ally.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-2',
						name: 'Mace Lariat',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 damage; push 1; M<1 dazed (save ends)',
							tier2: '10 damage; push 3; M<2 dazed (save ends)',
							tier3: '13 damage; push 5; M<3 dazed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-3',
						name: 'Lockdown',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three allies',
						effect: 'Each target moves up to their speed and uses the Grab maneuver with an edge. The warleader moves up to their speed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-4',
						name: 'Courtesy Call',
						type: FactoryLogic.type.createTrigger('The target gets a tier 1 result on a power roll.'),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						effect: 'The target has a double edge on next power roll.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-14-feature-5',
					name: 'End Effect',
					description: 'At the end of their turn, the warleader can take 5 damage to end one save ends effect affecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-14-feature-6',
					name: 'Relentless',
					description: 'If the warleader\'s Stamina drops to 0, they can make a free strike before dying. If the target is reduced to 0 Stamina or killed by the strike, the warleader lives and their Stamina is reduced to 1 instead.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-7',
						name: 'Close In',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All allies',
						effect: 'Each target moves up to their speed. Each enemy within 1 of a target makes an **Intuition test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Intuition,
							tier1: 'Frightened of the warleader (save ends)',
							tier2: 'Frightened of the warleader (EoT)',
							tier3: 'no effect'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-8',
						name: 'Familial Reinforcements',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'All allies',
						effect: 'The warleader shifts up to their speed and 5 **orc blizters** appear in unoccupied spaces within distance.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-14-feature-9',
						name: 'I\'ll Do This Myself',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The warleader shifts up to their speed and uses Mace Lariat. Then, the warleader shifts up to their speed and uses Mace Lariat. Finally, the warleader shifts up to their speed and uses Mace Lariat.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-15',
			name: 'Scyza',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Mount),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '11 damage; prone',
							tier3: '14 damage; prone'
						}),
						effect: 'The scyza roars and the target is I<2 frightened (save ends).'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-15-feature-2',
						name: 'Whiptail',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '8 damage',
							tier2: '13 damage',
							tier3: '16 damage; A<2 bleeding (save ends)'
						}),
						effect: 'This ability has an edge against a target on top of the scyza and knocks the target prone inot an unoccupied adjacent square.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-15-feature-3',
						name: 'Crestfall',
						type: FactoryLogic.type.createAction(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 2 }) ],
						target: 'All enemies in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage; 1 sonic damage; R<0 dazed (save ends)',
							tier2: '7 damage; 2 sonic damage; R<1 dazed (save ends)',
							tier3: '9 damage; 3 sonic damage; R<2 dazed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-15-feature-4',
						name: 'Sandstorm',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Special',
						effect: 'The scyza kicks up a sandstorm concealing themselves and each ally in the affected area until the end of the scyza\'s next turn. Each enemy in the burst makes an **Intuition test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Intuition,
							tier1: '10 damage; prone; slowed (EoT)',
							tier2: '7 damage; slowed (EoT)',
							tier3: '4 damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-15-feature-5',
						name: 'Skitter',
						type: FactoryLogic.type.createTrigger('The scyza or an ally riding the scyza is targeted by an ability.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Any damage dealt by the triggering ability is halved. If the creature or object who used the ability is within 3 of the scyza, the scyza makes a free strike against them.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-15-feature-6',
					name: 'War Harness',
					description: 'Three of the scyza\'s size 1 allies can occupy the same space while riding the scyza.'
				}),
				FactoryLogic.feature.create({
					id: 'orc-15-feature-7',
					name: 'Terrible Beast',
					description: 'The scyza deals an additional 6 damage on strikes and abilities used against objects.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'orc-16',
			name: 'Orc Charger',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Orc' ],
			encounterValue: 13,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-16-feature-1',
						name: 'Notched Axe',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'orc-16-feature-2',
					name: 'Relentless',
					description: 'If the charger’s Stamina drops to 0, they can make a free strike before dying. If the target is reduced to 0 Stamina or killed by the attack, the charger lives and their Stamina is reduced to 1 instead.'
				})
			],
			retainer: {
				level4: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-16-retainer-4',
						name: 'Blood Oath',
						type: FactoryLogic.type.createManeuver({ qualifiers: [ 'encounter' ] }),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'Until the start of the next turn, the charger and the charger\'s mentor gain their Recovery value in temporary Stamina, their Speed increases by 2, and they gain an edge on resistance rolls.'
					})
				}),
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-16-retainer-7',
						name: 'Mow \'Em Down',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The charger moves in a straight line up to their speed. During this move, they ignore enemy free strikes, and they can make a melee free strike against any creature they move adjacent to.'
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'orc-16-retainer-10',
						name: 'Vein Burst',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '12 damage',
							tier2: '18 damage',
							tier3: '24 damage'
						}),
						effect: 'The orc takes psychic damage equal to the number of enemies affected. This damage can’t be reduced in any way.'
					})
				})
			}
		})
	],
	addOns: []
};
