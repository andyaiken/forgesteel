import { AbilityKeyword } from '@/enums/ability-keyword';
import { FactoryLogic } from '@/logic/factory-logic';
import { PerkData } from '@/data/perk-data';
import { SkillList } from '@/enums/skill-list';
import { SubClass } from '@/models/subclass';

export const guardian: SubClass = {
	id: 'beastheart-sub-1',
	name: 'Guardian',
	description: 'You are the fearless defender of your pack: anyone who harms them must go through you.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-sub-1-1-1',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Read Person' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'beastheart-sub-1-1-2',
					name: 'Wild Nature Benefit',
					description: 'The target is taunted by your companion until the start of your next turn.',
					tag: 'feral-strike'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-1-1-3',
						name: 'Don’t Worry, I’m Here',
						description: 'You siphon away the pain and endure it yourself.',
						type: FactoryLogic.type.createTrigger('An adjacent ally takes damage.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The triggering damage is halved for the ally.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You spend one of your Recoveries; the ally regains the Stamina instead of you.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-sub-1-2-1a',
					selected: [ PerkData.peopleSense ]
				}),
				FactoryLogic.feature.create({
					id: 'beastheart-sub-1-2-1b',
					name: 'Watchdog',
					description: 'You and your companion are never surprised.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-1-2-2',
					name: 'Guardian Ability',
					options: [
						// TODO: Belly of the Beast
						// TODO: Fetch!
					]
				})
			]
		},
		{
			level: 3,
			features: []
		},
		{
			level: 4,
			features: []
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'beastheart-sub-1-5-1',
					name: 'Calming Exercises',
					description: 'When you use Don’t Worry, I’m Here to spend a Recovery, you and the target both gain the benefit of the Recovery.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-1-6-1',
					name: 'Guardian Ability',
					options: [
						// TODO: Sic 'Em!
						// TODO: Staredown
					]
				})
			]
		},
		{
			level: 7,
			features: []
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'beastheart-sub-1-8-1',
					name: 'Zone of Control',
					description: 'Your and your companion’s free strikes deal extra damage equal to your Intuition score. You or your companion can make an opportunity attack whenever an adjacent enemy moves to a space that isn’t adjacent, even if the enemy shifted, teleported, was force moved, or used some other feature that doesn’t provoke opportunity attacks.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-1-9-1',
					name: 'Guardian Ability',
					options: [
						// TODO: Banshee Howl
						// TODO: Enemies Till Death
					]
				})
			]
		},
		{
			level: 10,
			features: []
		}
	],
	selected: false
};
