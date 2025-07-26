import { AbilityKeyword } from '../../enums/ability-keyword';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const fate: Domain = {
	id: 'domain-fate',
	name: 'Fate',
	description: 'The Fate domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-fate-1',
					features: [
						FactoryLogic.feature.create({
							id: 'domain-fate-1-1',
							name: 'Oracular Visions',
							description: 'Your deity rewards you with hazy visions of things to come. Each time you earn 1 or more Victories, you earn an equal number of fate points. When you or a creature within 10 squares of you makes a test, you can spend 1 fate point to tap into a vision of the outcome, granting that creature an edge on the test. You lose any remaining fate points when you finish a respite.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-fate-1-2',
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
						id: 'domain-fate-2',
						name: 'Blessing of Fate and Destiny',
						description: 'Your enemies suffer their fate; your allies embrace their destiny!',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures, including self',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText(`
Choose one of the following effects, which lasts until the end of the encounter or until you are dying:

* Whenever a target makes a power roll, they can roll three dice and choose which two to use.
* Whenever a target makes a power roll, they must roll three dice and use the lowest two.`)
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
			trigger: 'The first time in an encounter that an ally within 10 squares of you gets a tier 3 result or an enemy within 10 squares of you gets a tier 1 result',
			value: '2'
		}
	],
	piety: `
* Prayer Effect: You call on the forces of fate to create a reliable future. Choose a creature within your line of effect. That creature automatically gets a tier 1 or tier 3 result (your choice) on their next power roll made before the end of the encounter.`
};
