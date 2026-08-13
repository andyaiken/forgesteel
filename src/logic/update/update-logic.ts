import { Feature, FeatureMaliceAbility, FeatureMaliceAbilityData } from '@/models/feature';
import { Ability } from '@/models/ability';
import { AbilityUsage } from '@/enums/ability-usage';
import { Adventure } from '@/models/adventure';
import { Ancestry } from '@/models/ancestry';
import { AttitudeType } from '@/enums/attitude-type';
import { Career } from '@/models/career';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { ConnectionSettings } from '@/models/connection-settings';
import { Culture } from '@/models/culture';
import { DamageType } from '@/enums/damage-type';
import { Domain } from '@/models/domain';
import { Encounter } from '@/models/encounter';
import { EncounterDifficulty } from '@/enums/encounter-difficulty';
import { FactionType } from '@/enums/faction-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { Format } from '@/utils/format';
import { HeroClass } from '@/models/class';
import { Imbuement } from '@/models/imbuement';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
import { Kit } from '@/models/kit';
import { Language } from '@/models/language';
import { LanguageType } from '@/enums/language-type';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Montage } from '@/models/montage';
import { Negotiation } from '@/models/negotiation';
import { Options } from '@/models/options';
import { PanelWidth } from '@/enums/panel-width';
import { Perk } from '@/models/perk';
import { PlotContentReference } from '@/models/plot';
import { Session } from '@/models/session';
import { SheetPageSize } from '@/enums/sheet-page-size';
import { Skill } from '@/models/skill';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SubClass } from '@/models/subclass';
import { TacticalMap } from '@/models/tactical-map';
import { Terrain } from '@/models/terrain';
import { Title } from '@/models/title';
import { Utils } from '@/utils/utils';

export class UpdateLogic {
	static updateAbility = (ability: Ability) => {
		if (ability.type.usage.toString() === 'Action') {
			ability.type.usage = AbilityUsage.MainAction;
		}

		if (ability.type.freeStrike === undefined) {
			ability.type.freeStrike = false;
		}

		if (ability.sections === undefined) {
			ability.sections = [];
		}
	};

	static updateAdventure = (adventure: Adventure) => {
		if (adventure.introduction === undefined) {
			adventure.introduction = [];
		}

		if (adventure.party === undefined) {
			adventure.party = {
				count: 4,
				level: 1
			};
		}

		if (adventure.plot === undefined) {
			adventure.plot = FactoryLogic.createAdventurePlot('');
		}

		if (adventure.plot.plots === undefined) {
			adventure.plot.plots = [];
		}

		adventure.plot.plots.flatMap(p => p.content).forEach(c => {
			if (c.contentType === undefined) {
				(c as PlotContentReference).contentType = 'reference';
			}
		});
	};

	static updateAncestry = (ancestry: Ancestry) => {
		if (ancestry.ancestryPoints === undefined) {
			ancestry.ancestryPoints = 0;
		}
		ancestry.features.forEach(UpdateLogic.updateFeature);
	};

	static updateCareer = (career: Career) => {
		career.features.forEach(UpdateLogic.updateFeature);
	};

	static updateClass = (heroClass: HeroClass) => {
		if (heroClass.type === undefined) {
			heroClass.type = 'standard';
		}

		if (heroClass.primaryCharacteristicsOptions === undefined) {
			heroClass.primaryCharacteristicsOptions = [];
		}

		heroClass.featuresByLevel.forEach(lvl => {
			lvl.features.forEach(UpdateLogic.updateFeature);
		});

		heroClass.subclasses.forEach(UpdateLogic.updateSubclass);
		heroClass.abilities.forEach(UpdateLogic.updateAbility);
	};

	static updateComplication = (complication: Complication) => {
		complication.features.forEach(UpdateLogic.updateFeature);
	};

