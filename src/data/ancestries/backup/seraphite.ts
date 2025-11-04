import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';

export const seraphite: Ancestry = {
	id: 'ancestry-seraphite',
	name: 'Seraphite',
	description:
        'Celestial-touched folk whose souls hum with higher resonance. Born with inconvenient light—halos, wing-shadows, or a corona that answers oaths.',
	features: [
		// Always-on signatures (0 points)
		FactoryLogic.feature.createMultiple({
			id: 'seraphite-signature',
			name: 'Seraphite Signatures',
			features: [
				FactoryLogic.feature.create({
					id: 'seraphite-halo-born',
					name: 'Halo-Born',
					description:
                        'You can shed soft, steady light in a 2-square radius or snuff it as a free action. This light is nonmagical.'
				})
			]
		}),

		// Spend 4 ancestry points among these options
		FactoryLogic.feature.createChoice({
			id: 'seraphite-options',
			name: 'Seraphite Options (4 points)',
			options: [
				// 2-point options
				{
					feature: FactoryLogic.feature.create({
						id: 'seraphite-fearless',
						name: 'Fearless',
						description:
                            'Condition Immunity. You are immune to Frightened.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'seraphite-seraphic-step',
						name: 'Seraphic Step',
						description:
                            'Manoeuvre. Teleport 3 to a space you can see. This movement ignores engagement and does not provoke. You must end on a surface that can support you. If you begin your turn Slowed, you can still use Seraphic Step.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'seraphite-sunlit-revelation',
						name: 'Sunlit Revelation',
						description:
                            'Action. Close burst 1; enemies in burst. Each enemy in the burst takes 2/5/7 untyped damage based on your tier. Choose one target hit; that target is Dazed until the end of its next turn.'
					}),
					value: 2
				},

				// 1-point options
				{
					feature: FactoryLogic.feature.create({
						id: 'seraphite-sanctuary-spark',
						name: 'Sanctuary Spark',
						description:
                            'Triggered. Trigger: You or an adjacent ally is dealt damage by an enemy. Effect: Halve that damage if the attacker is a Devil, Demon, Undead, or the damage is untyped. (Once per round.)'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'seraphite-heavens-vitality',
						name: 'Heaven’s Vitality',
						description:
                            'Kit Bonus. You gain +3 Stamina per echelon.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'seraphite-angelic-poise',
						name: 'Angelic Poise',
						description:
                            'Kit Bonus. Your Disengage increases by +1.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'seraphite-luminous-stride',
						name: 'Luminous Stride',
						description: 'Kit Bonus. Your Speed increases by +1.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'seraphite-radiant-guidance',
						name: 'Radiant Guidance',
						description:
                            'Ribbon. Sense the nearest consecrated or desecrated site within 1 mile (direction only). Among the faithful, your presence grants social permission to request sanctuary or parley when you truthfully invoke a good-aligned deity (Director adjudicates specifics).'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'seraphite-tongue-of-higher-realms',
						name: 'Tongue of the Higher Realms',
						description:
                            'Ribbon. You can speak, read, and write Celestial (or local equivalent). After one minute with a holy inscription, glean its general intent even without the exact dialect.'
					}),
					value: 1
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 4
};

export default seraphite;
