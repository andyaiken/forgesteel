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
						name: 'Our Hearts Your Strength',
						description: 'An ally gains strength from their friends.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self and one ally',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter or until the target is dying, at the start of each of the target’s turns, they gain a bonus to speed and a bonus to rolled damage equal to the number of allies within 10 squares of them. This bonus lasts until the start of their next turn.')
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
					id: 'domain-love-4',
					name: 'Invocation of the Heart',
					description: 'As a main action, you forge a bond of love and friendship with a willing creature you touch. While this bond is active, you can telepathically speak with the creature over any distance, including across different worlds. Additionally, while this bond is active, you can attempt to assist the creature with any test they make regardless of their proximity to you. You can maintain only one bond at a time, and you can end a bond at any time (no action required).'
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
						id: 'domain-love-6',
						name: 'Lauded by God',
						description: 'You beseech the gods to give your allies what they need to win the day, and the gods answer.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two allies',
						cost: 9,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target gains 3 of their Heroic Resource.')
						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-love-7-1',
					name: 'Covenant of the Heart',
					description: 'You can maintain bonds with up to three willing creatures using your Invocation of the Heart feature.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'domain-love-7-2',
						name: 'Guided to Your Side',
						description: 'You concentrate on a friend and teleport to them.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self and each ally',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target is teleported to unoccupied spaces within 5 squares of a willing creature who you are bonded to with your Invocation of the Heart feature. You don’t need line of effect to the bonded creature but you must be on the same world.')
						]
					})
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
						id: 'domain-love-9',
						name: 'Alacrity of the Heart',
						description: 'You speak inspiring words to a friend and spur them to incredible feats.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'one allies',
						cost: 11,
						sections: [
							FactoryLogic.createAbilitySectionText('The target has an additional main action they can use on their next turn, and gains 3 of their Heroic Resource.')
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
			trigger: 'The first time in an encounter that you or any ally within 10 squares uses the Aid Attack maneuver or an ability that targets an ally',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'love-default-1',
			name: 'Love Prayer Effect',
			description: 'Each ally within 10 squares of you gains temporary Stamina equal to 2 times your Intuition score.',
			tag: 'conduit-prayer'
		})
	]
};
