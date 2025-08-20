import { Feature, FeatureAncestryChoice, FeatureChoice, FeatureClassAbility, FeatureCompanion, FeatureDomain, FeatureDomainFeature, FeatureItemChoice, FeatureKit, FeatureLanguageChoice, FeaturePerk, FeatureSkillChoice, FeatureSummon, FeatureTaggedFeatureChoice, FeatureTitleChoice } from '../../models/feature';
import { AbilityUpdateLogic } from './ability-update-logic';
import { Ancestry } from '../../models/ancestry';
import { CultureData } from '../../data/culture-data';
import { FeatureType } from '../../enums/feature-type';
import { FeatureUpdateLogic } from './feature-update-logic';
import { Hero } from '../../models/hero';
import { HeroLogic } from '../hero-logic';
import { ItemUpdateLogic } from './item-update-logic';
import { Sourcebook } from '../../models/sourcebook';
import { SourcebookData } from '../../data/sourcebook-data';
import { SourcebookLogic } from '../sourcebook-logic';
import { Utils } from '../../utils/utils';

export class HeroUpdateLogic {
	static updateHero = (hero: Hero, sourcebooks: Sourcebook[]) => {
		HeroUpdateLogic.updateHeroStructure(hero, sourcebooks);
		// HeroUpdateLogic.updateHeroData(hero, sourcebooks);
	};

	static updateHeroStructure = (hero: Hero, sourcebooks: Sourcebook[]) => {
		if (hero.picture === undefined) {
			hero.picture = null;
		}

		if (hero.folder === undefined) {
			hero.folder = '';
		}

		if (hero.settingIDs === undefined) {
			hero.settingIDs = [ SourcebookData.core.id, SourcebookData.orden.id ];
		}

		if (hero.ancestry) {
			hero.ancestry.features.forEach(FeatureUpdateLogic.updateFeature);
		}

		if (hero.career) {
			hero.career.features.forEach(FeatureUpdateLogic.updateFeature);

			if (hero.career.incitingIncidents === undefined) {
				hero.career.incitingIncidents = {
					options: [],
					selectedID: null
				};
			}
		}

		if (hero.class) {
			if (hero.class.primaryCharacteristicsOptions === undefined) {
				hero.class.primaryCharacteristicsOptions = [];
			}

			hero.class.featuresByLevel
				.flatMap(lvl => lvl.features)
				.forEach(FeatureUpdateLogic.updateFeature);
			hero.class.subclasses
				.flatMap(sc => sc.featuresByLevel)
				.flatMap(lvl => lvl.features)
				.forEach(FeatureUpdateLogic.updateFeature);

			hero.class.abilities.forEach(a => {
				if (a.sections === undefined) {
					a.sections = [];
				}
			});
		}

		if (hero.complication) {
			hero.complication.features.forEach(FeatureUpdateLogic.updateFeature);
		}

		if (hero.features === undefined) {
			hero.features = [];
		}

		hero.state.conditions.forEach(c => {
			if (c.text === undefined) {
				c.text = '';
			}
		});

		if (hero.state.surges === undefined) {
			hero.state.surges = 0;
		}

		if (hero.state.staminaTemp === undefined) {
			hero.state.staminaTemp = 0;
		}

		if (hero.state.xp === undefined) {
			hero.state.xp = 0;
		}

		if (hero.state.wealth === undefined) {
			hero.state.wealth = 1;
		}

		if (hero.state.inventory === undefined) {
			hero.state.inventory = [];
		}

		if (hero.state.projects === undefined) {
			hero.state.projects = [];
		}

		if (hero.state.controlledSlots === undefined) {
			hero.state.controlledSlots = [];
		}

		if (hero.state.notes === undefined) {
			hero.state.notes = '';
		}

		if (hero.state.encounterState === undefined) {
			hero.state.encounterState = 'ready';
		}

		if (hero.state.defeated === undefined) {
			hero.state.defeated = false;
		}

		hero.state.inventory.forEach(ItemUpdateLogic.updateItem);

		if (hero.abilityCustomizations === undefined) {
			hero.abilityCustomizations = [];
		}

		HeroLogic.getFormerAncestries(hero).flatMap(t => t.features).forEach(FeatureUpdateLogic.updateFeature);
		HeroLogic.getDomains(hero).flatMap(d => d.featuresByLevel).flatMap(lvl => lvl.features).forEach(FeatureUpdateLogic.updateFeature);
		HeroLogic.getTitles(hero).flatMap(t => t.features).forEach(FeatureUpdateLogic.updateFeature);

		HeroLogic.getFeatures(hero).map(f => f.feature).forEach(FeatureUpdateLogic.updateFeature);
		HeroLogic.getAbilities(hero, sourcebooks, false).map(a => a.ability).forEach(AbilityUpdateLogic.updateAbility);

		const x = hero.state as unknown as { heroicResource: number | undefined };
		if (x.heroicResource) {
			HeroLogic.getFeatures(hero).map(f => f.feature).filter(f => f.type === FeatureType.HeroicResource).forEach(f => {
				f.data.value = x.heroicResource || 0;
			});
			delete x.heroicResource;
		}
		// If this hero has no heroic resource, get it from the (possibly updated) class
		if (HeroLogic.getFeatures(hero).map(f => f.feature).filter(f => f.type === FeatureType.HeroicResource).length === 0) {
			const currentClass = hero.class;
			const updatedClass = SourcebookLogic.getClasses(sourcebooks).find(c => c.id === currentClass?.id);
			if (currentClass && updatedClass) {
				const heroicResources = updatedClass.featuresByLevel
					.filter(lvl => lvl.level === 1)
					.flatMap(lvl => lvl.features)
					.filter(f => f.type === FeatureType.HeroicResource);
				const heroicResourceIDs = heroicResources.map(f => f.id);
				const heroicResourceNames = heroicResources.map(f => f.name);
				currentClass.featuresByLevel[0].features = currentClass.featuresByLevel[0].features.filter(f => !heroicResourceIDs.includes(f.id) && !heroicResourceNames.includes(f.name));
				heroicResources.forEach(f => currentClass.featuresByLevel[0].features.push(f));
			}
		}

		HeroLogic.getKits(hero).forEach(k => {
			if (k.type === 'Standard') {
				k.type = '';
			}
		});
	};

