import { AbilityLogic } from '../../logic/ability-logic';
import { Ancestry } from '../../models/ancestry';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';

export const human: Ancestry = {
	id: 'ancestry-human',
	name: 'Human',
	description: '“Humans,” the dwarf said with a combination of exasperation and awe. “Their only virtue seems to be believing in impossible things.”',
	features: [
		FeatureLogic.feature.createSizeFeature({
			id: 'human-size',
			sizeValue: 1,
			sizeMod: 'M'
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'human-speed',
			field: FeatureField.Speed,
			value: 5
		}),
		FeatureLogic.feature.createAbilityFeature({
			ability: AbilityLogic.createAbility({
				id: 'human-feature-1',
				name: 'Detect the Supernatural',
				description: 'You open your awareness to detect supernatural creatures and phenomena.',
				type: AbilityLogic.type.createManeuver(),
				distance: [ AbilityLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'Until the end of your next turn, you know the location of any supernatural object, Undead, Construct, or creature from another plane of existence within 5 squares of you, even if you don’t have line of effect to them. You know if you’re detecting an item or a creature, and you know if a creature is Undead, a Construct, or from another plane of existence.'
			})
		}),
		FeatureLogic.feature.createDamageModifierFeature({
			id: 'human-feature-2',
			name: 'Resist the Supernatural',
			modifiers: [
				{
					damageType: 'Magic',
					type: DamageModifierType.Immunity,
					value: 2,
					valuePerLevel: 1,
					valuePerEchelon: 0
				},
				{
					damageType: 'Psionic',
					type: DamageModifierType.Immunity,
					value: 2,
					valuePerLevel: 1,
					valuePerEchelon: 0
				}
			]
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'human-feature-3',
			name: 'Staying Power',
			description: 'Your human anatomy allows you to fight, run, and stay awake longer than others.',
			field: FeatureField.Recoveries,
			value: 2
		})
	]
};
