import { AbilityKeyword } from '../../../enums/ability-keyword';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SubClass } from '../../../models/subclass';

export const voidSubclass: SubClass = {
	id: 'elementalist-sub-4',
	name: 'Void',
	description: 'Void is the element of the mystery. Void abilities warp space and reality, allowing you to teleport, create illusions, and make things incorporeal.',
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
					description: 'You instantly recognize illusions for what they are, you can see invisible creatures, and supernatural effects can’t conceal creatures and objects from you. Additionally, you always know if an area or object you observe is magical or affected by magic, and you know the specifics of what that magic can do.'
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
							FactoryLogic.createAbilitySectionText('For each Victory you have, you can target one creature. Each target gains the benefit of your A Beyonding of Vision feature until the end of your next turn, but doesn’t gain the use of the Shared Void Sense ability.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-4-1-4',
						name: 'Subtle Relocation',
						description: 'You call on the void to swallow and spit out an ally.',
						type: FactoryLogic.type.createTrigger('The target starts their turn, moves, or is force moved.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one ally',
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
						description: 'Knowledge of the mystery reveals that two spaces are the same space.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText(`
You open two size 1 portals in unoccupied spaces within distance, which last until you move beyond distance from any portal, end the effect as a maneuver, or are dying. Each portal must be placed at a height of no more than 1 square above the ground. When you or any ally touch a portal, that creature can choose to be instantly teleported to an unoccupied space of their choice adjacent to the other portal. If an enemy is force moved into a portal, their forced movement ends and they emerge from the other portal in an unoccupied space chosen by the creature who force moved them.

At the start of each of your turns while the portals are active, you can open a new portal connected to the others. If three or more portals are present, you and your allies choose which portal to emerge from when entering a portal, and a creature who force moves an enemy into a portal chooses that enemy’s destination portal.`)
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
					description: 'Each time you finish a respite, you can open a two-way portal that leads to any place you have previously been. You and your allies can pass through the portal, which remains open for 1 hour or until you dismiss it as a main action.'
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-4-4-1',
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
					id: 'elementalist-sub-4-5-1',
					name: 'Pierce the Veil of Substance',
					description: `
Solidity is merely a suggestion to you. Mundane barriers that are 1 square thick or less do not block your senses or line of effect. You can only sense or have line of effect past one such barrier at a time.

Additionally, whenever you use a void ability, you or one ally within distance of the ability can teleport a number of squares equal to your Reason score.`
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
					id: 'elementalist-sub-4-6-1',
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
					id: 'elementalist-sub-4-7-1',
					name: 'Black Hole Star',
					description: `
You warp gravity around your heavenly body and can pull even the sturdiest titans toward your core. At the end of each of your turns, you target one creature or object within distance of your Hurl Element ability and vertical pull that target up to 5 squares. If their stability reduces this forced movement, they are pulled a minimum of 2 squares. This forced movement ignores stability for your allies.

Additionally, your Mantle of Essence improves. While in the area of the aura, enemies and objects have their stability reduced by an amount equal to your level.`
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-4-8-1',
					name: 'One: Master of Void',
					description: `
You become the embodiment of the element of your chosen specialization. Whenever you use magic, elemental motes flit around you and your skin changes to reflect your element, taking on an earthen or stony appearance for earth, appearing like flickering flame for fire, gaining a leaf pattern for green, and becoming a starry expanse for void.

Whenever you willingly move, you can teleport.

Additionally, your mind is connected to the mystery and helps you find the answers you seek. You no longer require project sources for research projects. Whenever you use a respite activity to make a project roll for a research project, you automatically complete the project.`
				})
			]
		}
	],
	selected: false
};
