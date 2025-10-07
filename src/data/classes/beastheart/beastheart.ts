import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { HeroClass } from '@/models/class';
import { PerkList } from '@/enums/perk-list';
import { SkillList } from '@/enums/skill-list';
import { guardian } from './guardian';
import { prowler } from './prowler';
import { punisher } from './punisher';
import { spark } from './spark';

export const beastheart: HeroClass = {
	id: 'class-beastheart',
	name: 'Beastheart',
	description: `
A beastheart never fights alone! You travel with a ferocious beast by your side—no trained pet, but an untamed wild creature such as a wolf, a basilisk, or even a young dragon. Bound to you by a primordial connection, your companion honors your wishes just as you are guided by your companion’s instincts. But beware: as battle rages on, your companion may become lost in a blood-soaked rampage, lashing out at enemies and friends alike.

Play a beastheart if you want to face the world’s dangers with your mighty wild companion by your side, rushing into the thick of combat to challenge enemy champions or prowling around the outskirts to pick off vulnerable foes.`,
	type: 'standard',
	subclassName: 'Wild Nature',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Might, Characteristic.Intuition ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'beastheart-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 12
				}),
				FactoryLogic.feature.createBonus({
					id: 'beastheart-recoveries',
					field: FeatureField.Recoveries,
					value: 12
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'beastheart-resource',
					name: 'Ferocity',
					gains: [
						{
							tag: 'start',
							trigger: 'Start of your turn',
							value: '1d3'
						},
						{
							tag: 'deal-damage-self',
							trigger: 'The first time in a round that you deal damage',
							value: '1'
						},
						{
							tag: 'deal-damage-companion',
							trigger: 'The first time in a round that your companion deals damage',
							value: '1'
						}
					]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-1-1a',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Handle Animals' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-1-1b',
					listOptions: [ SkillList.Exploration, SkillList.Intrigue ],
					count: 2
				}),

				// TODO: Companion
				// TODO: Heart of the Beast
				// TODO: Feral Strike
				// TODO: Rampage

				FactoryLogic.feature.createKitChoice({
					id: 'beastheart-1-6',
					types: [ 'Beastheart' ]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-1-7',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-1-8',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-1-9',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-2-1',
					name: 'Perk',
					lists: [ PerkList.Exploration, PerkList.Intrigue, PerkList.Interpersonal ]
				})
				// TODO: Timely Aid
			]
		},
		{
			level: 3,
			features: [
				// TODO: Companion Advancement Feature
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-3-2',
					cost: 7
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-4-1',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-4-2',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createPerk({
					id: 'beastheart-4-6'
				}),
				// TODO: Rampage improvement
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-4-7'
				})
				// TODO: Unchained Ferocity
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-5-1',
					cost: 9
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-6-1',
					name: 'Perk',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				})
				// TODO: Shared Rampage
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1b',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1c',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1d',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-7-1e',
					characteristic: Characteristic.Presence,
					value: 1
				}),

				// TODO: Greater Ferocity
				// TODO: Rampage Improvement

				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-7-5'
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-8-1'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'beastheart-8-2',
					cost: 11
				})
			]
		},
		{
			level: 9,
			features: [
				// Nature's Wisdom
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-10-1',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'beastheart-10-2',
					characteristic: Characteristic.Intuition,
					value: 1
				}),

				// TODO: Companion Advancement Featurr
				// TODO: Hot Blooded

				FactoryLogic.feature.createPerk({
					id: 'beastheart-10-5',
					name: 'Perk',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'beastheart-10-6',
					name: 'Primordial Power',
					type: 'epic',
					gains: [
						{
							tag: '',
							trigger: 'Finish a respite',
							value: 'XP gained'
						}
					],
					description: 'You can spend 1 primordial power as a free maneuver to allow you each to take a main action on your turn, instead of a main action and a maneuver. For that turn, the ferocity cost of heroic abilities is reduced by 1.'
				}),

				// TODO: Rampage Improvement

				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-10-8',
					name: 'Skill'
				})
			]
		}
	],
	abilities: [
		// TODO: Burning Rage
		// TODO: Covering Fire
		// TODO: Scatter!
		// TODO: Tag Me In

		// TODO: Herd the Sheep
		// TODO: High and Low
		// TODO: Hungry like the Wolf
		// TODO: Mighty Roar

		// TODO: Bloodlust Strike
		// TODO: Bring it On!
		// TODO: Friendly Fire
		// TODO: Unfair Advantage

		// TODO: Heart Eater
		// TODO: Heedless Headbutt
		// TODO: Primordial Jaws
		// TODO: Setup Strike

		// TODO: Dogpile
		// TODO: Hunter's Mercy
		// TODO: Massive Throw
		// TODO: Rend in Two

		// TODO: Bloodied Blade and Claw
		// TODO: Burn the World to Ash
		// TODO: Double Trouble
		// TODO: Life-Drinking Wound
	],
	subclasses: [
		guardian,
		prowler,
		punisher,
		spark
	],
	level: 1,
	characteristics: []
};
