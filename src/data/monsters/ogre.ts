import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const ogre: MonsterGroup = {
	id: 'monster-group-ogre',
	name: 'Ogre',
	description: 'Massive and bull-necked with bulging muscle and flesh, most ogres indulge their every impulse because few can stop them. Though small for giants, ogres outweigh and tower over humanoids. Most live in the wild where they can create their own rules and ways of life.',
	picture: null,
	information: [
		{
			id: 'ogre-info-1',
			name: 'Extreme Emotions',
			description: `
Most ogres experience emotions at their extremes. Rarely are they simply bemused or cross, and one is more likely to find an ogre leaping with ecstatic joy over a trivial victory or screaming with murderous rage over everyday frustrations. These heightened feelings drive many ogres down selfish paths, and some take whatever they want from anyone too weak to protest. Other ogres can be manipulated into working for evil creatures who promise to meet their heart’s desire, be it food, riches, or friendship.

Ogres who embrace good often dedicate themselves to inspiring causes, letting their emotions fuel their passion and dedication for protecting their chosen people or place.`
		},
		{
			id: 'ogre-info-2',
			name: 'Savory Stories',
			description: 'Some ogres speak of a time when they shared vast wealth and riches, great homes made of hewn stone, and sumptuous feasts. These stories always end tragically, each with a different villain—from deceptive mages to talking cats—swindling the ogres of what is rightfully theirs. The truth of such legends remains unknown, but many cruel ogres use them as an excuse for their selfish indulgences.'
		},
		{
			id: 'ogre-info-3',
			name: 'Aristocracy of Bullies',
			description: 'When wicked ogres gather more food than they can stomach or riches than they can spend, they use the excess to tempt their kin into working for them. These petty rulers make other ogres grovel at their feet for table scraps, then send them out into the world to steal more. Many ogre communities form around these arrogant aristocrats—but few such leaders die of old age, as the ambition and emotions of their subjects bring about violent ends.'
		},
		{
			id: 'ogre-info-4',
			name: 'Cyclops: Ogre Progenitor',
			description: `
Ogres originally descended from the cyclops, an old-world giant with a single eye whose kind still roam through remote canyons and valleys. These behemoths stand heads above the ogres and are twice as destructive once they’ve spotted their prey. But while their binocular cousins have gone on to become successful hunters and live for themselves, the cyclops is a scavenger hindered by their poor eyesight. Most cyclopses are eager to work for and defend powerful warlords or wealthy ogres, as long as they have easy access to food and shelter.

Rumor has it that a cyclops can emit a mile-long energy ray from their eye. However, focusing such power is nearly impossible when their vision is usually too irritated and clouded by dirt.`
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
				'One ogre acting this turn jumps and lands on their rear, causing a 3 burst shockwave. Each size 1 creature in the area makes a **Might test** or **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '5 damage; vertical push 3',
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
				'Each ogre in the encounter shifts up to their speed and can make a free strike. If they can, they gang up on the same target rather than picking different targets.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'ogre-malice-3',
			name: 'Rampage',
			cost: 7,
			sections: [
				'Until the end of the round, each ogre has damage immunity 5 and deals an extra 5 damage with abilities, and heroic abilities that target any ogre have their Heroic Resource cost reduced by 1 (to a minimum of 1).'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'ogre-1',
			name: 'Ogre Goon',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Giant', 'Ogre' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 100,
			stability: 4,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 0, -1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-1-feature-1',
						name: 'Club Swing',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '7 damage; push 2',
									tier2: '11 damage; push 4',
									tier3: '14 damage; push 6; prone'
								})
							),
							FactoryLogic.createAbilitySectionText('Any target who takes damage from this forced movement takes an extra 4 damage.')
						]
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
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '7 damage',
									tier2: '11 damage; grabbed',
									tier3: '14 damage; grabbed'
								})
							),
							FactoryLogic.createAbilitySectionText('A target grabbed this way takes a bane on the Escape Grab maneuver.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-1-feature-3',
						name: 'People Bowling',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 6, value2: 1, within: 1 }) ],
						target: 'Each creature and object in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('The goon must have a size 1 creature or object grabbed, which they hurl across the area, ending the grab. The hurled creature or object is targeted by the ability, and lands in the last square of the line or the nearest unoccupied square of the goon’s choice.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 3,
									tier1: '5 damage',
									tier2: '9 damage',
									tier3: '12 damage; prone'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-1-feature-4',
						name: 'Swat the Fly',
						type: FactoryLogic.type.createTrigger('A creature or object within distance moves or shifts away from the goon.'),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('The goon slides the target up to 5 squares')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'ogre-1-feature-5',
					name: 'Defiant Anger',
					description: 'While winded, the goon has damage immunity 2.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'ogre-2',
			name: 'Ogre Juggernaut',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
			keywords: [ 'Giant', 'Ogre' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(6),
			stamina: 80,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 1, -1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-2-feature-1',
						name: 'Pitchfork Catapult',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '7 damage',
									tier2: '10 damage; A<1 vertical push 2',
									tier3: '13 damage; A<2 vertical slide 3'
								})
							),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'Each target who has M<1 is bleeding (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-2-feature-2',
						name: 'Earth-Breaking Jump',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The juggernaut jumps up to 6 squares before using this ability.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: '4 damage',
									tier2: '6 damage; push 2; M<1 prone',
									tier3: '9 damage; push 4; M<2 prone'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-2-feature-3',
						name: 'Horrible Bellow',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 2,
									tier1: 'I<0 frightened (save ends)',
									tier2: 'I<1 frightened (save ends)',
									tier3: 'I<2 frightened (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('While a target is frightened this way, any ogre gains an edge on strikes against them.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-2-feature-4',
						name: 'Hrraaaaaagh!',
						type: FactoryLogic.type.createTrigger('The juggernaut takes damage.', { free: true }),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The juggernaut moves up to their speed and can make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'ogre-2-feature-5',
					name: 'Destructive Path',
					description: 'The juggernaut automatically destroys any mundane size 1 objects in their path when they move or are forced moved. They can break through any mundane wall made of wood, stone, or a similarly sturdy material this way as long as the wall is 2 squares thick or less.'
				}),
				FactoryLogic.feature.create({
					id: 'ogre-2-feature-6',
					name: 'Defiant Anger',
					description: 'While winded, the juggernaut has damage immunity 2.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'ogre-3',
			name: 'Cyclops',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
			keywords: [ 'Giant', 'Ogre' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(6),
			stamina: 14,
			stability: 5,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(5, -1, -1, 3, -1),
			withCaptain: '+4 bonus to speed',
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-3-feature-1',
						name: 'Wild Slam',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy and object in the area',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '3 damage; A<3 3 damage',
									tier2: '6 damage; push 3; A<4 4 damage',
									tier3: '7 damage; prone; A<5 5 damage and restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('The cyclops automatically treats their initial power roll as a 17. They can still roll to determine if they score a critical hit.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'ogre-3-feature-2',
					name: 'Limited Vision',
					description: 'The cyclops has line of effect only within 3 squares. Whenever the cyclops takes damage from a ranged ability, they can move up to 3 squares toward the source of the damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'ogre-4',
			name: 'Ogre Blue Blood',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Giant', 'Ogre' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 13,
			stability: 4,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(4, 1, -1, 0, 2),
			withCaptain: 'Gain an edge on strikes',
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-4-feature-1',
						name: 'Crush Underfoot',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '4 damage',
									tier2: '7 damage; M<3 prone',
									tier3: '8 damage; prone'
								})
							),
							FactoryLogic.createAbilitySectionText('A target who is already prone takes an extra 4 damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'ogre-4-feature-2',
					name: 'In My Stead',
					description: 'Whenever the blue blood would make a free strike, an ally within 5 squares can make a free strike instead.'
				}),
				FactoryLogic.feature.create({
					id: 'ogre-4-feature-3',
					name: 'Defiant Anger',
					description: 'While winded, the blue blood has damage immunity 2.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'ogre-5',
			name: 'Ogre Tantrum',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Giant', 'Ogre' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(4, 2, -1, 0, -1),
			withCaptain: '+5 bonus to ranged distance',
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'ogre-5-feature-1',
						name: 'Throw Fit',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One creature or object per minion',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionText('The tantrum unearths a rock or a hunk of terrain and tosses it. If a size 1L, 1M, or 1S creature or object adjacent to the tantrum has A<3 the tantrum can grab them to use as the projectile for this ability.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '4 damage',
									tier2: '7 damage; push 2',
									tier3: '8 damage; push 4'
								})
							),
							FactoryLogic.createAbilitySectionText('A creature or object used as a projectile is vertically pushed 8 (or 13 with a captain), ignoring stability.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'ogre-5-feature-2',
					name: 'Excessive Anger',
					description: 'While winded, the tantrum has damage immunity 3 and speed 8.'
				})
			]
		})
	],
	addOns: []
};