	static updateHeroData = (hero: Hero, sourcebooks: Sourcebook[]) => {
		const original = Utils.copy(hero);

		if (original.ancestry) {
			const id = original.ancestry.id;
			const ancestry = SourcebookLogic.getAncestries(sourcebooks).find(a => a.id === id);
			if (ancestry) {
				hero.ancestry = ancestry;
			}
		}

		if (original.culture) {
			const id = original.culture.id;
			const culture = SourcebookLogic.getCultures(sourcebooks).find(c => c.id === id);
			if (culture) {
				hero.culture = culture;
			}

			if (hero.culture && (hero.culture.id === CultureData.bespoke.id)) {
				hero.culture.name = original.culture.name || CultureData.bespoke.name;
			}

			if (hero.culture) {
				const languages = SourcebookLogic.getLanguages(sourcebooks).map(l => l.name);
				hero.culture.languages = original.culture.languages.filter(l => languages.includes(l));
			}
		}

		if (original.career) {
			const id = original.career.id;
			const career = SourcebookLogic.getCareers(sourcebooks).find(c => c.id === id);
			if (career) {
				hero.career = career;

				hero.career.incitingIncidents.selectedID = original.career.incitingIncidents.selectedID;
			}
		}

		if (original.class) {
			const id = original.class.id;
			const heroClass = SourcebookLogic.getClasses(sourcebooks).find(c => c.id === id);
			if (heroClass) {
				hero.class = heroClass;

				// Level
				hero.class.level = original.class.level;

				// Characteristics
				hero.class.primaryCharacteristics = original.class.primaryCharacteristics;
				hero.class.characteristics = original.class.characteristics;

				// Update subclass
				hero.class.subclasses.forEach(sc => {
					const originalSubClass = original.class!.subclasses.find(s => s.id === sc.id);
					if (originalSubClass) {
						sc.selected = originalSubClass.selected;
					}
				});
			}
		}

		if (original.complication) {
			const id = original.complication.id;
			const complication = SourcebookLogic.getComplications(sourcebooks).find(c => c.id === id);
			if (complication) {
				hero.complication = complication;
			}
		}

		HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.forEach(f => {
				const originalFeature = HeroLogic.getFeatures(original)
					.map(of => of.feature)
					.find(of => of.id === f.id);

				if (originalFeature) {
					HeroUpdateLogic.updateFeatureData(f, originalFeature, hero, sourcebooks);
				}
			});
	};

	static updateFeatureData = (feature: Feature, originalFeature: Feature, hero: Hero, sourcebooks: Sourcebook[]) => {
		switch (feature.type) {
			case FeatureType.AncestryChoice: {
				const oFeature = originalFeature as FeatureAncestryChoice;

				if (oFeature.data.selected) {
					const ancestryID = oFeature.data.selected.id;
					feature.data.selected = SourcebookLogic.getAncestries(sourcebooks).find(a => a.id === ancestryID) || null;
				}
				break;
			}
			case FeatureType.AncestryFeatureChoice: {
				const oFeature = originalFeature as FeatureAncestryChoice;

				const ancestries: Ancestry[] = [];
				if (feature.data.source.customID) {
					const a = SourcebookLogic.getAncestries(sourcebooks).find(a => a.id === feature.data.source.customID);
					if (a) {
						ancestries.push(a);
					}
				}
				if (feature.data.source.current && hero.ancestry) {
					ancestries.push(hero.ancestry);
				}
				if (feature.data.source.former) {
					ancestries.push(...HeroLogic.getFormerAncestries(hero));
				}
				const availableOptions = ancestries
					.flatMap(a => a.features)
					.filter(f => f.type === FeatureType.Choice)
					.flatMap(f => f.data.options)
					.filter(opt => feature.data.value === opt.value)
					.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice)
					.map(opt => opt.feature);

				feature.data.selected = availableOptions.find(o => oFeature.data.selected?.id === o.id) || null;
				break;
			}
			case FeatureType.Choice: {
				const oFeature = originalFeature as FeatureChoice;

				const selectedIDs = oFeature.data.selected.map(s => s.id);
				let availableOptions = [ ...feature.data.options ];
				if (availableOptions.some(opt => opt.feature.type === FeatureType.AncestryFeatureChoice)) {
					availableOptions = availableOptions.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice);
					const additionalOptions = HeroLogic.getFormerAncestries(hero)
						.flatMap(a => a.features)
						.filter(f => f.type === FeatureType.Choice)
						.flatMap(f => f.data.options)
						.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice);
					availableOptions.push(...additionalOptions);
				}

