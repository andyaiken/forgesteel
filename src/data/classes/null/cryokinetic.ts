import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { DamageType } from '../../../enums/damage-type';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const cryokinetic: SubClass = {
	id: 'null-sub-2',
	name: 'Cryokinetic',
	description: 'You are able to tap into absolute cold, the most essential energy of the manifolds, and manifest its effects in your body.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'null-sub-2-1-1',
					listOptions: [ SkillList.Crafting ]
				}),
				FactoryLogic.feature.create({
					id: 'null-sub-2-1-2',
					name: 'Cryokinetic Mastery',
					description: `
You can use the Grab maneuver as a free triggered action whenever you use Inertial Shield.

As your discipline grows, your psionic mastery of your body intensifies.

| Discipline | Benefit                                                                                                                    |
|:-----------|:---------------------------------------------------------------------------------------------------------------------------|
| 2          | You can target one additional creature when using the Knockback maneuver.                                                  |
| 4          | You gain one surge the first time on a turn that you grab a target or an enemy moves at least 1 square in your Null Field. |
| 6          | You gain an edge on the power rolls for the Grab and Knockback maneuvers.                                                  |
`
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'null-sub-2-2-1',
					name: 'Entropic Adaptability',
					description: 'You ignore difficult terrain related to cold and ice, and you can automatically climb at full speed while moving.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'null-sub-2-2-1b',
					modifiers: [
						FactoryLogic.damageModifier.createCharacteristic({ damageType: DamageType.Cold, modifierType: DamageModifierType.Immunity, characteristics: [ Characteristic.Intuition ], multiplier: 2 })
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'null-sub-2-2-2',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-2-2-2a',
									name: 'Entropic Field',
									description: 'You drastically increase the local entropy.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
									target: 'Each enemy in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '6 cold damage; A < [weak], slowed (save ends)',
											tier2: '9 cold damage; A < [average], slowed (save ends)',
											tier3: '13 cold damage; A < [strong], slowed (save ends)'
										}))
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-2-2-2b',
									name: 'Heat Sink',
									description: 'You absorb ambient heat, coating the ground in frost and precipitating snow from the air',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Until the start of your next turn, the area of your Null Field ability increases by 1. While the area is enlarged this way, you and your allies benefit from concealment while in the area. When you end your turn, each enemy in the aura takes cold damage equal to your Intuition score.')
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
