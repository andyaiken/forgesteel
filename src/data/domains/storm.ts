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
Each time you finish a respite, you can decide the weather conditions within 100 squares. Until you finish another respite, the weather conditions you establish follow you through any mundane outdoor locations.

Choose one of the following types of weather, each of which grants a benefit to you and your allies:

* **Clear**: You and your allies gain an edge on tests that use the Search or Navigate skills.
* **Foggy**: You and your allies gain an edge on tests that use the Hide skill.
* **Overcast**: You and your allies gain an edge on tests that use the Endurance skill.
* **Precipitation**: When the ground is muddy or snowy, you and your allies gain an edge on tests that use the Track skill.

If you are in the same area as a creature using this or a similar feature who has chosen a different weather effect, the features negate each other where their areas overlap.`
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
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-storm-4',
					name: 'Windwalk',
					description: 'While you have 5 or more Victories, you can fly. If you can already fly, you have a +2 bonus to speed while flying instead.'
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
						id: 'domain-storm-6',
						name: 'Lightning Lord',
						description: 'Lightning bursts forth from your body in several directions.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 1, within: 1 }) ],
						target: 'Each enemy in the area',
						cost: 9,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '6 lightning damage; push 1',
									tier2: '9 lightning damage; push 2',
									tier3: '13 lightning damage; push 3'
								})
							),
							FactoryLogic.createAbilitySectionText('The targets are force moved one at a time, starting with the target nearest to you, and can be pushed into other targets in the same line.')
						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-storm-7',
					name: 'Thunderstruck',
					description: 'Lightning and thunder infuse your body. Whenever you use an ability to deal lightning or sonic damage to another creature, you gain 1 surge. Additionally, if you use an ability that force moves a creature, the forced movement distance gains a bonus equal to your Intuition score.'
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
						id: 'domain-storm-9',
						name: 'Godstorm',
						description: 'You summon a divine storm that remains under your control.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 5 }) ],
						target: 'Each enemy in the area',
						cost: 11,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '2 lightning damage; 2 sonic damage',
									tier2: '3 lightning damage; 3 sonic damage',
									tier3: '5 lightning damage; 5 sonic damage'
								})
							),
							FactoryLogic.createAbilitySectionText('A raging storm fills the area until the end of the encounter or until you are dying. At the start of each of your turns, you can move the storm up to 5 squares (no action required). On subsequent turns while the storm is active, you can use a maneuver to make its power roll.')
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
			trigger: 'The first time in an encounter that an enemy within 10 squares is force moved',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'storm-default-1',
			name: 'Storm Prayer Effect',
			description: 'Each enemy in a 3-cube within 10 squares takes lightning damage equal to twice your Intuition score.',
			tag: 'conduit-prayer'
		})
	]
};
