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
									FactoryLogic.createAbilitySectionText('You conjure a spirit that takes the form of any animal you have seen. The incorporeal animal has speed 5 and can fly, but can’t physically interact with the world. While you are within 10 squares of the spirit, you automatically sense everything that type of animal would sense, in addition to sensing your own surroundings. You can dismiss the spirit at any time (no action required). If the spirit takes any damage, they are dismissed and you take 1d10 psychic damage that can’t be reduced in any way.')
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
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-nature-4',
					name: 'Wode Road',
					description: 'As a main action, you touch a living tree and make it part of a divine transportation network. You can maintain a number of trees in your network equal to your Intuition score. Whenever you touch any tree in your network, you can use a main action to teleport yourself and any willing creatures within 10 squares of you to a tree in your network on the same world. If a tree in your network dies, it is no longer part of the network. You can remove a tree from your network no matter your distance from it, including across different worlds (no action required).'
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
						id: 'domain-nature-6',
						name: 'Spirit Stampede',
						description: 'Animal spirits run through the battlefield, trampling your foes.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 2, within: 5 }) ],
						target: 'Each enemy in the area',
						cost: 9,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '5 damage; M < [weak], prone and can’t stand (save ends)',
									tier2: '8 damage; M < [average], prone and can’t stand (save ends)',
									tier3: '11 damage; M < [strong], prone and can’t stand (save ends)'
								})
							)
						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-nature-7',
					name: 'Nature’s Bounty',
					description: `
When you finish a respite, you can prepare a magic meal using local flora for any companions who rested with you. Choose two of the following benefits for creatures who consume the meal:

* Each creature gains immunity to acid, cold, corruption, fire, lightning, poison, or sonic damage equal to your level. You can choose this benefit twice, choosing a different damage immunity each time.
* Each creature gains 20 temporary Stamina.
* Each creature gains a +1 bonus to speed.
* Each creature gains a +1 bonus to saving throws.
* Each creature gains an edge on tests made to influence other creatures.

Each benefit lasts until the creature who gains it finishes another respite.`
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
						id: 'domain-nature-9',
						name: 'Thorn Cage',
						description: 'Vines burst forth from the ground and bind your foe, slowly closing around them.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						cost: 11,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '10 + I damage; A < [weak], restrained (save ends)',
									tier2: '15 + I damage; A < [average], restrained (save ends)',
									tier3: '21 + I damage; A < [strong], restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('While restrained this way, the target takes 10 damage at the start of each of your turns.')

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
			trigger: 'The first time in an encounter that you or a creature within 10 squares takes acid, cold, fire, lightning, poison, or sonic damage',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'nature-default-1',
			name: 'Nature Prayer Effect',
			description: 'Vines whip up from the floor or ground within 10 squares, wrapping around a number of creatures of your choice equal to your Intuition score. You can slide each creature up to a number of squares equal to your Intuition score. The vines then fade away.',
			tag: 'conduit-prayer'
		})
	]
};
