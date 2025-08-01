import { AbilityKeyword } from '../../../enums/ability-keyword';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SubClass } from '../../../models/subclass';

export const green: SubClass = {
	id: 'elementalist-sub-3',
	name: 'Green',
	description: 'Green is the element of creation and growth. Green abilities make and manipulate plants, fungi, and other forms of life to hamper foes and nourish your allies.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-3-1-1',
					name: 'Acolyte of the Green',
					description: 'Whenever you deal damage to one or more creatures with a green magic ability that costs essence to use (see below), you or one creature of your choice within 10 squares of you gains temporary Stamina equal to your Reason score.'
				}),
				FactoryLogic.feature.create({
					id: 'elementalist-sub-3-1-2',
					name: 'It Is the Soul Which Hears',
					description: `
You can speak with and understand Animals, Monstrosities, and Plant Creatures, even if they don’t share a language with you. Your ability to communicate with such creatures doesn’t make them inherently more intelligent, but you can use Reason in place of Presence while making tests to influence them.

Additionally, whenever you touch a living plant that is not a Plant Creature, you can communicate with it telepathically. You can use words to communicate with the plant, but it communicates with you only by transmitting feelings and sensations that can’t be overly specific.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-3-1-3',
						name: 'The Breath of Dawn Remembered',
						description: 'The power you channel grants the ability to get back in the fight.',
						type: FactoryLogic.type.createTrigger('The target starts their turn or takes damage.'),
						keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or 1 ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target can spend a Recovery.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								repeatable: true,
								effect: 'The target can spend an additional Recovery for each essence spent.'
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
					id: 'elementalist-sub-3-2-1',
					name: 'Disciple of the Green',
					description: `
You can use a maneuver to shapeshift into a type of creature on the Green Animal Forms table. While in animal form, you can speak, and you use your Reason score to make melee free strikes. Your statistics stay the same except as noted on the table.

Each form has a prerequisite level that you must attain in this class before you can adopt it. Some animal forms grant you temporary Stamina. You lose this temporary Stamina when you revert back to your true form.

You choose a specific animal and appearance while in animal form. For example, if you become a rodent, you might become a mouse, a rat, a shrew, or any other size 1T rodent who fits the animal type. When you take on animal form, your equipment either melds into your new form or falls unharmed to the ground, as you decide. When you return to your true form, any melded gear reappears on your person.

You can revert back to your true form as a maneuver. You can’t enter an animal form unless you are in your true form. If you are dying, you revert to your true form and can’t turn back into an animal until you are no longer dying.

| Animal Type | Level | Temporary Stamina | Speed         | Size | Stability Bonus | Melee Damage Bonus | Special                                                                                                                                                                                                      |
|:------------|:------|:------------------|:--------------|:-----|:----------------|:-------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Canine      | 2nd   | 5                 | 7             | 1M   | +0              | +1/+1/+1           | You gain an edge on tests that involve smell.                                                                                                                                                                |
| Fish        | 2nd   | 0                 | 5 (swim only) | 1T   | +0              | +0/+0/+0           | You can breathe in water but can’t breathe outside of it.                                                                                                                                                    |
| Rodent      | 2nd   | 0                 | 5 (climb)     | 1T   | +0              | +0/+0/+0           | You gain an edge on tests that involve smell.                                                                                                                                                                |
| Bird        | 3rd   | 0                 | 5 (fly)       | 1T   | +0              | +0/+0/+0           |  -                                                                                                                                                                                                             |
| Great cat   | 3rd   | 5                 | 6 (climb)     | 2    | +0              | +1/+1/+1           | As a maneuver, jump up to 3 squares in any direction. If you land on an enemy of you size or smaller, that enemy is knocked prone and you can make a melee free strike against them as part of the maneuver. |`
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-3-3-1',
						name: 'Remember Growth and Sun and Rain',
						description: 'You stir any wood’s memory and learn what it has seen.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One mundane wooden object',
						sections: [
							FactoryLogic.createAbilitySectionText('You see and hear any events that have occurred within 10 squares of the object within the last 12 hours, perceiving those events from the object’s location as if you were there.')
						]
					})
				})
			]
		}
	],
	selected: false
};