				feature.data.selected = availableOptions.map(o => o.feature).filter(o => selectedIDs.includes(o.id));
				break;
			}
			case FeatureType.ClassAbility: {
				const oFeature = originalFeature as FeatureClassAbility;

				const abilityIDs = hero.class ? hero.class.abilities.map(a => a.id) : [];
				feature.data.selectedIDs = oFeature.data.selectedIDs.filter(id => abilityIDs.includes(id));
				break;
			}
			case FeatureType.Companion: {
				const oFeature = originalFeature as FeatureCompanion;
				feature.data.selected = oFeature.data.selected;
				break;
			}
			case FeatureType.Domain: {
				const oFeature = originalFeature as FeatureDomain;

				const selectedIDs = oFeature.data.selected.map(d => d.id);
				feature.data.selected = SourcebookLogic.getDomains(sourcebooks).filter(d => selectedIDs.includes(d.id));
				break;
			}
			case FeatureType.DomainFeature: {
				const oFeature = originalFeature as FeatureDomainFeature;

				const domainFeatures: Feature[] = [];
				HeroLogic.getDomains(hero).forEach(d => {
					d.featuresByLevel
						.filter(lvl => lvl.level === feature.data.level)
						.forEach(lvl => domainFeatures.push(...lvl.features));
				});

				const selectedIDs = oFeature.data.selected.map(f => f.id);
				feature.data.selected = domainFeatures.filter(df => selectedIDs.includes(df.id));
				break;
			}
			case FeatureType.ItemChoice: {
				const oFeature = originalFeature as FeatureItemChoice;

				const selectedIDs = oFeature.data.selected.map(i => i.id);
				feature.data.selected = SourcebookLogic.getItems(sourcebooks).filter(i => selectedIDs.includes(i.id));
				break;
			}
			case FeatureType.Kit: {
				const oFeature = originalFeature as FeatureKit;

				const selectedIDs = oFeature.data.selected.map(k => k.id);
				feature.data.selected = SourcebookLogic.getKits(sourcebooks).filter(k => selectedIDs.includes(k.id));
				break;
			}
			case FeatureType.LanguageChoice: {
				const oFeature = originalFeature as FeatureLanguageChoice;

				const languageNames = SourcebookLogic.getLanguages(sourcebooks)
					.map(l => l.name);
				feature.data.selected = oFeature.data.selected.filter(l => languageNames.includes(l));
				break;
			}
			case FeatureType.Perk: {
				const oFeature = originalFeature as FeaturePerk;

				const selectedIDs = oFeature.data.selected.map(p => p.id);
				feature.data.selected = SourcebookLogic.getPerks(sourcebooks).filter(p => selectedIDs.includes(p.id));
				break;
			}
			case FeatureType.SkillChoice: {
				const oFeature = originalFeature as FeatureSkillChoice;

				const skillNames = SourcebookLogic.getSkills(sourcebooks)
					.filter(s => oFeature.data.options.includes(s.name) || oFeature.data.listOptions.includes(s.list))
					.map(s => s.name);
				feature.data.selected = oFeature.data.selected.filter(s => skillNames.includes(s));
				break;
			}
			case FeatureType.Summon: {
				const oFeature = originalFeature as FeatureSummon;
				feature.data.selected = oFeature.data.selected;
				break;
			}
			case FeatureType.TaggedFeatureChoice: {
				const oFeature = originalFeature as FeatureTaggedFeatureChoice;

				const taggedFeatures = HeroLogic.getFeatures(hero)
					.map(f => f.feature)
					.filter(f => f.type === FeatureType.TaggedFeature)
					.filter(f => f.data.tag === oFeature.data.tag);
				const selectedIDs = oFeature.data.selected.map(f => f.id);
				feature.data.selected = taggedFeatures.filter(f => selectedIDs.includes(f.id));
				break;
			}
			case FeatureType.TitleChoice: {
				const oFeature = originalFeature as FeatureTitleChoice;

				const selectedIDs = oFeature.data.selected.map(p => p.id);
				feature.data.selected = SourcebookLogic.getTitles(sourcebooks).filter(t => selectedIDs.includes(t.id));
				break;
			}
		};
	};
}
