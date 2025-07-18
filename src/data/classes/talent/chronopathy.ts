import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SubClass } from '../../../models/subclass';

export const chronopathy: SubClass = {
	id: 'talent-sub-1',
	name: 'Chronopathy',
	description: 'Abilities that allow you to view future and past events, and to manipulate time to aid allies and hinder foes.',
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
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target immediately shifts up to a number of squares equal to your Reason score.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The target can also use a maneuver.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-sub-1-1-2',
						name: 'Again',
						description: 'You step back a split second to see if things play out a little differently.',
						type: FactoryLogic.type.createTrigger('The target makes an ability power roll.'),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one creature',
						sections: [
							FactoryLogic.createAbilitySectionText('You can use this ability after seeing the power roll for the triggering roll. You force the target to reroll the power roll and use the new result.')
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
											tier1: 'Target two creatures, one of which can be you',
											tier2: 'Target three creatures, one of which can be you',
											tier3: 'Target four creatures, one of which can be you'
										})),
										FactoryLogic.createAbilitySectionText('Until the start of your next turn, each target gains a +5 bonus to speed, can’t be dazed, and they can use an additional maneuver on their turn. If a target is dazed, the condition ends for them.'),
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
										FactoryLogic.createAbilitySectionText('A target can’t use triggered actions while their speed is reduced by this ability.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'The potency of this ability increases by 1 and you take 1d6 damage. At the start of each round while any target is affected by this ability, you take 1d6 damage. You can immediately end the effects on all affected targets (no action required).'
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
