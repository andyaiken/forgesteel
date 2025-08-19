import { FactoryLogic } from '../factory-logic';
import { FeatureUpdateLogic } from './feature-update-logic';
import { Item } from '../../models/item';

export class ItemUpdateLogic {
	static updateItem = (item: Item) => {
		item.featuresByLevel.flatMap(lvl => lvl.features).forEach(FeatureUpdateLogic.updateFeature);
		if (item.imbuements === undefined) {
			item.imbuements = [];
		}

		/* eslint-disable @typescript-eslint/no-deprecated */
		if (item.customizationsByLevel.length > 0) {
			item.customizationsByLevel.forEach(level => {
				level.features.forEach(feature => {
					if (feature.selected) {
						item.imbuements.push(FactoryLogic.createImbuement({
							type: item.type,
							level: level.level,
							feature: feature.feature
						}));
					}
				});
			});

			item.customizationsByLevel = [];
		}
		/* eslint-enable @typescript-eslint/no-deprecated */

		item.imbuements.map(imbuement => imbuement.feature).forEach(FeatureUpdateLogic.updateFeature);
	};
}
