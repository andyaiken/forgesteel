import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

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
							description: 'You can interpret diagrams and charts even if you don’t understand the language associated with them. For the purpose of making project rolls for research and crafting items, you are considered fluent in all languages.'
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
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '4 + I holy damage; P < [weak], before taking damage, the target makes a free strike against a target you choose',
									tier2: '7 + I holy damage; P < [average], before taking damage, the target uses an ability of your choice and you choose any targets for that ability',
									tier3: '11 + I holy damage; P < [strong], before taking damage, the target shifts up to their speed, uses an ability of your choice, and you choose any targets for that ability'
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
		}
	],
	resourceGains: [
		{
			resource: 'Piety',
			trigger: 'The first time in an encounter that the Director uses an ability or feature that costs Malice',
			value: '2'
		}
	],
	piety: `
* Prayer Effect: Choose up to three allies, including yourself, within 10 squares of you. Each target gains a surge.`
};
