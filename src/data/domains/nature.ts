import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const nature: Domain = {
	id: 'domain-nature',
	name: 'Nature',
	description: 'The Nature domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-nature-1',
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'domain-nature-1-1',
								name: 'Faithful Friend',
								description: 'An animal spirit is drawn to you, sharing their senses and serving you faithfully.',
								type: FactoryLogic.type.createMain(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								sections: [
									FactoryLogic.createAbilitySectionText('You conjure a spirit that takes the form of any animal you have seen. The incorporeal animal can’t physically interact with the world, but they have a speed of 5 and can fly. While you are within 10 squares of the spirit, you can sense everything an animal of their type would sense, in addition to sensing your own surroundings. You can dismiss the spirit at any time (no action required). If the spirit takes any damage, it is dismissed and you take 1d10 psychic damage, which can’t be reduced in any way.')
								]
							})
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-nature-1-2',
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
						id: 'domain-nature-2',
						name: 'Nature Judges Thee',
						description: 'Mystical thorned vines appear at your bidding and bind your foes.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '2 damage; A < [weak], restrained (save ends)',
									tier2: '3 damage; A < [average], restrained (save ends)',
									tier3: '7 damage; A < [strong], restrained (save ends)'
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
			trigger: 'The first time in an encounter that you or a creature within 10 squares of you takes acid, cold, fire, lightning, poison, or sonic damage',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'nature-default-1',
			name: 'Nature Prayer Effect',
			description: 'Vines whip up from the floor or ground within 10 squares of you, wrapping around a number of creatures of your choice equal to your Intuition score. You can slide each creature up to a number of squares equal to your Intuition score. The vines then fade away.',
			tag: 'conduit-prayer'
		})
	]
};
