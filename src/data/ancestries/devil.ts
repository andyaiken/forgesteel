import { Ancestry } from '../../models/ancestry';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';

export const devil: Ancestry = {
	id: 'ancestry-devil',
	name: 'Devil',
	description: 'The native ancestry of the Seven Cities of Hell, devils are humanoids with red or blue skin expressed in a wide variety of hues, from bright crimson to deep purple. Each devil is born with some hellmark—horns, a tail, cloven hooves, a forked tongue, fanged incisors, or even wings.',
	features: [
		FeatureLogic.feature.createSizeFeature({
			id: 'devil-size',
			sizeValue: 1,
			sizeMod: 'M'
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'devil-speed',
			field: FeatureField.Speed,
			value: 5
		}),
		FeatureLogic.feature.createChoiceFeature({
			id: 'devil-feature-1',
			name: 'Fiendish Features',
			options: [
				{
					feature: FeatureLogic.feature.createFeature({
						id: 'devil-feature-1a',
						name: 'Barbed Tail',
						description: 'Your pointy tail allows you to punctuate all your actions. Once per round, you can deal 1 extra damage on a melee attack or free strike.'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createBonusFeature({
						id: 'devil-feature-1b',
						name: 'Beast Legs',
						description: 'Your powerful legs improve your speed by 1.',
						field: FeatureField.Speed,
						value: 1
					}),
					value: 2
				},
				{
					feature: FeatureLogic.feature.createDamageModifierFeature({
						id: 'devil-feature-1c',
						name: 'Exposed Skeleton',
						description: 'Your bones are visible and hardened above your skin, granting you Weapon immunity 2.',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Weapon',
								value: 2,
								valuePerLevel: 0,
								valuePerEchelon: 0
							}
						]
					}),
					value: 2
				},
				{
					feature: FeatureLogic.feature.createFeature({
						id: 'devil-feature-1d',
						name: 'Glowing Eyes',
						description: 'Your eyes are a solid, vibrant color that flares to show your excitement or rage. Whenever you take damage from a creature, you can use a triggered action to curse that creature for daring to do you harm. The creature takes 1d10 psychic damage.'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createFeature({
						id: 'devil-feature-1e',
						name: 'Hellsight',
						description: 'Your eyes let you see through the dark, fog, and other types of concealment. You don’t take a bane on attacks against concealed, unhidden creatures.'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createFeature({
						id: 'devil-feature-1f',
						name: 'Horns',
						description: 'Your cherished horns are a hardened representation of your force of will, granting you an edge on Presence resistance rolls.'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createFeature({
						id: 'devil-feature-1g',
						name: 'Prehensile Tail',
						description: 'Your prehensile tail allows you to challenge foes on all sides. You can’t be flanked.'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createFeature({
						id: 'devil-feature-1h',
						name: 'Wings',
						description: 'You possess wings powerful enough to take you airborne. As a maneuver, you can switch between walking and flying when you are touching the ground, or vice versa when you are within 1 square of the ground. While flying, your stability drops to 0 and you have damage weakness 5. While using your wings to fly, you can stay aloft for a number of rounds equal to your Might (minimum of 1 round) before you fall prone.'
					}),
					value: 2
				}
			],
			count: 3
		}),
		FeatureLogic.feature.createFeature({
			id: 'devil-feature-2',
			name: 'Silver Tongue',
			description: 'You can twist how your words are perceived to get a better read on people. You gain an edge when attempting to discover an NPC’s motivations and pitfalls during negotiations.'
		})
	]
};
