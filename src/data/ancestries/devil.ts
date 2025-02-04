import { Ancestry } from '../../models/ancestry';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const devil: Ancestry = {
	id: 'ancestry-devil',
	name: 'Devil',
	description: 'The native ancestry of the Seven Cities of Hell, devils are humanoids with red or blue skin expressed in a wide variety of hues, from bright crimson to deep purple. Each devil is born with some hellmark - horns, a tail, cloven hooves, a forked tongue, fanged incisors, or even wings.',
	features: [
		FactoryLogic.feature.createMultiple({
			id: 'devil-feature-1',
			name: 'Silver Tongue',
			features: [
				FactoryLogic.feature.create({
					id: 'devil-feature-1a',
					name: 'Silver Tongue',
					description: 'Your innate magic allows you to twist how your words are perceived to get a better read on people and convince them to see things your way. You have an edge when attempting to discover an NPC’s motivations and pitfalls during negotiations.'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'devil-feature-1b',
					listOptions: [ SkillList.Interpersonal ]
				})
			]
		}),
		FactoryLogic.feature.createChoice({
			id: 'devil-feature-2',
			name: 'Devil Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'devil-feature-2-1',
						name: 'Barbed Tail',
						description: 'Your pointy tail allows you to punctuate all your actions. Once per round, you can deal extra damage equal to your highest characteristic score on a melee strike.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSpeed({
						id: 'devil-feature-2-2',
						name: 'Beast Legs',
						description: 'Your powerful legs improve your speed. Your Speed is 6.',
						speed: 6
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'devil-feature-2-3',
							name: 'Glowing Eyes',
							description: 'Your eyes are a solid, vibrant color that flares to show your excitement or rage.',
							type: FactoryLogic.type.createTrigger('You take damage from a creature'),
							keywords: [],
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							effect: 'You curse your attacker for daring to do you harm. The creature takes 1d10 + your level psychic damage.'
						})
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'devil-feature-2-4',
						name: 'Hellsight',
						description: 'Your eyes let you see through the dark, fog, and other types of concealment. You don’t take a bane on attacks against concealed, unhidden creatures.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'devil-feature-2-5',
						name: 'Impressive Horns',
						description: 'Your cherished horns are larger than your average devil and a hardened representation of your force of will, allowing you to succeed on a roll of 5 or higher with saving throws.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'devil-feature-2-6',
						name: 'Prehensile Tail',
						description: 'Your prehensile tail allows you to challenge foes on all sides. You can’t be flanked.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'devil-feature-2-7',
						name: 'Wings',
						description: 'You possess wings powerful enough to take you airborne. While using your wings to fly, you can stay aloft for a number of rounds equal to your Might (minimum of 1 round) before you fall prone. While using your wings to fly at 1st, 2nd, and 3rd level, you have damage weakness 5.'
					}),
					value: 2
				}
			],
			count: 3
		})
	]
};
