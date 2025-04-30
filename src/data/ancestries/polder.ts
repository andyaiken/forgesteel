import { AbilityKeyword } from '../../enums/ability-keyword';
import { Ancestry } from '../../models/ancestry';
import { ConditionType } from '../../enums/condition-type';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';

export const polder: Ancestry = {
	id: 'ancestry-polder',
	name: 'Polder',
	description: 'After humans, polders are the most numerous and diverse ancestry in Orden. They are not humans, but they live in and among humans, sharing their gods and culture. Almost every human culture in Orden has a polder saint or a human saint venerated by polder.',
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'polder-feature-1',
				name: 'Shadowmeld',
				description: 'You become an actual shadow.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'You flatten yourself into a shadow against a wall or floor you are touching, and become hidden from any creature you have cover or concealment from or who isn’t observing you. While in shadow form, you have full awareness of your surroundings, attacks against you and tests made to find you take a bane, and you can’t move or take actions or maneuvers except to exit this form. Any ability or effect that targets more than 1 square affects you in this form only if it explicitly affects the surface you are flattened against. You can exit this form as a maneuver.'
			})
		}),
		FactoryLogic.feature.createSize({
			id: 'polder-feature-2',
			name: 'Small!',
			sizeValue: 1,
			sizeMod: 'S'
		}),
		FactoryLogic.feature.createChoice({
			id: 'polder-feature-3',
			name: 'Polder Traits',
			options: [
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'polder-feature-3-1',
						name: 'Corruption Immunity',
						modifiers: [
							FactoryLogic.damageModifier.createValuePlusPerLevel({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 2, perLevel: 1 })
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'polder-feature-3-2',
						name: 'Graceful Retreat',
						description: 'When you take the Disengage move action, you can shift 1 additional square as part of the move action.',
						field: FeatureField.Disengage,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'polder-feature-3-3',
						name: 'Polder Geist',
						description: 'When you start your turn while no creatures have line of effect to you, or while you are hidden from or have concealment from all enemies with line of effect to you, your speed is increased by 3 until the end of your turn.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'polder-feature-3-4',
						name: 'Fearless',
						description: 'Courage is all you know.',
						conditions: [ ConditionType.Frightened ]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'polder-feature-3-5',
						name: 'Nimblestep',
						description: 'Your light feet allow you to ignore the effects of difficult terrain and move at full speed while you are sneaking.'
					}),
					value: 2
				}
			],
			count: 3
		})
	]
};
