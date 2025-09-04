import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const sun: Domain = {
	id: 'domain-sun',
	name: 'Sun',
	description: 'The Sun domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-sun-1',
					features: [
						FactoryLogic.feature.create({
							id: 'domain-sun-1-1',
							name: 'Inner Light',
							description: 'Each time you finish a respite, you can choose yourself or one ally who is also finishing a respite to gain the benefit of a divine ritual. You place a ray of morning light into the chosen character’s soul, granting them a +1 bonus to saving throws that lasts until you finish another respite.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-sun-1-2',
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
						id: 'domain-sun-2',
						name: 'Morning Light',
						description: 'Light shines at your command, burning your foes and blessing your allies.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '4 fire damage',
									tier2: '6 fire damage',
									tier3: '10 fire damage'
								})
							),
							FactoryLogic.createAbilitySectionText('Each ally in the area deals fire damage equal to your Intuition score with their next strike made before the end of their next turn.')
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
					id: 'domain-sun-4',
					name: 'Light of Revelation',
					description: 'As a maneuver, you make your body shine brightly, illuminating your space and each square within 5 squares. This light shines through any darkness. Hidden creatures in the area are automatically revealed, and creatures in the light, including you, can’t hide. While this feature is active, you gain an edge on tests made to notice hidden objects and entrances and to detect supernatural illusions.'
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
						id: 'domain-sun-6',
						name: 'Blessing of the Midday Sun',
						description: 'Your body emits a heat that bakes your enemies and inspires your allies.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 4 }) ],
						target: 'Self and each creature in the area',
						cost: 9,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, each enemy in the area takes a bane on power rolls, and you and each ally in the area gain 1 surge at the end of each of your turns.')
						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-sun-7',
					name: 'Light of the Burning Sun',
					description: 'Sun infuses your body. Whenever you use an ability to deal rolled damage to another creature, that ability deals an extra 5 fire damage, or an extra 15 fire damage if the creature is undead. Additionally, you have fire immunity equal to your level, which is added to any other fire immunity you have.'
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
						id: 'domain-sun-9',
						name: 'Solar Flare',
						description: 'You call down a sphere of fire that burns your foes to ash.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
						target: 'Each enemy in the area',
						cost: 11,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '9 fire damage',
									tier2: '14 fire damage',
									tier3: '19 fire damage'
								})
							)
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
			trigger: 'The first time in an encounter that an enemy within 10 squares takes fire or holy damage',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'sun-default-1',
			name: 'Sun Prayer Effect',
			description: 'One enemy within 10 squares takes fire damage equal to three times your Intuition score.',
			tag: 'conduit-prayer'
		})
	]
};
