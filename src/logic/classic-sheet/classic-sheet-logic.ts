import { Feature } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
import { Options } from '@/models/options';

export class ClassicSheetLogic {
	// Returns true for features that are categorized as part of the Kit,
	// but which (I feel) should go with the Class features.
	static isClassFeatureInKit = (f: Feature): boolean => {
		return (f.name.includes('Aspect')
			|| f.name.includes('Animal Form')
			|| f.name.includes('Hybrid Form')
			|| f.name.includes('Growing Ferocity'));
	};

	static isFeatureDrawback = (f: Feature): boolean => {
		return (f.name.includes('Drawback')
			|| /-d$/.test(f.id));
	};

	static minimalFeatureTypes: FeatureType[] = [
		FeatureType.Text,
		FeatureType.Package,
		FeatureType.PackageContent
	];

	static nonBasicFeatureTypes: FeatureType[] = [
		FeatureType.Text,
		FeatureType.Package,
		FeatureType.PackageContent,
		FeatureType.Ability,
		FeatureType.HeroicResource,
		FeatureType.Kit
	];

	static includeFeature = (f: Feature, options: Options): boolean => {
		switch (options.featuresInclude) {
			case 'minimal':
				return this.minimalFeatureTypes.includes(f.type);
			case 'no-basic':
				return this.isNotBasicFeature(f);
			case 'all':
			default:
				return true;
		}
	};

	static isNotBasicFeature(f: Feature) {
		let notBasic = this.nonBasicFeatureTypes.includes(f.type);
		if (notBasic && f.type === FeatureType.Kit) {
			notBasic = f.description.length > 0;
		} else if (notBasic && f.type === FeatureType.HeroicResource) {
			notBasic = f.data.details.length > 0;
		}

		return notBasic;
	}
}
