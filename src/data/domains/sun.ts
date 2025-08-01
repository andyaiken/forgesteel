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
							description: 'Each time you finish a respite, you can choose yourself or an ally who is also ending a respite to gain the benefit of a divine ritual. As you perform the ritual, you place a ray of morning light into the chosen character’s soul, granting them a +1 bonus on saving throws. This benefit lasts until you finish another respite.'
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
		}
	],
	resourceGains: [
		{
			resource: 'Piety',
			trigger: 'The first time in an encounter that an enemy within 10 squares of you takes fire or holy damage',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'sun-default-1',
			name: 'Sun Prayer Effect',
			description: 'One enemy of your choice within 10 squares of you takes fire damage equal to three times your Intuition score.',
			tag: 'conduit-prayer'
		})
	]
};
