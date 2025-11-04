import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { ConditionType } from '@/enums/condition-type';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';

// Verminari — final, synced to the document canvas

export const verminari: Ancestry = {
	id: 'ancestry-verminari',
	name: 'Verminari',
	description:
    'Carrion-kin who share flesh and favor with the swarm. Filth-born survivors of gutters and plague-vaults.',
	features: [
		// SIGNATURES
		FactoryLogic.feature.createMultiple({
			id: 'verminari-signature',
			name: 'Verminari Heritage',
			features: [
				FactoryLogic.feature.create({
					id: 'verminari-small-stature',
					name: 'Small Stature',
					description: 'You are Small (1S). Use standard size rules for space, squeezing, and larger-creature interactions.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'verminari-filth-born',
					name: 'Filth-Born',
					description: 'You have resistance 5 to poison damage.',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 5 })
					]
				}),
				FactoryLogic.feature.create({
					id: 'verminari-chitter-speech',
					name: 'Chitter-Speech',
					description:
            'You can communicate simple ideas to mundane vermin and glean basic impressions from their behavior.'
				}),
				FactoryLogic.feature.create({
					id: 'verminari-languages',
					name: 'Gutter Tongues',
					description: 'You speak Caelian and an undercity cant (Director may swap one for a local tongue).'
				})
			]
		}),

		// OPTIONS
		FactoryLogic.feature.createChoice({
			id: 'verminari-options',
			name: 'Verminari Options',
			options: [
				// 1-point
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'verminari-ratstep',
						name: 'Ratstep',
						description: 'Your Disengage becomes 1; you slip through legs and refuse to be cornered.',
						field: FeatureField.Disengage,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'verminari-swarm-familiarity',
						name: 'Swarm Familiarity',
						features: [
							FactoryLogic.feature.create({
								id: 'verminari-pest-sense',
								name: 'Pest Sense',
								description: 'Edge on tests to detect disease, rot, recent refuse, and vermin traces in an area.'
							}),
							FactoryLogic.feature.createBonus({
								id: 'verminari-low-center',
								name: 'Low Center of Filth',
								description: '+1 Stability; you brace instinctively when the floor turns slick.',
								field: FeatureField.Stability,
								value: 1
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'verminari-gnaw-escape',
							name: 'Gnaw-Escape',
							description: 'Your swarm chews through bonds so you can slip free.',
							type: FactoryLogic.type.createTrigger('You gain grabbed or restrained'),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText(
									'End one of the triggering conditions on yourself, then Shift 1. Once per respite.'
								)
							]
						})
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'verminari-filth-aura',
							name: 'Filth Aura',
							description: 'A briefly thickened cloud of biting flies and reek harries nearby foes.',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Each enemy adjacent to you',
							sections: [
								FactoryLogic.createAbilitySectionText(
									'Enemies adjacent to you take a bane on their next strike UEONT.'
								)
							]
						})
					}),
					value: 1
				},

				// 2-point
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'verminari-swarm-surge',
							name: 'Swarm Surge',
							description: 'You call the crawling tide to engulf foes.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Area ],
							distance: [
								FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
							],
							target: 'Each enemy in the area',
							cost: 'signature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Presence, Characteristic.Intuition ],
										tier1: '2 untyped damage',
										tier2: '5 untyped damage; slowed (save ends)',
										tier3: '7 untyped damage; slowed and weakened (both save end)'
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
							id: 'verminari-hurl-snares',
							name: 'Hurl Snares',
							description: 'You fling a tangle of cords and gnawing pests to drag a foe off balance.',
							type: FactoryLogic.type.createManeuver(),
							keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createRanged(5) ],
							target: 'One creature',
							sections: [
								FactoryLogic.createAbilitySectionText('Pull 1; the target is slowed (save ends).')
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'verminari-filth-hardened',
						name: 'Filth-Hardened',
						features: [
							FactoryLogic.feature.createConditionImmunity({
								id: 'verminari-immune-weakened',
								name: 'Immune to Weakened',
								description: 'You cannot be Weakened.',
								conditions: [ ConditionType.Weakened ]
							}),
							FactoryLogic.feature.createBonus({
								id: 'verminari-stamina-grubs',
								name: 'Grub-Fattened',
								description: '+3 Stamina per echelon; your hardy gut hoards calories.',
								field: FeatureField.Stamina,
								valuePerEchelon: 3
							})
						]
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3
};

export default verminari;
