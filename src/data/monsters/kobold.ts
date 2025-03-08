import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const kobold: MonsterGroup = {
	id: 'monster-group-kobold',
	name: 'Kobold',
	description: 'Kobold communities, called legions, are found in every biome and across the timescape. Gravitating toward powerful allies and defensible locations, kobolds are equally common in walled cities, secluded temples, subterranean tunnel-mazes, and dragon lairs. Most legions strive to be good neighbors or to go entirely unnoticed, but when a community falls under the sway of a malevolent wyrm or power-hungry centurion, they pose a significant threat.',
	information: [
		{
			id: 'kobold-info-1',
			name: 'Defensive Masters',
			description: `
In a world filled with bigger, hungrier creatures, kobolds survived by becoming experts in collective defense. Kobold shield tactics are legendary; every warrior carries a shield into battle, and soldiers defend each other in tightly choreographed formations. More than a tool, a kobold’s shield is a symbol of their commitment to defending their legion, and they decorate these treasured possessions with battle trophies and illustrations of great deeds.

Kobold legionaries may join worthy adventurers as retainers, lending their defensive prowess to their new allies as they ko-boldly go where no kobold has gone before.`
		},
		{
			id: 'kobold-info-2',
			name: 'Unconventional Tactics',
			description: 'Relentless innovators, kobolds can easily outsmart anyone who doesn’t take them seriously. Their foes haven’t experienced a true kobold battle until they survive exploding javelins or flaming nets. Kobold homes are protected with deadly hazards and ambush points. In open warfare, legions deploy mechanical dragons and flaming spike pit traps.'
		},
		{
			id: 'kobold-info-3',
			name: 'Tiny Dragons',
			description: 'Most kobolds believe their ancestors were created by powerful dragons - and with sharp, angular features and prominent dorsal crests, they certainly look the part! Newborn kobolds have brilliant, pearlescent scales; as kobolds age, their scales dim and mottle. Owing to a deep magical connection, a legion that lives in the domain of a dragon adopts the color of that dragon’s scales over several generations.'
		},
		{
			id: 'kobold-info-4',
			name: 'Domain Expansion',
			description: 'When kobolds settle into the domain of a dragon, they become more like that dragon in more than just color. Some groups worship the dragon like a god. Others revere them as a leader or ancestor, or admire them like a really (REALLY) big brother. This manifests as a desire to understand the dragon’s affinity so as to embody it. Kobolds see themselves as an extension of that domain, working with and for it. Meteor kobolds, for example, may rely more on hanging traps. Bloodthirsty omen kobolds deny themselves material pleasures and may end up wasting away into little more than skeletons. It has been speculated that kobolds living inside a domain do influence the size and strength of the dragon’s hold on the territory.'
		},
		{
			id: 'kobold-info-5',
			name: 'Kobold and Dragon Symbiosis',
			description: 'Most dragons are solitary creatures, but kobolds living in their domain provide both parties with clear benefits. A dragon can establish their domain over an area in half the time if they allow kobolds to settle in the area as well. Meanwhile, a kobold that spends 1 week or more living within the domain of a dragon becomes immune to the hazardous and negative effects of that domain. The kobold’s physical appearance may also change the longer they stay in the area.'
		},
		{
			id: 'kobold-info-6',
			name: 'Terrain Mastery',
			description: 'All of this – the kobolds’ innovative spirit, affinity for their terrain, group defenses, and creative tactics – makes a kobold legion the master of the area in which they live. While they employ traps and tricks of their own creations, they also know the ins and outs of nature’s traps. For example, a sagittarius might shoot at a nearby hive of angry bees instead of their opponent. If your kobold opponents retreat over a frozen lake or desert sands, don’t give chase; they likely know something about these terrain hazards that you do not.'
		},
		{
			id: 'kobold-info-7',
			name: 'Kobold Languages',
			description: 'Most goblins speak Kethaic and can understand Caelian.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'kobold-malice-1',
			name: 'Maniple Tactics',
			cost: 3,
			sections: [
				'Up to 3 kobolds make a free strike, swaps positions with an adjacent kobold, and then that kobold makes a free strike.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'kobold-malice-2',
			name: 'Set the Initiative',
			cost: 5,
			sections: [
				'Two kobolds take their turns in a row.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'kobold-malice-3',
			name: 'Shield Wall',
			cost: 7,
			sections: [
				'Until the end of the round, all kobolds with Shield? Shield! impose an additional bane on incoming strikes and abilities.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'kobold-1',
			name: 'Kobold Princeps',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Kobold' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: '2 temporary Stamina',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-1-feature-1',
						name: 'Hasta',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage'
						}),
						effect: 'The princeps lunges with their spear. One ally within 3 can shift 2.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-1-feature-2',
					name: 'Shield? Shield!',
					description: 'The princeps has cover, a Stability of 1, and can act as cover for allies when adjacent to an ally who also has this trait.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'kobold-2',
			name: 'Kobold Sagittarion',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Kobold' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Ranged distance +5',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-2-feature-1',
						name: 'Composite Bow',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						}),
						effect: 'The sagittarius has an edge on this ability while adjacent to an ally.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-2-feature-2',
					name: 'Shield? Shield!',
					description: 'The sagittarius has cover, a Stability of 1, and can act as cover for allies when adjacent to an ally who also has this trait.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'kobold-3',
			name: 'Kobold Tiro',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Kobold' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Speed +1',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-3-feature-1',
						name: 'Pugio',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage; shift 1',
							tier3: '3 damage; shift 2'
						}),
						effect: 'The tiro slices the target with their dagger. The target can’t shift until the start of the tiro’s next turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-3-feature-2',
					name: 'Shield? Shield!',
					description: 'The tiro has cover, a Stability of 1, and can act as cover for allies when adjacent to an ally who also has this trait.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'kobold-4',
			name: 'Kobold Veles',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Kobold' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Speed +1',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-1-feature-1',
						name: 'Hasta',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage'
						}),
						effect: 'All kobolds ignore opportunity attacks from the target until the start of the vele’s next turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-1-feature-2',
					name: 'Shield? Shield!',
					description: 'The veles has cover, a Stability of 1, and can act as cover for allies when adjacent to an ally who also has this trait.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'kobold-5',
			name: 'Kobold Adeptus',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Kobold' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 2, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-5-feature-1',
						name: 'Shocking Bolt',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 lightning damage',
							tier2: '6 lightning damage',
							tier3: '7 lightning damage'
						}),
						effect: 'The adeptus has an edge on the ability if the target is adjacent to another enemy. All enemies adjacent to the target take 2 lighting damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-5-feature-2',
						name: 'Arcane Telum',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'Three creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '6 damage'
						}),
						effect: 'This attack ignores all banes and damage reduction.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-5-feature-3',
					name: 'Shield? Shield!',
					description: 'The adeptus has cover, a Stability of 1, and can act as cover for allies when adjacent to an ally who also has this trait.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'kobold-6',
			name: 'Kobold Artifax',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Kobold' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 1, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-6-feature-1',
						name: 'Chain Hook',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage; pull 1',
							tier2: '4 damage; pull 2',
							tier3: '5 damage; pull 3'
						}),
						effect: 'If the target’s forced movement triggers a trap, the trap has a double edge on its power roll.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-6-feature-2',
						name: 'Activate Trap',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One trap or terrain object',
						effect: 'The trap or terrain object instantly triggers.',
						spend: [
							{ value: 3, effect: 'The artifex can place a new trap in the encounter and instantly trigger it.' }
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-6-feature-3',
					name: 'Shield? Shield!',
					description: 'The artifax has cover, a Stability of 1, and can act as cover for allies when adjacent to an ally who also has this trait.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'kobold-7',
			name: 'Kobold Legionary',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Kobold' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-7-feature-1',
						name: 'Gladius',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						}),
						effect: 'Taunted (EoT).',
						spend: [
							{ value: 3, effect: 'The legionary and their squad can shift 2 before this ability is used.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-7-feature-2',
						name: 'Shield Bash',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage; push 1; M<0 prone',
							tier2: '3 damage; push 2; M<1 prone',
							tier3: '4 damage; push 3; M<2 prone'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-7-feature-3',
					name: 'Shield? Shield!',
					description: 'The legionary has cover, a Stability of 1, and can act as cover for allies when adjacent to an ally who also has this trait.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'kobold-8',
			name: 'Kobold Signifier',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Kobold' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-8-feature-1',
						name: 'Signum',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						}),
						effect: 'An ally within 10 can shift their speed, so long as they end their movement adjacent to an ally.',
						spend: [
							{ value: 2, repeatable: true, effect: 'One additional ally can shift for every 2 malice spent.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-8-feature-2',
						name: 'Glory to the Legion',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All allies in the burst',
						effect: 'Each target regains 5 stamina.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-8-feature-3',
					name: 'Upholding High Standards',
					description: 'Each ally that starts their turn within 5 of the signifier has their speed increased by 2 and deals an additional 2 damage on their strikes until the end of their turn. If the signifier is killed, a minion can enter their square to retrieve the signum as a free action and replace their stat block with the signifier stat block.'
				}),
				FactoryLogic.feature.create({
					id: 'kobold-8-feature-4',
					name: 'Shield? Shield!',
					description: 'The signifier has cover, a Stability of 1, and can act as cover for allies when adjacent to an ally who also has this trait.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'kobold-9',
			name: 'Kobold Venator',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Kobold' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-9-feature-1',
						name: 'Dolobra & Net',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage',
							tier2: '6 damage; M<1 restrained (save ends)',
							tier3: '7 damage; M<2 restrained (save ends)'
						}),
						spend: [
							{ name: 'Then We Light the Net on Fire!', value: 3, effect: 'Each creature and object restrained by this ability takes 2 fire damage at the start of each of their turns until the condition ends.' }
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-9-feature-2',
					name: 'Lost in the Crowd',
					description: 'If the venator is adjacent to an ally that is not hiding, they can use the hide maneuver, even if observed.'
				}),
				FactoryLogic.feature.create({
					id: 'kobold-9-feature-3',
					name: 'Not What I Seem',
					description: 'The venator begins the encounter disguised as a minion. The venator has a double edge on their first action of the encounter, when they reveal themselves.'
				}),
				FactoryLogic.feature.create({
					id: 'kobold-9-feature-4',
					name: 'Shield? Shield!',
					description: 'The venator has cover, a Stability of 1, and can act as cover for allies when adjacent to an ally who also has this trait.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'kobold-shieldscale-drangolin',
			name: 'Shieldscale Drangolin',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Animal', 'Kobold' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(7, 'burrow'),
			stamina: 80,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 1, -3, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-shieldscale-drangolin-feature-1',
						name: 'Fiery Claws',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 fire damage',
							tier2: '10 fire damage',
							tier3: '13 fire damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-shieldscale-drangolin-feature-2',
						name: 'Drangolin Plume',
						type: FactoryLogic.type.createAction(),
						cost: 5,
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The drangolin shifts their speed and uses Fiery Claws against each creature who comes within 1 during the move. The drangolin makes one power roll against all targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-shieldscale-drangolin-feature-3',
						name: 'Erupt',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2, qualifier: 'while burrowing' }) ],
						target: 'All creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage; push 1; A<0 prone',
							tier2: '8 damage; push 3; A<1 prone',
							tier3: '11 damage; push 5; A<2 prone'
						}),
						effect: 'This attack deals an additional 2 fire damage against targets directly above the dragonlin.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-shieldscale-drangolin-feature-4',
					name: 'Ash Shot',
					description: 'Each enemy adjacent to the drangolin has a bane on strikes and can’t be hidden.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'kobold-trained-gelatinous-cube',
			name: 'Trained Gelatinous Cube',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Hexer),
			keywords: [ 'Animal', 'Kobold' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(2, -1, -3, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-trained-gelatinous-cube-feature-1',
						name: 'Engulf',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 acid damage; A<0 dazed (save ends)',
							tier2: '10 acid damage; A<1 dazed (save ends)',
							tier3: '14 acid damage; A<2 restrained (save ends)'
						}),
						effect: 'A size 2 or smaller creature restrained by this ability is pulled into one of the cube’s squares and moves with the cube. The creature takes 4 acid damage at the start of each of their turn while restrained. When restrained ends, the creature moves to the nearest unoccupied square adjacent to the cube.',
						spend: [
							{ value: 2, effect: 'The cube targets one additional creature or object.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-trained-gelatinous-cube-feature-2',
						name: 'You Didn’t Pay Attention!',
						type: FactoryLogic.type.createTrigger('A creature moves or is force moved into the cube.', { free: true }),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The cube uses Engulf with a double edge'
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-trained-gelatinous-cube-feature-3',
					name: 'Translucent Cube',
					description: 'The cube completely occupies their space, blocking line of effect on enemy abilities. The cube is hidden until they act.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'kobold-10',
			name: 'Kobold Centurion',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Kobold' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 80,
			stability: 2,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(2, 3, 2, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-10-feature-1',
						name: 'Pilum',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 damage; M<1 weakened (save ends)',
							tier2: '10 damage; M<2 weakened (save ends)',
							tier3: '13 damage; M<3 weakened (save ends)'
						}),
						effect: 'Each ally adjacent to a target of this ability can make a free strike.',
						spend: [
							{ value: 3, effect: 'Each target weakened by this ability is now restrained while they are weakened.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-10-feature-2',
						name: 'Concentrate All Fire on That Hero!',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy',
						effect: 'The target is marked until the start of the centurion’s next turn. The centurion and each of their allies have an edge on power rolls made against targets marked by the centurion.',
						spend: [
							{ value: 3, repeatable: true, effect: 'The centurion targets 1 additional enemy for every 3 malice spent.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-10-feature-3',
						name: 'Testudo!',
						type: FactoryLogic.type.createTrigger('A creature uses an ability aginst the centurion or an ally.'),
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All enemies in the burst',
						effect: 'Each target shifts 2 before the damage is resolved. All kobolds with Shield? Shield! has damage immunity 2 against the triggering ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-10-feature-4',
						name: 'Firetail Pilum',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
						target: 'All enemies in the line',
						effect: 'The centurion uses Pilum against each target, dealing an additional 5 damage. Each weakened target takes 2 fire damage at the start of each of their turns until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-10-feature-5',
						name: 'Boom Pilum!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
						target: 'All enemies in the cube',
						effect: 'The centurion uses Pilum against each target with a double edge. Each target is then pushed 3.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-10-feature-6',
						name: 'Are You Not Entertained?',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All enemies in the burst',
						effect: 'Each target is P<2 taunted (save ends). For the rest of the encounter the centurion has damage immunity 2. All allies within 10 of the centurion can make a free strike.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-10-feature-7',
					name: 'End Effect',
					description: 'At the end of their turn, the centurion can take 5 damage to end one save ends effect affecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'kobold-10-feature-8',
					name: 'Shield? Shield!',
					description: 'The centurion has cover, a Stability of 3, and can act as cover for allies when adjacent to an ally who also has this trait.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'kobold-11',
			name: 'Kobold Shieldbearer',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Kobold' ],
			encounterValue: 15,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-11-feature-1',
						name: 'Gladius',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage; taunted (EoT)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'kobold-11-feature-2',
					name: 'Shield, Boss?',
					description: 'The shieldbearer and their mentor has cover, their Stability increased by 1, and can act as cover for allies when the shieldbearer is adjacent to their mentor.'
				})
			],
			retainer: {
				level4: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-11-retainer-4',
						name: 'Shield Block',
						type: FactoryLogic.type.createTrigger('The shieldbearer’s mentor takes damage from an attack.', { qualifiers: [ 'encounter' ] }),
						keywords: [],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'The shieldbearer’s mentor',
						effect: 'When the shieldbearer’s mentor takes damage from an attack, the shieldbearer can block the attack (if the shieldbearer is adjacent to the mentor) or throw their shield into the mentor’s space (if they are up to 5 away from the mentor). The triggering attack is reduced by half and any potency effects it has are reduced by 1. If the kobold threw their shield, it bounces back to their hand.'
					})
				}),
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-11-retainer-7',
						name: 'Living Backpack',
						type: FactoryLogic.type.createAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The shieldbearer’s mentor',
						effect: `
The shieldbearer straps their shield on their back and then climbs onto their mentor’s back. While clinging to their mentor, the shieldbearer enters the mentor’s space and loses their Shield, Boss? trait. They move along with the mentor and can’t use actions, moves, or maneuvers, except to end the effect as a maneuver. The effect also ends if the shieldbearer is force moved away or knocked prone. When the effect ends, the shieldbearer moves into an adjacent square if they’re still in the mentor’s space.

While the shieldbearer is clinging to their mentor, both the shieldbearer and the mentor gain 10 Temporary Stamina and cover.`
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'kobold-11-retainer-10',
						name: 'Let\'s Go Sledding',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '3 creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '6 damage; M (weak) prone',
							tier2: '10 damage; M (average) prone',
							tier3: '14 damage; M (strong) prone'
						}),
						effect: 'If this ability is used as part of the Charge action, gain 2 surges.'
					})
				})
			}
		})
	],
	addOns: []
};
