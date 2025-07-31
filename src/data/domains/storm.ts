import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const storm: Domain = {
	id: 'domain-storm',
	name: 'Storm',
	description: 'The Storm domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-storm-1',
					features: [
						FactoryLogic.feature.create({
							id: 'domain-storm-1-1',
							name: 'Blessing of Fortunate Weather',
							description: `
When you finish a respite, you can decide the weather conditions within 100 squares of you. If you are in the same area as a creature using this or a similar feature, both features cancel each other where their areas overlap. Until you finish another respite, the weather conditions you establish follow you through any mundane outdoor locations.

Choose one of the following types of weather, each of which grants a benefit to you and your allies:

* **Clear**: You and each ally gain an edge on tests that use the Search or Navigate skills.
* **Foggy**: You and each ally gain an edge on tests that use the Hide skill.
* **Overcast**: You and each ally gain an edge on tests that use the Endurance skill.
* **Precipitation**: When the ground is muddy or snowy, you and each ally gain an edge on tests that use the Track skill.`
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-storm-1-2',
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
						id: 'domain-storm-2',
						name: 'Saint’s Tempest',
						description: 'A raging storm appears, striking your foes with lightning and throwing them around with wind.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '2 lightning damage; vertical slide 1',
									tier2: '5 lightning damage; vertical slide 2',
									tier3: '7 lightning damage; vertical slide 3'
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
			trigger: 'The first time in an encounter that an enemy within 10 squares of you is force moved',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'storm-default-1',
			name: 'Storm Prayer Effect',
			description: 'Each enemy in a 3-cube area within 10 squares of you takes lightning damage equal to twice your Intuition score.',
			tag: 'conduit-prayer'
		})
	]
};
