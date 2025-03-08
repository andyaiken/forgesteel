import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const ogre: MonsterGroup = {
	id: 'monster-group-ogre',
	name: 'Ogre',
	description: 'Massive and bull-necked with bulging muscle and flesh, most ogres indulge their every impulse because few can stop them. Though small for giants, ogres still outweigh and tower over humanoids. Most live in the wild where they can create their own rules and ways of life.',
	information: [
		{
			id: 'ogre-info-1',
			name: 'Extreme Emotions',
			description: `
Most ogres experience emotions at their extremes. Rarely are they simply bemused or cross; you’re more likely to find an ogre leaping with ecstatic joy over a trivial victory or screaming with murderous rage over everyday frustrations. These heightened feelings drive many ogres down selfish paths, and some take whatever they want from anyone too weak to protest. Other ogres can be manipulated into working for evil creatures who promise to meet their heart’s desire, be it food, riches, or friendship.

Ogres who embrace good often dedicate themselves to inspiring causes, letting their emotions fuel their passion and dedication for protecting their chosen people or place.`
		},
		{
			id: 'ogre-info-2',
			name: 'Savory Stories',
			description: 'Some ogres speak of a time when they shared vast wealth and riches, great homes made of hewn stone, and sumptuous feasts. These stories end tragically, each with a different villain — from deceptive mages to talking cats — swindling the ogres of what is rightfully theirs. The truth of such legends remains unknown, but many cruel ogres use them as an excuse for their selfish indulgences.'
		},
		{
			id: 'ogre-info-3',
			name: 'Aristocracy of Bullies',
			description: 'When wicked ogres gather more food than they can stomach or riches than they can spend, they use the excess to tempt their kin into working for them. These petty rulers make other ogres grovel at their feet for table scraps, then send them out into the world to steal more. Many ogre communities form around these arrogant aristocrats — but few such leaders die of old age, as the ambition and emotions of their subjects bring about violent ends.'
		},
		{
			id: 'ogre-info-4',
			name: 'Cyclops: Ogre Progenitor',
			description: `
Ogres originally descended from the cyclops, an old-world giant with a single eye that still roams through canyons and valleys. These behemoths stand heads above the ogres and are twice as destructive once they’ve spotted their prey.

But while their binocular cousins have gone on to become successful hunters and live for themselves, the cyclops is a scavenger hindered by their poor eyesight. Most cyclopses are eager to work for and defend powerful warlords or wealthy ogres, so long as they have easy access to food and shelter.

Rumor has it that a cyclops can emit a mile long energy ray from their eye. However, focusing such power is nearly impossible when their vision is usually too irritated and clouded by dirt.`
		},
		{
			id: 'ogre-info-5',
			name: 'Ogre Languages',
			description: 'Most ogres speak Caelian and High Kuric.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'ogre-malice-1',
			name: 'Shockwave',
			cost: 3,
			sections: [
				'An ogre acting this turn jumps and lands on their rear, causing a 3 burst shockwave. Each size 1 creature in the aﬀected area must make a **Might or Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '5 damage; vertical push 3; prone',
					tier2: '4 damage; vertical push 2',
					tier3: 'Push 1'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'ogre-malice-2',
			name: 'Bully',
			cost: 5,
			sections: [
				'All ogres shift up to their speed and make a free strike. The ogres prefer to gang up on the same target rather than pick diﬀerent targets, if they can.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'ogre-malice-3',
			name: 'Rampage',
			cost: 7,
			sections: [
				'Until the end of the round, each ogre has damage immunity 5 and deals an additional 5 damage with their strikes and abilities. While this feature is active, heroic abilities that target an ogre have their costs reduced by 1 (to a minimum of 1).'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'ogre-1',
			name: 'Ogre Goon',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
			keywords: [ 'Giant', 'Ogre' ],
			encounterValue: 16,
			speed: FactoryLogic.createSpeed(5),
			stamina: 100,
			stability: 4,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 0, -1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-1-feature-1',
						name: 'Club Swing',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage; push 2',
							tier2: '11 damage; push 4',
							tier3: '14 damage; push 6; prone'
						}),
						effect: 'This attack deals an additional 4 damage to each creature and object that takes damage from any force movement it causes.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-1-feature-2',
						name: 'Grabby Hand',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '11 damage; grabbed',
							tier3: '14 damage; grabbed'
						}),
						effect: 'The goon can only have one target grabbed at a time.',
						spend: [ {
							value: 1,
							effect: 'The target has a bane on escaping the grab while the goon crushes the target in their hand.'
						} ]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-1-feature-3',
						name: 'People Bowling',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 6, value2: 1, within: 1 }) ],
						target: 'All creatures and objects',
						cost: 3,
						preEffect: `
The goon must be grabbing a size-1 creature or object to use this maneuver.

The goon hurls what’s in their hand down the line and rolls power. The hurled creature or object counts as a target and lands in the last square of the line (or nearest unoccupied square of the goon’s choice).`,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '5 damage',
							tier2: '9 damage',
							tier3: '12 damage; prone'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability:FactoryLogic.createAbility({
						id: 'ogre-1-feature-4',
						name: 'Swat the Fly',
						type: FactoryLogic.type.createTrigger('The target moves or shifts away from the goon.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 adjacent creature or object',
						effect: 'Slide 5.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'ogre-1-feature-5',
					name: 'Defiant Anger',
					description: 'The goon has damage immunity 2 while they are winded.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'ogre-2',
			name: 'Ogre Juggernaut',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Harrier),
			keywords: [ 'Giant', 'Ogre' ],
			encounterValue: 16,
			speed: FactoryLogic.createSpeed(6),
			stamina: 80,
			stability: 2,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 1, -1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-2-feature-1',
						name: 'Pitchfork Catapult',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '10 damage; A<1 vertical push 3',
							tier3: '13 damage; A<2 vertical slide 5'
						}),
						spend: [
							{
								value: 1,
								effect: 'Each target is M<1 bleeding (save ends).'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-2-feature-2',
						name: 'Earth Breaking Jump',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All creatures in the burst',
						preEffect: 'The juggernaut jumps up to 6 squares before using this ability.',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage',
							tier2: '6 damage; push 2; M<1 prone',
							tier3: '9 damage; push 4; M<2 prone'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-2-feature-3',
						name: 'Horrible Bellow',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies in the burst',
						cost: 2,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: 'I<0 frightened (save ends)',
							tier2: 'I<1 frightened (save ends)',
							tier3: 'I<2 frightened (save ends)'
						}),
						effect: 'All ogres have an edge on strikes against creatures frightened by this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability:FactoryLogic.createAbility({
						id: 'ogre-2-feature-4',
						name: 'Hrraaaaaagh!',
						type: FactoryLogic.type.createTrigger('The juggernaut takes damage.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The juggernaut moves up to their speed and makes a free strike.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'ogre-2-feature-5',
					name: 'Defiant Anger',
					description: 'The juggernaut has damage immunity 2 while they are winded.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'ogre-3',
			name: 'Cyclops',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
			keywords: [ 'Giant', 'Ogre' ],
			encounterValue: 24,
			speed: FactoryLogic.createSpeed(6),
			stamina: 14,
			stability: 5,
			size: FactoryLogic.createSize(3),
			freeStrikeDamage: 4,
			withCaptain: 'Speed +4',
			characteristics: MonsterLogic.createCharacteristics(5, -1, -1, 3, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-3-feature-1',
						name: 'Wild Slam',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'All enemies and objects in the burst',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 5,
							tier1: '3 damage; A<3 3 damage',
							tier2: '6 damage; push 3; A<4 4 damage',
							tier3: '7 damage; prone; A<5 5 damage, restrained (save ends)'
						}),
						effect: 'The cyclops automatically has a 17 on the power roll. They can still roll to see if they get a crit.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'ogre-3-feature-2',
					name: 'Limited Vision',
					description: 'The cyclops can’t establish line of effect beyond 3 squares. Whenever the cyclops takes damage from a ranged ability, they can move 3 squares towards the source of the damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'ogre-4',
			name: 'Ogre Blue Blood',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Giant', 'Ogre' ],
			encounterValue: 18,
			speed: FactoryLogic.createSpeed(5),
			stamina: 13,
			stability: 4,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 4,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(4, 1, -1, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-4-feature-1',
						name: 'Crush Underfoot',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '4 damage',
							tier2: '7 damage; M<3 prone',
							tier3: '8 damage; prone'
						}),
						effect: 'An already prone target takes an additional 4 damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'ogre-4-feature-2',
					name: 'In My Stead',
					description: 'Whenever the blue blood would make a free strike, an ally within 5 can make a free strike instead.'
				}),
				FactoryLogic.feature.create({
					id: 'ogre-4-feature-3',
					name: 'Defiant Anger',
					description: 'The blue blood has damage immunity 2 while they are winded.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'ogre-5',
			name: 'Ogre Tantrum',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Giant', 'Ogre' ],
			encounterValue: 18,
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 2,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 4,
			withCaptain: 'Ranged distance +5 ',
			characteristics: MonsterLogic.createCharacteristics(4, 2, -1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-5-feature-1',
						name: 'Throw Fit',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '4 damage',
							tier2: '7 damage; push 2',
							tier3: '8 damage; push 4'
						}),
						effect: 'The tantrum unearths a rock or a hunk of terrain and tosses it. The tantrum can A<3 grab an adjacent size-1 or smaller creature or object to use as the projectile for this ability.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'ogre-5-feature-2',
					name: 'Excessive Anger',
					description: 'The tantrum has damage immunity 3 and a speed of 8 while they are winded.'
				})
			]
		})
	],
	addOns: []
};
