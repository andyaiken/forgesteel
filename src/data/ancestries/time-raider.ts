import { Ancestry } from '../../models/ancestry';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';

export const timeRaider: Ancestry = {
	id: 'ancestry-time-raider',
	name: 'Time Raider',
	description: 'The original servitor species of the synliiroi—evil psions with near god-like power—the kuran’zoi liberated themselves during the First Psychic War. In the centuries since, they built their own culture and civilization as nomads of the timescape. The exonym “time raiders” was given to them by denizens of the lower worlds who, seeing the advanced technology they wield, concluded they must be from the future.',
	features: [
		FeatureLogic.feature.createSizeFeature({
			id: 'time-raider-size',
			sizeValue: 1,
			sizeMod: 'M'
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'time-raider-speed',
			field: FeatureField.Speed,
			value: 5
		}),
		FeatureLogic.feature.createFeature({
			id: 'time-raider-feature-1',
			name: 'Foresight',
			description: 'Your senses extend past mundane obscuration and the veil of the future alike. You instinctively know the location of any concealed creatures who aren’t hidden from you, negating the usual bane on attacks against them. Additionally, whenever you are attacked, you can use a triggered action to impose a bane on the power roll.'
		}),
		FeatureLogic.feature.createFeature({
			id: 'time-raider-feature-2',
			name: 'Four Arms',
			description: 'Your multiple arms let you take on multiple tasks at the same time. Whenever you use the Grab or Knockback maneuver against an adjacent creature, you can target an additional adjacent creature, using the same power roll for both targets. You can grab up to two creatures at a time.'
		}),
		FeatureLogic.feature.createDamageModifierFeature({
			id: 'time-raider-feature-3',
			name: 'Psionic Gift',
			modifiers: [
				{
					damageType: 'Psionic',
					type: DamageModifierType.Immunity,
					value: 5,
					valuePerLevel: 0,
					valuePerEchelon: 0
				}
			]
		})
	]
};
