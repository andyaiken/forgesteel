import { AbilityKeyword } from '../../../enums/ability-keyword';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { SubClass } from '../../../models/subclass';

export const earth: SubClass = {
	id: 'elementalist-sub-1',
	name: 'Earth',
	description: 'Earth is the element of permanence. Earth abilities create and shape physical terrain in a permanent way, and bolster the strength and hardiness of allies.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-1-1-1',
					name: 'Acolyte of Earth',
					description: 'Whenever you use an earth magic ability, your stability increases by 1 until the start of your next turn. This benefit is cumulative.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-1-1-2',
						name: 'Motivate Earth',
						description: 'The earth rises, falls, or opens up at your command.',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText(`
You touch a square containing mundane dirt, stone, or metal and create a 5 wall of the same material, which rises up out of the ground and must include the square you touched.

Alternatively, you touch a structure made of mundane dirt, stone, or metal that takes up at least 2 squares. You can open a 1-square opening in the structure where you touched it.

You can instead touch a doorway or other opening in a mundane dirt, stone, or metal surface that is no larger than 1 square. The opening is sealed by the same material that makes up the surface.`)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-1-1-3',
						name: 'Skin Like Castle Walls',
						description: 'You make yourself or an ally covered in protective stone.',
						type: FactoryLogic.type.createTrigger('The target takes damage.'),
						keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or 1 ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The damage is halved.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'If the damage has any potency effect associate with it, the potency is reduced by 1.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'elementalist-sub-1-2-1',
					name: 'Disciple of Earth',
					description: 'Your body is strengthened by your mind’s connection to the element of permanence.',
					field: FeatureField.Stamina,
					value: 3,
					valuePerLevel: 3
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-1-3-1',
						name: 'The Earth Accepts Me',
						description: 'You can slip into the stone.',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You step into a mundane dirt, metal, or stone object (including a wall) that is as large as you or larger. You can remain inside the object for as long as you like. While inside the object, you can observe events and speak to creatures outside of it, but you don’t have line of effect to anything outside the object and vice versa. You can travel through the object freely until you exit it. If the object you meld with is destroyed, you take 10 damage and exit the object.')
						]
					})
				})
			]
		}
	],
	selected: false
};
