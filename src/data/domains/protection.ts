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
							description: 'You can spend 10 uninterrupted minutes to create a protective circle on the ground large enough to hold one size 1 creature. The circle lasts for 24 hours, until you create another, or until you dismiss it (no action required). Only creatures you designate at the time of drawing the circle can enter and exit the area. While in the protective circle, a creature can’t be targeted by strikes.'
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
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-protection-4',
					name: 'Impervious Touch',
					description: `
As a maneuver, you can touch an object with a size equal to your Intuition score or smaller and place a protective spell on it. The object has immunity all to untyped damage. You can maintain this spell on a number of objects equal to your Intuition score, and you can end the spell on any object at any time (no action required).

Additionally, you can place this spell on a building or vehicle (or a similar structure with the Director’s approval) that is of a size larger than your Intuition score. You can place the spell on only one such target at a time, and you can maintain the spell on a larger target and a number of objects equal to your Intuition score simultaneously.`
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
						id: 'domain-protection-6',
						name: 'Cuirass of the Gods',
						description: 'Your allies are covered in spiritual armor.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						cost: 9,
						sections: [
							FactoryLogic.createAbilitySectionText('You can target yourself instead of one creature with this ability. Each target has damage immunity 5 until the start of your next turn.')
						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-protection-7',
					name: 'Blessing of Iron',
					description: 'The gods send divine favor to you and your allies. While you are not dying, enemies take a bane on strikes against you or any ally within 3 squares of you.'
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
						id: 'domain-protection-9',
						name: 'Blessing of the Fortress',
						description: 'A magic circle extends out from you, barring foes from getting close.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 11,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, no target can approach within 5 squares of you by moving or by being force moved by any enemy. Targets can be force moved closer to you by you or your allies, or can move closer because of your movement.')
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
			trigger: 'The first time in an encounter that you or any ally within 10 squares gains temporary Stamina, or uses a triggered action to reduce incoming damage or impose a bane or double bane on an enemy’s power roll.',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'protection-default-1',
			name: 'Protection Prayer Effect',
			description: 'One ally within 10 squares gains temporary Stamina equal to four times your Intuition score.',
			tag: 'conduit-prayer'
		})
	]
};
