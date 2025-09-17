import { AbilityKeyword } from '../../../enums/ability-keyword';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { SubClass } from '../../../models/subclass';

export const earth: SubClass = {
	id: 'elementalist-sub-1',
	name: 'Earth',
	description: 'Earth is the element of permanence. Earth abilities bolster your body and grant the power to permanently create and shape physical terrain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-1-1-1',
					name: 'Earth: Acolyte of Earth',
					description: 'You harness the flow of earth magic to become harder to move. Whenever you use an ability that has the Earth and Magic keywords, your stability increases by 1 until the start of your next turn. This benefit is cumulative.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-1-1-2',
						name: 'Motivate Earth',
						description: 'The earth rises, falls, or opens up at your command.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText(`
You touch a square containing mundane dirt, stone, or metal and create a 5 wall of the same material, which rises up out of the ground and must include the square you touched.

Alternatively, you touch a structure made of mundane dirt, stone, or metal that occupies 2 or more squares. You can open a 1-square opening in the structure where you touched it. You can instead touch an existing doorway or other opening that is 1 square or smaller in a mundane dirt, stone, or metal surface. The opening is sealed by the same material that makes up the surface.`)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-1-1-3',
						name: 'Skin Like Castle Walls',
						description: 'You cover yourself or an ally in protective stone.',
						type: FactoryLogic.type.createTrigger('The target takes damage.'),
						keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one ally',
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
					value: 3, // RAW is 6 stamina at 2nd level and 3 for each level after that, but the 3 per level will get added at lvl 2 as well here
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
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You step into a mundane dirt, metal, or stone object (including a wall) that is as large as you or larger. You can remain inside the object for as long as you like. While inside the object, you can observe events and speak to creatures outside it, but you don’t have line of effect to anything outside the object and vice versa. You can travel through the object freely until you exit it. If the object you meld with is destroyed, you take 10 damage and exit the object.')
						]
					})
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-1-4-1',
					name: 'Mantle of Essence: Quaking Earth',
					description: `
While you have 3 or more essence and are not dying, you exude an aura of magic whose distance is equal to your Reason score. You can activate and deactivate the aura at will (no action required).

At the end of each of your turns, you can push each enemy in the area up to a number of squares equal to your Reason score.`
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'elementalist-sub-1-5-1',
					name: 'The Mountain Does Not Move',
					description: `
You stand firm and magnetize your allies to stay grounded. Your stability increases by your level.

Additionally, whenever an ally within distance of your Hurl Element ability is force moved, you can use a free triggered action to decrease your stability down to a minimum of 0, then increase the ally’s stability by an amount equal to the stability you lost. This change lasts until the end of the round.`,
					features: [
						FactoryLogic.feature.createBonus({
							id: 'elementalist-sub-1-5-1a',
							field: FeatureField.Stability,
							value: 1,
							valuePerLevel: 1
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'elementalist-sub-1-5-1b',
								name: 'The Mountain Does Not Move',
								type: FactoryLogic.type.createTrigger('The target is force moved', { free: true }),
								keywords: [],
								distance: [ FactoryLogic.distance.createSpecial('The distance of your Hurl Element ability') ],
								target: 'One ally',
								sections: [
									FactoryLogic.createAbilitySectionText('You decrease your stability down to a minimum of 0, then increase the target’s stability by an amount equal to the stability you lost. This change lasts until the end of the round.')
								]
							})
						})
					]
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
					id: 'elementalist-sub-1-6-1',
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
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-sub-1-7-1',
						name: 'Summon Source of Earth',
						description: 'The ground rumbles as an elemental bursts forth, ready to serve.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText(`
A source of earth emerges from an unoccupied space within distance. The source takes their turn immediately after you, moving up to their speed and either taking a main action or a maneuver. The source is dismissed at the start of your next turn.

The source starts an encounter at full Stamina, but maintains their current Stamina throughout the encounter, even if they are dismissed and you use this ability again. They can’t regain Stamina during the encounter. When the source’s Stamina is reduced to 0, you can’t use this ability again until you earn 1 or more Victories.`),
							FactoryLogic.createAbilitySectionField({
								name: 'Persist',
								value: 2,
								effect: 'The source takes another turn. They are dismissed at the start of your next turn.'
							})
						]
					})
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-sub-1-8-1',
					name: 'One: Master of Earth',
					description: `
You become the embodiment of the element of your chosen specialization. Whenever you use magic, elemental motes flit around you and your skin changes to reflect your element, taking on an earthen or stony appearance for earth, appearing like flickering flame for fire, gaining a leaf pattern for green, and becoming a starry expanse for void.

You have damage immunity 5.

Additionally, as a respite activity, you can shape the mundane earth around you in a 1-mile radius. You can open sinkholes, form mountains, level mundane structures or whole settlements, create canyons, raise islands or sink them in the sea, and perform similar feats. You can’t use this respite activity if another creature within 1 mile is already using it. Once you use this respite activity, you can’t use it again for 10 days.`
				})
			]
		}
	],
	selected: false
};
