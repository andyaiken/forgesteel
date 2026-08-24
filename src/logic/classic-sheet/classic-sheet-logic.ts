import { Collections } from '@/utils/collections';
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

	// FeatureComponent renders a Multiple's own name and description, but leaves its children to
	// be rendered as siblings. A list built straight from source data has to be flattened first,
	// or everything inside the Multiple is silently dropped from the sheet.
	//
	// FeatureLogic.simplifyFeatures is the general form of this and is what the kit, title and item
	// paths use. It is not usable for careers and complications: it also opens up a Perk into the
	// perk the hero chose, and the sheet gives perks their own section (see the Ancestry + Perks
	// region), so the card would print the chosen perk a second time. Every career carries a Perk.
	static flattenMultiples = (features: Feature[]): Feature[] => {
		const flattened: Feature[] = [];

		const add = (f: Feature) => {
			flattened.push(f);
			if (f.type === FeatureType.Multiple) {
				f.data.features.forEach(add);
			}
		};

		features.forEach(add);

		// simplifyFeatures already lists a Multiple's children alongside it, so a list that has
		// been through it comes back unchanged rather than doubled
		return Collections.distinct(flattened, f => f.id);
	};

	// SurgeGain and PotencyResistance carry rules text that used to live in a Text feature's
	// description, so they belong here alongside it rather than counting as mechanical detail.
	// Multiple is here for the prose it carries above its children - see hasContent
	static minimalFeatureTypes: FeatureType[] = [
		FeatureType.Text,
		FeatureType.Multiple,
		FeatureType.Package,
		FeatureType.PackageContent,
		FeatureType.PotencyResistance,
		FeatureType.SurgeGain
	];

	static nonBasicFeatureTypes: FeatureType[] = [
		FeatureType.Text,
		FeatureType.Multiple,
		FeatureType.Package,
		FeatureType.PackageContent,
		FeatureType.PotencyResistance,
		FeatureType.SurgeGain,
		FeatureType.Ability,
		FeatureType.HeroicResource,
		FeatureType.Kit
	];

	// A Multiple is rendered as its own prose only - its children are listed beside it either way -
	// so one with nothing to say would print as an empty line
	static hasContent = (f: Feature) => (f.type !== FeatureType.Multiple) || (f.description.length > 0);

	static includeFeature = (f: Feature, options: Options): boolean => {
		switch (options.featuresInclude) {
			case 'minimal':
				return this.minimalFeatureTypes.includes(f.type) && this.hasContent(f);
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

		return notBasic && this.hasContent(f);
	}
}
