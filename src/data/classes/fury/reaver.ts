import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const reaver: SubClass = {
	id: 'fury-sub-2',
	name: 'Reaver',
	description: 'You channel your rage into instinct and cunning, challenging the false order of civilization.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'fury-sub-2-1-1',
					listOptions: [ SkillList.Intrigue ],
					selected: [ 'Hide' ]
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'fury-sub-2-1-2'
				}),
				FactoryLogic.feature.create({
					id: 'fury-sub-2-1-3',
					name: 'Primordial Cunning',
					description: `
You are never surprised. Additionally, whenever you would push a target with forced movement, you can slide them instead.

As your rage grows, your primordial cunning intensifies. Benefits are cumulative except where an improved benefit replaces a lesser benefit.

* **Rage 2**: Add your Agility to the distance you achieve on the Knockback maneuver.
* **Rage 4**: Gain one surge the first time on a turn that you slide a creature.
* **Rage 6**: Gain an edge on Agility tests and the Knockback maneuver.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fury-sub-2-1-4',
						name: 'Unearthly Reflexes',
						description: 'Elusive as a hummingbird.',
						type: FactoryLogic.type.createTrigger('You take damage.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You take half damage from the attack and can shift up to a number of squares equal to your Agility score.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You reduce the potency of any effect associated with the damage for you by 1.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'fury-sub-2-2-1',
					name: 'Inescapable Wrath',
					features: [
						FactoryLogic.feature.create({
							id: 'fury-sub-2-2-1a',
							name: 'Inescapable Wrath',
							description: 'You ignore difficult terrain.'
						}),
						FactoryLogic.feature.createBonus({
							id: 'fury-sub-2-2-1b',
							field: FeatureField.Speed,
							valueCharacteristics: [ Characteristic.Agility ]
						})
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'fury-sub-2-2-2',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-2-2-2a',
									name: 'Phalanx Breaker',
									description: 'Organizing your forces like feckless creatures of Law. Pitiful.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You shift up to your speed. You make one power roll that targets up to three enemies you come adjacent to during the shift.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '2 damage; A < [weak], dazed (save ends)',
												tier2: '4 damage; A < [average], dazed (save ends)',
												tier3: '6 damage; A < [strong], dazed (save ends)'
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
									id: 'fury-sub-2-2-2b',
									name: 'RRRAAAGHH!',
									description: 'Death! Deeaaath!!',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: '1 creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Might ],
											tier1: '3 + M damage; P < [weak], dazed and frightened (save ends)',
											tier2: '5 + M damage; P < [average], dazed and frightened (save ends)',
											tier3: '8 + M damage; P < [strong], dazed and frightened (save ends)'
										}))
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
					name: 'See Through Your Tricks',
					description: 'You have a double edge on tests made to search for hidden creatures, discern hidden motives, or detect lies. You also have a double edge on tests made to gamble!'
				})
			]
		}
	],
	selected: false
};
