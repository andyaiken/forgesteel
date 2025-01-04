import type {
	Feature,
	FeatureChoiceData,
	FeatureClassAbilityData,
	FeatureDomainData,
	FeatureDomainFeatureData,
	FeatureKitData,
	FeatureLanguageChoiceData,
	FeatureMultipleData,
	FeaturePerkData,
	FeatureSkillChoiceData,
	FeatureTitleData
} from '../models/feature';
import { Ancestry } from '../models/ancestry';
import { Career } from '../models/career';
import { Collections } from '../utils/collections';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { FeatureType } from '../enums/feature-type';
import { HeroClass } from '../models/class';
import { Item } from '../models/item';

export class FeatureLogic {
	static getFeaturesFromAncestry = (ancestry: Ancestry) => {
		const features: Feature[] = [];

		features.push(...ancestry.features);

		return FeatureLogic.simplifyFeatures(features);
	};

	static getFeaturesFromCulture = (culture: Culture) => {
		const features: Feature[] = [];

		if (culture.environment) {
			features.push(culture.environment);
		}
		if (culture.organization) {
			features.push(culture.organization);
		}
		if (culture.upbringing) {
			features.push(culture.upbringing);
		}

		return FeatureLogic.simplifyFeatures(features);
	};

	static getFeaturesFromCareer = (career: Career) => {
		const features: Feature[] = [];

		features.push(...career.features);

		return FeatureLogic.simplifyFeatures(features);
	};

	static getFeaturesFromClass = (heroClass: HeroClass) => {
		const features: Feature[] = [];

		const classLevel = heroClass.level;

		heroClass.featuresByLevel.forEach(lvl => {
			if (lvl.level <= classLevel) {
				features.push(...lvl.features);
			}
		});

		heroClass.subclasses
			.filter(sc => sc.selected)
			.forEach(sc => {
				sc.featuresByLevel.forEach(lvl => {
					if (lvl.level <= classLevel) {
						features.push(...lvl.features);
					}
				});
			});

		return FeatureLogic.simplifyFeatures(features);
	};

	static getFeaturesFromComplication = (complication: Complication) => {
		const features: Feature[] = [];

		features.push(...complication.features);

		return FeatureLogic.simplifyFeatures(features);
	};

	static getFeaturesFromItem = (item: Item) => {
		const features: Feature[] = [];

		features.push(...item.features);

		return FeatureLogic.simplifyFeatures(features);
	};

	static simplifyFeatures = (features: Feature[]) => {
		// If any features grant kits, get the features from those kits
		const featuresFromKits: Feature[] = [];
		features
			.filter(f => f.type === FeatureType.Kit)
			.forEach(f => {
				const data = f.data as FeatureKitData;
				data.selected.forEach(kit => {
					featuresFromKits.push(...kit.features);
				});
			});
		features.push(...featuresFromKits);

		// If any features grant perks, get the features from those perks
		const featuresFromPerks: Feature[] = [];
		features
			.filter(f => f.type === FeatureType.Perk)
			.forEach(f => {
				const data = f.data as FeaturePerkData;
				data.selected.forEach(perk => {
					featuresFromPerks.push(perk);
				});
			});
		features.push(...featuresFromPerks);

		// If any features grant titles, get the features from those titles
		const featuresFromTitles: Feature[] = [];
		features
			.filter(f => f.type === FeatureType.Title)
			.forEach(f => {
				const data = f.data as FeatureTitleData;
				data.selected.forEach(title => {
					featuresFromTitles.push(...title.features);
				});
			});
		features.push(...featuresFromTitles);

		// If any features grant feature choices, get the selected features
		const featuresFromChoices: Feature[] = [];
		features
			.filter(f => f.type === FeatureType.Choice)
			.forEach(f => {
				const data = f.data as FeatureChoiceData;
				data.selected.forEach(selected => {
					featuresFromChoices.push(selected);
				});
			});
		features
			.filter(f => f.type === FeatureType.DomainFeature)
			.forEach(f => {
				const data = f.data as FeatureDomainFeatureData;
				featuresFromChoices.push(...data.selected);
			});
		features.push(...featuresFromChoices);

		// If any features grant multiple features, get those features
		const featuresFromMultiple: Feature[] = [];
		features
			.filter(f => f.type === FeatureType.Multiple)
			.forEach(f => {
				const data = f.data as FeatureMultipleData;
				featuresFromMultiple.push(...data.features);
			});
		features.push(...featuresFromMultiple);

		return features;
	};

