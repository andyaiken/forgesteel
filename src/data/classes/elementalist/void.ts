import { AbilityKeyword } from '../../../enums/ability-keyword';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SubClass } from '../../../models/subclass';

export const voidSubclass: SubClass = {
	id: 'elementalist-sub-4',
	name: 'Void',
	description: 'Void is the element of the unknown. Void abilities warp space and reality, allowing you to teleport, create illusions, and make things incorporeal.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createAbilityDistance({
					id: 'elementalist-sub-4-1-1',
					name: 'Acolyte of the Void',
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
					value: 2
				}),
				FactoryLogic.feature.create({
					id: 'elementalist-sub-4-1-2',
					name: 'A Beyonding of Vision',
					description: 'You instantly recognize illusions for what they are, you can see invisible creatures, and supernatural effects can’t conceal creatures and objects from you. You always know if an area or object you observe is magical or affected by magic, and you know the specifics of what that magic can do.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-4-1-3',
						name: 'Shared Void Sense',
						description: 'You grant allies a taste of your unearthly vision.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('For each Victory you have, you can target one creature. That creature gains the benefit of your A Beyonding of Vision feature until the end of your next turn, but doesn’t gain the use of Shared Void Sense.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-4-1-4',
						name: 'A Subtle Relocation',
						description: 'You call on the void to swallow and spit out an ally.',
						type: FactoryLogic.type.createTrigger('The target starts their turn, moves, or is force moved.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or 1 ally',
						sections: [
							FactoryLogic.createAbilitySectionText('You teleport the target up to a number of squares equal to your Reason score. If the target moves to trigger this ability, you can teleport them at any point during the move.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You teleport the target up to a number of squares equal to twice your Reason score instead.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-4-2-1',
						name: 'There is No Space Between',
						description: '',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText(`
You open two size 1 portals in unoccupied spaces in range, which last until you move beyond distance from any portal, end the effect as a maneuver, or are dying. Each portal must be placed at a height of no more than 1 square above the ground. When you or any ally touch a portal, that creature can choose to be instantly teleported to an unoccupied space of their choice within 1 square of the other portal. If an enemy is force moved into a portal, their forced movement ends and they emerge from the other portal in an unoccupied space chosen by the creature who force moved them.

At the start of each of your turns while the portals are active, you can open a new portal connected to the others. If three or more portals are present, you and your allies choose which portal you emerge from when you enter a portal, and a creature who force moves an enemy into a portal chooses that enemy’s destination portal.`)
						]
					})
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-4-3-1',
					name: 'Distance is Only Memory',
					description: 'When you finish a respite, you can open a two-way portal that leads to any place you have previously been. Your allies can pass through the portal, which remains open for 1 hour or until you dismiss it as an action.'
				})
			]
		}
	],
	selected: false
};
