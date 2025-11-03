import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';

export const elgari: Ancestry = {
	id: 'ancestry-elgari',
	name: 'Elgari',
	description:
    'Broad-shouldered Hornvar of fen and taiga. Palmate-crowned guardians who wade swamps, break lines, and bellow challenges.',
	features: [
		// Always-on signatures (0 points)
		FactoryLogic.feature.createMultiple({
			id: 'elgari-signature',
			name: 'Elgari Signatures',
			features: [
				FactoryLogic.feature.create({
					id: 'elgari-signature-1',
					name: 'Hoofed Smash — Kick of the Hindleg',
					description:
            'Triggered; 1/round. When you hit a creature with a melee strike, deal extra damage equal to your highest characteristic to that target.'
				}),
				FactoryLogic.feature.create({
					id: 'elgari-signature-2',
					name: 'Big!',
					description: 'You are size 1L.'
				})
			]
		}),

		// Purchased options
		FactoryLogic.feature.createChoice({
			id: 'elgari-options',
			name: 'Elgari Options',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'elgari-option-1',
						name: 'Thick Hide',
						description: '+3 Stamina per echelon.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'elgari-option-2',
						name: 'Herd-Guard',
						description:
              'Triggered. When you or an adjacent ally takes strike damage, reduce that damage by your level.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'elgari-option-3',
						name: 'Fen-Strider',
						description:
              '+1 speed; you ignore difficult terrain from shallow water, muck, snow-crust, and brush.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'elgari-option-4',
						name: 'Trample Charge',
						description:
              'Maneuver. Move up to 2; your next strike this turn gains +5 damage, and on tier 2+ push 1 (push 2 on tier 3 if you began adjacent to an ally).'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'elgari-option-5',
						name: 'Crown-Butt',
						description:
              'Action; Melee; Weapon. Power Roll + Might. t1: +2 damage; t2: +4 damage and knock prone; t3: +6 damage and knock prone, target cannot stand until end of its next turn unless it succeeds a save.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'elgari-option-6',
						name: 'Bellow of the Rut',
						description:
              'Action; Area 1 burst; Sonic. Roll Might or Presence vs. each enemy in the area. t1: 2 damage; t2: 5 damage and push 1; t3: 7 damage and push 2. Creatures already frightened have a bane on this defense.'
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 2
};
