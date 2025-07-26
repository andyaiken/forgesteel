import { AbilityKeyword } from '../../enums/ability-keyword';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const war: Domain = {
	id: 'domain-war',
	name: 'War',
	description: 'The War domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-war-1',
					features: [
						FactoryLogic.feature.create({
							id: 'domain-war-1-1',
							name: 'Sanctified Weapon',
							description: 'As a respite activity, you can bless a weapon. Any creature who wields the weapon gains a +1 rolled damage bonus with abilities that use the weapon. This benefit lasts until you finish another respite.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-war-1-2',
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
						id: 'domain-war-2',
						name: 'Blessing of Insight',
						description: 'The gods grant insight revealing where best to strike your enemies.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self and each ally in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, each target gains a surge at the end of each of your turns.')
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
			trigger: 'The first time in an encounter that you or a creature within 10 squares of deals damage in an amount equal to or greater than 10 + your level',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'war-default-1',
			name: 'War Prayer Effect',
			description: 'Three allies of your choice within 10 squares of you, including yourself, gain two surges.',
			tag: 'conduit-prayer'
		})
	]
};
