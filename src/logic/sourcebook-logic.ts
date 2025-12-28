import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { Ability } from '@/models/ability';
import { Adventure } from '@/models/adventure';
import { AdventureLogic } from '@/logic/adventure-logic';
import { Ancestry } from '@/models/ancestry';
import { Career } from '@/models/career';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { Culture } from '@/models/culture';
import { Domain } from '@/models/domain';
import { Element } from '@/models/element';
import { Encounter } from '@/models/encounter';
import { EncounterLogic } from '@/logic/encounter-logic';
import { Feature } from '@/models/feature';
import { FeatureFlags } from '@/utils/feature-flags';
import { FeatureType } from '@/enums/feature-type';
import { HeroClass } from '@/models/class';
import { Imbuement } from '@/models/imbuement';
import { Item } from '@/models/item';
import { Kit } from '@/models/kit';
import { Language } from '@/models/language';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { Montage } from '@/models/montage';
import { Negotiation } from '@/models/negotiation';
import { Options } from '@/models/options';
import { Perk } from '@/models/perk';
import { Project } from '@/models/project';
import { Random } from '@/utils/random';
import { Skill } from '@/models/skill';
import { SkillList } from '@/enums/skill-list';
import { SourcebookData } from '@/data/sourcebook-data';
import { SubClass } from '@/models/subclass';
import { TacticalMap } from '@/models/tactical-map';
import { Terrain } from '@/models/terrain';
import { Title } from '@/models/title';

export class SourcebookLogic {
	static getSourcebooks = (homebrew: Sourcebook[] = []) => {
		const list: Sourcebook[] = [
			// Official
			SourcebookData.core,
			SourcebookData.orden,

			// Third Party
			SourcebookData.community,
			SourcebookData.lookOut,
			SourcebookData.magazineBlacksmith,
			SourcebookData.magazineRatcatcher,
			SourcebookData.triglav
		];

		if (FeatureFlags.hasFlag(FeatureFlags.playtest.code)) {
			list.push(SourcebookData.patreon);
			list.push(SourcebookData.summoner);
		}

		if (FeatureFlags.hasFlag(FeatureFlags.communityPreRelease.code)) {
			list.push(SourcebookData.communityPrerelease);
		}

		list.push(...homebrew);

		return list;
	};

	static getElements = (sourcebook: Sourcebook): { element: Element, type: SourcebookElementKind }[] => {
		return [
			...sourcebook.adventures.map(x => ({ element: x, type: 'adventure' as SourcebookElementKind })),
			...sourcebook.ancestries.map(x => ({ element: x, type: 'ancestry' as SourcebookElementKind })),
			...sourcebook.careers.map(x => ({ element: x, type: 'career' as SourcebookElementKind })),
			...sourcebook.classes.map(x => ({ element: x, type: 'class' as SourcebookElementKind })),
			...sourcebook.complications.map(x => ({ element: x, type: 'complication' as SourcebookElementKind })),
			...sourcebook.cultures.map(x => ({ element: x, type: 'culture' as SourcebookElementKind })),
			...sourcebook.domains.map(x => ({ element: x, type: 'domain' as SourcebookElementKind })),
			...sourcebook.encounters.map(x => ({ element: x, type: 'encounter' as SourcebookElementKind })),
			...sourcebook.imbuements.map(x => ({ element: x, type: 'imbuement' as SourcebookElementKind })),
			...sourcebook.items.map(x => ({ element: x, type: 'item' as SourcebookElementKind })),
			...sourcebook.kits.map(x => ({ element: x, type: 'kit' as SourcebookElementKind })),
			...sourcebook.monsterGroups.map(x => ({ element: x, type: 'monster-group' as SourcebookElementKind })),
			...sourcebook.montages.map(x => ({ element: x, type: 'montage' as SourcebookElementKind })),
			...sourcebook.negotiations.map(x => ({ element: x, type: 'negotiation' as SourcebookElementKind })),
			...sourcebook.perks.map(x => ({ element: x, type: 'perk' as SourcebookElementKind })),
			...sourcebook.projects.map(x => ({ element: x, type: 'project' as SourcebookElementKind })),
			...sourcebook.subclasses.map(x => ({ element: x, type: 'subclass' as SourcebookElementKind })),
			...sourcebook.tacticalMaps.map(x => ({ element: x, type: 'tactical-map' as SourcebookElementKind })),
			...sourcebook.terrain.map(x => ({ element: x, type: 'terrain' as SourcebookElementKind })),
			...sourcebook.titles.map(x => ({ element: x, type: 'title' as SourcebookElementKind }))
		];
	};

	static getExampleContent = (sourcebook: Sourcebook) => {
		const elements = SourcebookLogic
			.getElements(sourcebook);

		const rng = Random.getSeededRNG(sourcebook.name);
		const shuffled = Collections.shuffle(elements, rng);
		const samples = shuffled.slice(0, 3);

		return Collections.sort(samples, s => s.element.name);
	};

