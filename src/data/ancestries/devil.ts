import { Ancestry } from '../../models/ancestry';
import { FeatureLogic } from '../../logic/feature-logic';

export const devil: Ancestry = {
	id: 'ancestry-devil',
	name: 'Devil',
	description: 'The native ancestry of the Seven Cities of Hell, devils are humanoids with red or blue skin expressed in a wide variety of hues, from bright crimson to deep purple. Each devil is born with some hellmark—horns, a tail, cloven hooves, a forked tongue, fanged incisors, or even wings.',
	features: [
		FeatureLogic.feature.create({
			id: 'devil-feature-1',
			name: 'Silver Tongue',
			description: 'Your innate magic allows you to twist how your words are perceived to get a better read on people and convince them to see things your way. You gain an interpersonal skill of your choice, and you have an edge when attempting to discover an NPC’s motivations and pitfalls during negotiations.'
		}),
		FeatureLogic.feature.createChoiceFeature({
			id: 'devil-feature-2',
			name: 'Devil Traits',
			options: [
				{
					feature: FeatureLogic.feature.create({
						id: 'devil-feature-2-1',
						name: 'Barbed Tail',
						description: 'Your pointy tail allows you to punctuate all your actions. Once per round, you can deal extra damage equal to your highest characteristic score on a melee strike.'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createSpeedFeature({
						id: 'devil-feature-2-2',
						name: 'Beast Legs',
						description: 'Your powerful legs improve your speed. Your speed becomes 6',
						speed: 6
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.create({
						id: 'devil-feature-2-3',
						name: 'Glowing Eyes',
						description: 'Your eyes are a solid, vibrant color that flares to show your excitement or rage. Whenever you take damage from a creature, you can use a triggered action to curse that creature for daring to do you harm. The creature takes 1d10 + your level psychic damage.'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.create({
						id: 'devil-feature-2-4',
						name: 'Hellsight',
						description: 'Your eyes let you see through the dark, fog, and other types of concealment. You don’t take a bane on attacks against concealed, unhidden creatures.'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.create({
						id: 'devil-feature-2-5',
						name: 'Impressive Horns',
						description: 'Your cherished horns are larger than your average devil and a hardened representation of your force of will, allowing you to succeed on a roll of 5 or higher with saving throws.'
					}),
					value: 2
				},
				{
					feature: FeatureLogic.feature.create({
						id: 'devil-feature-2-6',
						name: 'Prehensile Tail',
						description: 'Your prehensile tail allows you to challenge foes on all sides. You can’t be flanked.'
					}),
					value: 2
				},
				{
					feature: FeatureLogic.feature.create({
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
