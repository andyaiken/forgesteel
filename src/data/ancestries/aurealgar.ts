import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';

export const aurealgar: Ancestry = {
	id: 'ancestry-aurealgar',
	name: 'Aurealgar',
	description:
		'Lion- and tiger-blooded Aurians from badlands caravans and border holds. Broad, proud, and made to stand in front. They fight like a pride and roar like a drumline.',
	features: [
		// shared claws + stock signature
		FactoryLogic.feature.createMultiple({
			id: 'aurealgar-feature-1',
			name: 'Aurian Lineage',
			features: [
				FactoryLogic.feature.create({
					id: 'aurealgar-feature-1a',
					name: 'Natural Claws – Predator’s Rend',
					description:
						'Triggered, 1/round. When you hit with a melee strike, you can use a triggered action to deal extra damage equal to your highest characteristic to that target.'
				}),
				FactoryLogic.feature.create({
					id: 'aurealgar-feature-1b',
					name: 'Big',
					description: 'Your size is 1L (large).'
				})
			]
		}),
		// options menu – shared + Aurealgar
		FactoryLogic.feature.createChoice({
			id: 'aurealgar-feature-2',
			name: 'Aurealgar Traits',
			options: [
				// shared 1-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-1',
						name: 'Scent Sense',
						description:
							'You can track and identify by scent. You can pick up lingering trails and tell apart known individuals by smell (Director adjudicates specifics).'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-2',
						name: 'Night-Eyes',
						description:
							'You ignore penalties from dim light. In darkness, you gain an edge on tests to detect adjacent creatures.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-3',
						name: 'Tail Balance',
						description: '+1 disengage.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-4',
						name: 'Cat’s Grace',
						description: '+1 speed.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-5',
						name: 'Sheath & Strike',
						description:
							'The first melee strike you make each fight gains +2 damage if you moved 2+ squares earlier that turn.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-6',
						name: 'Sun-Doze',
						description: '+3 Stamina per echelon.'
					}),
					value: 1
				},

				// Aurealgar 1-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-7',
						name: 'Thick Hide',
						description: '+3 Stamina per echelon.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-8',
						name: 'Pride-Guard',
						description:
							'Triggered. When you or an adjacent ally take damage from a strike, reduce that damage by your level.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-9',
						name: 'Savanna Stride',
						description: '+1 speed and you ignore difficult terrain from sand, scree, and broken rock.'
					}),
					value: 1
				},

				// shared 2-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-10',
						name: 'Pounce',
						description:
							'Maneuver. Stride up to your speed toward a creature you can see, then make a melee strike. On a tier 2+ outcome, push the target 1.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-11',
						name: 'Nine Lives',
						description:
							'Triggered, 1/scene. When damage would reduce you to 0 Stamina, reduce that damage by your level + 5.'
					}),
					value: 2
				},

				// Aurealgar 2-point
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-12',
						name: 'King of the Dunes',
						description: 'You are immune to the frightened condition.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-13',
						name: 'Mauling Drive',
						description:
							'Action; Melee; Weapon. Power Roll + Might. t1: +2 damage; t2: +4 damage and push 1; t3: +6 damage and push 2.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-14',
						name: 'Standing Charge',
						description:
							'Maneuver. Move up to 2. Your next strike this turn gains +5 damage if you started the maneuver adjacent to an ally.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'aurealgar-feature-2-15',
						name: 'Lion’s Roar',
						description:
							'Action; Area 1 burst; Magic. Roll Might or Presence vs. each enemy in the area. t1: 2 damage; t2: 5 damage and push 1; t3: 7 damage and push 2.'
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 2
};
