import { AbilityKeyword } from '../../../enums/ability-keyword';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { DamageType } from '../../../enums/damage-type';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SubClass } from '../../../models/subclass';

export const fire: SubClass = {
	id: 'elementalist-sub-2',
	name: 'Fire',
	description: 'Fire is the element of destruction. Fire abilities devastate enemies and melt objects to slag.',
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
						target: 'One mundane object',
						sections: [
							FactoryLogic.createAbilitySectionText('You heat the target and cause it to melt or combust, destroying it. If the object is larger than 1 square, then only the square of the object you touch is destroyed.')
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
						target: 'Self or one ally',
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
Your connection to fire allows you to protect yourself from it, even as you rip away the protections of others. You have fire immunity equal to 5 plus your level. Additionally, fire damage you deal ignores a target’s fire immunity.

At the start of a combat encounter, you gain a number of surges equal to your Victories. Whenever you spend a surge to deal extra damage, you can make that damage fire damage`
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
					description: 'When you spend 1 uninterrupted minute in front of a fire, you can speak the name of another creature. If that creature is willing to speak to you, their image appears in the fire, and they can see you before them in a shimmering ball of light. The two of you can speak to each other through these images as if you were together in person. As a maneuver, you or the creature can end the conversation.'
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-2-4-1',
					name: 'Mantle of Essence: Burning Grounds',
					description: `
While you have 3 or more essence and are not dying, you exude an aura of magic whose distance is equal to your Reason score. The effects within the area of the aura are based on your specialization, as shown on the Mantle of Essence Specialization Effects table. You can activate and deactivate the aura at will (no action required).

At the end of each of your turns, each enemy in the area takes fire damage equal to your Reason score.`
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-2-5-1',
					name: 'Smoldering Step',
					description: `
You can use 1 square of movement to walk into an area of fire your size or larger and teleport to any other area of fire your size or larger within 10 squares of the first area.

Additionally, whenever you use a fire ability or are targeted by an ability that deals fire damage, each enemy adjacent to you takes fire damage equal to your Reason score.`
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
					id: 'elementalist-sub-2-6-1',
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
					id: 'elementalist-sub-2-7-1',
					name: 'The Flame Primordial',
					description: `
You produce a fire that entrances the fates, distracting them from aiding your foes. Whenever you deal fire damage to a creature or object, they take an extra 1d6 fire damage. If you deal fire damage to a mundane object, you can use a free triggered action to target it with your Return to Formlessness ability instead.

Additionally, any enemy who starts their turn adjacent to you has fire weakness equal to your Reason score until the start of their next turn. This increases to twice your Reason score if the enemy is made of or is wearing mostly metal.`
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-2-8-1a',
					name: 'One: Master of Fire',
					description: `
You become the embodiment of the element of your chosen specialization. Whenever you use magic, elemental motes flit around you and your skin changes to reflect your element, taking on an earthen or stony appearance for earth, appearing like flickering flame for fire, gaining a leaf pattern for green, and becoming a starry expanse for void.

The damage bonus of your Acolyte of Fire feature increases to +5 and applies to all your magic abilities.

Additionally, your Return to Formlessness ability can be used on supernatural objects (but not on artifacts). When you melt a treasure, you gain breath equal to its echelon.`
				})
			]
		}
	],
	selected: false
};
