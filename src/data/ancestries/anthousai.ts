import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';

export const anthousai: Ancestry = {
	id: 'ancestry-anthousai',
	name: 'Anthousai',
	description: `
*By Joel Russ*

Whether they came from primal green energies on borders of the wodes, or from the very dreams of Apothachron, Anthousai dazzle the eye and captivate the soul. A riot of color and flower with vaguely humanoid shape, they may have flowers sprouting all over their body and limbs, or even have petals framing their face, and leaves or grasping tendrils for fingers.

Swift to bloom and swift to wither, Anthousai remind others of the fleeting nature of life, and prompt them to make the most of their time upon Orden. Most Anthousai appear untroubled by this bittersweet impression, being too occupied with the moment they are in to mourn times yet to pass.`,
	features: [
		FactoryLogic.feature.createMultiple({
			id: 'anthousai-feature-1',
			name: 'Delicate Grace',
			features: [
				FactoryLogic.feature.create({
					id: 'anthousai-feature-1a',
					name: 'Delicate Grace',
					description: 'Your petals and leaves give you substantial surface area compared to your weight. Whenever you fall, you reduce the distance of the fall by 2 squares.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'anthousai-feature-1b',
					modifiers: [
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Fire,
							modifierType: DamageModifierType.Weakness,
							value: 5
						}),
						FactoryLogic.damageModifier.create({
							damageType: DamageType.Cold,
							modifierType: DamageModifierType.Weakness,
							value: 5
						})
					]
				})
			]
		}),
		FactoryLogic.feature.create({
			id: 'anthousai-feature-2',
			name: 'Lightweight',
			description: 'Your body is light for a creature of your height. Your size is considered 1S when being force moved by another creature.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'anthousai-feature-3',
			name: 'Anthousai Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'anthousai-feature-3a',
						name: 'Forest Walk',
						description: 'You can shift into difficult terrain.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'anthousai-feature-3b',
						name: 'Inherent Allure',
						description: 'An innate appeal suffuses your every action. You gain an edge on Intuition and Presence tests using the Flirt, Nature, or Persuade skills during negotiations with characters who have the Greed, Peace, or Protection motivations. (Your director may opt to roll on your behalf if you have not already determined if these apply as motivations or pitfalls.)'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'anthousai-feature-3c',
						name: 'Natural Charm',
						description: 'Your close affinity with the natural world allows you to influence other non-supernatural plants and animals. You gain an edge on Intuition and Presence tests made to interact with plants and animals, or when using the Handle Animals skill.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'anthousai-feature-3d',
						name: 'Thorned',
						description: 'Long spines on your body let you make your point most sharply. Once per round when you make a melee strike, you can deal extra damage with the strike equal to your highest characteristic score.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSaveThreshold({
						id: 'anthousai-feature-3e',
						name: 'Superlative Elegance',
						description: 'You appear to persevere effortlessly. Whenever you make a saving throw, you succeed on a roll of 5 or higher.',
						value: 5

					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'anthousai-feature-3f',
							name: 'Luring Scent',
							description: 'Enchanting blossoms emit a dangerously alluring scent, magically drawing an enemy toward them.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: 'One creature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Intuition, Characteristic.Presence ],
										tier1: '2 + I or P poison damage; P < [weak] pull 2',
										tier2: '3 + I or P poison damage; P < [average] pull 3',
										tier3: '5 + I or P poison damage; P < [strong] pull 4'
									})
								)
							]
						})
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3
};
