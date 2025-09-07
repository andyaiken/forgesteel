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
					description: 'You harness the residual magic from your green spells to bolster yourself and your allies. Whenever you deal damage to one or more creatures using an ability that has the Green and Magic keywords and that costs essence to use (see below), you or one creature within 10 squares of you gains temporary Stamina equal to your Reason score.'
				}),
				FactoryLogic.feature.create({
					id: 'elementalist-sub-3-1-2',
					name: 'It Is the Soul Which Hears',
					description: `
You can speak with and understand animals, beasts, and plant creatures, even if they don’t share a language with you. Your ability to communicate with these creatures doesn’t make them inherently more intelligent, but you can use Reason instead of Presence while making tests to influence them.

Additionally, you can touch a living plant that is not a plant creature to communicate with it telepathically. You can use words to communicate with the plant, but it communicates with you only by transmitting feelings and sensations that can’t be overly specific.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-3-1-3',
						name: 'Breath of Dawn Remembered',
						description: 'The power you channel grants the ability to get back in the fight.',
						type: FactoryLogic.type.createTrigger('The target starts their turn or takes damage.'),
						keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one ally',
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

Each form has a prerequisite level that you must attain before you can adopt it. Some animal forms grant you temporary Stamina. You lose this temporary Stamina when you revert back to your true form.

You choose a specific animal and appearance while in animal form. For example, if you become a rodent, you might become a mouse, a rat, a shrew, or any other size 1T animal who fits the rodent type. When you take on an animal form, your equipment either melds into your new form or falls undamaged to the ground (your choice). When you return to your true form, any melded gear reappears on your person.

You can revert back to your true form as a maneuver. You can’t enter an animal form unless you are in your true form. When you are dying, you revert to your true form and can’t turn back into an animal until you are no longer dying.

| Animal Type         | Level  | Temporary Stamina  | Speed         | Size | Stability Bonus | Melee Damage Bonus | Special                                                                                                                                                                                                                                                                |
|:--------------------|:-------|:-------------------|:--------------|:-----|:----------------|:-------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Canine              | 2nd    | 5                  | 7             | 1M   | +0              | +1/+1/+1           | You gain an edge on tests that involve smell.                                                                                                                                                                                                                          |
| Fish                | 2nd    | 0                  | 5 (swim only) | 1T   | +0              | +0/+0/+0           | You can breathe in water but can’t breathe outside of it.                                                                                                                                                                                                              |
| Rodent              | 2nd    | 0                  | 5 (climb)     | 1T   | +0              | +0/+0/+0           | You gain an edge on tests that involve smell.                                                                                                                                                                                                                          |
| Bird                | 3rd    | 0                  | 5 (fly)       | 1T   | +0              | +0/+0/+0           |  -                                                                                                                                                                                                                                                                     |
| Great cat           | 3rd    | 5                  | 6 (climb)     | 2    | +0              | +1/+1/+1           | As a maneuver, jump up to 3 squares in any direction. If you land on an enemy of you size or smaller, that enemy is knocked prone and you can make a melee free strike against them as part of the maneuver.                                                           |
| Giant frog          | 4th    | 5                  | 5 (swim)      | 2    | +0              | +0/+0/+0           | Your melee free strike has a distance of melee 3. When you take the Advance move action, you can high jump or long jump up to half your speed. This jump can allow you to move more squares than your speed.                                                           |
| Horse               | 4th    | 5                  | 8             | 2    | +1              | +0/+0/+0           | You can use the Charge main action as a maneuver. You can’t use two Charge main actions on the same turn.                                                                                                                                                              |
| Mohler              | 4th    | 0                  | 7 (burrow)    | 1S   | +1              | +0/+0/+0           | Your melee distance gains a +1 bonus.                                                                                                                                                                                                                                  |
| Bear                | 5th    | 10                 | 5 (climb)     | 2    | +1              | +2/+2/+2           | Your melee distance gains a +1 bonus.                                                                                                                                                                                                                                  |
| Giant bird          | 5th    | 0                  | 7 (fly)       | 2    | +0              | +1/+1/+1           | After making a melee free strike, you can shift up to 3 squares as a free triggered action.                                                                                                                                                                            |
| Giant salamander    | 6th    | 5                  | 5             | 1L   | +3              | +2/+2/+2           | Your melee free strike deals fire damage. Additionally, you have fire immunity 3                                                                                                                                                                                       |
| Giant spider        | 6th    | 0                  | 5 (climb)     | 2    | +0              | +0/+1/+2           | You have a double edge on melee free strikes against creatures you are hidden from.                                                                                                                                                                                    |
| Giant snake         | 7th    | 5                  | 5             | 3    | +0              | +0/+1/+2           | Whenever you obtain a tier 2 or tier 3 outcome on a melee free strike, you can automatically grab the target. While grabbed this way, the target takes 2 damage at the start of each of their turns.                                                                   |
| Kangaroo            | 7th    | 0                  | 7             | 1L   | +1              | +0/+0/+4           | When you score a critical hit with a melee free strike, the target is dazed (save ends). When you take the Advance move action, you can high jump or long jump up to half your speed. This jump can allow you to move more squares than your speed.                    |
| Spiny Armadillo     | 7th    | 10                 | 5             | 1M   | +2              | +0/+0/+0           | Whenever you take damage from an adjacent creature’s melee ability, that creature takes 3 damage.                                                                                                                                                                      |
| Ostrich             | 8th    | 0                  | 10            | 2    | +0              | +1/+1/+1           | Your movement does not provoke opportunity attacks.                                                                                                                                                                                                                    |
| Shark               | 8th    | 0                  | 8 (swim only) | 2    | +0              | +2/+2/+2           | You can breathe in water but can’t breathe outside of it. Additionally, you gain an edge on strikes against targets who are bleeding or winded.                                                                                                                        |
| Giant octopus       | 9th    | 5                  | 5 (swim)      | 3    | +2              | +0/+0/+0           | You can breathe in water. Additionally, you can target two creatures or objects with your melee free strike. Whenever you obtain a tier 2 or tier 3 outcome on a melee free strike, you can automatically grab the target. You can have up to eight creatures grabbed. |
| Rhinoceros          | 9th    | 10                 | 8             | 2    | +5              | +2/+2/+2           | Whenever you make a melee free strike as part of the Charge action, that strike gains an edge.                                                                                                                                                                         |
| King terror lizard  | 10th   | 20                 | 5             | 4    | +3              | +2/+2/+2           | Your melee free strike is a 1 burst with the Area and Strike keywords.                                                                                                                                                                                                 |
`
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
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-3-4-1',
					name: 'Mantle of Essence: Veiling Bed',
					description: `
While you have 3 or more essence and are not dying, you exude an aura of magic whose distance is equal to your Reason score. The effects within the area of the aura are based on your specialization, as shown on the Mantle of Essence Specialization Effects table. You can activate and deactivate the aura at will (no action required).

The area provides concealment for you and your allies.`
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-3-5-1',
					name: 'Hide of Tenfold Shields',
					description: `
Your animal forms become hardier. You gain temporary Stamina equal to your level when you enter an animal form in combat, which is added to any temporary Stamina provided by the animal form.

Additionally, an adjacent ally can use a maneuver to pet you. If they do so, you can lose temporary Stamina down to a minimum of 0. The ally gains temporary Stamina equal to the amount you lost.`
				})
			]
		},
		{
			level: 6,
			features: []
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-3-6-1',
					name: 'Mantle of Quintessence',
					description: `
Your Mantle of Essence feature no longer requires essence.

Additionally, your Mantle of Essence now radiates magic that creates a calming air. Creatures in the area of the mantle’s aura have their starting patience increased by 1 (to a maximum of 5) during any negotiation. While in the area, you and any ally gain an edge on tests that use the Handle Animals skill. If you have 5 or more Victories, the bonus to patience increases to 2 and tests that use the Handle Animals skill have a double edge.`
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-3-7-1',
					name: 'Chimeric Manifestation',
					description: `
Nature isn’t static and unchanging, and neither are you. You can enter or exit your animal form as a free maneuver the first time you use your Disciple of the Green feature on your turn.

Additionally, whenever you use your Disciple of the Green feature, you can select an additional animal form and gain the positive benefits from both forms. You can choose the size of either animal, and if both animal forms grant you the same benefit, you can choose whichever you prefer. You gain the highest speed between the two animal forms and have all types of movement from both forms.

You can only combine animal forms whose levels add up to 12 or less. For example, you can combine a shark (8th level) with a horse (4th level), but you can’t combine a shark with a bear (5th level).`
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-3-8-1',
					name: 'One: Master of Green',
					description: `
You become the embodiment of the element of your chosen specialization. Whenever you use magic, elemental motes flit around you and your skin changes to reflect your element, taking on an earthen or stony appearance for earth, appearing like flickering flame for fire, gaining a leaf pattern for green, and becoming a starry expanse for void.

The number of Recoveries you have increases by 2, and each time you finish a respite, you can grant each ally who finished the respite with you 2 additional Recoveries. Your allies’ additional Recoveries disappear when they finish their next respite.

Additionally, as a respite activity, you can perform a ritual that causes a fruit tree to spring from the ground, grow, mature, and produce 1d6 of a treasure called Life Fruit. You can use a respite activity to cause an existing tree to produce another 1d6 Life Fruit, but it does not grow these magic consumables on its own.

As a maneuver, a creature can consume a Life Fruit or feed it to an adjacent willing ally. When a creature eats a Life Fruit, they restore all their Stamina, they can end all conditions or effects on themself, and they can stand up if prone. Additionally, if the creature desires, their aging pauses for 1d10 years. If the creature eats additional Life Fruit and chooses to pause their aging, the effects don’t stack. Instead, the creature gains the benefit from the Life Fruit that pauses their aging for the longest time.`
				})
			]
		}
	],
	selected: false
};