	static getElement = (elementID: string, sourcebooks: Sourcebook[]) => {
		const elements = sourcebooks.flatMap(sb => SourcebookLogic.getElements(sb)).map(e => e.element);
		return elements.find(e => e.id === elementID) || null;
	};

	///////////////////////////////////////////////////////////////////////////

	static getAdventureSourcebook = (sourcebooks: Sourcebook[], adventure: Adventure) => {
		return sourcebooks.find(s => SourcebookLogic.getAdventures([ s ]).some(a => a.id === adventure.id));
	};

	static getAncestrySourcebook = (sourcebooks: Sourcebook[], ancestry: Ancestry) => {
		return sourcebooks.find(s => SourcebookLogic.getAncestries([ s ]).some(a => a.id === ancestry.id));
	};

	static getCareerSourcebook = (sourcebooks: Sourcebook[], career: Career) => {
		return sourcebooks.find(s => SourcebookLogic.getCareers([ s ]).some(c => c.id === career.id));
	};

	static getClassSourcebook = (sourcebooks: Sourcebook[], heroClass: HeroClass) => {
		return sourcebooks.find(s => SourcebookLogic.getClasses([ s ]).some(c => c.id === heroClass.id));
	};

	static getComplicationSourcebook = (sourcebooks: Sourcebook[], complication: Complication) => {
		return sourcebooks.find(s => SourcebookLogic.getComplications([ s ]).some(c => c.id === complication.id));
	};

	static getCultureSourcebook = (sourcebooks: Sourcebook[], culture: Culture) => {
		return sourcebooks.find(s => SourcebookLogic.getCultures([ s ], true).some(c => c.id === culture.id));
	};

	static getDomainSourcebook = (sourcebooks: Sourcebook[], domain: Domain) => {
		return sourcebooks.find(s => SourcebookLogic.getDomains([ s ]).some(d => d.id === domain.id));
	};

	static getEncounterSourcebook = (sourcebooks: Sourcebook[], encounter: Encounter) => {
		return sourcebooks.find(s => SourcebookLogic.getEncounters([ s ]).some(e => e.id === encounter.id));
	};

	static getImbuementSourcebook = (sourcebooks: Sourcebook[], imbuement: Imbuement) => {
		return sourcebooks.find(s => SourcebookLogic.getImbuements([ s ]).some(i => i.id === imbuement.id));
	};

	static getItemSourcebook = (sourcebooks: Sourcebook[], item: Item) => {
		return sourcebooks.find(s => SourcebookLogic.getItems([ s ]).some(i => i.id === item.id));
	};

	static getKitSourcebook = (sourcebooks: Sourcebook[], kit: Kit) => {
		return sourcebooks.find(s => SourcebookLogic.getKits([ s ]).some(k => k.id === kit.id));
	};

	static getMonsterGroupSourcebook = (sourcebooks: Sourcebook[], monsterGroup: MonsterGroup) => {
		return sourcebooks.find(s => SourcebookLogic.getMonsterGroups([ s ]).some(mg => mg.id === monsterGroup.id));
	};

	static getMonsterSourcebook = (sourcebooks: Sourcebook[], monster: Monster) => {
		return sourcebooks.find(s => SourcebookLogic.getMonsters([ s ]).some(m => m.id === monster.id));
	};

	static getMontageSourcebook = (sourcebooks: Sourcebook[], montage: Montage) => {
		return sourcebooks.find(s => SourcebookLogic.getMontages([ s ]).some(m => m.id === montage.id));
	};

	static getNegotiationSourcebook = (sourcebooks: Sourcebook[], negotiation: Negotiation) => {
		return sourcebooks.find(s => SourcebookLogic.getNegotiations([ s ]).some(n => n.id === negotiation.id));
	};

	static getPerkSourcebook = (sourcebooks: Sourcebook[], perk: Perk) => {
		return sourcebooks.find(s => SourcebookLogic.getPerks([ s ]).some(p => p.id === perk.id));
	};

	static getProjectSourcebook = (sourcebooks: Sourcebook[], project: Project) => {
		return sourcebooks.find(s => SourcebookLogic.getProjects([ s ], true, true).some(p => p.id === project.id));
	};

	static getSubclassSourcebook = (sourcebooks: Sourcebook[], subclass: SubClass) => {
		return sourcebooks.find(s => SourcebookLogic.getSubclasses([ s ], true).some(s => s.id === subclass.id));
	};

	static getTacticalMapSourcebook = (sourcebooks: Sourcebook[], map: TacticalMap) => {
		return sourcebooks.find(s => SourcebookLogic.getTacticalMaps([ s ]).some(tm => tm.id === map.id));
	};

