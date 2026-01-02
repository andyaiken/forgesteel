import { Feature, FeatureChoice } from '@/models/feature';
import { Ancestry } from '@/models/ancestry';
import { FeatureType } from '@/enums/feature-type';

export class AncestryLogic {
	static isSignatureFeature = (feature: Feature) => {
		return !AncestryLogic.isPurchasedFeature(feature);
	};

	static isPurchasedFeature = (feature: Feature) => {
		return (feature.type === FeatureType.Choice) && (feature.data.count === 'ancestry');
	};

	static getSignatureFeatures = (ancestry: Ancestry) => {
		return ancestry.features.filter(AncestryLogic.isSignatureFeature);
	};

	static getPurchasedFeatures = (ancestry: Ancestry) => {
		return ancestry.features.filter(AncestryLogic.isPurchasedFeature).flatMap(f => (f as FeatureChoice).data.options);
	};
};
