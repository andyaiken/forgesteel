import { AbilityUpdateLogic } from './ability-update-logic';
import { FeatureType } from '../../enums/feature-type';
import { FeatureUpdateLogic } from './feature-update-logic';
import { Hero } from '../../models/hero';
import { HeroLogic } from '../hero-logic';
import { Sourcebook } from '../../models/sourcebook';
import { SourcebookData } from '../../data/sourcebook-data';
import { SourcebookLogic } from '../sourcebook-logic';

export class HeroUpdateLogic {
	static updateHero = (hero: Hero, sourcebooks: Sourcebook[]) => {
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

		hero.state.inventory.forEach(item => {
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
}
