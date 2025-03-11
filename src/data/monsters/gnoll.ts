import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const gnoll: MonsterGroup = {
	id: 'monster-group-gnoll',
	name: 'Gnoll',
	description: 'Edacity. The hyena faced gnolls know only blood and hunger. These fiends carry with them the evil legacy of their late demon lord creator. Originally from the Abyssal Wasteland, gnolls quickly spread across the timescape, and they thrive in deserts, plains, and other sparsely populated places. Though a gnoll’s muzzle is just as likely to be bloodied by carrion as by prey, their hunting packs hunger for violence, and they eagerly hunt travelers and raid settlements. The pack’s eerie war cry, a wild cackle, presages a night of battle and terror.',
	information: [
		{
			id: 'gnoll-info-1',
			name: 'Born from Blood',
			description: `
The Abyssal Waste is an alien landscape hostile to most life. Yet amidst its desolation, fiendish creatures thrive, including abyssal hyenas—blood thirsty scavengers who fight with other lesser fiends over the corpses of demons. The first gnolls arose when a pack of these predators lapped at the ichor oozing from the wounds of a dying demon prince, As’sylrak the Warper. 

As his last act, the demon gave the fiendish hyenas a demonic cunning to match their insatiable hunger, bound his evil will to theirs, and turned their paws into hands so they could wield weapons. He called these new fiends “gnoll,” an Abyssal word that has many meanings, one of which is “to consume completely.” And true to their name, the gnolls immediately devoured their creator.`
		},
		{
			id: 'gnoll-info-2',
			name: 'Ceaseless Hunger',
			description: 'The merciless gnolls quickly spread across the timescape in search of new victims to quench their never-ending hunger. Their packs were followed by some of the abyssal hyenas who didn’t receive As’sylrak’s blessing; these tagalongs enjoy the castoffs of the gnoll packs. Gnolls never forgot the day when they tasted immortal flesh—and they hunger for more, longing for a day when gnolls hunt the gods themselves through heavenly halls.'
		},
		{
			id: 'gnoll-info-3',
			name: 'Gnoll War',
			description: 'Most gnolls live for the thrill of the hunt and the taste of flesh, and they aren’t choosy with their targets. Perhaps the one saving grace for most humanoid communities is that gnoll war bands battle each other for territory, keeping their numbers reduced.'
		},
		{
			id: 'gnoll-info-4',
			name: 'Abyssal Hyenas',
			description: 'Stronger and smarter than their beastly counterparts, abyssal hyenas crawl out of the Abyssal Wasteland to feed on corpses gnolls leave in their wake. When reinforcements are needed, gnoll spellcasters can use magic to transform abyssal hyenas into gnolls.'
		},
		{
			id: 'gnoll-info-5',
			name: 'Tusker Demons',
			description: 'Towering among a gnoll war band, the elephantine tusker demon serves as beast of burden and war machine. Tusker demons have no facial features except a twisted crown of tusks that surrounds their ravening maw. Although they usually follow gnoll commands, tuskers in lethe are prone to violent outbursts and charge at anything that moves. Enemies and allies get trampled all the same.'
		},
		{
			id: 'gnoll-info-6',
			name: 'Gnoll Languages',
			description: 'Most gnolls speak Tholl. Gnoll carnages and other older gnolls usually also know Variac.'
		}
	],
	malice: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'gnoll-malice-1',
				name: 'Iron Jaws',
				type: FactoryLogic.type.createManeuver(),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 3 }) ],
				target: 'Special',
				preEffect: 'A gnoll acting this turn drops an iron jawed snare into the affected area. The first time an enemy steps into an affected square, they make an **Agility test**. If they were unaware of the snare, they make the roll with a bane.',
				test: FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '6 damage; bleeding (save ends)',
					tier2: '4 damage; bleeding (EoT)',
					tier3: 'no effect'
				}),
				effect: 'While an enemy is bleeding from the snare, each gnoll has an edge on strikes against the creature.'
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'gnoll-malice-2',
			name: 'Bloodpool',
			cost: 5,
			sections: [
				'1 minion gnoll suddenly explodes into a pool of blood, splattering across each square within 3. A gnoll that starts their turn in an aﬀected square deals an additional 5 damage on their next strike until the end of their turn. Once per round, an abyssal hyena that starts their turn in an aﬀected square turns into a **gnoll marauder**, keeping their Stamina.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'gnoll-malice-3',
			name: 'Echoes of Laughter',
			cost: 7,
			sections: [
				'The battlemap is encased in a soundscape of laughter and howling. Each enemy has a bane on the ﬁrst power roll they make during a round. Whenever a gnoll is killed, this eﬀect is suppressed until the start of the next round.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'gnoll-1',
			name: 'Abyssal Hyena',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Abyssal','Animal', 'Gnoll' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 7,
			stability: 1,
			freeStrikeDamage: 3,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(2, 1, -3, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-1-feature-1',
						name: 'Snapjaw',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '4 damage',
							tier3: '6 damage; grabbed'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-1-feature-2',
					name: 'Death Snap',
					description: 'When the abyssal hyena is reduced to 0 Stamina, they make a free strike before dying.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-2',
			name: 'Gnoll Chainflail',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 4,
			stability: 1,
			freeStrikeDamage: 3,
			withCaptain: 'Strike damage +1',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 1, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-2-feature-1',
						name: 'Chain Shotput',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '4 damage; push 1',
							tier3: '6 damage; push 3'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-2-feature-2',
					name: 'Death Frenzy',
					description: 'Whenever an ally within 5 is reduced to 0 Stamina, the chainflail moves up to their speed and makes a free strike.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-3',
			name: 'Gnoll Mage Mauler',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 4,
			stability: 1,
			freeStrikeDamage: 2,
			withCaptain: 'Melee distance +2',
			characteristics: MonsterLogic.createCharacteristics(2, 1, -1, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-3-feature-1',
						name: 'Wizard Ripper',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 acid damage',
							tier2: '3 cold damage',
							tier3: '5 lightning damage; target can\'t use magic abilities (EoT)'
						}),
						effect: 'The target has a bane on their next power roll.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-3-feature-2',
					name: 'Death Frenzy',
					description: 'Whenever an ally within 5 is reduced to 0 Stamina, the mage mauler moves up to their speed and makes a free strike.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-4',
			name: 'Gnoll Wildling',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 5,
			stability: 1,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-4-feature-1',
						name: 'Flail',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '3 damage',
							tier3: '5 damage; wildling makes a free strike on a creature adjacent to the target'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-4-feature-2',
					name: 'Death Frenzy',
					description: 'Whenever an ally within 7 is reduced to 0 Stamina, the wildling moves up to their speed and makes a free strike.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-5',
			name: 'Gnoll Abyssal Archer',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-5-feature-1',
						name: 'Dark Longbow',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 corruption damage',
							tier2: '6 corruption damage',
							tier3: '8 corruption damage; M<2 slowed (save ends)'
						}),
						effect: 'This ability has an edge against creatures not at full Stamina.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-5-feature-2',
						name: 'Cackletongue',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 })
						],
						target: 'Self and all allies',
						effect: 'Each target has an edge on their next strike before the end of their next turn. Targets who haven’t used a cackletongue maneuver on this turn use it immediately at no cost.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-5-feature-3',
					name: 'Death Frenzy',
					description: 'Whenever an ally within 5 is reduced to 0 Stamina, the abyssal archer moves up to their speed and makes a free strike.'
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-5-feature-4',
					name: 'Bloodscent',
					description: 'The abyssal archer can target creatures not at full Stamina with abilities, even if they don\'t have line of effect.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-6',
			name: 'Gnoll Abyssal Summoner',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Support),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 1,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-6-feature-1',
						name: 'Flame Wad',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 fire damage',
							tier2: '5 fire damage',
							tier3: '7 fire damage; I<2 burning (save ends)'
						}),
						effect: 'A burning target takes 1d6 fire damage at the start of each of their turns until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-6-feature-2',
						name: 'Call Abyssal Hyenas',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Special',
						cost: 3,
						effect: '2 **abyssal hyenas** claw out of the ground into unoccupied squares.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-6-feature-3',
						name: 'Cackletongue',
						type: FactoryLogic.type.createManeuver(),
						cost: 4,
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All allies',
						effect: '1 abyssal hyena target turns into a **gnoll maurader**, keeping their Stamina. Targets who haven’t used a cackletongue maneuver on this turn use it immediately at no cost.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-6-feature-4',
					name: 'Death Frenzy',
					description: 'Whenever an ally within 5 is reduced to 0 Stamina, the abyssal summoner moves up to their speed and makes a free strike.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-7',
			name: 'Gnoll Bonesplitter',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 25,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-7-feature-1',
						name: 'Three-Tail Flail',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; push 2',
							tier2: '6 damage; push 2',
							tier3: '8 damage; grabbed M<2 target has a bane on escaping the grab'
						}),
						effect: 'The bone splitter can\'t use three-tail flail on another target while the current target is grabbed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-7-feature-2',
						name: 'Cackletongue',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 })
						],
						target: 'Self and all allies',
						effect: 'Each target makes a free strike. Targets who haven’t used a cackletongue maneuver on this turn use it immediately at no cost.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-8-feature-3',
					name: 'Death Frenzy',
					description: 'Whenever an ally within 5 is reduced to 0 Stamina, the bonesplitter moves up to their speed and makes a free strike.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-8',
			name: 'Gnoll Cackler',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 1,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 2, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-8-feature-1',
						name: 'Moment of Brutality',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 psychic damage; I<0 target makes a free strike against a creature of the cackler\'s choice',
							tier2: '5 psychic damage; I<1 target makes a free strike against a creature of the cackler\'s choice',
							tier3: '7 psychic damage; I<2 target makes a free strike against a creature of the cackler\'s choice'
						}),
						effect: 'An ally target by this ability makes a free strike instead of taking damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-8-feature-2',
						name: 'Cackletongue',
						type: FactoryLogic.type.createManeuver(),
						cost: 4,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All creatures',
						preEffect: 'Each enemy target makes an **Intuition test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Intuition,
							tier1: 'Frightened (save ends)',
							tier2: 'Frightened (EoT)',
							tier3: 'No effect'
						}),
						effect: 'Targets who haven\'t used a cackletongue maneuver on this turn use it immediately at no cost.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-8-feature-3',
					name: 'Death Frenzy',
					description: 'Whenever an ally within 5 is reduced to 0 Stamina, the cackler moves up to their speed and makes a free strike.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-9',
			name: 'Gnoll Marauder',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 20,
			stability: 1,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-9-feature-1',
						name: 'Fury Flail',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage',
							tier2: '5 damage',
							tier3: '7 damage; A<2 bleeding (save ends)'
						}),
						spend: [
							{ value: 2, repeatable: true, effect: 'The marauder targets an additional creature or object for every 2 malice spent.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-9-feature-2',
						name: 'Cackletongue',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 })
						],
						target: 'Self and all allies',
						effect: 'Each target shifts up to their speed. Targets who haven’t used a cackletongue maneuver on this turn use it immediately at no cost.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-9-feature-3',
					name: 'Death Frenzy',
					description: 'Whenever an ally within 7 is reduced to 0 Stamina, the marauder moves up to their speed and makes a free strike.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-10',
			name: 'Tusker Demon',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(7),
			stamina: 34,
			stability: 3,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, -1, -3, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-10-feature-1',
						name: 'Gore',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; push 1',
							tier2: '6 damage; push 2',
							tier3: '8 damage; push 3; prone'
						}),
						effect: 'This ability deals an additional 4 damage while charging.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-10-feature-2',
						name: 'Vengeful Tusker',
						type: FactoryLogic.type.createTrigger('An enemy within distance deals damage to the tusker.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(7) ],
						target: 'Triggering enemy',
						effect: 'The tusker demon charges the target using Gore.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-10-feature-3',
					name: 'Trample',
					description: 'The tusker demon can move through enemies and objects at normal speed. When the tusker enters a creature’s space for the ﬁrst time on their turn, the creature takes 5 damage. The tusker demon can end their turn in a prone size 1 creature’s space, preventing the creature from getting up.'
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-10-feature-4',
					name: 'Lethe',
					description: 'While winded, the tusker demon has an edge on strikes, and strikes have an edge against them.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-11',
			name: 'Gnoll Carnage',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 100,
			stability: 1,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 3, 0, 0, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-11-feature-1',
						name: 'Shrapnel Whip',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '2 creatures or objects',
						effect: 'An ally targeted by this ability makes a free strike instead of taking damage.',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; A<1 bleeding (save ends)',
							tier2: '11 damage; A<2 bleeding (save ends)',
							tier3: '14 damage; A<3 bleeding (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-11-feature-2',
						name: 'Cackletongue',
						type: FactoryLogic.type.createManeuver(),
						cost: 4,
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 })
						],
						target: 'Self and all allies',
						effect: 'Each target deals an additional 3 damage with their strikes until the start of the carnage\'s next turn. Targets who haven’t used a cackletongue maneuver on this turn use it immediately at no cost.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-11-feature-3',
					name: 'Death Rampage',
					description: 'Whenever an ally within 5 is reduced to 0 Stamina, the carnage moves up to their speed and either chooses to target 2 creatures with free strikes or one creature with their shrapnel whip.'
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-11-feature-4',
					name: 'Endless Hunger',
					description: 'If the carnage is reduced to 0 Stamina while there are still gnolls on the battle map, one gnoll on the map is transformed into the carnage, keeping the gnoll’s Stamina.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-11-feature-5',
						name: 'Call Up from The Abyss',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						effect: 'The carnage summons 5 **gnoll wildlings** and 5 **abyssal hyenas** into unoccupied spaces.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-11-feature-6',
						name: 'Edacity',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 })
						],
						target: 'Self and all allies',
						effect: 'Each target moves up to their speed and makes a free strike. A creature that takes damage from this villain action is also knocked prone.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-11-feature-7',
						name: 'Deepest Wounds',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each winded enemy in the blast',
						preEffect: 'The carnage\'s eyes and all explosed blood within distance starts to glow bright red. Each target makes a **Presence test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Presence,
							tier1: 'The target can\'t regain stamina until the end of the encounter',
							tier2: 'The target can\'t regain stamina (save ends)',
							tier3: 'No effect'
						}),
						effect: 'Until the end of the encounter, each gnoll has a double edge on power rolls that target a winded enemy.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-12',
			name: 'Gnoll Gnasher',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Harrier),
			keywords: [ 'Fiend', 'Gnoll' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 40,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-12-feature-1',
						name: 'Gnash',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '4 damage',
							tier2: '7 damage',
							tier3: '10 damage; M (strong) bleeding (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-12-feature-2',
					name: 'Death Frenzy',
					description: 'Whenever an ally within 7 is reduced to 0 Stamina, the gnasher moves up to their speed and makes a free strike.'
				})
			],
			retainer: {
				level4: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-12-retainer-3',
						name: 'Frenzied Bite',
						type: FactoryLogic.type.createTrigger('A target is reduced to 0 Stamina.', { qualifiers: [ 'encounter' ] }),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One enemy',
						effect: 'The gnasher moves up to their speed and makes a Signature Attack.'
					})
				}),
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-12-retainer-4',
						name: 'Flurry of Fangs',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '3 creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '7 damage',
							tier2: '11 damage',
							tier3: '16 damage; M (strong) bleeding (save ends)'
						})
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-12-retainer-5',
						name: 'Horrific Feast',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Self',
						effect: 'The gnasher consumes part of the target\'s body. The gnasher can spend a Recovery. Each enemy within range is I (medium) frightened (save ends).'
					})
				})
			}
		})
	],
	addOns: []
};