	static updateConnectionSettings = (settings: ConnectionSettings) => {
		if (settings.useManualWarehouse === undefined) {
			settings.useManualWarehouse = false;
		}

		if (settings.warehouseHost === undefined) {
			settings.warehouseHost = '';
		}

		if (settings.warehouseToken === undefined) {
			settings.warehouseToken = '';
		}

		if (settings.patreonConnected === undefined) {
			settings.patreonConnected = false;
		}

		if (settings.usePatreonWarehouse === undefined) {
			settings.usePatreonWarehouse = false;
		}

		if (settings.patreonConnections === undefined) {
			settings.patreonConnections = [];
		}
	};

	static updateCulture = (culture: Culture) => {
		UpdateLogic.updateFeature(culture.language);

		if (culture.environment) {
			UpdateLogic.updateFeature(culture.environment);
		}
		if (culture.organization) {
			UpdateLogic.updateFeature(culture.organization);
		}
		if (culture.upbringing) {
			UpdateLogic.updateFeature(culture.upbringing);
		}
	};

	static updateDomain = (domain: Domain) => {
		domain.featuresByLevel.forEach(lvl => {
			lvl.features.forEach(UpdateLogic.updateFeature);
		});
		domain.defaultFeatures.forEach(UpdateLogic.updateFeature);
	};

	static updateEncounter = (encounter: Encounter) => {
		encounter.groups.forEach(g => {
			if (g.name === undefined) {
				g.name = '';
			}

			if (g.faction === undefined) {
				g.faction = FactionType.Enemy;
			}

			if (g.encounterState === undefined) {
				g.encounterState = 'ready';
			}

			g.slots.forEach(s => {
				if (s.customization === undefined) {
					s.customization = {
						addOnIDs: [],
						itemIDs: [],
						levelAdjustment: 0,
						staminaAdjustment: 0,
						minionCountAdjustment: 0,
						convertToSolo: false,
						staminaDamage: 0,
						staminaTemp: 0,
						conditions: []
					};
				}

				if (s.customization.itemIDs === undefined) {
					s.customization.itemIDs = [];
				}

				if (s.customization.levelAdjustment === undefined) {
					s.customization.levelAdjustment = 0;
				}

				if (s.customization.staminaAdjustment === undefined) {
					s.customization.staminaAdjustment = 0;
				}

				if (s.customization.minionCountAdjustment === undefined) {
					s.customization.minionCountAdjustment = 0;
				}

				if (s.customization.convertToSolo === undefined) {
					s.customization.convertToSolo = false;
				}

				if (s.customization.staminaDamage === undefined) {
					s.customization.staminaDamage = 0;
				}

				if (s.customization.staminaTemp === undefined) {
					s.customization.staminaTemp = 0;
				}

				if (s.customization.conditions === undefined) {
					s.customization.conditions = [];
				}

				if (s.monsters === undefined) {
					s.monsters = [];
				}

				if (s.state === undefined) {
					s.state = {
						staminaDamage: 0,
						staminaTemp: 0,
						recoveriesUsed: 0,
						conditions: [],
						reactionUsed: false,
						hidden: false,
						defeated: false,
						captainID: undefined
					};
				}

				s.monsters.forEach(UpdateLogic.updateMonster);
			});
		});

		if (encounter.heroes === undefined) {
			encounter.heroes = [];
		}

		encounter.heroes.forEach(h => {
			if (h.state.controlledSlots === undefined) {
				h.state.controlledSlots = [];
			}
		});

		if (encounter.terrain === undefined) {
			encounter.terrain = [];
		}

		encounter.terrain.forEach(slot => {
			if (slot.terrain === undefined) {
				slot.terrain = [];
			}

			slot.terrain.forEach(t => {
				if (t.state === undefined) {
					t.state = {
						squares: 1,
						staminaDamage: 0
					};
				}
			});
		});

		if (encounter.notes === undefined) {
			encounter.notes = [];
		}

		/* eslint-disable @typescript-eslint/no-deprecated */
		if (encounter.objective) {
			encounter.notes.push({
				id: Utils.guid(),
				name: encounter.objective.name,
				description: `
${encounter.objective.description}

### Difficulty Modifier

${encounter.objective.difficultyModifier}

### Success Condition

${encounter.objective.successCondition}

### Failure Condition

${encounter.objective.failureCondition}

### Victories

${encounter.objective.victories}`
			});
			encounter.objective = null;
		}
		/* eslint-enable @typescript-eslint/no-deprecated */

		if (encounter.round === undefined) {
			encounter.round = 1;
		}

		if (encounter.malice === undefined) {
			encounter.malice = 0;
		}

		if (encounter.additionalTurnsTaken === undefined) {
			encounter.additionalTurnsTaken = [];
		}

		if (encounter.hiddenMaliceFeatures === undefined) {
			encounter.hiddenMaliceFeatures = [];
		}
	};

