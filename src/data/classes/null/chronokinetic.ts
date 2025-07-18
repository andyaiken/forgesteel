import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const chronokinetic: SubClass = {
	id: 'null-sub-1',
	name: 'Chronokinetic',
	description: 'Your training has allowed you to become unmoored from temporal reality, using the flow of time as another dimension that all things move through.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'null-sub-1-1-1',
					listOptions: [ SkillList.Lore ]
				}),
				FactoryLogic.feature.create({
					id: 'null-sub-1-1-2',
					name: 'Chronokinetic Mastery',
					description: `
You can use the Disengage move action as a free maneuver when you use Inertial Shield.

As your discipline grows, your psionic mastery of your body intensifies.

| Discipline | Benefit                                                                                                                 |
|:-----------|:------------------------------------------------------------------------------------------------------------------------|
| 2          | When you take the Knockback maneuver you can Disengage as a free triggered action, either before or after the maneuver. |
| 4          | You gain one surge the first time on a turn that you move at least 1 square as part of an ability.                      |
| 6          | You gain an edge on the power rolls for Grab and Knockback maneuvers.                                                   |
`
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'null-sub-1-2-1',
					name: 'Rapid Processing',
					description: 'As a maneuver, you can read an entire book or process a similar amount of information. Additionally, during any respite, you can take an additional respite activity.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'null-sub-1-2-2',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-1-2-2a',
									name: 'Blur',
									description: 'You release stored time, allowing you to act twice.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You can use a signature or heroic ability as a free maneuver. You gain an edge on power rolls with this ability.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-1-2-2b',
									name: 'Force Redirected',
									description: 'The force of your strike manifests in a surprising location.',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee(3) ],
									target: '1 creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '8 + A damage; slide 1',
											tier2: '12 + A damage; slide 3',
											tier3: '16 + A damage; slide 5'
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
			features: []
		}
	],
	selected: false
};
