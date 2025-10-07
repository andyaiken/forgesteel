import { AbilityKeyword } from '@/enums/ability-keyword';
import { FactoryLogic } from '@/logic/factory-logic';
import { PerkData } from '@/data/perk-data';
import { SkillList } from '@/enums/skill-list';
import { SubClass } from '@/models/subclass';

export const prowler: SubClass = {
	id: 'beastheart-sub-2',
	name: 'Prowler',
	description: 'You are an unseen ambusher that strikes from the shadows. Your prey is dead before they even know you’re there.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-sub-2-1-1',
					listOptions: [ SkillList.Intrigue ],
					selected: [ 'Hide' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'beastheart-sub-2-1-2',
					name: 'Wild Nature Benefit',
					description: 'The target is weakened until the start of your next turn.',
					tag: 'feral-strike'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-2-1-3',
						name: 'While No One’s Looking',
						description: 'While everyone’s eyes are drawn to your foe, you take the opportunity to blend into the scenery.',
						type: FactoryLogic.type.createTrigger('An enemy deals damage to a creature other than you.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You become invisible, use the Hide maneuver, and move up to a number of squares equal to your Intuition score, in any order. You remain invisible until the end of your next turn or you deal damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'The distance of your move is doubled, and it ignores difficult terrain.'
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
					id: 'beastheart-sub-2-2-1a',
					selected: [ PerkData.bornTracker ]
				}),
				FactoryLogic.feature.create({
					id: 'beastheart-sub-2-2-1b',
					name: 'Keen Smell',
					description: 'While a creature is adjacent to your companion, the creature can’t be concealed or hidden from your companion.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-2-2-2',
					name: 'Prowler Ability',
					options: [
						// TODO: Jump Scare
						// TODO: Close Combat
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
					id: 'beastheart-sub-2-5-1',
					name: 'I Hate Being the Center of Attention',
					description: 'You or your companion can use While No One’s Looking even when targeted by the triggering attack.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-2-6-1',
					name: 'Prowler Ability',
					options: [
						// TODO: Phantom Form
						// TODO: Raking Lunge
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
					id: 'beastheart-sub-2-8-1',
					name: 'Born to Run',
					description: 'Your and your companion’s speed increases by 2.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-2-9-1',
					name: 'Prowler Ability',
					options: [
						// TODO: Chaos Duel
						// TODO: Nightmare Apparition
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
