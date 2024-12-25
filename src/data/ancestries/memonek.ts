import { Ancestry } from '../../models/ancestry';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';

export const memonek: Ancestry = {
	id: 'ancestry-memonek',
	name: 'Memonek',
	description: 'The native denizens of Axiom, the Plane of Uttermost Law, memonek dwell in a land with lakes and trees and birds and flowers. But on this alien world, the lakes are seas of mercury, the birds glitter with wings of glass stretched gossamer thin, and the flowers’ petals are iridescent metal as flexible and fragile as any earthly rose.',
	features: [
		FeatureLogic.feature.createSizeFeature({
			id: 'memonek-size',
			sizeValue: 1,
			sizeMod: 'M'
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'memonek-speed',
			field: FeatureField.Speed,
			value: 7
		}),
		FeatureLogic.feature.createFeature({
			id: 'memonek-feature-1a',
			name: 'Lightweight',
			description: 'Your silicone body is aerodynamic and low in density. Whenever you fall, you reduce the distance of the fall by 2 squares. When you are force moved, you are force moved an additional 2 squares.'
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'memonek-feature-1b',
			field: FeatureField.Stability,
			value: -2
		}),
		FeatureLogic.feature.createFeature({
			id: 'memonek-feature-2',
			name: 'Keeper of Order',
			description: 'When you or a creature adjacent to you makes a power roll, you can remove an edge or a bane on the roll as a free triggered action. You can only use this benefit once per round.'
		})
	]
};
