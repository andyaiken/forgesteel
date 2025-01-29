import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const goblin: MonsterGroup = {
	id: 'monster-group-goblin',
	name: 'Goblin',
	description: `
As with all humanoid ancestries, different types of goblins and goblin cultures can be found across many lands, each with their own ideals. Known among themselves as rogabrin, meaning “more of us” in their language, goblins are one of the most numerous humanoids in the world. They can be found in every environment humans occupy and in places many other humanoids avoid, including deep cave systems.

Their long arms and prehensile toes make goblins particularly well adapted to environments requiring climbing, and they live equally comfortably in treetop cities as in subterranean realms filled with stalactites, ledges, and chasms. However, just as many prefer to dwell in tight-knit neighborhoods within diverse cities. Many of those goblins who cross swords with adventuring heroes are the worst of their society—thieves and murderers shunned by their own people.`,
	information: [
		{
			id: 'goblin-info-1',
			name: 'Encountered in Groups',
			description: 'Whether within a society or living in exile, goblins survive and thrive because they work together. A single goblin forced into the wild is terrified. A dozen outlaw goblins are supremely confident—perhaps overly so. Such groups often become bandits who ambush travelers crossing through their territory, be it desert, forest, or underground. Larger bands might become unscrupulous mercenaries serving powerful villains. No matter how they’re encountered, goblins prefer to fight as an overwhelming force and to flee when foes outnumber friends.'
		},
		{
			id: 'goblin-info-2',
			name: 'Mobile and Sneaky',
			description: 'Short, lithe, and long armed, goblins are built for mobility, stealth, and climbing. Goblins who dwell in untamed wilderness and twisting caves utilize their natural agility to hide from threats and flee when found. These crafty skirmishers might run wild through battle, hacking at their enemies’ knees, or unleash arrows as they dart from tree to tree.'
		},
		{
			id: 'goblin-info-3',
			name: 'Goblin Magic',
			description: 'Some exiled goblins forge pacts with evil entities for magical power, including archfey, deities, and fiends. Goblin assassins conjure darkness made from the souls of their victims, while goblin cursespitters hurl magic hexes that keep their enemies at bay.'
		},
		{
			id: 'goblin-info-4',
			name: 'Skitterling',
			description: 'A six-legged winged rodent the size of a housecat, a skitterling moves their clawed feet as they fly, making them appear to scurry through the air. Goblins train these pets to claw at the faces of enemies, as their feet secrete a toxin that causes temporary sluggishness.'
		},
		{
			id: 'goblin-info-5',
			name: 'War Spider',
			description: 'Goblins ride enormous arachnids as mounts in battle. With blades attached to their legs, a war spider cuts a swath through enemy forces while archers fire from atop a platform on the beast’s back. During a raid, a spider arches their body to launch warriors off their back and into the fray.'
		},
		{
			id: 'goblin-info-6',
			name: 'Warg',
			description: 'Some goblins form a special bond with wargs—canine creatures that many goblin communities raise as mounts, guardians, and companions.'
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
					tier1: '5 poison damage; weakend until mist disappears',
					tier2: 'Weakened until mist disappears',
					tier3: 'No effect'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'goblin-1',
			name: 'Goblin Runner',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Harrier, MonsterOrganizationType.Minion),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 4,
			freeStrikeDamage: 1,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(-2, 2, 0, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-1-feature-1',
						name: 'Club Charge',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage'
						})
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
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Artillery, MonsterOrganizationType.Minion),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 3,
			freeStrikeDamage: 2,
			withCaptain: 'Ranged distance +5',
			characteristics: MonsterLogic.createCharacteristics(-2, 2, 0, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-2-feature-1',
						name: 'Bow',
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
						effect: 'If the sniper doesn’t use a move action this turn, the ability has an edge.'
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
			name: 'Goblin Spineclever',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Brute, MonsterOrganizationType.Minion),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 5,
			freeStrikeDamage: 2,
			withCaptain: 'Strike damage +1',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-3-feature-1',
						name: 'Axe',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage; push 1',
							tier2: '4 damage; push 3',
							tier3: '5 damage; push 4'
						}),
						effect: 'If the spinecleaver doesn’t use a move action this turn, the ability has an edge.'
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
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Hexer, MonsterOrganizationType.Minion),
			keywords: [ 'Animal', 'Goblin' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'T'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 3,
			freeStrikeDamage: 1,
			withCaptain: 'Speed +3',
			characteristics: MonsterLogic.createCharacteristics(-5, 2, -4, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-skitterling-feature-1',
						name: 'Claws',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 poison damage',
							tier2: '2 poison damage',
							tier3: '3 poison damage'
						}),
						effect: 'The target has a bane on their next strike.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-5',
			name: 'Goblin Assassin',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Brute, MonsterOrganizationType.Band),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 15,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(-2, 2, 0, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-5-feature-1',
						name: 'Sword Stab',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage',
							tier2: '6 damage',
							tier3: '7 damage'
						}),
						effect: 'This ability deals an additional 2 damage if the scoundrel has an edge on the power roll.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-5-feature-2',
						name: 'Shadow Chains',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 corruption damage; A<0 restrained (save ends)',
							tier2: '4 corruption damage; A<1 restrained (save ends)',
							tier3: '5 corruption damage; A<2 restrained (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-5-feature-3',
					name: 'Crafty',
					description: 'The assassin doesn’t provoke opportunity attacks by moving.'
				}),
				FactoryLogic.feature.create({
					id: 'goblin-5-feature-4',
					name: 'Hide While Observed',
					description: 'The assassin can take the Hide maneuver even while observed, though they still must have cover or concealment.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-6',
			name: 'Goblin Cursespitter',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Hexer, MonsterOrganizationType.Band),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 10,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(-2, 1, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-6-feature-1',
						name: 'Eye of Surlach',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 corruption damage; I<0 weakened (save ends)',
							tier2: '4 corruption damage; I<1 weakened (save ends)',
							tier3: '5 corruption damage; I<2 weakened (save ends)'
						})
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
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'I<0 prone',
							tier2: 'I<1 prone can’t stand (EoT)',
							tier3: 'prone I<2 and can’t stand (save ends)'
						})
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
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Controller, MonsterOrganizationType.Band),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 10,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(-2, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-7-feature-1',
						name: 'Toxic Winds',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 15 }) ],
						target: 'Each enemy in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 poison damage; slide 1',
							tier2: '2 poison damage; slide 2',
							tier3: '3 poison damage; slide 3'
						}),
						spend: [
							{ value: 1, repeatable: true, effect: 'Increase the slide for one target by 2 squares for each malice spent.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-7-feature-2',
						name: 'Swamp Gas',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						effect: 'The area is filled with a green haze until the start of the stinker’s next turn or until the stinker is reduced to Stamina 0. The area is difficult terrain for non-goblin creatures, and each such creature who moves within the area takes 2 poison damage for each square moved. The haze can’t be dispersed by wind.'
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
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Support, MonsterOrganizationType.Band),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 15,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(-1, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-8-feature-1',
						name: 'Swordplay',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						}),
						effect: 'One ally adjacent to the target can make a free strike against them.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-8-feature-2',
						name: 'Get Reckless!',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All allies in the burst',
						effect: 'Until the start of the underboss’s next turn, each target has an edge on strikes, and strikes made against them have an edge.',
						spend: [
							{ value: 2, effect: 'Strikes don’t have an edge against a target.' }
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
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Harrier, MonsterOrganizationType.Band),
			keywords: [ 'Goblin', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 15,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(-2, 2, 0, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-9-feature-1',
						name: 'Spear Charge',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-9-feature-2',
						name: 'Bury the Point',
						type: FactoryLogic.type.createAction(),
						cost: 2,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; M<0 bleeding (save ends)',
							tier2: '6 damage; M<1 bleeding (save ends)',
							tier3: '7 damage; M<2 bleeding (save ends)'
						})
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
			role: FactoryLogic.createMonsterRole(MonsterRoleType.NoRole, MonsterOrganizationType.Leader),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 damage',
							tier2: '10 damage',
							tier3: '13 damage'
						})
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
						effect: 'Two goblin runners appear in unoccupied spaces.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-10-feature-3',
						name: 'Meat Shield!',
						type: FactoryLogic.type.createTrigger('A creature targets the monarch with a strike.'),
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One ally',
						effect: 'The ally becomes the target of othe triggering strike instead.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-10-feature-4',
					name: 'End Effect',
					description: 'At the end of their turn, the monarch can take 5 damage to end one save ends effect affecting them. This damage can’t be reduced in any way.'
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
						target: 'Each ally',
						effect: 'Each target can movoe up to their speed or make a free strike.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-10-feature-7',
						name: 'Focus Fire',
						type: FactoryLogic.type.createVillainAction(),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy',
						effect: 'Each ally within 10 squares of the enemy can move up to their speed toward the enemy.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-10-feature-8',
						name: 'Kill!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All allies in the burst',
						effect: 'Each target can.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-war-spider',
			name: 'War Spider',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Mount, MonsterOrganizationType.Troop),
			keywords: [ 'Animal', 'Goblin' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(7, 'climb'),
			stamina: 15,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(2, 1, -4, 0, -3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-war-spider-feature-1',
						name: 'Bite',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 poison damage',
							tier2: '11 poison damage',
							tier3: '14 poisoin damage; M<2 weakened (save ends)'
						}),
						spend: [
							{ value: 2, effect: 'M<3 weakened (save ends)' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-war-spider-feature-2',
						name: 'Leg Blade',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage',
							tier3: '12 damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-war-spider-feature-3',
						name: 'Trample',
						type: FactoryLogic.type.createAction(),
						cost: 5,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The spider shifts up to their speed and makes a Leg Blade strike against each creature who comes within 1 of the spider during the move. The spider makes one power roll against all targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-war-spider-feature-4',
						name: 'Web',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						target: 'All creatures in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							tier1: 'A<0 restrained (save ends)',
							tier2: 'A<1 restrained (save ends)',
							tier3: 'A<2 restrained (save ends)'
						}),
						effect: 'The affected area is considered difficult terrain for enemies'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-war-spider-feature-5',
						name: 'Skitter',
						type: FactoryLogic.type.createTrigger('The spider or an ally riding the spider is targeted by an ability.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The spider shifts 2. Any damage dealt by the triggering ability is halved.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-war-spider-feature-6',
					name: 'Ride Launcher',
					description: 'An ally who leaps off the back of the spider can jump up to 6 squares without a test, and takes no damage if they fall during the jump. After the jump, the first melee strike an ally makes on the same turn gains an edge.'
				}),
				FactoryLogic.feature.create({
					id: 'goblin-war-spider-feature-7',
					name: 'Wide Back',
					description: 'Two of the spider’s size 1 allies can occupy the same space while riding the spider.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'goblin-warg',
			name: 'Warg',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Mount, MonsterOrganizationType.Band),
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
						id: 'goblin-warg-feature-1',
						name: 'Bite',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'goblin-warg-feature-2',
						name: 'Sprint',
						type: FactoryLogic.type.createManeuver(),
						cost: 1,
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The warg moves up to their speed.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'goblin-warg-feature-3',
					name: 'Mounted Charger',
					description: 'If a warg used as a mount charges, their rider gains an edge on melee strikes until the end of their turn.'
				}),
				FactoryLogic.feature.create({
					id: 'goblin-warg-feature-4',
					name: 'Shared Crafty',
					description: 'If the warg’s rider has the Crafty trait, the warg also has the Crafty trait.'
				})
			]
		})
	]
};