	static updateFeature = (feature: Feature) => {
		switch (feature.type) {
			case FeatureType.Ability:
				UpdateLogic.updateAbility(feature.data.ability);
				break;
			case FeatureType.AddOn:
				if (feature.data.repeatable === undefined) {
					feature.data.repeatable = false;
				}
				break;
			case FeatureType.Bonus:
				if (feature.data.valueCharacteristics === undefined) {
					feature.data.valueCharacteristics = [];
				}
				if (feature.data.valuePerEchelon === undefined) {
					feature.data.valuePerEchelon = 0;
				}
				break;
			case FeatureType.Choice:
				if (feature.data.options === undefined) {
					feature.data.options = [];
				}
				feature.data.options.map(f => f.feature).forEach(UpdateLogic.updateFeature);
				if (feature.data.selectAt === undefined) {
					feature.data.selectAt = 'build';
				}
				// eslint-disable-next-line @typescript-eslint/no-deprecated
				if (feature.data.respiteChange) {
					feature.data.selectAt = 'respite';
				}
				feature.data.selected = Collections.distinct(feature.data.selected, f => f.id);
				feature.data.selected.forEach(UpdateLogic.updateFeature);
				break;
			case FeatureType.ClassAbility:
				if (feature.data.source === undefined) {
					feature.data.source = {
						fromClassAbilities: true,
						fromSelectedSubclassAbilities: true,
						fromUnselectedSubclassAbilities: false,
						fromClassLevels: false,
						fromSelectedSubclassLevels: false,
						fromUnselectedSubclassLevels: false
					};
				}
				if (feature.data.minLevel === undefined) {
					feature.data.minLevel = 1;
				}
				break;
			case FeatureType.Companion:
				if (feature.data.selected && feature.data.selected.retainer) {
					(feature as Feature).type = FeatureType.Retainer;
				}
				break;
			case FeatureType.DamageModifier:
				feature.data.modifiers.forEach(dm => {
					if (dm.valueCharacteristics === undefined) {
						dm.valueCharacteristics = [];
					}
					if (dm.valueCharacteristicMultiplier === undefined) {
						dm.valueCharacteristicMultiplier = 1;
					}
					if (dm.valuePerEchelon === undefined) {
						dm.valuePerEchelon = 0;
					}
				});
				break;
			case FeatureType.Domain:
				if (feature.data.characteristic === undefined) {
					feature.data.characteristic = Characteristic.Intuition;
				}
				if (feature.data.levels === undefined) {
					feature.data.levels = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
				}
				feature.data.selected.forEach(d => {
					if (d.resourceGains === undefined) {
						d.resourceGains = [];
					}
					if (d.defaultFeatures === undefined) {
						d.defaultFeatures = [];
					}
				});
				break;
			case FeatureType.HeroicResource:
				if (feature.data.type === undefined) {
					feature.data.type = 'heroic';
				}
				feature.data.gains.forEach(g => {
					if (g.tag === undefined) {
						g.tag = '';
					}
				});
				break;
			case FeatureType.HeroicResourceGain:
				if (feature.data.tag === undefined) {
					feature.data.tag = '';
				}
				if (feature.data.replacesTags === undefined) {
					feature.data.replacesTags = [];
				}
				break;
			case FeatureType.ItemChoice:
				feature.data.selected.forEach(UpdateLogic.updateItem);
				break;
			case FeatureType.Kit:
				if (feature.data.types.includes('Standard')) {
					feature.data.types = feature.data.types.filter(t => t !== 'Standard');
					feature.data.types.push('');
				}
				break;
			case FeatureType.LanguageChoice:
				if (feature.data.allowedTypes === undefined) {
					feature.data.allowedTypes = [ LanguageType.Common, LanguageType.Regional, LanguageType.Cultural, LanguageType.Dead ];
				}
				if (feature.data.selectAt === undefined) {
					feature.data.selectAt = 'build';
				}
				break;
			case FeatureType.Malice:
				if (feature.data.echelon === undefined) {
					feature.data.echelon = 1;
				}
				break;
			case FeatureType.MaliceAbility:
				if (feature.data.echelon === undefined) {
					feature.data.echelon = 1;
				}
				break;
			case FeatureType.Multiple:
				feature.data.features.forEach(UpdateLogic.updateFeature);
				break;
			case FeatureType.Package:
				if (feature.data.tag === 'undefined') {
					feature.data.tag = 'conduit-prayer';
				}
				break;
			case FeatureType.Perk:
				if (feature.data.lists === undefined) {
					feature.data.lists = [];
				}
				break;
			case FeatureType.SkillChoice:
				if (feature.data.selectAt === undefined) {
					feature.data.selectAt = 'build';
				}
				break;
			case FeatureType.Summon:
				feature.data.summons.forEach(s => {
					if (s.info.level === undefined) {
						s.info.level = 1;
					}
				});
				break;
			case FeatureType.SummonChoice:
				feature.data.options.forEach(o => {
					if (o.info.level === undefined) {
						o.info.level = 1;
					}
				});
				feature.data.selected.forEach(s => {
					if (s.info.level === undefined) {
						s.info.level = 1;
					}
				});
				break;
		}
	};

