import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SubClass } from '../../../models/subclass';

export const telekinesis: SubClass = {
	id: 'talent-sub-2',
	name: 'Telekinesis',
	description: 'Abilities that allow you to physically manipulate creatures and objects.',
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
						target: 'Self, or a size 1 creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('You slide the target up to a number of squares equal to your Reason score.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								repeatable: true,
								effect: 'The size of the creature or object you can target increases by 1 for every 2 clarity you spend.'
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
							FactoryLogic.createAbilitySectionText('The triggering damage is halved or distance of the triggering forced movement is reduced by a number of squares equal to your Reason score. If the target was damaged and force moved, you choose the effect. If the triggering forced movement is reduced to 0 squares, the target pushes the source of the forced movement a number of squares equal to your Reason score.')
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
							FactoryLogic.createAbilitySectionText('You can reduce the falling damage by an amount equal to 2 + your Reason score.')
						]
					})
				}),
				FactoryLogic.feature.createChoice({
					id: 'talent-sub-2-2-2',
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
											effect: 'The size of the burst increases by 1 and you are weakened until the end of your turn.'
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
										FactoryLogic.createAbilitySectionText('A target made prone by this ability is lifted 2 squares into the air before falling immediately to the ground, taking damage as usual.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'You take half the damage the target takes, including any damage from falling.'
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
		}
	],
	selected: false
};
