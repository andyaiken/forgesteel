import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { ConditionType } from '@/enums/condition-type';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

const anthousai: Ancestry = {
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

const dryad: Ancestry = {
	id: 'ancestry-dryad',
	name: 'Dryad',
	description: `
*By Joel Russ*

With a patience known only to elves venerating The Forestal, Thyll Hylacae, in the immeasurable span before the Law of Time was imposed, the elves spoke to the trees. Some of the trees listened. Of the awakened trees, the derwic, a handful shook out their limbs and grew into even more ambulatory forms. Long lived as they were, throughout generations after time began, they grew to a new status as guardians of the boundaries of the wodes, and the plants therein. While wode elves tend to see all forests as their domain, the original dryads saw themselves more as partners, as collaborators with the wode and endeavored to impart their values on their saplings.

Dryads have forms as varied as the trees they resemble. Smooth skinned or rough, dark or pale, thin or stout. Seldom seen in cities, even scholars convinced they exist cannot agree whether that is due to their rarity, or because they hold a duty to the wild forests that occupies their collective interests far from “civilization,” or prying eyes.`,
	features: [
		FactoryLogic.feature.create({
			id: 'dryad-feature-1',
			name: 'Regrowth',
			description: 'Your body can slowly restore wounds that would have felled animals. When you spend recoveries outside of combat, you may gain an extra 3 stamina per recovery spent.'
		}),
		FactoryLogic.feature.createDamageModifier({
			id: 'dryad-feature-2',
			name: 'Toughened Wood',
			modifiers: [
				FactoryLogic.damageModifier.create({
					damageType: DamageType.Fire,
					modifierType: DamageModifierType.Weakness,
					value: 5
				}),
				FactoryLogic.damageModifier.create({
					damageType: DamageType.Cold,
					modifierType: DamageModifierType.Immunity,
					value: 3
				})
			]
		}),
		FactoryLogic.feature.createChoice({
			id: 'dryad-feature-3',
			name: 'Dryad Traits',
			options: [
				{
					feature: FactoryLogic.feature.createSize({
						id: 'dryad-feature-3a',
						name: 'Big!',
						sizeValue: 2
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'dryad-feature-3b',
						name: 'Forest Walk',
						description: 'You can shift into difficult terrain.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'dryad-feature-3c',
						name: 'Natural Charm',
						description: 'Your close affinity with the natural world allows you to influence other non-supernatural plants and animals. You gain an edge on Intuition and Presence tests made to interact with plants and animals, or when using the Handle Animals skill.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'dryad-feature-3d',
						name: 'Rooted',
						description: 'Your dense wooden body and connection to the earth makes it difficult for others to move you.',
						field: FeatureField.Stability,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'dryad-feature-3e',
						name: 'Stand Tough',
						description: 'Your Might score is treated as 1 higher for the purpose of resisting potencies.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'dryad-feature-3f',
						name: 'Great Fortitude',
						description: 'Your hearty constitution prevents you from losing strength.',
						conditions: [ ConditionType.Weakened ]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'dryad-feature-3g',
						name: 'Many Limbed',
						description: 'Your multiple arms let you take on multiple tasks at the same time. Whenever you use the Grab or Knockback maneuver against an adjacent creature, you can target an additional adjacent creature, using the same power roll for both targets. Additionally, you can have up to two creatures grabbed at a time.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'dryad-feature-3h',
							name: 'Seizing Roots',
							description: 'Magical grasping roots erupt from the ground and entangle your foes.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
							target: 'Each enemy in the area',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Presence ],
										tier1: '2 damage; M < [weak] slowed (save ends)',
										tier2: '3 damage; M < [average] slowed (save ends)',
										tier3: '5 damage; M < [strong] restrained (save ends)'
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

export const ratcatcher: Sourcebook = {
	id: 'ratcatcher',
	name: 'Ratcatcher Magazine',
	description: 'A selection of content from [Ratcatcher Magazine](https://tidalwavegames.itch.io/ratcatcher-magazine).',
	type: SourcebookType.ThirdParty,
	adventures: [],
	ancestries: [
		anthousai,
		dryad
	],
	careers: [],
	complications: [],
	cultures: [],
	classes: [],
	domains: [],
	encounters: [],
	imbuements: [],
	items: [],
	kits: [],
	monsterGroups: [],
	montages: [],
	negotiations: [],
	perks: [],
	projects: [],
	subclasses: [],
	tacticalMaps: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
