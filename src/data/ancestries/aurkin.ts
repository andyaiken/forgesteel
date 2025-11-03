import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';

export const aurkin: Ancestry = {
	id: 'ancestry-aurkin',
	name: 'Aurkin',
	description:
		'Lynx, bobcat, and city-rooftop Aurians. Small, quiet, and annoying to guard captains. Built for balance, hiding, and getting into places they should not be.',
	features: [
		FactoryLogic.feature.createMultiple({
			id: 'aurkin-feature-1',
			name: 'Aurian Lineage',
			features: [
				FactoryLogic.feature.create({
					id: 'aurkin-feature-1a',
					name: 'Natural Claws – Predator’s Rend',
					description:
						'Triggered, 1/round. When you hit with a melee strike, you can use a triggered action to deal extra damage equal to your highest characteristic to that target.'
				}),
				FactoryLogic.feature.create({
					id: 'aurkin-feature-1b',
					name: 'Small Stature',
					description:
						'You are size 1S. You gain +1 disengage and may move through the spaces of creatures larger than you (you can’t end your movement in an occupied space).'
				})
			]
		}),
		FactoryLogic.feature.createChoice({
			id: 'aurkin-feature-2',
			name: 'Aurkin Traits',
			options: [
				// shared 1-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-1',
						name: 'Scent Sense',
						description:
							'You can track and identify by scent. You can pick up lingering trails and tell apart known individuals by smell (Director adjudicates specifics).'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-2',
						name: 'Night-Eyes',
						description:
							'You ignore penalties from dim light. In darkness, you gain an edge on tests to detect adjacent creatures.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-3',
						name: 'Tail Balance',
						description: '+1 disengage.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-4',
						name: 'Cat’s Grace',
						description: '+1 speed.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-5',
						name: 'Sheath & Strike',
						description:
							'The first melee strike you make each fight gains +2 damage if you moved 2+ squares earlier that turn.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-6',
						name: 'Sun-Doze',
						description: '+3 Stamina per echelon.'
					}),
					value: 1
				},

				// Aurkin 1-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-7',
						name: 'Whisker Sense',
						description:
							'Ignore invisible/obscured penalties from adjacent creatures; edge on tests to detect adjacent hidden foes.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-8',
						name: 'Snow-Pad',
						description: 'Ignore difficult terrain from snow/ice; +1 speed while on it.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-9',
						name: 'Tightrope Tail',
						description: '+1 disengage.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-10',
						name: 'Spring-Spine',
						description: 'Increase your jump distance by 2 squares before tests are required.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-11',
						name: 'Skulker',
						description:
							'After you miss with a strike, you may hide as a free flourish if you have light or greater cover.'
					}),
					value: 1
				},

				// shared 2-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-12',
						name: 'Pounce',
						description:
							'Maneuver. Stride up to your speed toward a creature you can see, then make a melee strike. On a tier 2+ outcome, push the target 1.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-13',
						name: 'Nine Lives',
						description:
							'Triggered, 1/scene. When damage would reduce you to 0 Stamina, reduce that damage by your level + 5.'
					}),
					value: 2
				},

				// Aurkin 2-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-14',
						name: 'Perfect Landing',
						description:
							'Triggered, 1/round. When you fall or are pushed/proned, you negate fall damage and stand without spending a maneuver.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-15',
						name: 'Blinding Scramble',
						description:
							'Action; Area 1 line within 1. t1: 2 damage; t2: 4 damage and the first target suffers a bane; t3: 6 damage and two targets suffer a bane.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurkin-feature-2-16',
						name: 'Ghost-Step',
						description:
							'Maneuver. Teleport 2 to a square you can see that provides light or greater cover from any one enemy.'
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 4
};
