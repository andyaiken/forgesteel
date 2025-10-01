import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { Domain } from '@/models/domain';
import { FactoryLogic } from '@/logic/factory-logic';
import { SkillList } from '@/enums/skill-list';

export const knowledge: Domain = {
	id: 'domain-knowledge',
	name: 'Knowledge',
	description: 'The Knowledge domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-knowledge-1',
					features: [
						FactoryLogic.feature.create({
							id: 'domain-knowledge-1-1',
							name: 'Blessing of Comprehension',
							description: 'You can interpret diagrams and charts even if you don’t understand the language associated with them. You are considered fluent in all languages for the purpose of understanding the project source for any research or crafting project.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-knowledge-1-2',
							listOptions: [ SkillList.Lore ]
						})
					]
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'domain-knowledge-2',
						name: 'The Gods Command, You Obey',
						description: 'You speak with the voice of your saint, commanding your enemies.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '4 + I holy damage; P < [weak], before taking damage, the target makes a free strike against a target you choose',
									tier2: '7 + I holy damage; P < [average], before taking damage, the target uses an ability of your choice and you choose any targets for that ability',
									tier3: '11 + I holy damage; P < [strong], before taking damage, the target shifts up to their speed to a location you choose, uses an ability of your choice, and you choose any targets for that ability'
								})
							)
						]
					})
				})
			]
		},
		{
			level: 3,
			features: []
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-knowledge-4',
					name: 'Saint’s Epiphany',
					description: 'At the start of a respite, you can inspire yourself or another creature taking the same respite with divine knowledge. If the target makes a project roll during this respite, they can add 1d10 plus your Intuition score to the roll.'
				})
			]
		},
		{
			level: 5,
			features: []
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'domain-knowledge-6',
						name: 'Invocation of Undoing',
						description: 'You utter a secret word of destruction known only to deities.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
						target: 'Each enemy in the area',
						cost: 9,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '3 sonic damage; push 3',
									tier2: '6 sonic damage; push 5',
									tier3: '9 sonic damage; push 7'
								})
							),
							FactoryLogic.createAbilitySectionText('You can choose to have this ability deal damage to and push objects, and to deal damage to buildings.')
						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-knowledge-7',
					name: 'Gods’ Library',
					description: 'You can gain access to information you need through prayer, so that you no longer require research materials for crafting and research projects. Additionally, you add your level to project rolls you make for crafting and research projects. You also have any skills in the lore skill group you don’t already have, and you gain a number of skills from any other skill groups equal to the number of skills you had in the lore skill group before you gained this feature.'
				})
			]
		},
		{
			level: 8,
			features: []
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'domain-knowledge-9',
						name: 'Word of Weakening',
						description: 'You utter a divine word that makes a foe brittle.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						cost: 11,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '10 + I corruption damage; A < [weak], weakened (save ends)',
									tier2: '15 + I corruption damage; A < [average], weakened (save ends)',
									tier3: '21 + I corruption damage; A < [strong], weakened (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('While weakened this way, the target has damage weakness 10.')
						]
					})
				})
			]
		},
		{
			level: 10,
			features: []
		}
	],
	resourceGains: [
		{
			resource: 'Piety',
			tag: '',
			trigger: 'The first time in an encounter that the Director spends Malice',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'knowledge-default-1',
			name: 'Knowledge Prayer Effect',
			description: 'Choose up to five allies within 10 squares of you, or choose yourself instead of one ally. Each target gains 1 surge.',
			tag: 'conduit-prayer'
		})
	]
};
