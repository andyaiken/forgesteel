import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';

export const warforged: Ancestry = {
	id: 'ancestry-warforged',
	name: 'Warforged',
	description:
        'Living constructs forged for purpose—scouts, sentinels, sappers—now seeking place and personhood across Draachenmar.',
	features: [
		// Signature (always on; point already accounted for in ancestryPoints math)
		FactoryLogic.feature.createMultiple({
			id: 'warforged-signature',
			name: 'Living Construct',
			features: [
				FactoryLogic.feature.create({
					id: 'warforged-living-construct',
					name: 'Living Construct',
					description:
                        'You are a living creature with a soul, built of wood, leather, and metal. You do not need to eat, drink, or breathe. Resilience: When resisting poison or corruption potencies, your Might counts as 1 higher.'
				})
			]
		}),

		// Purchased options
		FactoryLogic.feature.createChoice({
			id: 'warforged-options',
			name: 'Warforged Options',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'warforged-agile-chassis',
						name: 'Agile Chassis',
						description:
                            'Your chassis was built for speed. Your Speed is 6.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'warforged-juggernaut',
						name: 'Juggernaut',
						description:
                            'Your Might counts as 1 higher when resisting potencies of any kind.'
					}),
					value: 1
				},
				// Targeting Suite — choose one of the following 1-point options
				{
					feature: FactoryLogic.feature.create({
						id: 'warforged-targeting-optics',
						name: 'Targeting Optics',
						description:
                            'Precision assist. Once per round, when you make a ranged strike at distance 6+ squares, you gain edge on that power roll.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'warforged-integrated-stabilizer',
						name: 'Integrated Stabilizer',
						description:
                            'Your internal gyros lock in. You gain +1 Stability.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'warforged-warframe-overdrive',
						name: 'Warframe Overdrive',
						description:
                            'Action. Until the start of your next turn, you gain Resistance 5 vs weapon damage, and your melee strikes deal +2 damage.'
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3
};
