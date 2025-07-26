import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const trickery: Domain = {
	id: 'domain-trickery',
	name: 'Trickery',
	description: 'The Trickery domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-trickery-1',
					features: [
						FactoryLogic.feature.create({
							id: 'domain-trickery-1-1',
							name: 'Inspired Deception',
							description: 'The gods favor your thievery with magic. Whenever you make a test that uses a skill you have from the intrigue skill group, you can use Intuition on the test instead of another characteristic.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-trickery-1-2',
							listOptions: [ SkillList.Intrigue ]
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
						id: 'domain-trickery-2',
						name: 'Divine Comedy',
						description: 'You and your allies swap places to confound your foes.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each ally in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target can choose another creature within 5 squares of them, then swap places with that creature. The creature they choose must be able to fit into the space they leave and vice versa.')
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
			trigger: 'The first time in an encounter that you or a creature within 10 squares of you takes the Aid Another or Hide maneuver',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'trickery-default-1',
			name: 'Trickery Prayer Effect',
			description: 'Choose a creature within 10 squares of you. You can slide that creature up to a number of squares equal to 5 + your conduit level.',
			tag: 'conduit-prayer'
		})
	]
};
