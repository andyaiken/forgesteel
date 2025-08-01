import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const metakinetic: SubClass = {
	id: 'null-sub-3',
	name: 'Metakinetic',
	description: 'You learn to see through the illusions of the universe to truly understand your body and its psionic potential.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'null-sub-3-1-1',
					listOptions: [ SkillList.Exploration ]
				}),
				FactoryLogic.feature.create({
					id: 'null-sub-3-1-2',
					name: 'Metakinetic Mastery',
					description: `
You can use the Knockback maneuver as a free triggered action whenever you use Inertial Shield.

As your discipline grows, your psionic mastery of your body intensifies.

| Discipline | Benefit                                                                                                              |
|:-----------|:---------------------------------------------------------------------------------------------------------------------|
| 2          | You add your Intuition score to the distance you push a creature with the Knockback maneuver.                        |
| 4          | You gain one surge the first time in a round that you take damage or are force moved, even if you resist the effect. |
| 6          | You gain an edge on the power rolls for the Grab and Knockback maneuvers.                                            |
`
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'null-sub-3-2-1',
					name: 'Inertial Sink',
					description: `
You add your Intuition score to your effective size for the purpose of interacting with creatures and objects, including determining whether you can lift an object, are affected by forced movement, and so forth. This has no effect on your ability to be grabbed.

Additionally, you have forced movement damage immunity equal to your level and reduce the distance of your falls by an additional 5 squares.`
				}),
				FactoryLogic.feature.createChoice({
					id: 'null-sub-3-2-2',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-3-2-2a',
									name: 'Gravitic Strike',
									description: 'Your fist projects gravitic force that pulls a distant enemy closer.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee(3) ],
									target: '1 creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '8 + A psychic damage; vertical pull 3',
											tier2: '12 + A psychic damage; vertical pull 5',
											tier3: '16 + A psychic damage; vertical pull 7'
										}))
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-3-2-2b',
									name: 'Kinetic Shield',
									description: 'You manifest a force barrier that absorbs incoming kinetic energy.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: 'You gain 10 temporary Stamina',
											tier2: 'You gain 15 temporary Stamina',
											tier3: 'You gain 20 temporary Stamina'
										})),
										FactoryLogic.createAbilitySectionText('While you have this temporary Stamina, you can’t be made bleeding.')
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
