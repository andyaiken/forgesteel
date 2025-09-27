import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { SubClass } from '@/models/subclass';

export const telekinesis: SubClass = {
	id: 'talent-sub-2',
	name: 'Telekinesis',
	description: 'Telekinesis abilities allow you to physically manipulate creatures and objects.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-sub-2-1-1',
						name: 'Minor Telekinesis',
						description: 'Wisps of psychic energy ripple visibly from your brain as you force the target to move using only your mind.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one size 1 creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('You slide the target up to a number of squares equal to your Reason score.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								repeatable: true,
								effect: 'The size of the creature or object you can target increases by 1 for every 2 clarity spent.'
							}),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'You can vertical slide the target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-sub-2-1-2',
						name: 'Repel',
						description: 'They aren’t going anywhere, but you might!',
						type: FactoryLogic.type.createTrigger('The target takes damage or is force moved.'),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target takes half the triggering damage, or the distance of the triggering forced movement is reduced by a number of squares equal to your Reason score. If the target took damage and was force moved, you choose the effect. If the forced movement is reduced to 0 squares, the target can push the source of the forced movement a number of squares equal to your Reason score.')
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-sub-2-2-1',
						name: 'Ease their Fall',
						description: '',
						type: FactoryLogic.type.createTrigger('You land after a fall, or any falling creature lands within 2 squares of you.', { free: true }),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You reduce the falling damage by an amount equal to 2 + your Reason score.')
						]
					})
				}),
				FactoryLogic.feature.createChoice({
					id: 'talent-sub-2-2-2',
					name: '2nd-Level Tradition Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-2-2-2a',
									name: 'Gravitic Burst',
									description: 'Everyone get away from me!',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Telekinesis ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
									target: 'Each enemy in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Reason ],
											tier1: '3 damage; vertical push 2',
											tier2: '6 damage; vertical push 4',
											tier3: '9 damage; vertical push 6'
										})),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'The size of the burst increases by 1, and you are weakened until the end of your turn.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-2-2-2b',
									name: 'Levity and Gravity',
									description: 'You raise the target into the air, then smother them against the ground.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telekinesis ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One creature or object',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Reason ],
											tier1: '6 + R damage; M < [weak], prone',
											tier2: '10 + R damage; M < [average], prone',
											tier3: '14 + R damage; M < [strong], prone and can’t stand (save ends)'
										})),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'You take half the damage the target takes.'
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
					id: 'talent-sub-2-5-1',
					name: 'Kinetic Amplifier',
					description: 'Whenever you force move a creature, you can spend up to 2 surges. For each surge spent, the forced movement distance gains a bonus equal to your Reason score.'
				}),
				FactoryLogic.feature.create({
					id: 'talent-sub-2-5-2',
					name: 'Triangulate',
					description: 'Whenever an ally uses a ranged ability while you are within the ability’s distance, you can spend 1 clarity as a free triggered action to allow them to use the ability as if they were in your space.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'talent-sub-2-6-1',
					name: '6th-Level Tradition Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-2-6-1a',
									name: 'Gravitic Well',
									description: 'You bend gravity into a fine point and pull your foes toward it.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Telekinesis ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
									target: 'Each enemy and object in the area',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Presence,
												tier1: '6 damage; vertical pull 5 toward the center of the a',
												tier2: '9 damage; vertical pull 7 toward the center of the area',
												tier3: '13 damage; vertical pull 10 toward the center of the area'
											})
										),
										FactoryLogic.createAbilitySectionText('Targets closest to the center of the area are pulled first.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'The size of the area increases by 2. You also target yourself and each ally within distance.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-2-6-1b',
									name: 'Greater Kinetic Grip',
									description: 'You raise the target into the air without breaking a sweat.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telekinesis ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One creature or object',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Presence,
												tier1: 'Slide 4 + R; M < [weak], the forced movement is vertic',
												tier2: 'Slide 8 + R; M < [average], the forced movement is vertical',
												tier3: 'Slide 12 + R; prone; M < [strong], the forced movement is vertical'
											})
										),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'The forced movement ignores stability. You take 2d6 damage and are weakened (save ends).'
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
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-sub-2-8-1',
						name: 'Levitation Field',
						description: 'You manipulate the air around your allies so they can move as freely through the sky as you can.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each ally in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target can fly until the start of your next turn, and can immediately shift up to their speed. You can also shift up to your speed. While flying, a target’s stability is reduced to 0 and can’t be increased.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 5,
								effect: 'The effects last for 1 hour instead.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'talent-sub-2-8-2',
					name: 'Low Gravity',
					description: 'Your mind can carry your body through tough times. You ignore difficult terrain and don’t need to spend additional movement while prone.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'talent-sub-2-9-1',
					name: '9th-Level Tradition Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-2-9-1a',
									name: 'Fulcrum',
									description: 'You precisely manipulate the creatures around you.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Telekinesis ],
									distance: [ FactoryLogic.distance.createSpecial('Special') ],
									target: 'Each enemy and object in the area',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('Make a power roll to determine the area of this ability. Each target is vertical pushed 6 squares. You can target only objects of size 1L or smaller.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Presence,
												tier1: '2 burst',
												tier2: '3 burst',
												tier3: '4 burst'
											})
										),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'You can choose to reduce the size of the burst by 2 (to a minimum of 1 burst) to give the forced movement distance a +2 bonus. You take half the total damage all targets take from forced movement.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-2-9-1b',
									name: 'Gravitic Nova',
									description: 'Unbridled psionic energy erupts from your body and flashes outward, hurling your foes back.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Telekinesis ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
									target: 'Each enemy and object in the area',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Presence,
												tier1: '6 damage; push 7',
												tier2: '9 damage; push 10',
												tier3: '13 damage; push 15'
											})
										),
										FactoryLogic.createAbilitySectionText('On a critical hit, the size of the area increases by 3, and this ability deals an extra 10 damage.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'You are weakened (save ends). If you scored a critical hit with this ability, you die.'
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
			level: 10,
			features: []
		}
	],
	selected: false
};
