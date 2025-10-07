import { FactoryLogic } from '@/logic/factory-logic';
import { SkillList } from '@/enums/skill-list';
import { SubClass } from '@/models/subclass';

export const punisher: SubClass = {
	id: 'beastheart-sub-3',
	name: 'Punisher',
	description: 'Using brute force, you overwhelm anyone unwise enough to earn your wrath.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-sub-1-1-1',
					listOptions: [ SkillList.Exploration ],
					selected: [ 'Endurance' ]
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
