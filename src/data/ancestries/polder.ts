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
	description: 'After humans, polders are the most numerous and diverse ancestry in Orden. They are not humans, but they live in and among humans and share their gods and culture. Almost every human culture in Orden has a polder saint or a human saint venerated by polder.',
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
				sections: [
					FactoryLogic.createAbilitySectionText(`
You flatten yourself into a shadow against a wall or floor you are touching, and become hidden from any creature you have cover or concealment from or who isn’t observing you. While in shadow form, you have full awareness of your surroundings, and strikes against you and tests made to search for you take a bane. You can’t move or be force moved, and you can’t take main actions or maneuvers except to exit this form or to direct creates under your control, such as one you summon using an ability. Any ability or effect that targets more than 1 square affects you in this form only if it explicitly affects the surface you are flattened against. You can exit this form as a maneuver.

If the surface you are flattened against is destroyed, this ability ends and you take 1d6 damage that can’t be reduced in any way.`)
				]
			})
		}),
		FactoryLogic.feature.createSize({
			id: 'polder-feature-2',
			name: 'Small!',
			description: 'Your diminutive stature lets you easily get out of — or into — trouble.',
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
						description: 'Your innate shadow magic grants you resilience against the unnatural. You have corruption immunity equal to your level + 2.',
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
						description: 'Your small size makes it easier for you to slip away from the fray.',
						field: FeatureField.Disengage,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'polder-feature-3-3',
						name: 'Polder Geist',
						description: 'Evading others’ notice gives you freedom to move. At the start of each of your turns during combat, if no enemy has line of effect to you or if you are hidden from or have concealment from any enemy with line of effect to you, you gain a +3 bonus to speed until the end of your turn.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'polder-feature-3-4',
							name: 'Reactive Tumble',
							description: 'Staying light on your feet lets you quickly get back into position.',
							type: FactoryLogic.type.createTrigger('Whenever you are force moved', { free: true }),
							keywords: [],
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('You shift 1 square after the forced movement is resolved.')
							]
						})
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'polder-feature-3-5',
						name: 'Fearless',
						description: 'Courage is all you know.',
						conditions: [ ConditionType.Frightened ]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'polder-feature-3-6',
						name: 'Nimblestep',
						description: 'A light step serves you well when speed is of the essence. You ignore the effects of difficult terrain and can move at full speed while sneaking.'
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 4
};
