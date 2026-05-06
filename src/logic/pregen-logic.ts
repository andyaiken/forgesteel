import { CultureData, EnvironmentData, OrganizationData, UpbringingData } from '@/data/culture-data';
import { AncestryLogic } from './ancestry-logic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { Hero } from '@/models/hero';
import { HeroLogic } from './hero-logic';
import { Options } from '@/models/options';
import { Pregen } from '@/models/pregen';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';

export class PregenLogic {
	static heroToPregen = (hero: Hero): Pregen => {
		const pregen = FactoryLogic.createPregen();

		pregen.name = hero.name;
		pregen.description = HeroLogic.getHeroDescription(hero);

		pregen.sourcebookIDs = [ ...hero.sourcebookIDs ];
		pregen.ancestryID = hero.ancestry?.id ?? null;
		pregen.cultureID = hero.culture?.id ?? null;
		pregen.careerID = hero.career?.id ?? null;
		pregen.classID = hero.class?.id ?? null;
		pregen.complicationID = hero.complication?.id ?? null;

		if (hero.career) {
			pregen.incitingIncidentID = hero.career.incitingIncidents.selected?.id ?? null;
		}

		if (hero.class) {
			pregen.level = hero.class.level;
			pregen.characteristics = [ ...hero.class.characteristics ];
			pregen.selectedSubclassIDs = hero.class.subclasses
				.filter(sc => sc.selected)
				.map(sc => sc.id);
		}

		HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(FeatureLogic.isChoice)
			.forEach(feature => {
				const selections = PregenLogic.getFeatureSelections(feature);
				if (selections) {
					pregen.featureSelections.push({ featureID: feature.id, selections: selections });
				}
			});

		return pregen;
	};

	static pregenToHero = (pregen: Pregen, sourcebooks: Sourcebook[], options: Options): Hero => {
		const hero = FactoryLogic.createHero(pregen.sourcebookIDs);

		hero.name = pregen.name;

		const ancestry = SourcebookLogic.getAncestries(sourcebooks).find(a => a.id === pregen.ancestryID);
		if (ancestry) {
			hero.ancestry = Utils.copy(ancestry);
		}

		const allCultures = [
			...SourcebookLogic.getCultures(sourcebooks, true),
			CultureData.bespoke
		];
		const culture = allCultures.find(c => c.id === pregen.cultureID);
		if (culture) {
			hero.culture = Utils.copy(culture);

			if (!hero.culture.environment) {
				const envFeature = pregen.featureSelections.find(s => s.featureID.startsWith('env-'));
				if (envFeature) {
					const env = EnvironmentData.getEnvironments().find(e => e.id === envFeature.featureID);
					if (env) {
						hero.culture.environment = Utils.copy(env);
					}
				}
			}
			if (!hero.culture.organization) {
				const orgFeature = pregen.featureSelections.find(s => s.featureID.startsWith('org-'));
				if (orgFeature) {
					const org = OrganizationData.getOrganizations().find(o => o.id === orgFeature.featureID);
					if (org) {
						hero.culture.organization = Utils.copy(org);
					}
				}
			}
			if (!hero.culture.upbringing) {
				const upFeature = pregen.featureSelections.find(s => s.featureID.startsWith('up-'));
				if (upFeature) {
					const up = UpbringingData.getUpbringings().find(u => u.id === upFeature.featureID);
					if (up) {
						hero.culture.upbringing = Utils.copy(up);
					}
				}
			}
		}

		const career = SourcebookLogic.getCareers(sourcebooks).find(c => c.id === pregen.careerID);
		if (career) {
			hero.career = Utils.copy(career);

			hero.career.incitingIncidents.selected = hero.career.incitingIncidents.options.find(o => o.id === pregen.incitingIncidentID) ?? null;
		}

		const heroClass = SourcebookLogic.getClasses(sourcebooks).find(c => c.id === pregen.classID);
		if (heroClass) {
			hero.class = Utils.copy(heroClass);

			hero.class.level = pregen.level;
			hero.class.characteristics = [ ...pregen.characteristics ];
			hero.class.subclasses.forEach(sc => {
				sc.selected = pregen.selectedSubclassIDs.includes(sc.id);
			});
		}

		const complication = SourcebookLogic.getComplications(sourcebooks).find(c => c.id === pregen.complicationID);
		if (complication) {
			hero.complication = Utils.copy(complication);
		}

		const getFeaturesWithChoices = () => {
			return HeroLogic.getFeatures(hero)
				.map(f => f.feature)
				.filter(FeatureLogic.isChoice)
				.filter(f => !FeatureLogic.isChosen(f, hero, sourcebooks))
				.filter(f => pregen.featureSelections.some(s => s.featureID === f.id));
		};

		let features = getFeaturesWithChoices();
		while (features.length > 0) {
			features.forEach(feature => {
				const selections = pregen.featureSelections.find(s => s.featureID === feature.id)?.selections;
				if (selections) {
					PregenLogic.setFeatureSelections(feature, selections, hero, sourcebooks);
				}
			});

			features = getFeaturesWithChoices();
		}

		HeroLogic.setLevel(hero, options, pregen.level);

		return hero;
	};

