import { AbilityKeyword } from '../../enums/ability-keyword';
import { Ancestry } from '../../models/ancestry';
import { Characteristic } from '../../enums/characteristic';
import { ConditionType } from '../../enums/condition-type';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';

export const timeRaider: Ancestry = {
	id: 'ancestry-time-raider',
	name: 'Time Raider',
	description: 'The original servitor species of the synliiroi - evil psions with near god-like power - the kuran’zoi liberated themselves during the First Psychic War. In the centuries since, they built their own culture and civilization as nomads of the timescape. The exonym “time raiders” was given to them by denizens of the lower worlds who, seeing the advanced technology they wield, concluded they must be from the future.',
	features: [
		FactoryLogic.feature.create({
			id: 'time-raider-feature-1',
			name: 'Four Arms',
			description: 'Your multiple arms let you take on multiple tasks at the same time. Whenever you use the Grab or Knockback maneuver against an adjacent creature, you can target an additional adjacent creature, using the same power roll for both targets. You can grab up to two creatures at a time.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'time-raider-feature-2',
			name: 'Time Raider Traits',
			options: [
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'time-raider-feature-2-1',
							name: 'Beyondsight',
							description: 'You adjust your vision to allow you to see through mundane obstructions.',
							type: FactoryLogic.type.createManeuver(),
							keywords: [],
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							effect: 'You can see through mundane obstructions that are 1 square thick or less. While your vision is adjusted this way, you can’t see and don’t have line of effect to any creatures or objects within 1 square of you. You can return your vision to normal as a maneuver.'
						})
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createMultiple({
						id: 'time-raider-feature-2-2',
						name: 'Foresight',
						description: 'Your senses extend past mundane obscuration and the veil of the future alike.',
						features: [
							FactoryLogic.feature.create({
								id: 'time-raider-feature-2-2a',
								name: 'Foresight',
								description: 'You instinctively know the location of any concealed creatures who aren’t hidden from you, negating the usual bane on strikes against them.'
							}),
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'time-raider-feature-2-2b',
									name: 'Foresight',
									description: '',
									type: FactoryLogic.type.createTrigger('You are targeted with a strike'),
									keywords: [],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									effect: 'You impose a bane on the power roll.'
								})
							})
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createDamageModifier({
						id: 'time-raider-feature-2-3',
						name: 'Psychic Scar',
						modifiers: [
							FactoryLogic.damageModifier.createPerLevel({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 1 })
						]
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'time-raider-feature-2-4',
							name: 'Concussive Slam',
							description: 'You slam an invisible force down upon the target.',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: '1 creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '2 + R, I, or P damage',
								tier2: '5 + R, I, or P damage; push 1',
								tier3: '7 + R, I, or P damage; push 2; M < [strong] prone'
							})
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'time-raider-feature-2-5',
							name: 'Psionic Bolt',
							description: 'You shoot forth a beam of psychic purple force that grips your target.',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: '1 creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '2 + R, I, or P psychic damage; slide 1',
								tier2: '5 + R, I, or P psychic damage; slide 2',
								tier3: '7 + R, I, or P psychic damage; slide 3'
							})
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'time-raider-feature-2-6',
							name: 'Minor Acceleration',
							description: 'You fill yourself or an ally with a burst of energy.',
							type: FactoryLogic.type.createManeuver(),
							keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Melee ],
							distance: [
								FactoryLogic.distance.createSelf(),
								FactoryLogic.distance.createMelee()
							],
							target: 'Self or 1 ally',
							effect: 'The target’s speed increases by an amount equal to your Reason, Intuition, or Presence score (your choice) until the start of your next turn.'
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'time-raider-feature-2-7',
						name: 'Unstoppable Mind',
						description: 'Your mind allows you to maintain your focus in any situation.',
						conditions: [ ConditionType.Dazed ]
					}),
					value: 2
				}
			],
			count: 2
		})
	]
};
