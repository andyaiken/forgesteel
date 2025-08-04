import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SubClass } from '../../../models/subclass';

export const chronopathy: SubClass = {
	id: 'talent-sub-1',
	name: 'Chronopathy',
	description: 'Chronopathy abilities allow you to view future and past events, and to manipulate time to aid allies and hinder foes.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-sub-1-1-1',
						name: 'Accelerate',
						description: 'To your ally, it seems as though the world has slowed down.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target shifts up to a number of squares equal to your Reason score.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The target can use a maneuver.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-sub-1-1-2',
						name: 'Again',
						description: 'You step back a split second to see if things play out a little differently.',
						type: FactoryLogic.type.createTrigger('The target makes an ability roll.'),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one creature',
						sections: [
							FactoryLogic.createAbilitySectionText('You can use this ability after seeing the result of the triggering roll. The target must reroll the power roll and use the new roll.')
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'talent-sub-1-2-1',
					name: 'Ease the Hours',
					description: 'You can increase the number of rounds in a montage test by 1 if the test would end before the heroes hit the success limit.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'talent-sub-1-2-2',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-1-2-2a',
									name: 'Applied Chronometrics',
									description: 'Time slows down around you. Your heartbeat is the only gauge of the extra moments you’ve gained.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Special',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Presence ],
											tier1: 'You target two creatures, one of which can be you',
											tier2: 'You target three creatures, one of which can be you',
											tier3: 'You target four creatures, one of which can be you'
										})),
										FactoryLogic.createAbilitySectionText('Until the start of your next turn, each target gains a +5 bonus to speed, they can’t be made dazed, and they can use an additional maneuver on their turn. If a target is already dazed, that condition ends for them.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'Your speed is halved until the end of the encounter.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-1-2-2b',
									name: 'Slow',
									description: 'Perhaps they wonder why everyone else is moving so quickly?',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Three creatures or objects',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Presence ],
											tier1: 'The target’s speed is halved (save ends), or if P < [weak], the target is slowed (save ends).',
											tier2: 'The target is slowed (save ends), or if P < [average], the target’s speed is 0 (save ends).',
											tier3: 'The target is slowed (save ends), or if P < [strong], the target’s speed is 0 (save ends).'
										})),
										FactoryLogic.createAbilitySectionText('A target can’t use triggered actions while their speed is reduced this way.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'The potency of this ability increases by 1 and you take 1d6 damage. At the start of each combat round while any target is affected by this ability, you take 1d6 damage. You can end the effect on all affected targets at any time (no action required).'
										})
									]
								})
							}),
							value: 1
						}
					]
				})
			]
		},
		{
			level: 3,
			features: []
		},
		{
			level: 4,
			features: []
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'talent-sub-1-5-1',
					name: 'Distortion Temporal',
					description: 'While you are not dying, time behaves irregularly around you in a 3 aura. That area is difficult terrain for enemies. Additionally, when an ally enters the area for the first time in a combat round or starts their turn there, they gain a +2 bonus to speed until the end of the turn.'
				}),
				FactoryLogic.feature.create({
					id: 'talent-sub-1-5-2',
					name: 'Speed of Thought',
					description: 'Once per combat round while you are not dying, you can spend 2 clarity when you use a triggered action to turn it into a free triggered action.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'talent-sub-1-6-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-1-6-1a',
									name: 'Fate',
									description: 'Your foe gets a glimpse of how it will end for them.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Melee ],
									distance: [ FactoryLogic.distance.createMelee(2) ],
									target: 'One enemy',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('The target has damage weakness 5 until the end of your next turn. Whenever the target takes damage while they have this weakness, they are knocked prone.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'This ability gains the Strike keyword as the vision hurts the target’s psyche. You make a power roll, then are weakened (save ends).'
										}),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Presence,
												tier1: '8 + P psychic damage',
												tier2: '13 + P psychic damage',
												tier3: '17 + P psychic damage'
											})
										)
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-1-6-1b',
									name: 'Statis Field',
									description: 'Keep everything as it was. Ignore everything that will be.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
									target: 'Each creature and object in the area',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText(`
The area is frozen in time until the start of your next turn. Each object in the area is restrained and can’t fall until the effect ends. Until the effect ends, creatures in the area who are reduced to 0 Stamina or would die stay alive, and objects in the area that are reduced to 0 Stamina remain undestroyed.

Make a power roll that targets each enemy in the area.`),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Presence,
												tier1: 'P < [weak], the target is slowed until the effect ends',
												tier2: 'P < [average], the target’s speed is 0 until the effect ends',
												tier3: 'P < [strong], the target is restrained until the effect ends'
											})
										),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'Any creature or object force moved in the area takes 2 corruption damage for each square of the area they enter. Creatures and objects restrained in the area can be force moved. You are restrained until the effect ends.'
										})
									]
								})
							}),
							value: 1
						}
					]
				})
			]
		},
		{
			level: 7,
			features: []
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'talent-sub-1-8-1',
					name: 'Doubling the Hours',
					description: 'While you have 5 or more Victories, you can undertake an additional respite activity during a respite.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-sub-1-8-2',
						name: 'Stasis Shield',
						description: 'You freeze time just long enough to bring the victim to safety!',
						type: FactoryLogic.type.createTrigger('The target takes damage.'),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self, or one creature or object',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('The target is teleported to an unoccupied space adjacent to you, taking no damage and suffering no additional effects if this movement would get them out of harm’s way.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Strained',
								effect: 'You can’t target yourself, and you take the damage and any additional effects instead of the target.'
							})
						]
					})
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'talent-sub-1-9-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-1-9-1a',
									name: 'Acceleration Field',
									description: 'You forcibly stuff more moments into a critical point in time, knowing full well you might need to steal some of your own.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(5) ],
									target: 'Three allies',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('Each target can use any main action available to them as a free triggered action, but they lose their main action on their next turn.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'Make a power roll that targets you and each enemy within distance.'
										}),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Presence,
												tier1: '4 corruption damage; slowed (save ends)',
												tier2: '6 corruption damage; slowed (save ends)',
												tier3: '10 corruption damage; slowed (save ends)'
											})
										)
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-1-9-1b',
									name: 'Borrow From the Future',
									description: 'You lean on future heroism to assist you in the now.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Chronopathy, AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
									target: 'Each ally in the area',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('The targets share 6 of their Heroic Resource among themselves, as you determine. A target can’t gain more than 3 of their Heroic Resource this way. After using this ability, you can’t gain any clarity until the end of the next combat round.')
									]
								})
							}),
							value: 1
						}
					]
				})
			]
		},
		{
			level: 10,
			features: []
		}
	],
	selected: false
};