	static updateImbuement = (imbuement: Imbuement) => {
		UpdateLogic.updateFeature(imbuement.feature);

		if (imbuement.crafting) {
			imbuement.crafting.id = `${imbuement.id}-crafting`;
			imbuement.crafting.name = `Imbue ${imbuement.name}`;
			imbuement.crafting.description = `Imbue an item with ${imbuement.name}.`;
		}
	};

	static updateItem = (item: Item) => {
		if (!item.type) {
			item.type = ItemType.Trinket1st;
		}

		if (item.type.toString() === 'Consumable Item') {
			item.type = ItemType.Consumable1st;
		}

		if (item.type.toString() === 'Trinket') {
			item.type = ItemType.Trinket1st;
		}

		item.featuresByLevel.flatMap(lvl => lvl.features).forEach(UpdateLogic.updateFeature);

		if (item.imbuements === undefined) {
			item.imbuements = [];
		}

		item.imbuements.forEach(UpdateLogic.updateImbuement);

		if (item.crafting) {
			item.crafting.id = `${item.id}-crafting`;
			item.crafting.name = `Craft ${item.name}`;
			item.crafting.description = `Craft ${Format.startsWithVowel(item.name) ? 'an' : 'a'} ${item.name}.`;
		}
	};

	static updateKit = (kit: Kit) => {
		if (kit.type === 'Standard') {
			kit.type = '';
		}
		kit.features.forEach(UpdateLogic.updateFeature);
	};

	static updateLanguage = (language: Language) => {
		if (language.type === undefined) {
			language.type = LanguageType.Cultural;
		}
		if (language.related === undefined) {
			language.related = [];
		}
	};

	static updateMonster = (monster: Monster) => {
		if (monster.picture === undefined) {
			monster.picture = null;
		}

		if (monster.role.organization === undefined) {
			monster.role.organization = MonsterOrganizationType.Platoon;
		}
		if (monster.role.organization.toString() === 'Band') {
			monster.role.organization = MonsterOrganizationType.Horde;
		}
		if (monster.role.organization.toString() === 'Troop') {
			monster.role.organization = MonsterOrganizationType.Elite;
		}

		if (monster.freeStrikeType === undefined) {
			monster.freeStrikeType = DamageType.Damage;
		}

		if (monster.retainer) {
			monster.retainer.level = monster.level;
		}

		if (typeof monster.speed.modes === 'string') {
			monster.speed.modes = monster.speed.modes ? [ monster.speed.modes ] : [];
		}

		if (monster.state === undefined) {
			monster.state = {
				staminaDamage: 0,
				staminaTemp: 0,
				recoveriesUsed: 0,
				conditions: [],
				reactionUsed: false,
				hidden: false,
				defeated: false,
				captainID: undefined
			};
		}

		monster.features.forEach(UpdateLogic.updateFeature);
		monster.features
			.filter(f => f.type === FeatureType.Ability)
			.map(f => f.data.ability)
			.forEach(UpdateLogic.updateAbility);
	};

