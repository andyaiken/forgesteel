import { MAX_CHAT_CODE_LENGTH, SharedElementKind, SharingLogic } from '@/logic/sharing-logic';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { useBuiltInSourcebooks, useHeroes, useHomebrewSourcebooks, useOptions, useSourcebooks } from '@/contexts/data-context';
import { Adventure } from '@/models/adventure';
import { Analytics } from '@/utils/analytics';
import { Ancestry } from '@/models/ancestry';
import { Career } from '@/models/career';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { Culture } from '@/models/culture';
import { CultureType } from '@/enums/culture-type';
import { Domain } from '@/models/domain';
import { Element } from '@/models/element';
import { Encounter } from '@/models/encounter';
import { Extension } from '@/models/extension';
import { ExtensionChangeType } from '@/enums/extension-change-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureLogic } from '@/logic/feature-logic';
import { Format } from '@/utils/format';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { HeroUpdateLogic } from '@/logic/update/hero-update-logic';
import { Imbuement } from '@/models/imbuement';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
import { Kit } from '@/models/kit';
import { MonsterGroup } from '@/models/monster-group';
import { Montage } from '@/models/montage';
import { Negotiation } from '@/models/negotiation';
import { Perk } from '@/models/perk';
import { Plot } from '@/models/plot';
import { Project } from '@/models/project';
import { ReactNode } from 'react';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SubClass } from '@/models/subclass';
import { TacticalMap } from '@/models/tactical-map';
import { Terrain } from '@/models/terrain';
import { Title } from '@/models/title';
import { UpdateLogic } from '@/logic/update/update-logic';
import { Utils } from '@/utils/utils';
import { notification } from 'antd';
import { useNavigation } from '@/hooks/use-navigation';

interface Props {
	notify: ReturnType<typeof notification.useNotification>[0];
	setDrawer: (drawer: ReactNode) => void;
	setSpinning: (spinning: boolean) => void;
	persistHero: (hero: Hero) => Promise<void>;
	persistHomebrewSourcebook: (sourcebook: Sourcebook) => Promise<void>;
}

