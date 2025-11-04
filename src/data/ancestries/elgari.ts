import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';

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
					feature: FactoryLogic.feature.createBonus({
						id: 'elgari-option-1',
						name: 'Thick Hide',
						description: 'Your thick hide provides enhanced protection.',
						field: FeatureField.Stamina,
						valuePerEchelon: 3
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'elgari-option-2',
							name: 'Herd-Guard',
							description: 'You protect your herd with fierce dedication.',
							type: FactoryLogic.type.createTrigger('You or an adjacent ally takes damage from a strike'),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'The triggering creature',
							sections: [
								FactoryLogic.createAbilitySectionText('You reduce the damage from the strike by an amount equal to your level.')
							]
						})
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
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'elgari-option-4',
							name: 'Trample Charge',
							description: 'You charge forward with the support of your herd.',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('Move up to 2; your next strike this turn gains +5 damage, and on tier 2+ push 1 (push 2 on tier 3 if you began adjacent to an ally).')
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'elgari-option-5',
							name: 'Crown-Butt',
							description: 'You drive your palmate crown into your foe with overwhelming force.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'One creature',
							cost: 'signature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might ],
										tier1: '+2 damage',
										tier2: '+4 damage; knock prone',
										tier3: '+6 damage; knock prone, target cannot stand until end of its next turn unless it succeeds a save'
									})
								)
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'elgari-option-6',
							name: 'Bellow of the Rut',
							description: 'You bellow a primal challenge that shakes your enemies.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Area ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
							target: 'Each enemy in the area',
							cost: 'signature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Presence ],
										tier1: '2 damage',
										tier2: '5 damage; push 1',
										tier3: '7 damage; push 2'
									})
								),
								FactoryLogic.createAbilitySectionText('Creatures already frightened have a bane on this defense.')
							]
						})
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 2
};
