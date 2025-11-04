import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';

export const aurven: Ancestry = {
	id: 'ancestry-aurven',
	name: 'Aurven',
	description:
		'Leopard, cheetah, and mountain-lion Aurians. Spring-loaded cliff-runners and ambushers. Built for movement, position, and striking from cover.',
	features: [
		FactoryLogic.feature.createMultiple({
			id: 'aurven-feature-1',
			name: 'Aurian Lineage',
			features: [
				FactoryLogic.feature.create({
					id: 'aurven-feature-1a',
					name: 'Natural Claws – Predator’s Rend',
					description:
						'Triggered, 1/round. When you hit with a melee strike, you can use a triggered action to deal extra damage equal to your highest characteristic to that target.'
				}),
				FactoryLogic.feature.create({
					id: 'aurven-feature-1b',
					name: 'Medium Frame',
					description: 'Your size is 1M.'
				})
			]
		}),
		FactoryLogic.feature.createChoice({
			id: 'aurven-feature-2',
			name: 'Aurven Traits',
			options: [
				// shared 1-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-1',
						name: 'Scent Sense',
						description:
							'You can track and identify by scent. You can pick up lingering trails and tell apart known individuals by smell (Director adjudicates specifics).'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-2',
						name: 'Night-Eyes',
						description:
							'You ignore penalties from dim light. In darkness, you gain an edge on tests to detect adjacent creatures.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-3',
						name: 'Tail Balance',
						description: '+1 disengage.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-4',
						name: 'Cat’s Grace',
						description: '+1 speed.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-5',
						name: 'Sheath & Strike',
						description:
							'The first melee strike you make each fight gains +2 damage if you moved 2+ squares earlier that turn.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-6',
						name: 'Sun-Doze',
						description: '+3 Stamina per echelon.'
					}),
					value: 1
				},

				// Aurven 1-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-7',
						name: 'Sprint Engine',
						description:
							'+1 speed; if you moved 4+ squares this turn, your next strike gains +2 damage (1/round).'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-8',
						name: 'Rock-Climber',
						description:
							'You climb at full speed and have an advantage on tests to keep footing on cliffs, ruins, and tree trunks.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-9',
						name: 'Ambush Spots',
						description:
							'If you begin your turn hidden and strike, the target suffers a bane on its next strike before the end of its next turn.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-10',
						name: 'Sure-Footed',
						description: '+1 stability.'
					}),
					value: 1
				},

				// shared 2-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-11',
						name: 'Pounce',
						description:
							'Maneuver. Stride up to your speed toward a creature you can see, then make a melee strike. On a tier 2+ outcome, push the target 1.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-12',
						name: 'Nine Lives',
						description:
							'Triggered, 1/scene. When damage would reduce you to 0 Stamina, reduce that damage by your level + 5.'
					}),
					value: 2
				},

				// Aurven 2-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-13',
						name: 'Explosive Dash',
						description:
							'Maneuver. Move up to your speed; your next melee strike this turn gains +5 damage and +1 reach if you moved in a straight line at least 5 squares.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-14',
						name: 'Tree Panther',
						description:
							'Maneuver. Climb up to your speed. Until the end of the turn, you count as having high ground for your strikes (line-of-effect permitting).'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurven-feature-2-15',
						name: 'Chokehold',
						description:
							'Triggered, 1/round. When you hit a creature you flanked or that did not see you at the start of your turn, that target is slowed until end of turn.'
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3
};
