import { AbilityKeyword } from '../../../enums/ability-keyword';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { DamageType } from '../../../enums/damage-type';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SubClass } from '../../../models/subclass';

export const fire: SubClass = {
	id: 'elementalist-sub-2',
	name: 'Fire',
	description: 'Fire is the element of destruction. Fire abilities harm enemies and objects.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createAbilityDamage({
					id: 'elementalist-sub-2-1-1',
					name: 'Acolyte of Fire',
					keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic ],
					value: 1
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-2-1-2',
						name: 'Return to Formlessness',
						description: 'With the merest touch, you cause an object to turn into slag or ash.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 mundane object',
						sections: [
							FactoryLogic.createAbilitySectionText('You heat the target and cause it to combust and melt, destroying it. If the object is larger than 1 square, then only the square of the object that you touch is destroyed.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-2-1-3',
						name: 'Explosive Assistance',
						description: 'You add a little magic to an ally’s aggression at just the right time.',
						type: FactoryLogic.type.createTrigger('The target force moves a creature or object.'),
						keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or 1 ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The forced movement distance gains a bonus equal to your Reason score.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'The forced movement distance gains a bonus equal to twice your Reason score instead.'
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
					id: 'elementalist-sub-2-2-1',
					name: 'Disciple of Fire',
					description: `
Your connection to fire allows you to protect yourself from it, even as you rip away the protections of others. Any fire damage you deal ignores a target’s fire immunity.

At the start of a combat encounter, you gain surges equal to your Victories. Whenever you deal damage with a surge, you can make that damage fire damage.`
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'elementalist-sub-2-2-2',
					modifiers: [
						FactoryLogic.damageModifier.createValuePlusPerLevel({
							damageType: DamageType.Fire,
							modifierType: DamageModifierType.Immunity,
							value: 5,
							perLevel: 1
						})
					]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-2-3-1',
					name: 'A Conversation with Fire',
					description: 'When you spend 1 minute in front of a fire, you can speak the name of another creature. If that creature is willing to speak to you, their image appears in the fire, and they can see you before them in a shimmering ball of light. The two of you can speak to each other through these images as if you were together in person. You or the creature can end the conversation as a maneuver.'
				})
			]
		}
	],
	selected: false
};
