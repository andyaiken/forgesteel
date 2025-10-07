import { AbilityKeyword } from '@/enums/ability-keyword';
import { FactoryLogic } from '@/logic/factory-logic';
import { PerkData } from '@/data/perk-data';
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
					id: 'beastheart-sub-3-1-1',
					listOptions: [ SkillList.Exploration ],
					selected: [ 'Endurance' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'beastheart-sub-3-1-2',
					name: 'Wild Nature Benefit',
					description: 'Your companion slides the target up to a number of squares equal to their Might score.',
					tag: 'feral-strike'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-3-1-3',
						name: 'Swat Away',
						description: 'You bat away an attacker.',
						type: FactoryLogic.type.createTrigger('An enemy adjacent to you deals damage to a creature.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('You deal damage equal to your Might score to the target and push them up to a number of squares equal to your Might score + 1. If this movement causes the enemy to move farther from the creature they damaged, the triggering damage is halved.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You can push the enemy twice the distance.'
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
					id: 'beastheart-sub-3-2-1a',
					selected: [ PerkData.youCanPetThem ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-3-2-1b',
						name: 'No, You Take Him',
						description: 'When someone is pushed into you, you reach out to steady an ally or send a foe careening off in another direction.',
						type: FactoryLogic.type.createTrigger('A creature being force moved by another creature enters a space adjacent to you.', { free: true }),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You end the forced movement. You can then push the creature up to a number of squares equal to your Might score + 1. The creature takes 1 damage for each square they are moved in this way.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You can each use this free triggered action on the same turn.'
							})
						]
					})
				}),
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-3-2-2',
					name: 'Punisher Ability',
					options: [
						// TODO: Foe Bowling
						// TODO: Psych Up
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
					id: 'beastheart-sub-3-5-1',
					name: 'Self Sacrifice',
					description: 'When you or your companion uses Swat Away and halves an attack’s damage, they can take the remaining damage instead of the original target. The damage is transferred before immunity and weakness is applied.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-3-6-1',
					name: 'Punisher Ability',
					options: [
						// TODO: Howling Advance
						// TODO: Thundering Strike
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
					id: 'beastheart-sub-3-8-1',
					name: 'Overhand Throw',
					description: 'When you or your companion uses a maneuver that deals damage, the damage increases by 2. When you or your companion pushes a creature, the push is a vertical push.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-3-9-1',
					name: 'Punisher Ability',
					options: [
						// TODO: Battle Frenzy
						// TODO: Send 'Em Flying
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
