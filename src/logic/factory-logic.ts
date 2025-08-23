import { Ability, AbilityDistance, AbilitySectionField, AbilitySectionPackage, AbilitySectionRoll, AbilitySectionText, AbilityType } from '../models/ability';
import { Encounter, EncounterGroup, EncounterObjective } from '../models/encounter';
import { Hero, HeroState } from '../models/hero';
import { Kit, KitDamageBonus } from '../models/kit';
import { MapFog, MapMini, MapTile, MapWall, MapZone, TacticalMap } from '../models/tactical-map';
import { Monster, MonsterGroup, MonsterRole, MonsterState } from '../models/monster';
import { MonsterFilter, TerrainFilter } from '../models/filter';
import { Montage, MontageChallenge, MontageSection } from '../models/montage';
import { Project, ProjectProgress } from '../models/project';
import { Terrain, TerrainRole } from '../models/terrain';
import { AbilityKeyword } from '../enums/ability-keyword';
import { Adventure } from '../models/adventure';
import { Ancestry } from '../models/ancestry';
import { Career } from '../models/career';
import { Characteristic } from '../enums/characteristic';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { Domain } from '../models/domain';
import { Element } from '../models/element';
import { EncounterSlot } from '../models/encounter-slot';
import { FactoryAbilityTypeLogic } from './factory-ability-type-logic';
import { FactoryDamageModifierLogic } from './factory-damage-modifier-logic';
import { FactoryDistanceLogic } from './factory-distance-logic';
import { FactoryFeatureLogic } from './factory-feature-logic';
import { Feature } from '../models/feature';
import { FeatureField } from '../enums/feature-field';
import { FeatureType } from '../enums/feature-type';
import { Follower } from '../models/follower';
import { FollowerType } from '../enums/follower-type';
import { HeroClass } from '../models/class';
import { Imbuement } from '../models/imbuement';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type';
import { KitArmor } from '../enums/kit-armor';
import { KitWeapon } from '../enums/kit-weapon';
import { MonsterOrganizationType } from '../enums/monster-organization-type';
import { MonsterRoleType } from '../enums/monster-role-type';
import { Negotiation } from '../models/negotiation';
import { Options } from '../models/options';
import { PanelWidth } from '../enums/panel-width';
import { Perk } from '../models/perk';
import { PerkList } from '../enums/perk-list';
import { Playbook } from '../models/playbook';
import { Plot } from '../models/plot';
import { PowerRoll } from '../models/power-roll';
import { RetainerData } from '../data/retainer-data';
import { Size } from '../models/size';
import { Sourcebook } from '../models/sourcebook';
import { Speed } from '../models/speed';
import { SubClass } from '../models/subclass';
import { TerrainCategory } from '../enums/terrain-category';
import { TerrainRoleType } from '../enums/terrain-role-type';
import { Title } from '../models/title';
import { Utils } from '../utils/utils';

export class FactoryLogic {
	static createElement = (name?: string): Element => {
		return {
			id: Utils.guid(),
			name: name || '',
			description: ''
		};
	};

	static createHero = (sourcebookIDs: string[]): Hero => {
		return {
			id: Utils.guid(),
			name: '',
			picture: null,
			folder: '',
			settingIDs: sourcebookIDs,
			ancestry: null,
			culture: null,
			class: null,
			career: null,
			complication: null,
			features: [
				FactoryLogic.feature.createLanguageChoice({
					id: 'default-language',
					name: 'Default Language',
					selected: [ 'Caelian' ]
				})
			],
			state: FactoryLogic.createHeroState(),
			abilityCustomizations: []
		};
	};

	static createHeroState = (): HeroState => {
		return {
			staminaDamage: 0,
			staminaTemp: 0,
			recoveriesUsed: 0,
			surges: 0,
			victories: 0,
			xp: 0,
			heroTokens: 0,
			renown: 0,
			wealth: 1,
			projectPoints: 0,
			conditions: [],
			inventory: [],
			projects: [],
			controlledSlots: [],
			notes: '',
			encounterState: 'ready',
			hidden: false,
			defeated: false
		};
	};

