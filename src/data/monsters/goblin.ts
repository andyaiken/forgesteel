import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const goblin: MonsterGroup = {
	id: 'monster-group-goblin',
	name: 'Goblin',
	description: `
Known among themselves as rogabrin, meaning “more of us” in their Szetch language, goblins are one of the most numerous humanoid species in the world. They can be found across many lands, have developed countless distinct cultures, and dare to venture into environments that few other humanoids are willing to hazard.

Their long arms and prehensile toes make goblins particularly well adapted to environments requiring climbing, and they live equally comfortably in treetop cities as in subterranean realms filled with stalactites, ledges, and chasms. However, just as many prefer to dwell in tight-knit neighborhoods within diverse cities. Many of those goblins who cross swords with adventuring heroes are the worst of their society—thieves and murderers shunned by their own people.`,
	picture: null,
	information: [
		{
			id: 'goblin-info-1',
			name: 'Encountered in Groups',
			description: 'Whether within a society or living in exile, goblins survive and thrive because they work together. A single goblin forced into the wild is terrified. A dozen outlaw goblins are supremely confident—perhaps overly so. Such groups often become bandits who ambush travelers crossing through their territory, be it desert, forest, or underground. Larger goblin hordes might become unscrupulous mercenaries serving powerful villains. No matter how they’re encountered, goblins prefer to fight as an overwhelming force and to flee when foes outnumber friends.'
		},
		{
			id: 'goblin-info-2',
			name: 'Mobile and Sneaky',
			description: 'Short, lithe, and long armed, goblins are built for mobility, stealth, and climbing. Goblins who dwell in untamed wilderness and twisting caves utilize their natural agility to hide from threats and flee when found. These crafty skirmishers might run wild through battle, hacking at their enemies’ knees, or unleash arrows as they dart from tree to tree.'
		},
		{
			id: 'goblin-info-3',
			name: 'Goblin Magic',
			description: 'Some exiled goblins forge pacts with evil entities for magical power, including archfey, deities, and fiends. Goblin assassins conjure darkness made from the souls of their victims, while goblin cursespitters hurl magic hexes that keep their enemies at bay'
		},
		{
			id: 'goblin-info-4',
			name: 'Skitterling',
			description: 'A six-legged winged rodent the size of a housecat, a skitterling moves their clawed feet as they fly, making them appear to scurry through the air. Goblins train these pets to claw at the faces of enemies, as their feet secrete a toxin that causes temporary sluggishness.'
		},
		{
			id: 'goblin-info-5',
			name: 'War Spider',
			description: 'Goblins ride enormous arachnids as mounts in battle. With blades attached to their legs, a war spider cuts a swath through enemy forces while archers fire from atop a platform on the animal’s back. During a raid, a war spider arches their body to launch warriors off their back and into the fray.'
		},
		{
			id: 'goblin-info-6',
			name: 'Warg',
			description: 'Some goblins form a special bond with worgs—canine creatures raised by many goblin communities as mounts, guardians, and companions. A worg stays loyal to the hand that feeds them, and will protect their handler to the bitter end.'
		},
		{
			id: 'goblin-info-7',
			name: 'Goblin Languages',
			description: 'Most goblins speak Caelian and Szetch.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'goblin-malice-1',
			name: 'Goblin Mode',
			cost: 3,
			sections: [
				'Each goblin in the encounter gains a +2 bonus to speed until the end of the round.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'goblin-malice-2',
			name: 'Tiny Stabs',
			cost: 5,
			sections: [
				'Each enemy in the encounter takes 1 damage for each goblin adjacent to them.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'goblin-malice-3',
			name: 'Swamp Stink',
			cost: 7,
			sections: [
				'The encounter map becomes covered in a green mist that lasts until the end of the round, and which can’t be dispersed by wind. All areas of the map become difficult terrain for non-goblins, and each non-goblin on the map must make a Might test.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Might,
					tier1: '5 poison damage; the creature is weakened until the mist disappears.',
					tier2: 'The creature is weakened until the mist disappears.',
					tier3: 'No effect.'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'goblin-1',
			name: 'Goblin Runner',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(-2, 2, 0, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-1-feature-1',
						name: 'Club Charge',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage',
								tier2: '2 damage',
								tier3: '3 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-1-feature-2',
					name: 'Crafty',
					description: 'The runner doesn’t provoke opportunity attacks by moving.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-2',
			name: 'Goblin Sniper',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: MonsterLogic.createCharacteristics(-2, 2, 0, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-2-feature-1',
						name: 'Bow',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							})),
							FactoryLogic.createAbilitySectionText('If the sniper doesn’t use a move action this turn, this ability gains an edge.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-2-feature-2',
					name: 'Crafty',
					description: 'The sniper doesn’t provoke opportunity attacks by moving.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-3',
			name: 'Goblin Spinecleaver',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+1 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-3-feature-1',
						name: 'Axe',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage; push 1',
								tier2: '4 damage; push 3',
								tier3: '5 damage; push 4'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-3-feature-2',
					name: 'Crafty',
					description: 'The spinecleaver doesn’t provoke opportunity attacks by moving.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-skitterling',
			name: 'Skitterling',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Animal', 'Goblin' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: '+3 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(-5, 2, -4, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-skitterling-feature-1',
						name: 'Claws',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 poison damage',
								tier2: '2 poison damage',
								tier3: '3 poison damage'
							})),
							FactoryLogic.createAbilitySectionText('The target takes a bane on their next strike.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-5',
			name: 'Goblin Assassin',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(-2, 2, 0, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-5-feature-1',
						name: 'Sword Stab',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage',
								tier2: '6 damage',
								tier3: '7 damage'
							})),
							FactoryLogic.createAbilitySectionText('If this ability gains an edge or has a double edge, it deals an extra 2 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-5-feature-2',
						name: 'Shadow Chains',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 corruption damage; A<0 restrained (save ends)',
								tier2: '4 corruption damage; A<1 restrained (save ends)',
								tier3: '5 corruption damage; A<2 restrained (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-5-feature-3',
					name: 'Crafty',
					description: 'The assassin doesn’t provoke opportunity attacks by moving.'
				}),
				FactoryLogic.feature.create({
					id: 'goblin-5-feature-4',
					name: 'Slip Away',
					description: ' The assassin can attempt to hide even while observed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-6',
			name: 'Goblin Cursespitter',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(-2, 1, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-6-feature-1',
						name: 'Eye of Surlach',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 corruption damage; I<0 weakened (save ends)',
								tier2: '4 corruption damage; I<1 weakened (save ends)',
								tier3: '5 corruption damage; I<2 weakened (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-6-feature-2',
						name: 'Dizzying Hex',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'I<0 prone',
								tier2: 'I<1 prone and can’t stand (EoT)',
								tier3: 'Prone; I<2 can’t stand (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-6-feature-3',
					name: 'Crafty',
					description: 'The cursespitter doesn’t provoke opportunity attacks by moving.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-7',
			name: 'Goblin Stinker',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(-2, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-7-feature-1',
						name: 'Toxic Winds',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 15 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 poison damage; slide 1',
								tier2: '2 poison damage; slide 2',
								tier3: '3 poison damage; slide 3'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								repeatable: true,
								effect: 'For each Malice spent, one target can be force moved 1 additional square.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-7-feature-2',
						name: 'Swamp Gas',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The area is filled with a green haze that lasts until the start of the stinker’s next turn or until the stinker is reduced to 0 Stamina, and which can’t be dispersed by wind. The area is difficult terrain for non-goblins, and each non-goblin who moves in the area takes 2 poison damage for each square moved.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-7-feature-3',
					name: 'Crafty',
					description: 'The stinker doesn’t provoke opportunity attacks by moving.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-8',
			name: 'Goblin Underboss',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Support),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(-1, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-8-feature-1',
						name: 'Swordplay',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							})),
							FactoryLogic.createAbilitySectionText('One ally adjacent to the target can make a free strike against them.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-8-feature-2',
						name: 'Get Reckless!',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the start of the underboss’s next turn, each target gains an edge on strikes, and any strike made against a target gains an edge.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'Strikes made against targets no longer gain an edge.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-8-feature-3',
					name: 'Crafty',
					description: 'The underboss doesn’t provoke opportunity attacks by moving.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-9',
			name: 'Goblin Warrior',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(-2, 2, 0, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-9-feature-1',
						name: 'Spear Charge',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-9-feature-2',
						name: 'Bury the Point',
						type: FactoryLogic.type.createMain(),
						cost: 2,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; M<0 bleeding (save ends)',
								tier2: '6 damage; M<1 bleeding (save ends)',
								tier3: '7 damage; M<2 bleeding (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-9-feature-3',
					name: 'Crafty',
					description: 'The warrior doesn’t provoke opportunity attacks by moving.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-10',
			name: 'Goblin Monarch',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(3, 2, -4, 0, -3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-10-feature-1',
						name: 'Handaxe',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '7 damage',
								tier2: '10 damage',
								tier3: '13 damage'
							})),
							FactoryLogic.createAbilitySectionText('One ally within 10 squares of the monarch can make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-10-feature-2',
						name: 'Get in Here!',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Two **goblin runners** appear in unoccupied spaces within distance.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-10-feature-3',
						name: 'Meat Shield!',
						type: FactoryLogic.type.createTrigger('A creature targets the monarch with a strike.'),
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The ally is the target of the triggering strike instead.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-10-feature-4',
					name: 'End Effect',
					description: 'At the end of each of their turns, the monarch can take 5 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'goblin-10-feature-5',
					name: 'Crafty',
					description: 'The monarch doesn’t provoke opportunity attacks by moving.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-10-feature-6',
						name: 'What Are You Waiting For?',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target can move up to their speed or make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-10-feature-7',
						name: 'Focus Fire',
						type: FactoryLogic.type.createVillainAction(),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy or object',
						sections: [
							FactoryLogic.createAbilitySectionText('Each ally within 10 squares of the target can move up to their speed toward the target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-10-feature-8',
						name: 'Kill!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.createSpecial('Special') ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('Each enemy in the encounter takes 2 damage for each goblin adjacent to them.')
						]
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-11',
			name: 'War Spider',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Mount),
			keywords: [ 'Animal', 'Goblin' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(7, 'climb'),
			stamina: 60,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(2, 1, -4, 0, -3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-11-feature-1',
						name: 'Bite',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 poison damage',
								tier2: '11 poison damage',
								tier3: '14 poison damage; M<2 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'For any tier outcome, if the target has m<3, they are weakened (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-11-feature-2',
						name: 'Leg Blade',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '6 damage',
								tier2: '9 damage',
								tier3: '12 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-11-feature-3',
						name: 'Trample',
						type: FactoryLogic.type.createMain(),
						cost: 5,
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The spider shifts up to their speed and uses Leg Blade against each creature who comes adjacent to them during the shift. The spider makes one power roll against all targets.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-11-feature-4',
						name: 'Web',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: 'A<0 restrained (save ends)',
								tier2: 'A<1 restrained (save ends)',
								tier3: 'A<2 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The area is difficult terrain for enemies.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-11-feature-5',
						name: 'Skitter',
						type: FactoryLogic.type.createTrigger('The spider or any ally riding the spider takes damage.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The damage is halved, and the spider shifts up to 2 squares after the triggering effect resolves.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-11-feature-6',
					name: 'Ride Launcher',
					description: ' Any ally who leaps off the back of the spider can jump up to 6 squares without making a test, and takes no damage if they fall during the jump. After any ally jumps, the first melee strike they make on the same turn gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'goblin-11-feature-7',
					name: 'Wide Back',
					description: 'While riding the spider, two size 1 allies can occupy the same space.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-12',
			name: 'Worg',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Mount),
			keywords: [ 'Animal', 'Goblin' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 1,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(1, 2, -1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-12-feature-1',
						name: 'Bite',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-12-feature-2',
						name: 'Sprint',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The worg moves up to their speed.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-12-feature-3',
					name: 'Mounted Charger',
					description: 'If a worg used as a mount charges, their rider gains an edge on melee strikes until the end of the rider’s turn.'
				}),
				FactoryLogic.feature.create({
					id: 'goblin-12-feature-4',
					name: 'Shared Crafty',
					description: 'If the worg’s rider has the Crafty trait, the worg also has that trait.'
				})
			]
		})
	],
	addOns: []
};