	static updateMonsterGroup = (monsterGroup: MonsterGroup) => {
		if (monsterGroup.picture === undefined) {
			monsterGroup.picture = null;
		}

		monsterGroup.malice.forEach(f => {
			if (f.type.toString() === 'Ability') {
				f.type = FeatureType.MaliceAbility;
			}

			if (f.type === FeatureType.MaliceAbility) {
				if (!f.data) {
					const data: FeatureMaliceAbilityData = {
						ability: FactoryLogic.createAbility({
							id: Utils.guid(),
							name: '',
							description: '',
							type: FactoryLogic.type.createMain(),
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '',
							sections: []
						}),
						echelon: 0
					};
					(f as FeatureMaliceAbility).data = data;
				}
			}

			switch (f.type) {
				case FeatureType.Malice:
				case FeatureType.MaliceAbility:
					if (f.data.echelon === undefined) {
						f.data.echelon = 1;
					}
					break;
			}
		});

		if (monsterGroup.addOns === undefined) {
			monsterGroup.addOns = [];
		}

		monsterGroup.monsters.forEach(UpdateLogic.updateMonster);
	};

	static updateMontage = (montage: Montage) => {
		if (montage.difficulty === undefined) {
			montage.difficulty = EncounterDifficulty.Standard;
		}
	};

	static updateNegotiation = (negotiation: Negotiation) => {
		if (negotiation.attitude === undefined) {
			negotiation.attitude = AttitudeType.Open;
		}

		if (negotiation.impression === undefined) {
			negotiation.impression = 1;
		}

		if (negotiation.languages === undefined) {
			negotiation.languages = [];
		}

		if (negotiation.outcomes === undefined) {
			negotiation.outcomes = [ '', '', '', '', '', '' ];
		}
	};

	static updateOptions = (options: Options) => {
		if (options.cookieConsent === undefined) {
			options.cookieConsent = false;
		}

		if (options.showDataSource === undefined) {
			options.showDataSource = false;
		}

		if (options.xpPerLevel === undefined) {
			options.xpPerLevel = 16;
		}

		if (options.singlePage === undefined) {
			options.singlePage = false;
		}

		if (options.showSources === undefined) {
			options.showSources = false;
		}

		if (options.compactView === undefined) {
			options.compactView = false;
		}

		if (options.abilityWidth === undefined) {
			options.abilityWidth = PanelWidth.Medium;
		}

		// Rather than remove this feature, disable it every session
		// to minimize confusion for those who don't know it's even there
		options.includePlayState = false;

		if (options.colorSheet === undefined) {
			options.colorSheet = true;
		}

		if (options.colorScheme === undefined) {
			options.colorScheme = 'community';
		}

		if (options.showPowerRollCalculation === undefined) {
			options.showPowerRollCalculation = true;
		}

		if (options.sheetTextColor === undefined) {
			options.sheetTextColor = 'default';
		}

		if (options.featuresInclude === undefined) {
			options.featuresInclude = 'all';
		}

		if (options.classicSheetPageSize === undefined) {
			options.classicSheetPageSize = SheetPageSize.Letter;
		}

		if (options.pageOrientation === undefined) {
			options.pageOrientation = 'portrait';
		}

		if (options.debugClassicSheet === undefined) {
			options.debugClassicSheet = false;
		}

		if (options.similarLevel === undefined) {
			options.similarLevel = true;
		}

		if (options.similarRole === undefined) {
			options.similarRole = true;
		}

		if (options.similarOrganization === undefined) {
			options.similarOrganization = true;
		}

		if (options.similarSize === undefined) {
			options.similarSize = true;
		}

		if (options.party === undefined) {
			options.party = '';
		}

		if (options.heroParty === undefined) {
			options.heroParty = '';
		}

		if (options.heroCount === undefined) {
			options.heroCount = 4;
		}

		if (options.heroLevel === undefined) {
			options.heroLevel = 1;
		}

		if (options.heroVictories === undefined) {
			options.heroVictories = 0;
		}

		if (options.showDefeatedCombatants === undefined) {
			options.showDefeatedCombatants = false;
		}

		if (options.gridSize === undefined) {
			options.gridSize = 50;
		}

		if (options.playerGridSize === undefined) {
			options.playerGridSize = 50;
		}

		if (options.shownStandardAbilities === undefined) {
			options.shownStandardAbilities = [];
		}

		if (options.showClipboardOptions === undefined) {
			options.showClipboardOptions = false;
		}
	};

