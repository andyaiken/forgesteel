import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';

export const caprini: Ancestry = {
	id: 'ancestry-caprini',
	name: 'Caprini',
	description:
    'Small, cliff-dancing Hornvar—cornice runners and rope-bridge tricksters who turn walls into roads.',
	features: [
		// Always-on signatures (0 points)
		FactoryLogic.feature.createMultiple({
			id: 'caprini-signature',
			name: 'Caprini Signatures',
			features: [
				FactoryLogic.feature.create({
					id: 'caprini-signature-1',
					name: 'Hoofed Smash — Kick of the Hindleg',
					description:
            'Triggered; 1/round. When you hit a creature with a melee strike, deal extra damage equal to your highest characteristic to that target.'
				}),
				FactoryLogic.feature.create({
					id: 'caprini-signature-2',
					name: 'Small Stature',
					description:
            'You are size 1S. You gain +1 disengage and may move through squares of larger creatures (you cannot end your movement in an occupied square).'
				})
			]
		}),

		// Purchased options
		FactoryLogic.feature.createChoice({
			id: 'caprini-options',
			name: 'Caprini Options',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'caprini-option-1',
						name: 'Rock-Climber',
						description:
              'Climb at full speed; edge on tests to keep footing on cliffs and ruins.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'caprini-option-2',
						name: 'Tight Turn',
						description: '+1 disengage.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'caprini-option-3',
						name: 'Springer',
						description:
              'Increase your jump distance by 2 squares before tests are required; you can long-jump after moving only 1 square this turn.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'caprini-option-4',
						name: 'Skulker of Ledges',
						description:
              'After you miss with a strike, you may hide as a free flourish if you have light or greater cover.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'caprini-option-5',
						name: 'Perfect Landing',
						description:
              'Triggered; 1/round. When you fall or are pushed/proned, negate fall damage and stand without spending a maneuver.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'caprini-option-6',
						name: 'Wall-Run',
						description:
              'Maneuver. Move up to your speed along vertical surfaces or narrow ledges without tests this turn, starting and ending on a surface that can support you.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'caprini-option-7',
						name: 'Ram’s Head',
						description:
              'You succeed on saving throws on a 5+. Your first shove or Grab each scene gains an edge.'
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 4
};