	static createSourcebook = (): Sourcebook => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			isHomebrew: true,
			ancestries: [],
			cultures: [],
			careers: [],
			classes: [],
			subclasses: [],
			domains: [],
			kits: [],
			complications: [],
			perks: [],
			titles: [],
			items: [],
			imbuements: [],
			monsterGroups: [],
			skills: [],
			languages: [],
			projects: [],
			terrain: []
		};
	};

	static createPlaybook = (): Playbook => {
		return {
			adventures: [],
			encounters: [],
			montages: [],
			negotiations: [],
			tacticalMaps: [],
			counters: [],
			playerViewID: null
		};
	};

	static createAncestry = (): Ancestry => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			features: [
				FactoryLogic.feature.create({
					id: Utils.guid(),
					name: 'Signature Trait',
					description: ''
				}),
				FactoryLogic.feature.createChoice({
					id: Utils.guid(),
					name: 'Purchased Traits',
					options: [],
					count: 3
				})
			]
		};
	};

	static createCulture = (name?: string, description?: string, languages?: string[], environment?: Feature, organization?: Feature, upbringing?: Feature): Culture => {
		return {
			id: name ? `culture-${name.replace(' ', '-').toLowerCase()}` : Utils.guid(),
			name: name || '',
			description: description || '',
			languages: languages || [],
			environment: environment || null,
			organization: organization || null,
			upbringing: upbringing || null
		};
	};

	static createCareer = (): Career => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			features: [],
			incitingIncidents: {
				options: [],
				selectedID: null
			}
		};
	};

	static createClass = (): HeroClass => {
		const hc: HeroClass = {
			id: Utils.guid(),
			name: '',
			description: '',
			subclassName: '',
			subclassCount: 1,
			primaryCharacteristicsOptions: [],
			primaryCharacteristics: [],
			featuresByLevel: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map(n => ({ level: n, features: [] })),
			abilities: [],
			subclasses: [],
			level: 1,
			characteristics: []
		};

		hc.featuresByLevel
			.filter(lvl => lvl.level === 1)
			.forEach(lvl => {
				lvl.features.push(FactoryLogic.feature.createBonus({
					id: Utils.guid(),
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 9
				}));
				lvl.features.push(FactoryLogic.feature.createBonus({
					id: Utils.guid(),
					field: FeatureField.Recoveries,
					value: 8
				}));
				lvl.features.push(FactoryLogic.feature.createHeroicResource({
					id: Utils.guid(),
					name: 'Heroic Resource',
					gains: [
						{
							tag: 'start',
							trigger: 'Start of your turn',
							value: '2'
						}
					]
				}));
			});

		return hc;
	};

	static createSubclass = (): SubClass => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			featuresByLevel: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map(n => ({ level: n, features: [], optionalFeatures: [] })),
			selected: false
		};
	};

	static createComplication = (): Complication => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			features: []
		};
	};

	static createDomain = (): Domain => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			featuresByLevel: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map(n => ({ level: n, features: [], optionalFeatures: [] })),
			resourceGains: [],
			defaultFeatures: []
		};
	};

	static createKit = (): Kit => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			type: '',
			armor: [],
			weapon: [],
			stamina: 0,
			speed: 0,
			stability: 0,
			meleeDamage: null,
			rangedDamage: null,
			meleeDistance: 0,
			rangedDistance: 0,
			disengage: 0,
			features: []
		};
	};

	static createKitDamageBonus = (tier1: number, tier2: number, tier3: number): KitDamageBonus => {
		return {
			tier1: tier1,
			tier2: tier2,
			tier3: tier3
		};
	};

	static createPerk = (): Perk => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			type: FeatureType.Text,
			data: null,
			list: PerkList.Crafting
		};
	};

	static createTerrain = (): Terrain => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			category: TerrainCategory.Environmental,
			level: 1,
			role: FactoryLogic.createTerrainRole(MonsterRoleType.Ambusher, TerrainRoleType.Fortification),
			encounterValue: 0,
			area: '',
			direction: '',
			link: '',
			stamina: {
				base: 0,
				perSquare: 0
			},
			size: '',
			damageMods: [],
			sections: [],
			upgrades: [],
			state: {
				squares: 1,
				staminaDamage: 0
			}
		};
	};

	static createTerrainRole = (type: MonsterRoleType, terrainType: TerrainRoleType): TerrainRole => {
		return {
			type: type,
			terrainType: terrainType
		};
	};

	static createTitle = (): Title => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			echelon: 1,
			prerequisites: '',
			features: [],
			selectedFeatureID: ''
		};
	};

	static createItem = (data: {
		id: string,
		name: string,
		description: string,
		type: ItemType,
		keywords?: (AbilityKeyword | KitArmor | KitWeapon)[],
		crafting?: Project,
		effect?: string,
		featuresByLevel?: { level: number, features: Feature[] }[],
		imbuements?: Imbuement[]
	}): Item => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: data.type,
			keywords: data.keywords || [],
			crafting: data.crafting || null,
			effect: data.effect || '',
			featuresByLevel: data.featuresByLevel || [
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
			],
			imbuements: data.imbuements || [],
			count: 1,

			customizationsByLevel: []
		};
	};

	static createImbuement = (data: {
		type: ItemType,
		crafting?: Project,
		level: number,
		feature: Feature
	}): Imbuement => {
		return {
			id: data.feature.id,
			name: data.feature.name,
			description: data.feature.description,
			type: data.type,
			crafting: data.crafting || null,
			level: data.level,
			feature: data.feature
		};
	};

	static createProject = (data: {
		id?: string,
		name?: string,
		description?: string,
		prerequisites?: string,
		source?: string,
		characteristic?: Characteristic[],
		goal?: number,
		effect?: string,
		isCustom?: boolean
	}): Project => {
		return {
			id: data.id || Utils.guid(),
			name: data.name || '',
			description: data.description || '',
			itemPrerequisites: data.prerequisites || '',
			source: data.source || '',
			characteristic: data.characteristic || [ Characteristic.Reason ],
			goal: data.goal || 0,
			effect: data.effect || '',
			isCustom: data.isCustom ?? false,
			progress: null
		};
	};

	static createProjectProgress = (): ProjectProgress => {
		return {
			prerequisites: false,
			source: false,
			points: 0
		};
	};

	static createFollower = (): Follower => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			type: FollowerType.Artisan,
			characteristics: [
				{ characteristic: Characteristic.Might, value: 1 },
				{ characteristic: Characteristic.Agility, value: 0 },
				{ characteristic: Characteristic.Reason, value: 1 },
				{ characteristic: Characteristic.Intuition, value: 0 },
				{ characteristic: Characteristic.Presence, value: 0 }
			],
			skills: [],
			languages: []
		};
	};

	static createMonsterGroup = (): MonsterGroup => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			picture: null,
			information: [],
			malice: [],
			addOns: [],
			monsters: []
		};
	};

	static defaultMonsterChatacteristics = [
		{ characteristic: Characteristic.Might, value: 0 },
		{ characteristic: Characteristic.Agility, value: 0 },
		{ characteristic: Characteristic.Reason, value: 0 },
		{ characteristic: Characteristic.Intuition, value: 0 },
		{ characteristic: Characteristic.Presence, value: 0 }
	];

	static createMonster = (data: {
		id: string,
		name: string,
		description?: string,
		level: number,
		role: MonsterRole,
		keywords: string[],
		encounterValue: number,
		size: Size,
		speed: Speed,
		stamina: number,
		stability: number,
		freeStrikeDamage: number,
		characteristics: { characteristic: Characteristic, value: number }[],
		features: Feature[],
		withCaptain?: string,
		retainer?: { level4?: Feature, level7?: Feature, level10?: Feature }
	}): Monster => {
		const retainer = data.retainer ?
			{
				level: data.level,
				level4: data.retainer.level4,
				level7: data.retainer.level7,
				level10: data.retainer.level10,
				featuresByLevel: RetainerData.getRetainerAdvancementFeatures(data.level, data.role.type, data.retainer.level4, data.retainer.level7, data.retainer.level10)
			}
			: null;
		return {
			id: data.id || Utils.guid(),
			name: data.name || '',
			description: data.description || '',
			picture: null,
			level: data.level || 1,
			role: data.role || FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
			keywords: data.keywords || [],
			encounterValue: data.encounterValue || 0,
			size: data.size || FactoryLogic.createSize(1, 'M'),
			speed: data.speed || FactoryLogic.createSpeed(5),
			stamina: data.stamina || 5,
			stability: data.stability || 0,
			freeStrikeDamage: data.freeStrikeDamage || 2,
			characteristics: data.characteristics || FactoryLogic.defaultMonsterChatacteristics,
			withCaptain: data.withCaptain || '',
			features: data.features || [],
			retainer: retainer,
			state: FactoryLogic.createMonsterState()
		};
	};

	static createMonsterRole = (organization: MonsterOrganizationType, type: MonsterRoleType = MonsterRoleType.NoRole): MonsterRole => {
		return {
			type: type,
			organization: organization
		};
	};

	static createSize = (value: number, mod?: 'T' | 'S' | 'M' | 'L' | ''): Size => {
		return {
			value: value,
			mod: mod || ''
		};
	};

	static createSpeed = (value: number, modes?: string): Speed => {
		return {
			value: value,
			modes: modes ? modes.split(',').map(m => m.trim()) : []
		};
	};

	static createMonsterState = (): MonsterState => {
		return {
			staminaDamage: 0,
			staminaTemp: 0,
			recoveriesUsed: 0,
			conditions: [],
			reactionUsed: false,
			hidden: false,
			defeated: false,
			captainID: undefined
		};
	};

	static createMonsterFilter = (): MonsterFilter => {
		return {
			name: '',
			keywords: [],
			roles: [],
			organizations: [],
			level: [],
			size: [],
			ev: []
		};
	};

	static createTerrainFilter = (): TerrainFilter => {
		return {
			name: '',
			roles: [],
			terrainRoles: [],
			level: [],
			ev: []
		};
	};

	static createEncounter = (): Encounter => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			groups: [],
			terrain: [],
			objective: null,
			notes: [],
			initiative: undefined,
			round: 0,
			malice: 0,
			heroes: []
		};
	};

	static createEncounterGroup = (): EncounterGroup => {
		return {
			id: Utils.guid(),
			slots: [],
			encounterState: 'ready'
		};
	};

	static createEncounterSlot = (monsterID: string): EncounterSlot => {
		return {
			id: Utils.guid(),
			monsterID: monsterID,
			count: 1,
			customization: {
				addOnIDs: [],
				itemIDs: [],
				convertToSolo: false
			},
			monsters: [],
			state: {
				staminaDamage: 0,
				staminaTemp: 0,
				recoveriesUsed: 0,
				conditions: [],
				reactionUsed: false,
				hidden: false,
				defeated: false,
				captainID: undefined
			}
		};
	};

	static createEncounterSlotFromMonster = (monster: Monster): EncounterSlot => {
		const m = Utils.copy(monster);
		m.id = Utils.guid();

		return {
			id: Utils.guid(),
			monsterID: monster.id,
			count: 1,
			customization: {
				addOnIDs: [],
				itemIDs: [],
				convertToSolo: false
			},
			monsters: [ m ],
			state: {
				staminaDamage: 0,
				staminaTemp: 0,
				recoveriesUsed: 0,
				conditions: [],
				reactionUsed: false,
				hidden: false,
				defeated: false,
				captainID: undefined
			}
		};
	};

	static createEncounterObjective = (): EncounterObjective => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			difficultyModifier: '',
			successCondition: '',
			failureCondition: '',
			victories: ''
		};
	};

	static createNegotiation = (): Negotiation => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			impression: 0,
			interest: 1,
			patience: 1,
			motivations: [],
			pitfalls: [],
			outcomes: [ '', '', '', '', '', '' ]
		};
	};

	static createMontage = (): Montage => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			scene: '',
			sections: [ FactoryLogic.createMontageSection() ],
			outcomes: {
				totalSuccess: '',
				partialSuccess: '',
				totalFailure: ''
			}
		};
	};

	static createMontageSection = (): MontageSection => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			challenges: [],
			twistInfo: '',
			twists: []
		};
	};

	static createMontageChallenge = (data: {
		id: string,
		name: string,
		description: string,
		characteristics?: Characteristic[],
		skills?: string,
		abilities?: string,
		uses?: number
	}): MontageChallenge => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			characteristics: data.characteristics || [],
			skills: data.skills || '',
			abilities: data.abilities || '',
			uses: data.uses ?? 1,
			successes: 0,
			failures: 0
		};
	};

	static createAdventure = (): Adventure => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			party: {
				count: 4,
				level: 1
			},
			introduction: [
				FactoryLogic.createElement('Introduction'),
				FactoryLogic.createElement('Hooks')
			],
			plot: FactoryLogic.createAdventurePlot()
		};
	};

	static createAdventurePlot = (name?: string): Plot => {
		return {
			id: Utils.guid(),
			name: name || '',
			description: '',
			content: [],
			plots: [],
			links: []
		};
	};

	static createAbility = (data: {
		id: string,
		name: string,
		description?: string,
		type: AbilityType,
		keywords?: AbilityKeyword[],
		distance: AbilityDistance[],
		target: string,
		cost?: number | 'signature',
		repeatable?: boolean,
		minLevel?: number,
		sections: (AbilitySectionText | AbilitySectionField | AbilitySectionRoll | AbilitySectionPackage)[]
	}): Ability => {
		return {
			id: data.id,
			name: data.name,
			description: data.description || '',
			type: data.type,
			keywords: data.keywords || [],
			distance: data.distance || [],
			target: data.target || '',
			cost: data.cost || 0,
			repeatable: data.repeatable ?? false,
			minLevel: data.minLevel || 1,
			sections: data.sections,

			preEffect: '',
			powerRoll: null,
			test: null,
			effect: '',
			strained: '',
			alternateEffects: [],
			spend: [],
			persistence: []
		};
	};

	static createAbilitySectionText = (text: string): AbilitySectionText => {
		return {
			type: 'text',
			text: text
		};
	};

	static createAbilitySectionField = (data: {
		name: string,
		effect: string,
		value?: number,
		repeatable?: boolean
	}): AbilitySectionField => {
		return {
			type: 'field',
			name: data.name,
			value: data.value || 0,
			repeatable: data.repeatable || false,
			effect: data.effect
		};
	};

	static createAbilitySectionRoll = (roll: PowerRoll): AbilitySectionRoll => {
		return {
			type: 'roll',
			roll: roll
		};
	};

	static createAbilitySectionPackage = (tag: string): AbilitySectionPackage => {
		return {
			type: 'package',
			tag: tag
		};
	};

	static createPowerRoll = (data: {
		characteristic?: Characteristic | Characteristic[],
		bonus?: number,
		tier1: string,
		tier2: string,
		tier3: string
	}): PowerRoll => {
		return {
			characteristic: data.characteristic ? Array.isArray(data.characteristic) ? data.characteristic : [ data.characteristic ] : [],
			bonus: data.bonus ?? 0,
			tier1: data.tier1,
			tier2: data.tier2,
			tier3: data.tier3
		};
	};

	static createTacticalMap = (): TacticalMap => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			items: []
		};
	};

	static createMapTile = (): MapTile => {
		return {
			id: Utils.guid(),
			type: 'tile',
			notes: '',
			position: {
				x: 0,
				y: 0,
				z: 0
			},
			dimensions: {
				width: 4,
				height: 4,
				depth: 1
			},
			corners: 'square',
			content: {
				type: 'color',
				color: 'C8C8C8FF'
			}
		};
	};

	static createMapWall = (): MapWall => {
		return {
			id: Utils.guid(),
			type: 'wall',
			notes: '',
			pointA: { x: 0, y: 0, z: 0 },
			pointB: { x: 0, y: 0, z: 0 },
			blocksLineOfSight: true,
			blocksMovement: true,
			isOpenable: false,
			isConcealed: false
		};
	};

	static createMapZone = (): MapZone => {
		return {
			id: Utils.guid(),
			type: 'zone',
			notes: '',
			position: {
				x: 0,
				y: 0,
				z: 0
			},
			dimensions: {
				width: 4,
				height: 4,
				depth: 1
			},
			corners: 'rounded',
			color: '5599ff80'
		};
	};

	static createMapMini = (): MapMini => {
		return {
			id: Utils.guid(),
			type: 'mini',
			notes: '',
			position: {
				x: 0,
				y: 0,
				z: 0
			},
			dimensions: {
				width: 1,
				height: 1,
				depth: 1
			},
			content: null
		};
	};

	static createMapFog = (): MapFog => {
		return {
			id: Utils.guid(),
			type: 'fog',
			position: {
				x: 0,
				y: 0,
				z: 0
			}
		};
	};

	static createOptions = (): Options => {
		return {
			singlePage: false,
			separateInventoryFeatures: false,
			showSkillsInGroups: true,
			showStandardAbilities: true,
			dimUnavailableAbilities: true,
			showSources: true,
			includePlayState: true,
			abilityWidth: PanelWidth.Medium,
			compactView: false,
			showMonstersInGroups: true,
			showContentInTable: false,
			showSimilarMonsters: false,
			similarLevel: true,
			similarRole: true,
			similarOrganization: true,
			similarSize: true,
			minionCount: 4,
			party: '',
			heroParty: '',
			heroCount: 4,
			heroLevel: 1,
			heroVictories: 0,
			showDefeatedCombatants: false,
			gridSize: 50,
			playerGridSize: 50
		};
	};

	static damageModifier = new FactoryDamageModifierLogic();
	static distance = new FactoryDistanceLogic();
	static feature = new FactoryFeatureLogic();
	static type = new FactoryAbilityTypeLogic();
}
