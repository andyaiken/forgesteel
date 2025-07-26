import { Feature } from '../../models/feature';
import { FeatureType } from '../../enums/feature-type';

export class FeatureUpdateLogic {
	static updateFeature = (feature: Feature) => {
		switch (feature.type) {
			case FeatureType.Ability:
				if (feature.data.ability.sections === undefined) {
					feature.data.ability.sections = [];
				}
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
				feature.data.selected.forEach(d => {
					if (d.resourceGains === undefined) {
						d.resourceGains = [];
					}
				});
				break;
			case FeatureType.HeroicResource:
				if (feature.data.type === undefined) {
					feature.data.type = 'heroic';
				}
				break;
			case FeatureType.ItemChoice:
				feature.data.selected.forEach(item => {
					if (item.customizationsByLevel === undefined) {
						item.customizationsByLevel = [
							{
								level: 1,
								features: []
							},
							{
								level: 5,
								features: []
							},
							{
								level: 9,
								features: []
							}
						];
					}
				});
				break;
			case FeatureType.Kit:
				if (feature.data.types.includes('Standard')) {
					feature.data.types = feature.data.types.filter(t => t !== 'Standard');
					feature.data.types.push('');
				}
				break;
			case FeatureType.Multiple:
				feature.data.features.forEach(FeatureUpdateLogic.updateFeature);
				break;
		}
	};
}