	static updatePerk = (perk: Perk) => {
		UpdateLogic.updateFeature(perk);
	};

	static updateSession = (session: Session) => {
		if (session.encounters === undefined) {
			session.encounters = [];
		}

		session.encounters.forEach(UpdateLogic.updateEncounter);

		if (session.montages === undefined) {
			session.montages = [];
		}

		session.montages.forEach(UpdateLogic.updateMontage);

		if (session.negotiations === undefined) {
			session.negotiations = [];
		}

		session.negotiations.forEach(UpdateLogic.updateNegotiation);

		if (session.tacticalMaps === undefined) {
			session.tacticalMaps = [];
		}

		session.tacticalMaps.forEach(UpdateLogic.updateTacticalMap);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static updateSkill = (_skill: Skill) => {
		// Nothing to do
	};

	static updateSourcebook = (sourcebook: Sourcebook) => {
		if (sourcebook.type === undefined) {
			sourcebook.type = SourcebookType.Homebrew;
		}
		if (sourcebook.adventures === undefined) {
			sourcebook.adventures = [];
		}
		if (sourcebook.ancestries === undefined) {
			sourcebook.ancestries = [];
		}
		if (sourcebook.careers === undefined) {
			sourcebook.careers = [];
		}
		if (sourcebook.classes === undefined) {
			sourcebook.classes = [];
		}
		if (sourcebook.complications === undefined) {
			sourcebook.complications = [];
		}
		if (sourcebook.cultures === undefined) {
			sourcebook.cultures = [];
		}
		if (sourcebook.domains === undefined) {
			sourcebook.domains = [];
		}
		if (sourcebook.encounters === undefined) {
			sourcebook.encounters = [];
		}
		if (sourcebook.imbuements === undefined) {
			sourcebook.imbuements = [];
		}
		if (sourcebook.items === undefined) {
			sourcebook.items = [];
		}
		if (sourcebook.kits === undefined) {
			sourcebook.kits = [];
		}
		if (sourcebook.monsterGroups === undefined) {
			sourcebook.monsterGroups = [];
		}
		if (sourcebook.montages === undefined) {
			sourcebook.montages = [];
		}
		if (sourcebook.negotiations === undefined) {
			sourcebook.negotiations = [];
		}
		if (sourcebook.perks === undefined) {
			sourcebook.perks = [];
		}
		if (sourcebook.projects === undefined) {
			sourcebook.projects = [];
		}
		if (sourcebook.subclasses === undefined) {
			sourcebook.subclasses = [];
		}
		if (sourcebook.tacticalMaps === undefined) {
			sourcebook.tacticalMaps = [];
		}
		if (sourcebook.terrain === undefined) {
			sourcebook.terrain = [];
		}
		if (sourcebook.titles === undefined) {
			sourcebook.titles = [];
		}

		sourcebook.adventures.forEach(UpdateLogic.updateAdventure);
		sourcebook.ancestries.forEach(UpdateLogic.updateAncestry);
		sourcebook.careers.forEach(UpdateLogic.updateCareer);
		sourcebook.classes.forEach(UpdateLogic.updateClass);
		sourcebook.complications.forEach(UpdateLogic.updateComplication);
		sourcebook.cultures.forEach(UpdateLogic.updateCulture);
		sourcebook.domains.forEach(UpdateLogic.updateDomain);
		sourcebook.encounters.forEach(UpdateLogic.updateEncounter);
		sourcebook.imbuements.forEach(UpdateLogic.updateImbuement);
		sourcebook.items.forEach(UpdateLogic.updateItem);
		sourcebook.kits.forEach(UpdateLogic.updateKit);
		sourcebook.monsterGroups.forEach(UpdateLogic.updateMonsterGroup);
		sourcebook.montages.forEach(UpdateLogic.updateMontage);
		sourcebook.negotiations.forEach(UpdateLogic.updateNegotiation);
		sourcebook.perks.forEach(UpdateLogic.updatePerk);
		sourcebook.subclasses.forEach(UpdateLogic.updateSubclass);
		sourcebook.tacticalMaps.forEach(UpdateLogic.updateTacticalMap);
		sourcebook.terrain.forEach(UpdateLogic.updateTerrain);
		sourcebook.titles.forEach(UpdateLogic.updateTitle);
		sourcebook.languages.forEach(UpdateLogic.updateLanguage);
		sourcebook.skills.forEach(UpdateLogic.updateSkill);

		sourcebook.adventures = Collections.distinct(sourcebook.adventures, a => a.id);
		sourcebook.ancestries = Collections.distinct(sourcebook.ancestries, a => a.id);
		sourcebook.careers = Collections.distinct(sourcebook.careers, a => a.id);
		sourcebook.classes = Collections.distinct(sourcebook.classes, a => a.id);
		sourcebook.complications = Collections.distinct(sourcebook.complications, a => a.id);
		sourcebook.cultures = Collections.distinct(sourcebook.cultures, a => a.id);
		sourcebook.domains = Collections.distinct(sourcebook.domains, a => a.id);
		sourcebook.encounters = Collections.distinct(sourcebook.encounters, a => a.id);
		sourcebook.imbuements = Collections.distinct(sourcebook.imbuements, a => a.id);
		sourcebook.items = Collections.distinct(sourcebook.items, a => a.id);
		sourcebook.kits = Collections.distinct(sourcebook.kits, a => a.id);
		sourcebook.monsterGroups = Collections.distinct(sourcebook.monsterGroups, a => a.id);
		sourcebook.montages = Collections.distinct(sourcebook.montages, a => a.id);
		sourcebook.negotiations = Collections.distinct(sourcebook.negotiations, a => a.id);
		sourcebook.perks = Collections.distinct(sourcebook.perks, a => a.id);
		sourcebook.projects = Collections.distinct(sourcebook.projects, a => a.id);
		sourcebook.subclasses = Collections.distinct(sourcebook.subclasses, a => a.id);
		sourcebook.tacticalMaps = Collections.distinct(sourcebook.tacticalMaps, a => a.id);
		sourcebook.terrain = Collections.distinct(sourcebook.terrain, a => a.id);
		sourcebook.titles = Collections.distinct(sourcebook.titles, a => a.id);
	};

	static updateSubclass = (subclass: SubClass) => {
		if (subclass.classID === undefined) {
			subclass.classID = '';
		}

		subclass.featuresByLevel.forEach(lvl => {
			lvl.features.forEach(UpdateLogic.updateFeature);
		});

		if (subclass.abilities === undefined) {
			subclass.abilities = [];
		}
		subclass.abilities.forEach(UpdateLogic.updateAbility);
	};

	static updateTacticalMap = (map: TacticalMap) => {
		if (map.items === undefined) {
			map.items = [];
		}

		map.items
			.filter(item => item.type === 'tile')
			.forEach(tile => {
				if (tile.content === undefined) {
					tile.content = { type: 'color', color: 'C8C8C8FF' };
				}
			});
	};

	static updateTerrain = (terrain: Terrain) => {
		if (terrain.state === undefined) {
			terrain.state = {
				squares: 1,
				staminaDamage: 0
			};
		}
	};

	static updateTitle = (title: Title) => {
		title.features.forEach(UpdateLogic.updateFeature);
	};
}