	static getTerrainSourcebook = (sourcebooks: Sourcebook[], terrain: Terrain) => {
		return sourcebooks.find(s => SourcebookLogic.getTerrains([ s ]).some(t => t.id === terrain.id));
	};

	static getTitleSourcebook = (sourcebooks: Sourcebook[], title: Title) => {
		return sourcebooks.find(s => SourcebookLogic.getTitles([ s ]).some(t => t.id === title.id));
	};

	///////////////////////////////////////////////////////////////////////////

	static getAdventures = (sourcebooks: Sourcebook[]) => {
		const list: Adventure[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.adventures);
		});

		return Collections.sort(list, item => item.name);
	};

	static getAncestries = (sourcebooks: Sourcebook[]) => {
		const list: Ancestry[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.ancestries);
		});

		return Collections.sort(list, item => item.name);
	};

	static getCareers = (sourcebooks: Sourcebook[]) => {
		const list: Career[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.careers);
		});

		return Collections.sort(list, item => item.name);
	};

	static getClasses = (sourcebooks: Sourcebook[]) => {
		const list: HeroClass[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.classes);
		});

		return Collections.sort(list, item => item.name);
	};

	static getComplications = (sourcebooks: Sourcebook[]) => {
		const list: Complication[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.complications);
		});

		return Collections.sort(list, item => item.name);
	};

	static getCultures = (sourcebooks: Sourcebook[], includeFromAncestries: boolean) => {
		const list: Culture[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.cultures);

			if (includeFromAncestries) {
				list.push(...sourcebook.ancestries.map(a => a.culture).filter(c => !!c));
			}
		});

		return Collections.sort(list, item => item.name);
	};

	static getDomains = (sourcebooks: Sourcebook[]) => {
		const list: Domain[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.domains);
		});

		return Collections.sort(list, item => item.name);
	};

	static getEncounters = (sourcebooks: Sourcebook[]) => {
		const list: Encounter[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.encounters);
		});

		return Collections.sort(list, item => item.name);
	};

	static getImbuements = (sourcebooks: Sourcebook[]) => {
		const list: Imbuement[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.imbuements);
		});

		return Collections.sort(list, item => item.name);
	};

	static getItems = (sourcebooks: Sourcebook[]) => {
		const list: Item[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.items);
		});

		return Collections.sort(list, item => item.name);
	};

	static getKits = (sourcebooks: Sourcebook[]) => {
		const list: Kit[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.kits);
		});

		return Collections.sort(list, item => item.name);
	};

	static getMonsterGroups = (sourcebooks: Sourcebook[]) => {
		const list: MonsterGroup[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.monsterGroups);
		});

		return Collections.sort(list, item => item.name);
	};

	static getMonsters = (sourcebooks: Sourcebook[]) => {
		const list: Monster[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.monsterGroups.flatMap(g => g.monsters));
		});

		return Collections.sort(list, item => item.name);
	};

	static getMontages = (sourcebooks: Sourcebook[]) => {
		const list: Montage[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.montages);
		});

		return Collections.sort(list, item => item.name);
	};

	static getNegotiations = (sourcebooks: Sourcebook[]) => {
		const list: Negotiation[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.negotiations);
		});

		return Collections.sort(list, item => item.name);
	};

	static getPerks = (sourcebooks: Sourcebook[]) => {
		const list: Perk[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.perks);
		});

		return Collections.sort(list, item => item.name);
	};

	static getProjects = (sourcebooks: Sourcebook[], includeFromImbuements: boolean, includeFromItems: boolean) => {
		const list: Project[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.projects);

			if (includeFromImbuements) {
				list.push(...sourcebook.imbuements.map(i => i.crafting).filter(p => !!p));
			}

			if (includeFromItems) {
				list.push(...sourcebook.items.map(i => i.crafting).filter(p => !!p));
			}
		});

		return Collections.sort(list, item => item.name);
	};

	static getSubclasses = (sourcebooks: Sourcebook[], includeFromClasses: boolean) => {
		const list: SubClass[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.subclasses);

			if (includeFromClasses) {
				list.push(...sourcebook.classes.flatMap(c => c.subclasses));
			}
		});

		return Collections.sort(list, item => item.name);
	};

	static getTacticalMaps = (sourcebooks: Sourcebook[]) => {
		const list: TacticalMap[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.tacticalMaps);
		});

		return Collections.sort(list, item => item.name);
	};

	static getTerrains = (sourcebooks: Sourcebook[]) => {
		const list: Terrain[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.terrain);
		});

		return Collections.sort(list, item => item.name);
	};

	static getTitles = (sourcebooks: Sourcebook[]) => {
		const list: Title[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.titles);
		});

		return Collections.sort(list, item => item.name);
	};

	///////////////////////////////////////////////////////////////////////////

	static getSkills = (sourcebooks: Sourcebook[]) => {
		const list: Skill[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.skills);
		});

		const distinct = Collections.distinct(list, item => item.name);
		return Collections.sort(distinct, item => item.name);
	};

	static getLanguages = (sourcebooks: Sourcebook[]) => {
		const list: Language[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.languages);
		});

		const distinct = Collections.distinct(list, item => item.name);
		return Collections.sort(distinct, item => item.name);
	};

	///////////////////////////////////////////////////////////////////////////

	static getAbilitiesFromClass = (heroClass: HeroClass, classAbilities: boolean, selectedSubclassAbilities: boolean, unselectedSubclassAbilities: boolean, classLevels: boolean, selectedSubclassLevels: boolean, unselectedSubclassLevels: boolean) => {
		const abilities: Ability[] = [];

		const addFeature = (feature: Feature) => {
			switch (feature.type) {
				case FeatureType.Ability:
					abilities.push(feature.data.ability);
					break;
				case FeatureType.Choice:
					feature.data.options.map(o => o.feature).forEach(addFeature);
					break;
				case FeatureType.Multiple:
					feature.data.features.forEach(addFeature);
					break;
			}
		};

		if (classAbilities) {
			abilities.push(...heroClass.abilities);
		}

		if (selectedSubclassAbilities) {
			abilities.push(...heroClass.subclasses.filter(sc => sc.selected).flatMap(sc => sc.abilities));
		}

		if (unselectedSubclassAbilities) {
			abilities.push(...heroClass.subclasses.filter(sc => !sc.selected).flatMap(sc => sc.abilities));
		}

		if (classLevels) {
			heroClass.featuresByLevel
				.forEach(lvl => lvl.features.forEach(addFeature));
		}

		if (selectedSubclassLevels) {
			heroClass.subclasses
				.filter(sc => sc.selected)
				.flatMap(sc => sc.featuresByLevel)
				.forEach(lvl => lvl.features.forEach(addFeature));
		}

		if (unselectedSubclassLevels) {
			heroClass.subclasses
				.filter(sc => !sc.selected)
				.flatMap(sc => sc.featuresByLevel)
				.forEach(lvl => lvl.features.forEach(addFeature));
		}

		return abilities;
	};

	///////////////////////////////////////////////////////////////////////////

	static getLanguage = (languageName: string, sourcebooks: Sourcebook[]) => {
		const languages = SourcebookLogic.getLanguages(sourcebooks);

		const lang = languages.find(l => l.name === languageName);
		return lang || null;
	};

	static getSkill = (skillName: string, sourcebooks: Sourcebook[]) => {
		const skills = SourcebookLogic.getSkills(sourcebooks);

		const skill = skills.find(s => s.name === skillName);
		return skill || null;
	};

	static getSkillsFromList = (list: SkillList, sourcebooks: Sourcebook[]) => {
		const skills = SourcebookLogic.getSkills(sourcebooks).filter(s => s.list === list);
		return Collections.sort(skills, skill => skill.name);
	};

	///////////////////////////////////////////////////////////////////////////

	static getMonster = (sourcebooks: Sourcebook[], monsterID: string) => {
		const monsters = sourcebooks
			.flatMap(s => s.monsterGroups)
			.flatMap(mg => mg.monsters);
		return monsters.find(m => m.id === monsterID) || null;
	};

	static getMonsterGroup = (sourcebooks: Sourcebook[], monsterID: string) => {
		return sourcebooks
			.flatMap(s => s.monsterGroups)
			.find(mg => {
				const ids = mg.monsters.map(m => m.id);
				return ids.includes(monsterID);
			}) || null;
	};

	static getSimilarMonsters = (sourcebooks: Sourcebook[], monster: Monster, options: Options) => {
		return sourcebooks
			.flatMap(sb => sb.monsterGroups)
			.flatMap(mg => mg.monsters)
			.filter(m => m.id !== monster.id)
			.filter(m => !options.similarLevel || (m.level === monster.level))
			.filter(m => !options.similarRole || (m.role.type === monster.role.type))
			.filter(m => !options.similarOrganization || (m.role.organization === monster.role.organization))
			.filter(m => !options.similarSize || ((m.size.value === monster.size.value) && (m.size.mod === monster.size.mod)));
	};

	///////////////////////////////////////////////////////////////////////////

	static getUsedIn = (sourcebooks: Sourcebook[], elementID: string) => {
		return [
			...SourcebookLogic.getEncounters(sourcebooks).filter(enc => EncounterLogic.getMonsterData(enc).map(data => data.monsterID).includes(elementID)),
			...SourcebookLogic.getAdventures(sourcebooks).filter(adv => AdventureLogic.getContentIDs(adv.plot).includes(elementID))
		] as Element[];
	};
}
