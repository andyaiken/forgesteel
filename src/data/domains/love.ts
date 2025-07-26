import { AbilityKeyword } from '../../enums/ability-keyword';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const love: Domain = {
	id: 'domain-love',
	name: 'Love',
	description: 'The Love domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-love-1',
					features: [
						FactoryLogic.feature.create({
							id: 'domain-love-1-1',
							name: 'Blessing of Compassion',
							description: `
You exude a magic aura that can soothe those willing to socially engage with you. You gain an edge on any test made to assist another creature with a test.
Additionally, when you are present at the start of a negotiation, one NPC of your choice has their patience increased by 1 (to a maximum of 5), and the first test made to influence them gains an edge.`
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-love-1-2',
							listOptions: [ SkillList.Interpersonal ]
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
						id: 'domain-love-2',
						name: 'Our Hearts, Your Strength',
						description: 'An ally gains strength from their friends.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self and one ally',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter or the target is dying, whenever the target starts their turn, they gain a bonus to speed and damage equal to the number of allies within 10 squares of them. This bonus lasts until the start of their next turn.')
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
			trigger: 'The first time in an encounter that you or an ally within 10 squares of you uses the Aid Another maneuver or an ability that targets an ally',
			value: '2'
		}
	],
	piety: `
* Prayer Effect: Each ally within 10 squares of you gains temporary Stamina equal to 2 × your Intuition score.`
};