export const useLibraryActions = (props: Props) => {
	const { notify, setDrawer, setSpinning, persistHero, persistHomebrewSourcebook } = props;
	const navigation = useNavigation();
	const options = useOptions();
	const heroes = useHeroes();
	const homebrewSourcebooks = useHomebrewSourcebooks();
	const builtInSourcebooks = useBuiltInSourcebooks();
	const sourcebooks = useSourcebooks();

	const createLibraryElement = (kind: SourcebookElementKind, sourcebookID: string, original: Element | null) => {
		const createAdventure = (original: Adventure | null, sourcebook: Sourcebook) => {
			let adventure: Adventure;
			if (original) {
				adventure = Utils.copy(original);
				adventure.id = Utils.guid();

				const updatePlot = (plot: Plot) => {
					plot.id = Utils.guid();
					plot.plots.forEach(updatePlot);
				};

				updatePlot(adventure.plot);
			} else {
				adventure = FactoryLogic.createAdventure();
			}

			sourcebook.adventures.push(adventure);
			return adventure.id;
		};

		const createAncestry = (original: Ancestry | null, sourcebook: Sourcebook) => {
			let ancestry: Ancestry;
			if (original) {
				ancestry = Utils.copy(original);
				ancestry.id = Utils.guid();
				ancestry.features.forEach(FeatureLogic.changeFeatureIDs);
				ancestry.features.forEach(UpdateLogic.updateFeature);
			} else {
				ancestry = FactoryLogic.createAncestry();
			}

			sourcebook.ancestries.push(ancestry);
			return ancestry.id;
		};

		const createCareer = (original: Career | null, sourcebook: Sourcebook) => {
			let career: Career;
			if (original) {
				career = Utils.copy(original);
				career.id = Utils.guid();
				career.features.forEach(FeatureLogic.changeFeatureIDs);
				career.features.forEach(UpdateLogic.updateFeature);
			} else {
				career = FactoryLogic.createCareer();
			}

			sourcebook.careers.push(career);
			return career.id;
		};

		const createClass = (original: HeroClass | null, sourcebook: Sourcebook) => {
			let heroClass: HeroClass;
			if (original) {
				heroClass = Utils.copy(original);
				heroClass.id = Utils.guid();

				// Make sure this has 10 levels
				while (heroClass.featuresByLevel.length < 10) {
					heroClass.featuresByLevel.push({
						level: heroClass.featuresByLevel.length + 1,
						features: []
					});
				}
				heroClass.subclasses.forEach(sc => {
					while (sc.featuresByLevel.length < 10) {
						sc.featuresByLevel.push({
							level: sc.featuresByLevel.length + 1,
							features: []
						});
					}
				});

				heroClass.featuresByLevel.flatMap(lvl => lvl.features).forEach(FeatureLogic.changeFeatureIDs);
				heroClass.featuresByLevel.flatMap(lvl => lvl.features).forEach(UpdateLogic.updateFeature);
				heroClass.abilities.forEach(a => a.id = Utils.guid());
				heroClass.abilities.forEach(UpdateLogic.updateAbility);
				heroClass.subclasses.forEach(sc => sc.id = Utils.guid());
				heroClass.subclasses.flatMap(sc => sc.featuresByLevel).flatMap(lvl => lvl.features).forEach(FeatureLogic.changeFeatureIDs);
				heroClass.subclasses.flatMap(sc => sc.featuresByLevel).flatMap(lvl => lvl.features).forEach(UpdateLogic.updateFeature);
				heroClass.subclasses.flatMap(sc => sc.abilities).forEach(a => a.id = Utils.guid());
				heroClass.subclasses.flatMap(sc => sc.abilities).forEach(UpdateLogic.updateAbility);
			} else {
				heroClass = FactoryLogic.createClass();
			}

			sourcebook.classes.push(heroClass);
			return heroClass.id;
		};

		const createComplication = (original: Complication | null, sourcebook: Sourcebook) => {
			let complication: Complication;
			if (original) {
				complication = Utils.copy(original);
				complication.id = Utils.guid();
				complication.features.forEach(FeatureLogic.changeFeatureIDs);
				complication.features.forEach(UpdateLogic.updateFeature);
			} else {
				complication = FactoryLogic.createComplication();
			}

			sourcebook.complications.push(complication);
			return complication.id;
		};

		const createCulture = (original: Culture | null, sourcebook: Sourcebook) => {
			let culture: Culture;
			if (original) {
				culture = Utils.copy(original);
				culture.id = Utils.guid();
				if (culture.environment) {
					UpdateLogic.updateFeature(culture.environment);
				}
				if (culture.organization) {
					UpdateLogic.updateFeature(culture.organization);
				}
				if (culture.upbringing) {
					UpdateLogic.updateFeature(culture.upbringing);
				}
				if (culture.language) {
					UpdateLogic.updateFeature(culture.language);
				}
			} else {
				culture = FactoryLogic.createCulture('', '', CultureType.Ancestral);
			}

			sourcebook.cultures.push(culture);
			return culture.id;
		};

		const createDomain = (original: Domain | null, sourcebook: Sourcebook) => {
			let domain: Domain;
			if (original) {
				domain = Utils.copy(original);
				domain.id = Utils.guid();

				// Make sure this has 10 levels
				while (domain.featuresByLevel.length < 10) {
					domain.featuresByLevel.push({
						level: domain.featuresByLevel.length + 1,
						features: []
					});
				}

				domain.featuresByLevel.flatMap(lvl => lvl.features).forEach(FeatureLogic.changeFeatureIDs);
				domain.featuresByLevel.flatMap(lvl => lvl.features).forEach(UpdateLogic.updateFeature);
			} else {
				domain = FactoryLogic.createDomain();
			}

			sourcebook.domains.push(domain);
			return domain.id;
		};

		const createEncounter = (original: Encounter | null, sourcebook: Sourcebook) => {
			let encounter: Encounter;
			if (original) {
				encounter = Utils.copy(original);
				encounter.id = Utils.guid();
				encounter.groups.forEach(g => g.id = Utils.guid());
				encounter.groups.flatMap(g => g.slots).forEach(s => s.id = Utils.guid());
			} else {
				encounter = FactoryLogic.createEncounter();
			}

			sourcebook.encounters.push(encounter);
			return encounter.id;
		};

		const createExtension = (original: Extension | null, sourcebook: Sourcebook) => {
			let extension: Extension;
			if (original) {
				extension = Utils.copy(original);
				extension.id = Utils.guid();
				extension.changes.forEach(c => {
					c.id = Utils.guid();
					// What the change adds needs new IDs too, or a hero using both extensions would get two of the same thing -
					// and with both applied to a monster group, encounters (which find monsters by ID) couldn't tell the two apart.
					// A replacement is left alone - it takes the ID of the feature it replaces
					switch (c.type) {
						case ExtensionChangeType.AddAbility:
							c.data.ability.id = Utils.guid();
							break;
						case ExtensionChangeType.AddFeature:
							FeatureLogic.changeFeatureIDs(c.data.feature);
							break;
						case ExtensionChangeType.AddChoiceOption:
							FeatureLogic.changeFeatureIDs(c.data.option.feature);
							break;
						case ExtensionChangeType.AddSummonOption:
							c.data.summon.monster.id = Utils.guid();
							c.data.summon.id = c.data.summon.monster.id;
							break;
						case ExtensionChangeType.AddMalice:
							FeatureLogic.changeFeatureIDs(c.data.malice);
							break;
						case ExtensionChangeType.AddMonster:
							c.data.monster.id = Utils.guid();
							break;
					}
				});
			} else {
				extension = FactoryLogic.createExtension();
			}

			sourcebook.extensions.push(extension);
			return extension.id;
		};

		const createImbuement = (original: Imbuement | null, sourcebook: Sourcebook) => {
			let imbuement: Imbuement;
			if (original) {
				imbuement = Utils.copy(original);
				imbuement.id = Utils.guid();
				if (imbuement.crafting) {
					imbuement.crafting.id = Utils.guid();
				}
				FeatureLogic.changeFeatureIDs(imbuement.feature);
				UpdateLogic.updateFeature(imbuement.feature);
			} else {
				imbuement = FactoryLogic.createImbuement({
					type: ItemType.Consumable1st,
					crafting: FactoryLogic.createProject({}),
					level: 1,
					feature: FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					})
				});
			}

			sourcebook.imbuements.push(imbuement);
			return imbuement.id;
		};

		const createItem = (original: Item | null, sourcebook: Sourcebook) => {
			let item: Item;
			if (original) {
				item = Utils.copy(original);
				item.id = Utils.guid();
				if (item.crafting) {
					item.crafting.id = Utils.guid();
				}
				item.featuresByLevel.flatMap(lvl => lvl.features).forEach(FeatureLogic.changeFeatureIDs);
				item.featuresByLevel.flatMap(lvl => lvl.features).forEach(UpdateLogic.updateFeature);
				item.imbuements.forEach(imbuement => {
					imbuement.id = Utils.guid();
					if (imbuement.crafting) {
						imbuement.crafting.id = Utils.guid();
					}
					FeatureLogic.changeFeatureIDs(imbuement.feature);
					UpdateLogic.updateFeature(imbuement.feature);
				});
			} else {
				item = FactoryLogic.createItem({
					id: Utils.guid(),
					name: '',
					description: '',
					type: ItemType.Consumable1st,
					crafting: FactoryLogic.createProject({})
				});
			}

			sourcebook.items.push(item);
			return item.id;
		};

		const createKit = (original: Kit | null, sourcebook: Sourcebook) => {
			let kit: Kit;
			if (original) {
				kit = Utils.copy(original);
				kit.id = Utils.guid();
				kit.features.forEach(FeatureLogic.changeFeatureIDs);
				kit.features.forEach(UpdateLogic.updateFeature);
			} else {
				kit = FactoryLogic.createKit();
			}

			sourcebook.kits.push(kit);
			return kit.id;
		};

		const createMonsterGroup = (original: MonsterGroup | null, sourcebook: Sourcebook) => {
			let monsterGroup: MonsterGroup;
			if (original) {
				monsterGroup = Utils.copy(original);
				monsterGroup.id = Utils.guid();
				monsterGroup.malice.forEach(FeatureLogic.changeFeatureIDs);
				monsterGroup.malice.forEach(UpdateLogic.updateFeature);
				monsterGroup.monsters.forEach(m => m.id = Utils.guid());
				monsterGroup.monsters.flatMap(m => m.features).forEach(FeatureLogic.changeFeatureIDs);
				monsterGroup.monsters.flatMap(m => m.features).forEach(UpdateLogic.updateFeature);
			} else {
				monsterGroup = FactoryLogic.createMonsterGroup();
			}

			sourcebook.monsterGroups.push(monsterGroup);
			return monsterGroup.id;
		};

		const createMontage = (original: Montage | null, sourcebook: Sourcebook) => {
			let montage: Montage;
			if (original) {
				montage = Utils.copy(original);
				montage.id = Utils.guid();
				montage.sections.forEach(s => s.id = Utils.guid());
			} else {
				montage = FactoryLogic.createMontage();
			}

			sourcebook.montages.push(montage);
			return montage.id;
		};

		const createNegotiation = (original: Negotiation | null, sourcebook: Sourcebook) => {
			let negotiation: Negotiation;
			if (original) {
				negotiation = Utils.copy(original);
				negotiation.id = Utils.guid();
			} else {
				negotiation = FactoryLogic.createNegotiation();
			}

			sourcebook.negotiations.push(negotiation);
			return negotiation.id;
		};

		const createPerk = (original: Perk | null, sourcebook: Sourcebook) => {
			let perk: Perk;
			if (original) {
				perk = Utils.copy(original);
				FeatureLogic.changeFeatureIDs(perk);
				UpdateLogic.updateFeature(perk);
			} else {
				perk = FactoryLogic.createPerk();
			}

			sourcebook.perks.push(perk);
			return perk.id;
		};

		const createProject = (original: Project | null, sourcebook: Sourcebook) => {
			let project: Project;
			if (original) {
				project = Utils.copy(original);
				project.id = Utils.guid();
			} else {
				project = FactoryLogic.createProject({});
			}

			sourcebook.projects.push(project);
			return project.id;
		};

		const createSubClass = (original: SubClass | null, sourcebook: Sourcebook) => {
			let sc: SubClass;
			if (original) {
				sc = Utils.copy(original);
				sc.id = Utils.guid();

				// Make sure this has 10 levels
				while (sc.featuresByLevel.length < 10) {
					sc.featuresByLevel.push({
						level: sc.featuresByLevel.length + 1,
						features: []
					});
				}

				sc.featuresByLevel.flatMap(lvl => lvl.features).forEach(FeatureLogic.changeFeatureIDs);
				sc.featuresByLevel.flatMap(lvl => lvl.features).forEach(UpdateLogic.updateFeature);
				sc.abilities.forEach(a => a.id = Utils.guid());
				sc.abilities.forEach(UpdateLogic.updateAbility);
			} else {
				sc = FactoryLogic.createSubclass();
			}

			sourcebook.subclasses.push(sc);
			return sc.id;
		};

		const createTacticalMap = (original: TacticalMap | null, sourcebook: Sourcebook) => {
			let map: TacticalMap;
			if (original) {
				map = Utils.copy(original);
				map.id = Utils.guid();
			} else {
				map = FactoryLogic.createTacticalMap();
			}

			sourcebook.tacticalMaps.push(map);
			return map.id;
		};

		const createTerrain = (original: Terrain | null, sourcebook: Sourcebook) => {
			let terrain: Terrain;
			if (original) {
				terrain = Utils.copy(original);
				terrain.id = Utils.guid();
				terrain.sections.forEach(s => s.id = Utils.guid());
			} else {
				terrain = FactoryLogic.createTerrain();
			}

			sourcebook.terrain.push(terrain);
			return terrain.id;
		};

		const createTitle = (original: Title | null, sourcebook: Sourcebook) => {
			let title: Title;
			if (original) {
				title = Utils.copy(original);
				title.id = Utils.guid();
				title.features.forEach(FeatureLogic.changeFeatureIDs);
				title.features.forEach(UpdateLogic.updateFeature);
			} else {
				title = FactoryLogic.createTitle();
			}

			sourcebook.titles.push(title);
			return title.id;
		};

		Analytics.logHomebrewCreated(kind);

		const sourcebooks = Utils.copy(homebrewSourcebooks);
		let sourcebook = sourcebooks.find(sb => sb.id === sourcebookID) || null;
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
		}

		let id = '';
		switch (kind) {
			case 'adventure':
				id = createAdventure(original as Adventure | null, sourcebook);
				break;
			case 'ancestry':
				id = createAncestry(original as Ancestry | null, sourcebook);
				break;
			case 'career':
				id = createCareer(original as Career | null, sourcebook);
				break;
			case 'class':
				id = createClass(original as HeroClass | null, sourcebook);
				break;
			case 'complication':
				id = createComplication(original as Complication | null, sourcebook);
				break;
			case 'culture':
				id = createCulture(original as Culture | null, sourcebook);
				break;
			case 'domain':
				id = createDomain(original as Domain | null, sourcebook);
				break;
			case 'encounter':
				id = createEncounter(original as Encounter | null, sourcebook);
				break;
			case 'extension':
				id = createExtension(original as Extension | null, sourcebook);
				break;
			case 'imbuement':
				id = createImbuement(original as Imbuement | null, sourcebook);
				break;
			case 'item':
				id = createItem(original as Item | null, sourcebook);
				break;
			case 'kit':
				id = createKit(original as Kit | null, sourcebook);
				break;
			case 'monster-group':
				id = createMonsterGroup(original as MonsterGroup | null, sourcebook);
				break;
			case 'montage':
				id = createMontage(original as Montage | null, sourcebook);
				break;
			case 'negotiation':
				id = createNegotiation(original as Negotiation | null, sourcebook);
				break;
			case 'perk':
				id = createPerk(original as Perk | null, sourcebook);
				break;
			case 'project':
				id = createProject(original as Project | null, sourcebook);
				break;
			case 'subclass':
				id = createSubClass(original as SubClass | null, sourcebook);
				break;
			case 'tactical-map':
				id = createTacticalMap(original as TacticalMap | null, sourcebook);
				break;
			case 'terrain':
				id = createTerrain(original as Terrain | null, sourcebook);
				break;
			case 'title':
				id = createTitle(original as Title | null, sourcebook);
				break;
		}

		persistHomebrewSourcebook(sourcebook)
			.then(() => navigation.goToLibraryEdit(kind, sourcebook.id, id));
	};

	const moveLibraryElement = (kind: SourcebookElementKind, sourcebookID: string, element: Element) => {
		const sourcebooks = Utils.copy(homebrewSourcebooks);

		let sourceSourcebook: Sourcebook | undefined = undefined;
		switch (kind) {
			case 'adventure':
				sourceSourcebook = SourcebookLogic.getAdventureSourcebook(sourcebooks, element as Adventure);
				break;
			case 'ancestry':
				sourceSourcebook = SourcebookLogic.getAncestrySourcebook(sourcebooks, element as Ancestry);
				break;
			case 'career':
				sourceSourcebook = SourcebookLogic.getCareerSourcebook(sourcebooks, element as Career);
				break;
			case 'class':
				sourceSourcebook = SourcebookLogic.getClassSourcebook(sourcebooks, element as HeroClass);
				break;
			case 'complication':
				sourceSourcebook = SourcebookLogic.getComplicationSourcebook(sourcebooks, element as Complication);
				break;
			case 'culture':
				sourceSourcebook = SourcebookLogic.getCultureSourcebook(sourcebooks, element as Culture);
				break;
			case 'domain':
				sourceSourcebook = SourcebookLogic.getDomainSourcebook(sourcebooks, element as Domain);
				break;
			case 'encounter':
				sourceSourcebook = SourcebookLogic.getEncounterSourcebook(sourcebooks, element as Encounter);
				break;
			case 'extension':
				sourceSourcebook = SourcebookLogic.getExtensionSourcebook(sourcebooks, element as Extension);
				break;
			case 'imbuement':
				sourceSourcebook = SourcebookLogic.getImbuementSourcebook(sourcebooks, element as Imbuement);
				break;
			case 'item':
				sourceSourcebook = SourcebookLogic.getItemSourcebook(sourcebooks, element as Item);
				break;
			case 'kit':
				sourceSourcebook = SourcebookLogic.getKitSourcebook(sourcebooks, element as Kit);
				break;
			case 'monster-group':
				sourceSourcebook = SourcebookLogic.getMonsterGroupSourcebook(sourcebooks, element as MonsterGroup);
				break;
			case 'montage':
				sourceSourcebook = SourcebookLogic.getMontageSourcebook(sourcebooks, element as Montage);
				break;
			case 'negotiation':
				sourceSourcebook = SourcebookLogic.getNegotiationSourcebook(sourcebooks, element as Negotiation);
				break;
			case 'perk':
				sourceSourcebook = SourcebookLogic.getPerkSourcebook(sourcebooks, element as Perk);
				break;
			case 'project':
				sourceSourcebook = SourcebookLogic.getProjectSourcebook(sourcebooks, element as Project);
				break;
			case 'subclass':
				sourceSourcebook = SourcebookLogic.getSubclassSourcebook(sourcebooks, element as SubClass);
				break;
			case 'tactical-map':
				sourceSourcebook = SourcebookLogic.getTacticalMapSourcebook(sourcebooks, element as TacticalMap);
				break;
			case 'terrain':
				sourceSourcebook = SourcebookLogic.getTerrainSourcebook(sourcebooks, element as Terrain);
				break;
			case 'title':
				sourceSourcebook = SourcebookLogic.getTitleSourcebook(sourcebooks, element as Title);
				break;
		}

		if (!sourceSourcebook) {
			return;
		}

		// Get destination sourcebook
		let destinationSourcebook = sourcebooks.find(sb => sb.id === sourcebookID) || null;
		if (!destinationSourcebook) {
			destinationSourcebook = FactoryLogic.createSourcebook();
		}

		switch (kind) {
			case 'adventure':
				destinationSourcebook.adventures.push(element as Adventure);
				sourceSourcebook.adventures = sourceSourcebook.adventures.filter(x => x.id !== element.id);
				break;
			case 'ancestry':
				destinationSourcebook.ancestries.push(element as Ancestry);
				sourceSourcebook.ancestries = sourceSourcebook.ancestries.filter(x => x.id !== element.id);
				break;
			case 'career':
				destinationSourcebook.careers.push(element as Career);
				sourceSourcebook.careers = sourceSourcebook.careers.filter(x => x.id !== element.id);
				break;
			case 'class':
				destinationSourcebook.classes.push(element as HeroClass);
				sourceSourcebook.classes = sourceSourcebook.classes.filter(x => x.id !== element.id);
				break;
			case 'complication':
				destinationSourcebook.complications.push(element as Complication);
				sourceSourcebook.complications = sourceSourcebook.complications.filter(x => x.id !== element.id);
				break;
			case 'culture':
				destinationSourcebook.cultures.push(element as Culture);
				sourceSourcebook.cultures = sourceSourcebook.cultures.filter(x => x.id !== element.id);
				break;
			case 'domain':
				destinationSourcebook.domains.push(element as Domain);
				sourceSourcebook.domains = sourceSourcebook.domains.filter(x => x.id !== element.id);
				break;
			case 'encounter':
				destinationSourcebook.encounters.push(element as Encounter);
				sourceSourcebook.encounters = sourceSourcebook.encounters.filter(x => x.id !== element.id);
				break;
			case 'extension':
				destinationSourcebook.extensions.push(element as Extension);
				sourceSourcebook.extensions = sourceSourcebook.extensions.filter(x => x.id !== element.id);
				break;
			case 'imbuement':
				destinationSourcebook.imbuements.push(element as Imbuement);
				sourceSourcebook.imbuements = sourceSourcebook.imbuements.filter(x => x.id !== element.id);
				break;
			case 'item':
				destinationSourcebook.items.push(element as Item);
				sourceSourcebook.items = sourceSourcebook.items.filter(x => x.id !== element.id);
				break;
			case 'kit':
				destinationSourcebook.kits.push(element as Kit);
				sourceSourcebook.kits = sourceSourcebook.kits.filter(x => x.id !== element.id);
				break;
			case 'monster-group':
				destinationSourcebook.monsterGroups.push(element as MonsterGroup);
				sourceSourcebook.monsterGroups = sourceSourcebook.monsterGroups.filter(x => x.id !== element.id);
				break;
			case 'montage':
				destinationSourcebook.montages.push(element as Montage);
				sourceSourcebook.montages = sourceSourcebook.montages.filter(x => x.id !== element.id);
				break;
			case 'negotiation':
				destinationSourcebook.negotiations.push(element as Negotiation);
				sourceSourcebook.negotiations = sourceSourcebook.negotiations.filter(x => x.id !== element.id);
				break;
			case 'perk':
				destinationSourcebook.perks.push(element as Perk);
				sourceSourcebook.perks = sourceSourcebook.perks.filter(x => x.id !== element.id);
				break;
			case 'project':
				destinationSourcebook.projects.push(element as Project);
				sourceSourcebook.projects = sourceSourcebook.projects.filter(x => x.id !== element.id);
				break;
			case 'subclass':
				destinationSourcebook.subclasses.push(element as SubClass);
				sourceSourcebook.subclasses = sourceSourcebook.subclasses.filter(x => x.id !== element.id);
				break;
			case 'tactical-map':
				destinationSourcebook.tacticalMaps.push(element as TacticalMap);
				sourceSourcebook.tacticalMaps = sourceSourcebook.tacticalMaps.filter(x => x.id !== element.id);
				break;
			case 'terrain':
				destinationSourcebook.terrain.push(element as Terrain);
				sourceSourcebook.terrain = sourceSourcebook.terrain.filter(x => x.id !== element.id);
				break;
			case 'title':
				destinationSourcebook.titles.push(element as Title);
				sourceSourcebook.titles = sourceSourcebook.titles.filter(x => x.id !== element.id);
				break;
		}

		persistHomebrewSourcebook(destinationSourcebook)
			.then(() => persistHomebrewSourcebook(sourceSourcebook));
	};

	const deleteLibraryElement = (kind: SourcebookElementKind, sourcebookID: string, element: Element) => {
		const copy = Utils.copy(homebrewSourcebooks);
		const sourcebook = copy.find(sb => sb.id === sourcebookID);
		if (sourcebook) {
			switch (kind) {
				case 'adventure':
					sourcebook.adventures = sourcebook.adventures.filter(x => x.id !== element.id);
					break;
				case 'ancestry':
					sourcebook.ancestries = sourcebook.ancestries.filter(x => x.id !== element.id);
					break;
				case 'career':
					sourcebook.careers = sourcebook.careers.filter(x => x.id !== element.id);
					break;
				case 'class':
					sourcebook.classes = sourcebook.classes.filter(x => x.id !== element.id);
					break;
				case 'complication':
					sourcebook.complications = sourcebook.complications.filter(x => x.id !== element.id);
					break;
				case 'culture':
					sourcebook.cultures = sourcebook.cultures.filter(x => x.id !== element.id);
					break;
				case 'domain':
					sourcebook.domains = sourcebook.domains.filter(x => x.id !== element.id);
					break;
				case 'encounter':
					sourcebook.encounters = sourcebook.encounters.filter(x => x.id !== element.id);
					break;
				case 'extension':
					sourcebook.extensions = sourcebook.extensions.filter(x => x.id !== element.id);
					break;
				case 'imbuement':
					sourcebook.imbuements = sourcebook.imbuements.filter(x => x.id !== element.id);
					break;
				case 'item':
					sourcebook.items = sourcebook.items.filter(x => x.id !== element.id);
					break;
				case 'kit':
					sourcebook.kits = sourcebook.kits.filter(x => x.id !== element.id);
					break;
				case 'monster-group':
					sourcebook.monsterGroups = sourcebook.monsterGroups.filter(x => x.id !== element.id);
					break;
				case 'montage':
					sourcebook.montages = sourcebook.montages.filter(x => x.id !== element.id);
					break;
				case 'negotiation':
					sourcebook.negotiations = sourcebook.negotiations.filter(x => x.id !== element.id);
					break;
				case 'perk':
					sourcebook.perks = sourcebook.perks.filter(x => x.id !== element.id);
					break;
				case 'project':
					sourcebook.projects = sourcebook.projects.filter(x => x.id !== element.id);
					break;
				case 'subclass':
					sourcebook.subclasses = sourcebook.subclasses.filter(x => x.id !== element.id);
					break;
				case 'tactical-map':
					sourcebook.tacticalMaps = sourcebook.tacticalMaps.filter(x => x.id !== element.id);
					break;
				case 'terrain':
					sourcebook.terrain = sourcebook.terrain.filter(x => x.id !== element.id);
					break;
				case 'title':
					sourcebook.titles = sourcebook.titles.filter(x => x.id !== element.id);
					break;
			}

			const affected = [ sourcebook ];
			if (kind === 'class') {
				copy.forEach(sb => {
					const orphaned = sb.subclasses.filter(sc => sc.classID === element.id);
					if (orphaned.length > 0) {
						orphaned.forEach(sc => sc.classID = '');
						if (!affected.includes(sb)) {
							affected.push(sb);
						}
					}
				});
			}

			Promise.all(affected.map(persistHomebrewSourcebook))
				.then(() => navigation.goToLibrary(kind, element.id));
		}

		setDrawer(null);
	};

	const saveLibraryElement = (kind: SourcebookElementKind, sourcebookID: string, element: Element) => {
		Analytics.logHomebrewEdited(kind);

		const copy = Utils.copy(homebrewSourcebooks);
		const sourcebook = copy.find(sb => sb.id === sourcebookID);
		if (sourcebook) {
			switch (kind) {
				case 'adventure':
					sourcebook.adventures = sourcebook.adventures.map(x => x.id === element.id ? element : x) as Adventure[];
					break;
				case 'ancestry':
					sourcebook.ancestries = sourcebook.ancestries.map(x => x.id === element.id ? element : x) as Ancestry[];
					break;
				case 'career':
					sourcebook.careers = sourcebook.careers.map(x => x.id === element.id ? element : x) as Career[];
					break;
				case 'class':
					sourcebook.classes = sourcebook.classes.map(x => x.id === element.id ? element : x) as HeroClass[];
					break;
				case 'complication':
					sourcebook.complications = sourcebook.complications.map(x => x.id === element.id ? element : x) as Complication[];
					break;
				case 'culture':
					sourcebook.cultures = sourcebook.cultures.map(x => x.id === element.id ? element : x) as Culture[];
					break;
				case 'domain':
					sourcebook.domains = sourcebook.domains.map(x => x.id === element.id ? element : x) as Domain[];
					break;
				case 'encounter':
					sourcebook.encounters = sourcebook.encounters.map(x => x.id === element.id ? element : x) as Encounter[];
					break;
				case 'extension':
					sourcebook.extensions = sourcebook.extensions.map(x => x.id === element.id ? element : x) as Extension[];
					break;
				case 'imbuement':
					sourcebook.imbuements = sourcebook.imbuements.map(x => x.id === element.id ? element : x) as Imbuement[];
					break;
				case 'item':
					sourcebook.items = sourcebook.items.map(x => x.id === element.id ? element : x) as Item[];
					break;
				case 'kit':
					sourcebook.kits = sourcebook.kits.map(x => x.id === element.id ? element : x) as Kit[];
					break;
				case 'monster-group':
					sourcebook.monsterGroups = sourcebook.monsterGroups.map(x => x.id === element.id ? element : x) as MonsterGroup[];
					break;
				case 'montage':
					sourcebook.montages = sourcebook.montages.map(x => x.id === element.id ? element : x) as Montage[];
					break;
				case 'negotiation':
					sourcebook.negotiations = sourcebook.negotiations.map(x => x.id === element.id ? element : x) as Negotiation[];
					break;
				case 'perk':
					sourcebook.perks = sourcebook.perks.map(x => x.id === element.id ? element : x) as Perk[];
					break;
				case 'project':
					sourcebook.projects = sourcebook.projects.map(x => x.id === element.id ? element : x) as Project[];
					break;
				case 'subclass':
					sourcebook.subclasses = sourcebook.subclasses.map(x => x.id === element.id ? element : x) as SubClass[];
					break;
				case 'tactical-map':
					sourcebook.tacticalMaps = sourcebook.tacticalMaps.map(x => x.id === element.id ? element : x) as TacticalMap[];
					break;
				case 'terrain':
					sourcebook.terrain = sourcebook.terrain.map(x => x.id === element.id ? element : x) as Terrain[];
					break;
				case 'title':
					sourcebook.titles = sourcebook.titles.map(x => x.id === element.id ? element : x) as Title[];
					break;
			}

			persistHomebrewSourcebook(sourcebook)
				.then(() => {
					const allSourcebooks = SourcebookLogic.getSourcebooks(builtInSourcebooks, copy);
					const heroesCopy = Utils.copy(heroes);
					heroesCopy
						.filter(hero => hero.sourcebookIDs.includes(sourcebook.id))
						.forEach(hero => {
							HeroUpdateLogic.updateHero(hero, allSourcebooks);
							persistHero(hero);
						});
				})
				.then(() => navigation.goToLibrary(kind, element.id));
		}
	};

	const importLibraryElement = (kind: SourcebookElementKind, sourcebookID: string, element: Element) => {
		const elementIDs = sourcebooks.flatMap(sb => SourcebookLogic.getElements(sb)).map(e => e.element.id);
		if (elementIDs.includes(element.id)) {
			element.id = Utils.guid();
		}
		if (kind === 'monster-group') {
			const group = element as MonsterGroup;
			group.monsters.forEach(m => m.id = Utils.guid());
		}

		const copy = Utils.copy(homebrewSourcebooks);
		let sourcebook = copy.find(sb => sb.id === sourcebookID);
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
		}

		switch (kind) {
			case 'adventure':
				sourcebook.adventures.push(element as Adventure);
				sourcebook.adventures = Collections.sort<Element>(sourcebook.adventures, item => item.name) as Adventure[];
				break;
			case 'ancestry':
				sourcebook.ancestries.push(element as Ancestry);
				sourcebook.ancestries = Collections.sort<Element>(sourcebook.ancestries, item => item.name) as Ancestry[];
				break;
			case 'career':
				sourcebook.careers.push(element as Career);
				sourcebook.careers = Collections.sort<Element>(sourcebook.careers, item => item.name) as Career[];
				break;
			case 'class':
				sourcebook.classes.push(element as HeroClass);
				sourcebook.classes = Collections.sort<Element>(sourcebook.classes, item => item.name) as HeroClass[];
				break;
			case 'complication':
				sourcebook.complications.push(element as Complication);
				sourcebook.complications = Collections.sort<Element>(sourcebook.complications, item => item.name) as Complication[];
				break;
			case 'culture':
				sourcebook.cultures.push(element as Culture);
				sourcebook.cultures = Collections.sort<Element>(sourcebook.cultures, item => item.name) as Culture[];
				break;
			case 'domain':
				sourcebook.domains.push(element as Domain);
				sourcebook.domains = Collections.sort<Element>(sourcebook.domains, item => item.name) as Domain[];
				break;
			case 'encounter':
				sourcebook.encounters.push(element as Encounter);
				sourcebook.encounters = Collections.sort<Element>(sourcebook.encounters, item => item.name) as Encounter[];
				break;
			case 'extension':
				sourcebook.extensions.push(element as Extension);
				sourcebook.extensions = Collections.sort<Element>(sourcebook.extensions, item => item.name) as Extension[];
				break;
			case 'imbuement':
				sourcebook.imbuements.push(element as Imbuement);
				sourcebook.imbuements = Collections.sort<Element>(sourcebook.imbuements, imbuement => imbuement.name) as Imbuement[];
				break;
			case 'item':
				sourcebook.items.push(element as Item);
				sourcebook.items = Collections.sort<Element>(sourcebook.items, item => item.name) as Item[];
				break;
			case 'kit':
				sourcebook.kits.push(element as Kit);
				sourcebook.kits = Collections.sort<Element>(sourcebook.kits, item => item.name) as Kit[];
				break;
			case 'monster-group':
				sourcebook.monsterGroups.push(element as MonsterGroup);
				sourcebook.monsterGroups = Collections.sort<Element>(sourcebook.monsterGroups, item => item.name) as MonsterGroup[];
				break;
			case 'montage':
				sourcebook.montages.push(element as Montage);
				sourcebook.montages = Collections.sort<Element>(sourcebook.montages, item => item.name) as Montage[];
				break;
			case 'negotiation':
				sourcebook.negotiations.push(element as Negotiation);
				sourcebook.negotiations = Collections.sort<Element>(sourcebook.negotiations, item => item.name) as Negotiation[];
				break;
			case 'perk':
				sourcebook.perks.push(element as Perk);
				sourcebook.perks = Collections.sort<Element>(sourcebook.perks, item => item.name) as Perk[];
				break;
			case 'project':
				sourcebook.projects.push(element as Project);
				sourcebook.projects = Collections.sort<Element>(sourcebook.projects, item => item.name) as Project[];
				break;
			case 'subclass':
				sourcebook.subclasses.push(element as SubClass);
				sourcebook.subclasses = Collections.sort<Element>(sourcebook.subclasses, item => item.name) as SubClass[];
				break;
			case 'tactical-map':
				sourcebook.tacticalMaps.push(element as TacticalMap);
				sourcebook.tacticalMaps = Collections.sort<Element>(sourcebook.tacticalMaps, item => item.name) as TacticalMap[];
				break;
			case 'terrain':
				sourcebook.terrain.push(element as Terrain);
				sourcebook.terrain = Collections.sort<Element>(sourcebook.terrain, item => item.name) as Terrain[];
				break;
			case 'title':
				sourcebook.titles.push(element as Title);
				sourcebook.titles = Collections.sort<Element>(sourcebook.titles, item => item.name) as Title[];
				break;
		}

		UpdateLogic.updateSourcebook(sourcebook);

		setDrawer(null);
		persistHomebrewSourcebook(sourcebook)
			.then(() => navigation.goToLibrary(kind));
	};

	const copyLibraryElementCode = async (kind: SharedElementKind, element: Element) => {
		let code: string;
		try {
			code = await SharingLogic.encode(kind, element);
		} catch {
			notify.error({
				title: 'Not Copied',
				description: `Forge Steel could not create a code for this ${kind}.`,
				placement: 'top'
			});
			return;
		}

		try {
			await window.navigator.clipboard.writeText(code);
		} catch {
			notify.error({
				title: 'Not Copied',
				description: 'Forge Steel could not use your clipboard; you can use Export as Data instead.',
				placement: 'top'
			});
			return;
		}

		if (code.length > MAX_CHAT_CODE_LENGTH) {
			notify.warning({
				title: `${element.name || Format.capitalize(kind)} Copied`,
				description: `The code is in your clipboard, but at ${code.length} characters it is too long for one message in most chat apps. Send it in two parts for the recipient to paste one after the other, or use Export as Data instead.`,
				placement: 'top'
			});
			return;
		}

		notify.info({
			title: `${element.name || Format.capitalize(kind)} Copied`,
			description: `A code for this ${kind} is now in your clipboard; anyone you send it to can paste it into their hero.`,
			placement: 'top'
		});
	};

	const exportLibraryElementData = (category: string, element: Element) => {
		const name = element.name || `Unnamed ${Format.capitalize(category.split('-').join(' '))}`;

		Utils.exportData(name, element, category);
	};

	const exportLibraryElementImage = (category: string, element: Element) => {
		const name = element.name || `Unnamed ${Format.capitalize(category.split('-').join(' '))}`;

		const pageIds: string[] = [];
		document.querySelectorAll(`[id^=${category.toLowerCase()}-${element.id}-page]`).forEach(elem => pageIds.push(elem.id));

		Utils.exportImage(pageIds, name);
	};

	const exportLibraryElementPdf = (category: string, element: Element, resolution: 'standard' | 'high') => {
		setSpinning(true);
		Utils.wait(500).then(() => {
			const name = element.name || `Unnamed ${Format.capitalize(category.split('-').join(' '))}`;

			const pageIds: string[] = [];
			document.querySelectorAll(`[id^=${category.toLowerCase()}-${element.id}-page]`).forEach(elem => pageIds.push(elem.id));

			Utils.elementsToPdf(pageIds, name, options.classicSheetPageSize, resolution)
				.then(() => setSpinning(false));
		});
	};

	return {
		createLibraryElement,
		moveLibraryElement,
		deleteLibraryElement,
		saveLibraryElement,
		importLibraryElement,
		copyLibraryElementCode,
		exportLibraryElementData,
		exportLibraryElementImage,
		exportLibraryElementPdf
	};
};
