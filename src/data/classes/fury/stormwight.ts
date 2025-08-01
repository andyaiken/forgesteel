import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const stormwight: SubClass = {
	id: 'fury-sub-3',
	name: 'Stormwight',
	description: 'You channel your rage into the form of animals and primordial storms.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'fury-sub-3-1-1',
					listOptions: [ SkillList.Intrigue ],
					selected: [ 'Track' ]
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'fury-sub-3-1-2',
					name: 'Beast Shape',
					types: [ 'Stormwight' ]
				}),
				FactoryLogic.feature.create({
					id: 'fury-sub-3-1-3',
					name: 'Relentless Hunter',
					description: 'You gain an edge on tests that use the Track skill.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fury-sub-3-1-4',
						name: 'Furious Change',
						description: 'In your anger, you revert to a more bestial form.',
						type: FactoryLogic.type.createTrigger('You lose Stamina and are not dying.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('After the triggering effect is resolved, you can use a free triggered action to enter your animal form or hybrid form. You gain temporary Stamina equal to your Might score.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'If you are not dying, you can spend a Recovery.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fury-sub-3-1-5',
						name: 'Aspect of the Wild',
						description: 'You assume the form of the animal who channels your rage.',
						keywords: [ AbilityKeyword.Magic ],
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText(`
You can shapeshift into the animal defined by your stormwight kit, a hybrid form, or back into your true form.

While in animal form or hybrid form, you can speak normally and can speak to animals who share your form. If you are in a negotiation with an animal, you treat your Renown as 2 higher than usual while in animal form.`),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'As a free maneuver on your turn, you can shapeshift a second time, either into another animal form, into your hybrid form, or back into your true form.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'fury-sub-3-2-1',
					name: 'Tooth and Claw',
					description: 'When you end your turn, each enemy who is adjacent to you takes damage equal to your Might score.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'fury-sub-3-2-2',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-3-2-2a',
									name: 'Apex Predator',
									description: 'I will hunt you down.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Animal, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: '1 creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Might ],
											tier1: '4 + M damage; I < [weak], slowed (save ends)',
											tier2: '6 + M damage; I < [average], slowed (save ends)',
											tier3: '10 + M damage; I < [strong], slowed (save ends)'
										})),
										FactoryLogic.createAbilitySectionText('The target can’t be hidden from you for 24 hours. For the rest of the encounter, whenever the target moves, you can use a free triggered action to move.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-3-2-2b',
									name: 'Visceral Roar',
									description: 'The sound of the storm within you terrifies your opponents.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Animal, AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
									target: 'Each enemy in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Might ],
											tier1: '2 damage; push 1; M < [weak], dazed (save ends)',
											tier2: '5 damage; push 2; M < [average], dazed (save ends)',
											tier3: '7 damage; push 3; M < [strong], dazed (save ends)'
										})),
										FactoryLogic.createAbilitySectionText('This ability deals damage of your primordial storm type.')
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
			features: [
				FactoryLogic.feature.create({
					id: 'fury-sub-1-3-1',
					name: 'Nature’s Knight',
					description: 'You can speak with animals and elementals. You automatically sense the presence of any animal or elemental within 10 squares of you, even if they are hidden. If you are in a negotiation with an animal or elemental, you treat your Renown as 1 higher than usual. This stacks with the increase to your Renown in a negotiation with an animal of your type while in animal form.'
				})
			]
		}
	],
	selected: false
};
