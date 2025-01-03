import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Ancestry } from '../../models/ancestry';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { FeatureLogic } from '../../logic/feature-logic';

export const timeRaider: Ancestry = {
	id: 'ancestry-time-raider',
	name: 'Time Raider',
	description: 'The original servitor species of the synliiroi — evil psions with near god-like power — the kuran’zoi liberated themselves during the First Psychic War. In the centuries since, they built their own culture and civilization as nomads of the timescape. The exonym “time raiders” was given to them by denizens of the lower worlds who, seeing the advanced technology they wield, concluded they must be from the future.',
	features: [
		FeatureLogic.feature.create({
			id: 'time-raider-feature-1',
			name: 'Four Arms',
			description: 'Your multiple arms let you take on multiple tasks at the same time. Whenever you use the Grab or Knockback maneuver against an adjacent creature, you can target an additional adjacent creature, using the same power roll for both targets. You can grab up to two creatures at a time.'
		}),
		FeatureLogic.feature.createChoiceFeature({
			id: 'time-raider-feature-2',
			name: 'Time Raider Traits',
			options: [
				{
					feature: FeatureLogic.feature.create({
						id: 'time-raider-feature-2-1',
						name: 'Beyondsight',
						description: 'As a maneuver, you can adjust your vision to allow you to see through mundane obstructions that 1 square thick or less. While your vision is adjusted this way, you can’t see and don’t have line of effect to any creatures or objects within 1 square of you. You can return your vision to normal as a maneuver.'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.create({
						id: 'time-raider-feature-2-2',
						name: 'Foresight',
						description: 'Your senses extend past mundane obscuration and the veil of the future alike. You instinctively know the location of any concealed creatures who aren’t hidden from you, negating the usual bane on strikes against them. Additionally, whenever you are targeted with a strike, you can use a triggered action to impose a bane on the power roll.'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createDamageModifierFeature({
						id: 'time-raider-feature-2-3',
						name: 'Psychic Scar',
						modifiers: [
							{
								damageType: 'Psychic',
								type: DamageModifierType.Immunity,
								value: 0,
								valuePerLevel: 1,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createAbilityFeature({
						ability: AbilityLogic.createAbility({
							id: 'time-raider-feature-2-4',
							name: 'Concussive Slam',
							description: 'You slam an invisible force down upon the target.',
							type: AbilityLogic.type.createAction(),
							keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
							distance: [ AbilityLogic.distance.createRanged() ],
							target: '1 creature or object',
							powerRoll: AbilityLogic.createPowerRoll({
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
					feature: FeatureLogic.feature.createAbilityFeature({
						ability: AbilityLogic.createAbility({
							id: 'time-raider-feature-2-5',
							name: 'Psionic Bolt',
							description: 'You shoot forth a beam of psychic purple force that grips your target.',
							type: AbilityLogic.type.createAction(),
							keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
							distance: [ AbilityLogic.distance.createRanged() ],
							target: '1 creature or object',
							powerRoll: AbilityLogic.createPowerRoll({
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
					feature: FeatureLogic.feature.createAbilityFeature({
						ability: AbilityLogic.createAbility({
							id: 'time-raider-feature-2-6',
							name: 'Minor Acceleration',
							description: 'You fill yourself or an ally with a burst of energy.',
							type: AbilityLogic.type.createManeuver(),
							keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Melee ],
							distance: [
								AbilityLogic.distance.createSelf(),
								AbilityLogic.distance.createMelee()
							],
							target: 'Self or 1 ally',
							effect: ''
						})
					}),
					value: 2
				},
				{
					feature: FeatureLogic.feature.create({
						id: 'time-raider-feature-2-7',
						name: 'Unstoppable Mind',
						description: 'Your mind allows you to maintain your focus in any situation. You can’t be dazed.'
					}),
					value: 2
				}
			],
			count: 2
		})
	]
};