	static getFeatureSelections = (feature: Feature): (string[] | null) => {
		switch (feature.type) {
			case FeatureType.AncestryChoice:
				return feature.data.selected ? [ feature.data.selected.id ] : [];
			case FeatureType.AncestryFeatureChoice:
				return feature.data.selected ? [ feature.data.selected.id ] : [];
			case FeatureType.Choice:
				return [ ...feature.data.selected.map(o => o.id) ];
			case FeatureType.ClassAbility:
				return [ ...feature.data.selectedIDs ];
			case FeatureType.Companion:
				return feature.data.selected ? [ feature.data.selected.id ] : [];
			case FeatureType.Domain:
				return [ ...feature.data.selected.map(o => o.id) ];
			case FeatureType.DomainFeature:
				return [ ...feature.data.selected.map(o => o.id) ];
			case FeatureType.ItemChoice:
				return [ ...feature.data.selected.map(o => o.id) ];
			case FeatureType.Kit:
				return [ ...feature.data.selected.map(o => o.id) ];
			case FeatureType.LanguageChoice:
				return [ ...feature.data.selected ];
			case FeatureType.Perk:
				return [ ...feature.data.selected.map(o => o.id) ];
			case FeatureType.Retainer:
				return feature.data.selected ? [ feature.data.selected.id ] : [];
			case FeatureType.SkillChoice:
				return [ ...feature.data.selected ];
			case FeatureType.SummonChoice:
				return [ ...feature.data.selected.map(o => o.id) ];
			case FeatureType.TaggedFeatureChoice:
				return [ ...feature.data.selected.map(o => o.id) ];
			case FeatureType.TitleChoice:
				return [ ...feature.data.selected.map(o => o.id) ];
		};

		return null;
	};

	static setFeatureSelections = (feature: Feature, selections: string[], hero: Hero, sourcebooks: Sourcebook[]) => {
		switch (feature.type) {
			case FeatureType.AncestryChoice:
				if (selections.length === 1) {
					const ancestryID = selections[0];
					const ancestry = SourcebookLogic.getAncestries(sourcebooks).find(a => a.id === ancestryID);
					if (ancestry) {
						feature.data.selected = Utils.copy(ancestry);
					}
				}
				break;
			case FeatureType.AncestryFeatureChoice:
				if (selections.length === 1) {
					const featureID = selections[0];
					const features = SourcebookLogic.getAncestries(sourcebooks)
						.flatMap(a => AncestryLogic.getPurchasedFeatures(a))
						.map(f => f.feature);
					const ancestryFeature = features.find(f => f.id === featureID);
					if (ancestryFeature) {
						feature.data.selected = Utils.copy(ancestryFeature);
					}
				}
				break;
			case FeatureType.Choice: {
				let availableOptions = [ ...feature.data.options.map(o => o.feature) ];
				if (feature.data.count === 'ancestry') {
					availableOptions = SourcebookLogic.getAncestries(sourcebooks)
						.flatMap(a => AncestryLogic.getPurchasedFeatures(a))
						.map(f => f.feature);
				}
				feature.data.selected = availableOptions.filter(o => selections.includes(o.id)).map(Utils.copy);
				break;
			}
			case FeatureType.ClassAbility:
				feature.data.selectedIDs = selections;
				break;
			case FeatureType.Companion:
				if (selections.length === 1) {
					const monsterID = selections[0];
					const monster = SourcebookLogic.getMonsters(sourcebooks).find(m => m.id === monsterID);
					if (monster) {
						feature.data.selected = Utils.copy(monster);
					}
				}
				break;
			case FeatureType.Domain:
				feature.data.selected = selections.map(domainID => SourcebookLogic.getDomains(sourcebooks).find(d => d.id === domainID)).filter(d => !!d).map(Utils.copy);
				break;
			case FeatureType.DomainFeature: {
				const features = HeroLogic.getDomains(hero).flatMap(d => d.featuresByLevel).filter(lvl => lvl.level === feature.data.level).flatMap(lvl => lvl.features);
				feature.data.selected = selections.map(featureID => features.find(f => f.id === featureID)).filter(f => !!f).map(Utils.copy);
				break;
			}
			case FeatureType.ItemChoice:
				feature.data.selected = selections.map(itemID => SourcebookLogic.getItems(sourcebooks).find(i => i.id === itemID)).filter(i => !!i).map(Utils.copy);
				break;
			case FeatureType.Kit:
				feature.data.selected = selections.map(kitID => SourcebookLogic.getKits(sourcebooks).find(k => k.id === kitID)).filter(k => !!k).map(Utils.copy);
				break;
			case FeatureType.LanguageChoice:
				feature.data.selected = selections;
				break;
			case FeatureType.Perk:
				feature.data.selected = selections.map(perkID => SourcebookLogic.getPerks(sourcebooks).find(p => p.id === perkID)).filter(p => !!p).map(Utils.copy);
				break;
			case FeatureType.Retainer:
				if (selections.length === 1) {
					const monsterID = selections[0];
					const monster = SourcebookLogic.getMonsters(sourcebooks).find(m => m.id === monsterID);
					if (monster) {
						feature.data.selected = Utils.copy(monster);
					}
				}
				break;
			case FeatureType.SkillChoice:
				feature.data.selected = selections;
				break;
			case FeatureType.SummonChoice:
				feature.data.selected = selections.map(summonID => feature.data.options.find(o => o.id === summonID)).filter(s => !!s).map(Utils.copy);
				break;
			case FeatureType.TaggedFeatureChoice: {
				const taggedFeatures = HeroLogic.getFeatures(hero).map(f => f.feature).filter(f => f.type === FeatureType.TaggedFeature);
				feature.data.selected = selections.map(featureID => taggedFeatures.find(o => o.id === featureID)).filter(f => !!f).map(Utils.copy);
				break;
			}
			case FeatureType.TitleChoice:
				feature.data.selected = selections.map(titleID => SourcebookLogic.getTitles(sourcebooks).find(t => t.id === titleID)).filter(t => !!t).map(Utils.copy);
				break;
		};
	};
};
