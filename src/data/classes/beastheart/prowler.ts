import { FactoryLogic } from '@/logic/factory-logic';
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
					id: 'beastheart-sub-1-1-1',
					listOptions: [ SkillList.Intrigue ],
					selected: [ 'Hide' ]
				})
				// TODO: Triggered Action
			]
		},
		{
			level: 2,
			features: [
				// TODO: Feature
				// TODO: Ability
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
				// TODO: Feature
			]
		},
		{
			level: 6,
			features: [
				// TODO: Ability
			]
		},
		{
			level: 7,
			features: []
		},
		{
			level: 8,
			features: [
				// TODO: Feature
			]
		},
		{
			level: 9,
			features: [
				// TODO: Ability
			]
		},
		{
			level: 10,
			features: []
		}
	],
	selected: false
};
