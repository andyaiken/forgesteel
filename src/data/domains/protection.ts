import { AbilityKeyword } from '../../enums/ability-keyword';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const protection: Domain = {
	id: 'domain-protection',
	name: 'Protection',
	description: 'The Protection domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-protection-1',
					features: [
						FactoryLogic.feature.create({
							id: 'domain-protection-1-1',
							name: 'Protective Circle',
							description: 'You can spend 10 minutes working while uninterrupted to create a protective circle on the ground large enough to hold a size 1 creature. The circle lasts for 24 hours or until you dismiss it (no action required). Only creatures you designate at the time of drawing the circle can enter and exit the area. While in the protective area, a creature can’t be targeted by strikes.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-protection-1-2',
							listOptions: [ SkillList.Exploration ]
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
						id: 'domain-protection-2',
						name: 'Sacred Bond',
						description: 'You forge a divine connection between two creatures.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self and one ally',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText(`
Until the end of the encounter, whenever one target takes damage, the other target can use a free triggered action to take the damage instead. The original target suffers any effects associated with the damage.

Additionally, whenever one target spends a Recovery, the other target can use a free triggered action to spend a Recovery.`)
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
			trigger: 'The first time in an encounter that you or an ally within 10 squares of you gains temporary Stamina or uses a triggered action to reduce incoming damage or give an enemy a bane on a power roll',
			value: '2'
		}
	],
	piety: `
* Prayer Effect: One ally within 10 squares of you gains temporary Stamina equal to three times your Intuition score.`
};
