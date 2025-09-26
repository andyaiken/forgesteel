import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const gnoll: MonsterGroup = {
	id: 'monster-group-gnoll',
	name: 'Gnoll',
	description: 'Edacity. The hyena faced gnolls know only blood and hunger. These fiends carry with them the evil legacy of their late demon lord creator. Originally from the Abyssal Wasteland, gnolls quickly spread across the timescape, and they thrive in deserts, plains, and other sparsely populated places. Though a gnoll’s muzzle is just as likely to be bloodied by carrion as by prey, their hunting packs hunger for violence, and they eagerly hunt travelers and raid settlements. The pack’s eerie war cry, a wild cackle, presages a night of battle and terror.',
	picture: null,
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
		FactoryLogic.feature.createMaliceAbility({
			ability: FactoryLogic.createAbility({
				id: 'gnoll-malice-1',
				name: 'Iron Jaws',
				type: FactoryLogic.type.createManeuver(),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 3 }) ],
				target: 'Special',
				sections: [
					FactoryLogic.createAbilitySectionText('A gnoll acting this turn drops an iron-jawed snare into the affected area. The first time an enemy steps into the area, they make an **Agility test**. If they were unaware of the snare, they make the roll with a bane.'),
					FactoryLogic.createAbilitySectionRoll(
						FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Agility,
							tier1: '6 damage; bleeding (save ends)',
							tier2: '4 damage; bleeding (EoT)',
							tier3: 'no effect'
						})
					),
					FactoryLogic.createAbilitySectionText('While an enemy is bleeding from the snare, each gnoll in the encounter gains an edge on strikes made against them.')
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'gnoll-malice-2',
			name: 'Bloodpool',
			cost: 5,
			sections: [
				'One gnoll minion suddenly explodes into a pool of blood, splattering the area within 3 squares of them. Any gnoll who starts their turn in this area deals an extra 5 damage on their next strike before the end of their turn. Once per round, an abyssal hyena who starts their turn in the area turns into a **gnoll marauder**, keeping their current Stamina.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'gnoll-malice-3',
			name: 'Echoes of Laughter',
			cost: 7,
			sections: [
				' Until the end of the encounter, the encounter map is encased in a soundscape of laughter and howling. Each enemy takes a bane on the first power roll they make each round. Whenever a gnoll is killed, this effect is suppressed until the start of the next round.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'gnoll-1',
			name: 'Abyssal Hyena',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Animal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(8),
			stamina: 7,
			stability: 1,
			freeStrikeDamage: 3,
			withCaptain: 'Speed +2',
			characteristics: FactoryLogic.createCharacteristics(2, 1, -3, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-1-feature-1',
						name: 'Snapjaw',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage',
								tier2: '4 damage',
								tier3: '6 damage; grabbed'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-1-feature-2',
					name: 'Death Snap',
					description: 'When the abyssal hyena is reduced to 0 Stamina, they make a melee free strike before dying.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-2',
			name: 'Gnoll Chainflail',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 4,
			stability: 1,
			freeStrikeDamage: 3,
			withCaptain: 'Strike damage +1',
			characteristics: FactoryLogic.createCharacteristics(2, 0, 1, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-2-feature-1',
						name: 'Chain Shotput',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage',
								tier2: '4 damage; push 1',
								tier3: '6 damage; push 3'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-2-feature-2',
					name: 'Death Frenzy',
					description: 'Whenever a non-minion ally within 5 squares of the chainflail is reduced to 0 Stamina, the chainflail can move up to their speed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-3',
			name: 'Gnoll Mage Mauler',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 4,
			stability: 1,
			freeStrikeDamage: 2,
			withCaptain: 'Melee distance +2',
			characteristics: FactoryLogic.createCharacteristics(2, 1, -1, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-3-feature-1',
						name: 'Wizard Ripper',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 acid damage',
								tier2: '3 cold damage',
								tier3: '5 lightning damage; target can\'t use magic abilities (EoT)'
							})),
							FactoryLogic.createAbilitySectionText('The target has a bane on their next power roll.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-3-feature-2',
					name: 'Death Frenzy',
					description: 'Whenever a non-minion ally within 5 squares of the chainflail is reduced to 0 Stamina, the mage mauler can move up to their speed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-4',
			name: 'Gnoll Wildling',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 5,
			stability: 1,
			freeStrikeDamage: 2,
			characteristics: FactoryLogic.createCharacteristics(1, 2, 0, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-4-feature-1',
						name: 'Flail',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '3 damage',
								tier3: '5 damage; the wildling makes a free strike on a creature adjacent to the target'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-4-feature-2',
					name: 'Death Frenzy',
					description: 'Whenever a non-minion ally within 7 squares of the wildling is reduced to 0 Stamina, the wildling can move up to their speed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-5',
			name: 'Gnoll Abyssal Archer',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(0, 2, 1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-5-feature-1',
						name: 'Dark Longbow',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 corruption damage',
								tier2: '6 corruption damage',
								tier3: '8 corruption damage; M<2 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('This ability has an edge against creatures not at full Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-5-feature-2',
						name: 'Archer\'s Cackletongue',
						type: FactoryLogic.type.createManeuver(),
						cost: 2,
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 })
						],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of their next turn, each target gains an edge on their next strike. If any target hasn’t used their own Cackletongue maneuver on this turn, they can use it immediately at no cost.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-5-feature-3',
					name: 'Death Frenzy',
					description: 'Whenever a non-minion ally within 5 squares of the abyssal archer is reduced to 0 Stamina, the abyssal archer can make a ranged free strike.'
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-5-feature-4',
					name: 'Bloodscent',
					description: 'The abyssal archer doesn’t need line of effect to use their abilities against any creature who isn’t at full Stamina, as long as a size 1 opening exists between the archer and the target.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-6',
			name: 'Gnoll Abyssal Summoner',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Support),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 1,
			freeStrikeDamage: 2,
			characteristics: FactoryLogic.createCharacteristics(1, 0, 0, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-6-feature-1',
						name: 'Flame Wad',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 fire damage',
								tier2: '5 fire damage',
								tier3: '7 fire damage; I<2 burning (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('Two **abyssal hyenas** claw up from the ground in unoccupied squares within distance.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-6-feature-3',
						name: 'Summoner\'s Cackletongue',
						type: FactoryLogic.type.createManeuver(),
						cost: 4,
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('One abyssal hyena target turns into a **gnoll marauder**, keeping their current Stamina. If any target hasn’t used their own Cackletongue maneuver on this turn, they can use it immediately at no cost.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-6-feature-4',
					name: 'Death Frenzy',
					description: ' Whenever a non-minion ally within 5 squares of the abyssal summoner is reduced to 0 Stamina, the abyssal summoner moves up to their speed and can make a melee free strike.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-7',
			name: 'Gnoll Bonesplitter',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 25,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: FactoryLogic.createCharacteristics(2, 1, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-7-feature-1',
						name: 'Three-Tail Flail',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '5 damage; push 2',
								tier2: '6 damage; push 2',
								tier3: '8 damage; grabbed; M<2 target has a bane on escaping the grab'
							})),
							FactoryLogic.createAbilitySectionText('While the bonesplitter has a target grabbed, they can’t use Three-Tail Flail against another target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-7-feature-2',
						name: 'Bonesplitter\'s Cackletongue',
						type: FactoryLogic.type.createManeuver(),
						cost: 4,
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 })
						],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Up to three targets can make a free strike. If any target hasn’t used their own Cackletongue maneuver on this turn, they can use it immediately at no cost.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-8-feature-3',
					name: 'Death Frenzy',
					description: ' Whenever a non-minion ally within 5 squares of the bonesplitter is reduced to 0 Stamina, the bonesplitter moves up to their speed and can make a melee free strike.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-8',
			name: 'Gnoll Cackler',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 1,
			freeStrikeDamage: 2,
			characteristics: FactoryLogic.createCharacteristics(0, 0, 2, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-8-feature-1',
						name: 'Moment of Brutality',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 psychic damage; I<0 the target makes a free strike against a creature of the cackler\'s choice',
								tier2: '5 psychic damage; I<1 the target makes a free strike against a creature of the cackler\'s choice',
								tier3: '7 psychic damage; I<2 the target makes a free strike against a creature of the cackler\'s choice'
							})),
							FactoryLogic.createAbilitySectionText('An ally targeted by this ability ignores the damage and can make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-8-feature-2',
						name: 'Cackler\'s Cackletongue',
						type: FactoryLogic.type.createManeuver(),
						cost: 4,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each enemy target makes an **Intuition test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Intuition,
									tier1: 'Frightened (save ends)',
									tier2: 'Frightened (EoT)',
									tier3: 'No effect'
								})
							),
							FactoryLogic.createAbilitySectionText('Targets who haven\'t used a cackletongue maneuver on this turn use it immediately at no cost.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-8-feature-3',
					name: 'Death Frenzy',
					description: ' Whenever a non-minion ally within 5 squares of the cackler is reduced to 0 Stamina, the cackler moves up to their speed and can make a melee free strike.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-9',
			name: 'Gnoll Marauder',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Abyssal', 'Gnoll' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 20,
			stability: 1,
			freeStrikeDamage: 2,
			characteristics: FactoryLogic.createCharacteristics(1, 1, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-9-feature-1',
						name: 'Fury Flail',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage',
								tier2: '5 damage',
								tier3: '7 damage; A<2 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								repeatable: true,
								effect: 'This ability targets one additional target for each 2 Malice spent.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-9-feature-2',
						name: 'Marauder\'s Cackletongue',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 })
						],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target shifts up to their speed. If any target hasn’t used their own Cackletongue maneuver on this turn, they can use it immediately at no cost.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-9-feature-3',
					name: 'Death Frenzy',
					description: ' Whenever a non-minion ally within 7 squares of the marauder is reduced to 0 Stamina, the marauder moves up to their speed and can make a melee free strike.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'gnoll-10',
			name: 'Tusker Demon',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Abyssal', 'Demon', 'Gnoll' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(7),
			stamina: 100,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: FactoryLogic.createCharacteristics(2, -1, -3, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-10-feature-1',
						name: 'Gore',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage; push 1',
								tier2: '11 damage; push 2',
								tier3: '14 damage; push 3; prone'
							})),
							FactoryLogic.createAbilitySectionText('If this ability is used as part of the Charge main action, it deals an extra 4 damage.')
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('The tusker demon uses the Charge main action and Gore against the target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-10-feature-3',
					name: 'Trample',
					description: 'The tusker demon can move through enemies’ spaces at their usual speed. When the tusker enters a creature’s space for the first time on a turn, that creature takes 5 damage. The tusker demon can end their turn in a prone size 1 creature’s space, preventing the creature from standing up.'
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-10-feature-4',
					name: 'Lethe',
					description: ' While the tusker demon is winded, they gain an edge on strikes, and any strike made against them gains an edge.'
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
			characteristics: FactoryLogic.createCharacteristics(3, 3, 0, 0, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-11-feature-1',
						name: 'Shrapnel Whip',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '8 damage; A<1 bleeding (save ends)',
								tier2: '11 damage; A<2 bleeding (save ends)',
								tier3: '14 damage; A<3 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('An ally targeted by this ability ignores the damage and can make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-11-feature-2',
						name: 'Carnage\'s Cackletongue',
						type: FactoryLogic.type.createManeuver(),
						cost: 4,
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 })
						],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target deals an extra 3 damage with their next strike until the start of the carnage’s next turn. If any target hasn’t used their own Cackletongue maneuver on this turn, they can use it immediately at no cost.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-11-feature-3',
					name: 'Death Rampage',
					description: 'Whenever a non-minion ally within 5 squares of the carnage is reduced to 0 Stamina, the carnage can move up to their speed, then can either make a melee free strike against two creatures or use Shrapnel Whip against one creature.'
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-11-feature-4',
					name: 'End Effect',
					description: 'At the end of each of their turns, the carnage can take 5 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'gnoll-11-feature-5',
					name: 'Endless Hunger',
					description: 'If the carnage is reduced to 0 Stamina while there are still gnolls on the encounter map, one gnoll on the map is transformed into a **gnoll carnage**, keeping their current Stamina.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-11-feature-6',
						name: 'Call Up from The Abyss',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The carnage summons four **abyssal hyenas** and 5 **abyssal hyenas** into unoccupied spaces within distance.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-11-feature-7',
						name: 'Edacity',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 })
						],
						target: 'Self and three allies',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target moves up to their speed and can make a free strike. Any creature damaged by one of these free strikes who has M<2 is knocked prone.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gnoll-11-feature-8',
						name: 'Deepest Wounds',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each winded enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The carnage\'s eyes and all explosed blood within distance glow bright red. Each target makes a **Presence test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Presence,
									tier1: 'The target can\'t regain stamina until the end of the encounter',
									tier2: 'The target can\'t regain stamina (save ends)',
									tier3: 'No effect'
								})
							),
							FactoryLogic.createAbilitySectionText('Until the end of the encounter, all gnolls have a double edge on power rolls that target a winded enemy.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
