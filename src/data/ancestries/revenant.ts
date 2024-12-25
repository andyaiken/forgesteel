import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Ancestry } from '../../models/ancestry';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';

export const revenant: Ancestry = {
	id: 'ancestry-revenant',
	name: 'Revenant',
	description: 'Unlike the necromantic rituals that produce wights and wraiths and zombies, revenants rise from the grave through a combination of an unjust death and a burning desire for vengeance. Creatures sustained on pure will, they have no need of food or water or air—and, unlike their zombified cousins, they retain all their memories and personality from life.',
	features: [
		FeatureLogic.feature.createBonusFeature({
			id: 'revenant-speed',
			field: FeatureField.Speed,
			value: 5
		}),
		FeatureLogic.feature.createChoiceFeature({
			id: 'revenant-feature-1',
			name: 'Former Life',
			options: [
				{
					feature: FeatureLogic.feature.createSizeFeature({
						id: 'revenant-feature-1a',
						description: '1S',
						sizeValue: 1,
						sizeMod: 'S'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createSizeFeature({
						id: 'revenant-feature-1b',
						description: '1M',
						sizeValue: 1,
						sizeMod: 'M'
					}),
					value: 1
				},
				{
					feature: FeatureLogic.feature.createSizeFeature({
						id: 'revenant-feature-1c',
						description: '1L',
						sizeValue: 1,
						sizeMod: 'L'
					}),
					value: 1
				}
			]
		}),
		FeatureLogic.feature.createFeature({
			id: 'revenant-feature-2a',
			name: 'Vengeance Mark',
			description: 'As a maneuver, you place a magic sigil on a creature within 10 squares of you. When you place a sigil, you can decide where it appears on the creature’s body, and whether the sigil is visible to only you or to all creatures. You always know the direction to the exact location of a creature who bears one of your sigils and is on the same plane of existence as you. You can have an active number of sigils equal to your level. You can remove a sigil from a creature harmlessly (no action required). If you are already using your maximum number of sigils and place a new one, your oldest sigil disappears with no other effect.'
		}),
		FeatureLogic.feature.createAbilityFeature({
			ability: AbilityLogic.createAbility({
				id: 'revenant-feature-2b',
				name: 'Detonate Sigil',
				description: 'A magical sigil you placed on a creature explodes with energy.',
				type: AbilityLogic.type.createAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ AbilityLogic.distance.createRanged(10) ],
				target: '1 creature with your sigil',
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '3 damage; slide 1',
					tier2: '7 damage; slide 2',
					tier3: '10 damage; slide 3'
				}),
				effect: 'The sigil disappears from the creature.'
			})
		}),
		FeatureLogic.feature.createFeature({
			id: 'revenant-feature-3a',
			name: 'Tough But Withered',
			description: 'You can’t suffocate, and you don’t need to eat or drink to stay alive. Additionally, when your Stamina equals the negative of your winded value, you become inert instead of dying. You can continue to observe your surroundings, but you can’t speak, take actions, maneuvers, or triggered actions, or move and you fall prone. If you take any fire damage while in this state, your body is destroyed and you die. Otherwise, after 12 hours, you regain Stamina equal to your recovery value.'
		}),
		FeatureLogic.feature.createDamageModifierFeature({
			id: 'revenant-feature-3b',
			modifiers: [
				{
					damageType: 'Cold',
					type: DamageModifierType.Immunity,
					value: 1,
					valuePerLevel: 1,
					valuePerEchelon: 0
				},
				{
					damageType: 'Corruption',
					type: DamageModifierType.Immunity,
					value: 1,
					valuePerLevel: 1,
					valuePerEchelon: 0
				},
				{
					damageType: 'Lightning',
					type: DamageModifierType.Immunity,
					value: 1,
					valuePerLevel: 1,
					valuePerEchelon: 0
				},
				{
					damageType: 'Poison',
					type: DamageModifierType.Immunity,
					value: 1,
					valuePerLevel: 1,
					valuePerEchelon: 0
				},
				{
					damageType: 'Fire',
					type: DamageModifierType.Weakness,
					value: 5,
					valuePerLevel: 0,
					valuePerEchelon: 0
				}
			]
		}),
		FeatureLogic.feature.createFeature({
			id: 'revenant-feature-4',
			name: 'Undead Influence',
			description: 'Your supernatural gifts allow you to influence other undead. You gain an edge on Reason, Intuition, and Presence tests made to interact with undead creatures.'
		})
	]
};
