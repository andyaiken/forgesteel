import { AbilityUpdateLogic } from '@/logic/update/ability-update-logic';
import { Characteristic } from '@/enums/characteristic';
import { Feature } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
import { ItemUpdateLogic } from '@/logic/update/item-update-logic';

export class FeatureUpdateLogic {
	static updateFeature = (feature: Feature) => {
		switch (feature.type) {
			case FeatureType.Ability:
				AbilityUpdateLogic.updateAbility(feature.data.ability);
				break;
			case FeatureType.Bonus:
				if (feature.data.valueCharacteristics === undefined) {
					feature.data.valueCharacteristics = [];
				}
				if (feature.data.valuePerEchelon === undefined) {
					feature.data.valuePerEchelon = 0;
				}
				break;
			case FeatureType.Choice:
				if (feature.data.options === undefined) {
					feature.data.options = [];
				}
				feature.data.options.map(f => f.feature).forEach(FeatureUpdateLogic.updateFeature);
				break;
			case FeatureType.ClassAbility:
				if (feature.data.minLevel === undefined) {
					feature.data.minLevel = 1;
				}
				break;
			case FeatureType.DamageModifier:
				feature.data.modifiers.forEach(dm => {
					if (dm.valueCharacteristics === undefined) {
						dm.valueCharacteristics = [];
					}
					if (dm.valueCharacteristicMultiplier === undefined) {
						dm.valueCharacteristicMultiplier = 1;
					}
					if (dm.valuePerEchelon === undefined) {
						dm.valuePerEchelon = 0;
					}
				});
				break;
			case FeatureType.Domain:
				if (feature.data.characteristic === undefined) {
					feature.data.characteristic = Characteristic.Intuition;
				}
				feature.data.selected.forEach(d => {
					if (d.resourceGains === undefined) {
						d.resourceGains = [];
					}
					if (d.defaultFeatures === undefined) {
						d.defaultFeatures = [];
					}
				});
				break;
			case FeatureType.HeroicResource:
				if (feature.data.type === undefined) {
					feature.data.type = 'heroic';
				}
				feature.data.gains.forEach(g => {
					if (g.tag === undefined) {
						g.tag = '';
					}
				});
				break;
			case FeatureType.HeroicResourceGain:
				if (feature.data.tag === undefined) {
					feature.data.tag = '';
				}
				if (feature.data.replacesTags === undefined) {
					feature.data.replacesTags = [];
				}
				break;
			case FeatureType.ItemChoice:
				feature.data.selected.forEach(ItemUpdateLogic.updateItem);
				break;
			case FeatureType.Kit:
				if (feature.data.types.includes('Standard')) {
					feature.data.types = feature.data.types.filter(t => t !== 'Standard');
					feature.data.types.push('');
				}
				break;
			case FeatureType.Malice:
				if (feature.data.echelon === undefined) {
					feature.data.echelon = 1;
				}
				break;
			case FeatureType.Multiple:
				feature.data.features.forEach(FeatureUpdateLogic.updateFeature);
				break;
			case FeatureType.Package:
				if (feature.data.tag === 'undefined') {
					feature.data.tag = 'conduit-prayer';
				}
				break;
		}
	};
}
