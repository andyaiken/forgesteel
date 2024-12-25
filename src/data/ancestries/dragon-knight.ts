import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Ancestry } from '../../models/ancestry';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';

export const dragonKnight: Ancestry = {
	id: 'ancestry-dragon-knight',
	name: 'Dragon Knight',
	description: 'The Ritual of Dracogenesis that grants the power to create a generation of dragon knights—also known as draconians or wyrmwights—is obscure and supremely difficult for even an experienced sorcerer to master.',
	features: [
		FeatureLogic.feature.createSizeFeature({
			id: 'dragon-knight-size',
			sizeValue: 1,
			sizeMod: 'M'
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'dragon-knight-speed',
			field: FeatureField.Speed,
			value: 5
		}),
		FeatureLogic.feature.createChoiceFeature({
			id: 'dragon-knight-feature-1',
			name: 'Wyrmplate',
			description: 'Your hardened scales grant you immunity 5 to one of the following damage types: cold, corruption, fire, lightning, or poison. You can change your damage immunity type while out of combat (no action required).',
			options: [
				{
					feature: FeatureLogic.feature.createDamageModifierFeature({
						id: 'dragon-knight-feature-1a',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Cold',
								value: 5,
								valuePerLevel: 0,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createDamageModifierFeature({
						id: 'dragon-knight-feature-1b',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Corruption',
								value: 5,
								valuePerLevel: 0,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createDamageModifierFeature({
						id: 'dragon-knight-feature-1c',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Fire',
								value: 5,
								valuePerLevel: 0,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createDamageModifierFeature({
						id: 'dragon-knight-feature-1d',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Lightning',
								value: 5,
								valuePerLevel: 0,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createDamageModifierFeature({
						id: 'dragon-knight-feature-1e',
						modifiers: [
							{
								type: DamageModifierType.Immunity,
								damageType: 'Poison',
								value: 5,
								valuePerLevel: 0,
								valuePerEchelon: 0
							}
						]
					}),
					value: 1
				}
			]
		}),
		FeatureLogic.feature.createChoiceFeature({
			id: 'dragon-knight-feature-2',
			name: 'Knighthood',
			options: [
				{
					feature: FeatureLogic.feature.createFeature({
						id: 'dragon-knight-feature-2a',
						name: 'Draconian Rush',
						description: 'As a maneuver, you can fly in a straight line up to your speed. Until you reach level 6, you must end your turn on a solid surface or fall, then fall prone.'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createFeature({
						id: 'dragon-knight-feature-2b',
						name: 'Draconian Guard',
						description: 'When you or a creature adjacent to you is attacked, you can use a triggered action to swing your wings around and guard against the blow, reducing any damage from the attack by an amount equal to your level + your Victories.'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createAbilityFeature({
						ability: AbilityLogic.createAbility({
							id: 'dragon-knight-feature-2c',
							name: 'Draconian Pride',
							description: 'You let loose a mighty roar to repel your foes and shake their spirits.',
							type: AbilityLogic.type.createAction(),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
							distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
							target: 'All enemies',
							powerRoll: AbilityLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Presence ],
								tier1: '2 damage; push 1',
								tier2: '4 damage; push 3',
								tier3: '7 damage; push 5; frightened (EoT)'
							}),
							effect: 'You have a bane on the power roll for this ability when you use it in consecutive rounds of the same encounter.'
						})
					}),
					value: 1
				}
			]
		})
	]
};