	///////////////////////////////////////////////////////////////////////////

	static isChoice = (feature: Feature) => {
		switch (feature.type) {
			case FeatureType.Choice:
			case FeatureType.ClassAbility:
			case FeatureType.Domain:
			case FeatureType.DomainFeature:
			case FeatureType.Kit:
			case FeatureType.LanguageChoice:
			case FeatureType.Perk:
			case FeatureType.SkillChoice:
			case FeatureType.Title:
				return true;
		};

		return false;
	};

	static isChosen = (feature: Feature) => {
		switch (feature.type) {
			case FeatureType.Choice: {
				const data = feature.data as FeatureChoiceData;
				const selected = data.selected
					.map(f => data.options.find(opt => opt.feature.id === f.id))
					.filter(opt => !!opt);
				return Collections.sum(selected, i => i.value) >= data.count;
			}
			case FeatureType.ClassAbility: {
				const data = feature.data as FeatureClassAbilityData;
				return data.selectedIDs.length >= data.count;
			}
			case FeatureType.Domain: {
				const data = feature.data as FeatureDomainData;
				return data.selected.length >= data.count;
			}
			case FeatureType.DomainFeature: {
				const data = feature.data as FeatureDomainFeatureData;
				return data.selected.length >= data.count;
			}
			case FeatureType.Kit: {
				const data = feature.data as FeatureKitData;
				return data.selected.length >= data.count;
			}
			case FeatureType.LanguageChoice: {
				const data = feature.data as FeatureLanguageChoiceData;
				return data.selected.length >= data.count;
			}
			case FeatureType.Perk: {
				const data = feature.data as FeaturePerkData;
				return data.selected.length >= data.count;
			}
			case FeatureType.SkillChoice: {
				const data = feature.data as FeatureSkillChoiceData;
				return data.selected.length >= data.count;
			}
			case FeatureType.Title: {
				const data = feature.data as FeatureTitleData;
				return data.selected.length >= data.count;
			}
		};

		return true;
	};

	///////////////////////////////////////////////////////////////////////////

	static getFeatureTypeDescription = (type: FeatureType) => {
		switch (type) {
			case FeatureType.Ability:
				return 'This feature grants you an ability.';
			case FeatureType.AbilityCost:
				return 'This feature modifies the cost to use an ability.';
			case FeatureType.Bonus:
				return 'This feature modifies a statistic.';
			case FeatureType.Choice:
				return 'This feature allows you to choose from a collection of features.';
			case FeatureType.ClassAbility:
				return 'This feature allows you to choose an ability from your class.';
			case FeatureType.DamageModifier:
				return 'This feature grants you an immunity or a weakness.';
			case FeatureType.Domain:
				return 'This feature allows you to choose a domain.';
			case FeatureType.DomainFeature:
				return 'This feature allows you to choose a feature from your domain.';
			case FeatureType.Kit:
				return 'This feature allows you to choose a kit.';
			case FeatureType.KitType:
				return 'This feature changes the types of kit you can select.';
			case FeatureType.Language:
				return 'This feature grants you a language.';
			case FeatureType.LanguageChoice:
				return 'This feature allows you to choose a language.';
			case FeatureType.Malice:
				return 'This feature grants you a malice effect.';
			case FeatureType.Multiple:
				return 'This feature grants you a collection of features.';
			case FeatureType.Perk:
				return 'This feature allows you to choose a perk.';
			case FeatureType.Size:
				return 'This feature sets your size.';
			case FeatureType.Skill:
				return 'This feature grants you a skill.';
			case FeatureType.SkillChoice:
				return 'This feature allows you to choose a skill.';
			case FeatureType.Speed:
				return 'This feature sets your base speed.';
			case FeatureType.Text:
				return 'This feature has no special properties, just a text description.';
			case FeatureType.Title:
				return 'This feature allows you to choose a title.';
		}
	};
}
