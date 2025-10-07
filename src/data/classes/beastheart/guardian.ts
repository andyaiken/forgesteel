import { FactoryLogic } from '@/logic/factory-logic';
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
