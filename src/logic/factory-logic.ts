import { Ability, AbilityDistance, AbilityType } from '../models/ability';
import { Encounter, EncounterGroup, EncounterSlot } from '../models/encounter';
import { Feature, FeatureAbility, FeatureAbilityCost, FeatureAbilityData, FeatureAncestryChoice, FeatureAncestryFeatureChoice, FeatureBonus, FeatureChoice, FeatureClassAbility, FeatureDamageModifier, FeatureDomain, FeatureDomainFeature, FeatureItemChoice, FeatureKit, FeatureKitType, FeatureLanguage, FeatureLanguageChoice, FeatureMalice, FeatureMultiple, FeaturePackage, FeaturePerk, FeatureSize, FeatureSkill, FeatureSkillChoice, FeatureSpeed, FeatureText, FeatureTitleChoice } from '../models/feature';
import { Kit, KitDamageBonus } from '../models/kit';
import { Monster, MonsterGroup, MonsterRole } from '../models/monster';
import { Project, ProjectProgress } from '../models/project';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityUsage } from '../enums/ability-usage';
import { Ancestry } from '../models/ancestry';
import { Career } from '../models/career';
import { Characteristic } from '../enums/characteristic';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { DamageModifier } from '../models/damage-modifier';
import { Domain } from '../models/domain';
import { FeatureField } from '../enums/feature-field';
import { FeatureType } from '../enums/feature-type';
import { Format } from '../utils/format';
import { FormatLogic } from './format-logic';
import { Hero } from '../models/hero';
import { HeroClass } from '../models/class';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type';
import { KitArmor } from '../enums/kit-armor';
import { KitType } from '../enums/kit-type';
import { KitWeapon } from '../enums/kit-weapon';
import { MonsterFilter } from '../models/monster-filter';
import { MonsterLogic } from './monster-logic';
import { MonsterOrganizationType } from '../enums/monster-organization-type';
import { MonsterRoleType } from '../enums/monster-role-type';
import { Perk } from '../models/perk';
import { PerkList } from '../enums/perk-list';
import { Playbook } from '../models/playbook';
import { PowerRoll } from '../models/power-roll';
import { Size } from '../models/size';
import { SkillList } from '../enums/skill-list';
import { Sourcebook } from '../models/sourcebook';
import { SubClass } from '../models/subclass';
import { Title } from '../models/title';
import { Utils } from '../utils/utils';

export class FactoryLogic {
	static createHero = (sourcebookIDs: string[]): Hero => {
		return {
			id: Utils.guid(),
			name: '',
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
			state: {
				staminaDamage: 0,
				recoveriesUsed: 0,
				surges: 0,
				victories: 0,
				xp: 0,
				heroicResource: 0,
				heroTokens: 0,
				renown: 0,
				wealth: 1,
				projectPoints: 0,
				conditions: [],
				inventory: [],
				projects: []
			},
			abilityCustomizations: []
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
			domains: [],
			kits: [],
			complications: [],
			perks: [],
			titles: [],
			items: [],
			monsterGroups: [],
			skills: [],
			languages: [],
			projects: []
		};
	};

	static createPlaybook = (): Playbook => {
		return {
			encounters: []
		};
	};

	static createAncestry = (): Ancestry => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			features: []
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
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			heroicResource: '',
			subclassName: '',
			subclassCount: 1,
			primaryCharacteristics: [],
			featuresByLevel: [ 1, 2, 3 ].map(n => ({ level: n, features: [] })),
			abilities: [],
			subclasses: [],
			level: 1,
			characteristics: []
		};
	};

	static createSubclass = (): SubClass => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			featuresByLevel: [ 1, 2, 3 ].map(n => ({ level: n, features: [], optionalFeatures: [] })),
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
			featuresByLevel: [ 1, 2, 3 ].map(n => ({ level: n, features: [], optionalFeatures: [] })),
			piety: ''
		};
	};

	static createKit = (): Kit => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			type: KitType.Standard,
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
		featuresByLevel?: { level: number, features: Feature[] }[]
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
			count: 1
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
		effect?: string
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

	static createMonsterGroup = (): MonsterGroup => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			information: [],
			malice: [],
			monsters: []
		};
	};

	static createMonster = (data: {
		id: string,
		name: string,
		description?: string,
		level: number,
		role: MonsterRole,
		keywords: string[],
		encounterValue: number,
		size?: Size,
		speed: { value: number, modes: string },
		stamina: number,
		stability?: number,
		freeStrikeDamage: number,
		characteristics: { characteristic: Characteristic, value: number }[],
		withCaptain?: string,
		features: Feature[]
	}): Monster => {
		return {
			id: data.id || Utils.guid(),
			name: data.name || '',
			description: data.description || '',
			level: data.level || 1,
			role: data.role || FactoryLogic.createMonsterRole(MonsterRoleType.Ambusher, MonsterOrganizationType.Platoon),
			keywords: data.keywords || [],
			encounterValue: data.encounterValue || 0,
			size: data.size || FactoryLogic.createSize(1, 'M'),
			speed: data.speed || FactoryLogic.createSpeed(5),
			stamina: data.stamina || 5,
			stability: data.stability || 0,
			freeStrikeDamage: data.freeStrikeDamage || 2,
			characteristics: data.characteristics || MonsterLogic.createCharacteristics(0, 0, 0, 0, 0),
			withCaptain: data.withCaptain || '',
			features: data.features || []
		};
	};

	static createMonsterRole = (type: MonsterRoleType, organization: MonsterOrganizationType): MonsterRole => {
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

	static createSpeed = (value: number, modes?: string) => {
		return {
			value: value,
			modes: modes || ''
		};
	};

	static createMonsterFilter = (): MonsterFilter => {
		return {
			name: '',
			roles: [],
			organizations: [],
			level: [ 1, 10 ],
			ev: [ 0, 120 ]
		};
	};

	static createEncounter = (): Encounter => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			groups: []
		};
	};

	static createEncounterGroup = (): EncounterGroup => {
		return {
			id: Utils.guid(),
			slots: []
		};
	};

	static createEncounterSlot = (monsterID: string): EncounterSlot => {
		return {
			id: Utils.guid(),
			monsterID: monsterID,
			count: 1
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
		minLevel?: number,
		preEffect?: string,
		powerRoll?: PowerRoll,
		test?: PowerRoll,
		effect?: string,
		strained?: string,
		alternateEffects?: string[],
		spend?: { name?: string, value: number, repeatable?: boolean, effect: string }[],
		persistence?: { value: number, effect: string }[]
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
			minLevel: data.minLevel || 1,
			preEffect: data.preEffect || '',
			powerRoll: data.powerRoll || null,
			test: data.test ?? null,
			effect: data.effect || '',
			strained: data.strained || '',
			alternateEffects: data.alternateEffects || [],
			spend: (data.spend ?? []).map(s => ({ ...s, name: s.name ?? '', repeatable: s.repeatable ?? false })),
			persistence: (data.persistence ?? []).map(p => ({ ...p }))
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

	static type = {
		createAction: (options?: { free?: boolean, qualifiers?: string[] }): AbilityType => {
			return {
				usage: AbilityUsage.Action,
				free: options?.free ?? false,
				trigger: '',
				time: '',
				qualifiers: options?.qualifiers ?? []
			};
		},
		createManeuver: (options?: { free?: boolean, qualifiers?: string[] }): AbilityType => {
			return {
				usage: AbilityUsage.Maneuver,
				free: options?.free ?? false,
				trigger: '',
				time: '',
				qualifiers: options?.qualifiers ?? []
			};
		},
		createMove: (free = false): AbilityType => {
			return {
				usage: AbilityUsage.Move,
				free: free,
				trigger: '',
				time: '',
				qualifiers: []
			};
		},
		createTrigger: (trigger: string, free = false): AbilityType => {
			return {
				usage: AbilityUsage.Trigger,
				free: free,
				trigger: trigger,
				time: '',
				qualifiers: []
			};
		},
		createTime: (time: string): AbilityType => {
			return {
				usage: AbilityUsage.Other,
				free: false,
				trigger: '',
				time: time,
				qualifiers: []
			};
		},
		createVillainAction: (): AbilityType => {
			return {
				usage: AbilityUsage.VillainAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: []
			};
		},
		createNoAction: (): AbilityType => {
			return {
				usage: AbilityUsage.NoAction,
				free: false,
				trigger: '',
				time: '',
				qualifiers: []
			};
		}
	};

	static distance = {
		create: (data: { type: AbilityDistanceType, value: number, value2?: number, within?: number, qualifier?: string }): AbilityDistance => {
			return {
				type: data.type,
				value: data.value,
				value2: data.value2 || 0,
				within: data.within || 0,
				special: '',
				qualifier: data.qualifier ?? ''
			};
		},
		createSelf: (): AbilityDistance => {
			return {
				type: AbilityDistanceType.Self,
				value: 0,
				value2: 0,
				within: 0,
				special: '',
				qualifier: ''
			};
		},
		createMelee: (value = 1): AbilityDistance => {
			return {
				type: AbilityDistanceType.Melee,
				value: value,
				value2: 0,
				within: 0,
				special: '',
				qualifier: ''
			};
		},
		createRanged: (value = 10): AbilityDistance => {
			return {
				type: AbilityDistanceType.Ranged,
				value: value,
				value2: 0,
				within: 0,
				special: '',
				qualifier: ''
			};
		},
		createSpecial: (special: string): AbilityDistance => {
			return {
				type: AbilityDistanceType.Special,
				value: 0,
				value2: 0,
				within: 0,
				special: special,
				qualifier: ''
			};
		}
	};

	static feature = {
		create: (data: { id: string, name: string, description: string }): FeatureText => {
			return {
				id: data.id,
				name: data.name,
				description: data.description,
				type: FeatureType.Text,
				data: null
			};
		},
		createAbility: (data: FeatureAbilityData): FeatureAbility => {
			return {
				id: data.ability.id,
				name: data.ability.name,
				description: data.ability.description,
				type: FeatureType.Ability,
				data: {
					ability: data.ability
				}
			};
		},
		createAbilityCost: (data: { id: string, name?: string, description?: string, keywords: AbilityKeyword[], modifier: number }): FeatureAbilityCost => {
			return {
				id: data.id,
				name: data.name || `${data.keywords.join(', ')} cost modifier`,
				description: data.description || '',
				type: FeatureType.AbilityCost,
				data: {
					keywords: data.keywords,
					modifier: data.modifier
				}
			};
		},
		createAncestry: (data: { id: string, name?: string, description?: string }): FeatureAncestryChoice => {
			return {
				id: data.id,
				name: data.name || 'Ancestry',
				description: data.description || '',
				type: FeatureType.AncestryChoice,
				data: {
					selected: null
				}
			};
		},
		createAncestryFeature: (data: { id: string, name?: string, description?: string, current: boolean, former: boolean, value: number }): FeatureAncestryFeatureChoice => {
			return {
				id: data.id,
				name: data.name || 'Ancestry Feature',
				description: data.description || '',
				type: FeatureType.AncestryFeatureChoice,
				data: {
					source: {
						current: data.current,
						former: data.former
					},
					value: data.value,
					selected: null
				}
			};
		},
		createBonus: (data: { id: string, name?: string, description?: string, field: FeatureField, value?: number, valueCharacteristics?: Characteristic[], valuePerLevel?: number, valuePerEchelon?: number }): FeatureBonus => {
			return {
				id: data.id,
				name: data.name || data.field.toString(),
				description: data.description || '',
				type: FeatureType.Bonus,
				data: {
					field: data.field,
					value: data.value || 0,
					valueCharacteristics: data.valueCharacteristics || [],
					valuePerLevel: data.valuePerLevel || 0,
					valuePerEchelon: data.valuePerEchelon || 0
				}
			};
		},
		createChoice: (data: { id: string, name?: string, description?: string, options: { feature: Feature, value: number }[], count?: number }): FeatureChoice => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Choice',
				description: data.description || '',
				type: FeatureType.Choice,
				data: {
					options: data.options,
					count: count,
					selected: []
				}
			};
		},
		createClassAbilityChoice: (data: { id: string, name?: string, description?: string, cost: number | 'signature', minLevel?: number, count?: number }): FeatureClassAbility => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Ability',
				description: data.description || '',
				type: FeatureType.ClassAbility,
				data: {
					cost: data.cost,
					minLevel: data.minLevel || 1,
					count: count,
					selectedIDs: []
				}
			};
		},
		createDamageModifier: (data: { id: string, name?: string, description?: string, modifiers: DamageModifier[] }): FeatureDamageModifier => {
			return {
				id: data.id,
				name: data.name || 'Damage Modifier',
				description: data.description || data.modifiers.map(FormatLogic.getDamageModifier).join(', '),
				type: FeatureType.DamageModifier,
				data: {
					modifiers: data.modifiers
				}
			};
		},
		createDomainChoice: (data: { id: string, name?: string, description?: string, count?: number }): FeatureDomain => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Domain',
				description: data.description || '',
				type: FeatureType.Domain,
				data: {
					count: count,
					selected: []
				}
			};
		},
		createDomainFeature: (data: { id: string, name?: string, description?: string, level: number, count?: number }): FeatureDomainFeature => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Domain Feature Choice',
				description: data.description || '',
				type: FeatureType.DomainFeature,
				data: {
					level: data.level,
					count: count,
					selected: []
				}
			};
		},
		createItemChoice: (data: { id: string, name?: string, description?: string, types?: ItemType[], count?: number }): FeatureItemChoice => {
			const count = data.count || 1;
			const type = data.types && (data.types.length === 1) ? data.types[0] : 'Item';
			return {
				id: data.id,
				name: data.name || type,
				description: data.description || '',
				type: FeatureType.ItemChoice,
				data: {
					types: data.types || [ ItemType.Artifact, ItemType.Consumable, ItemType.Leveled, ItemType.Trinket ],
					count: count,
					selected: []
				}
			};
		},
		createKitChoice: (data: { id: string, name?: string, description?: string, types?: KitType[], count?: number }): FeatureKit => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Kit',
				description: data.description || '',
				type: FeatureType.Kit,
				data: {
					types: data.types || [],
					count: count,
					selected: []
				}
			};
		},
		createKitType: (data: { id: string, name?: string, description?: string, types: KitType[] }): FeatureKitType => {
			return {
				id: data.id,
				name: data.name || 'Kit Type',
				description: data.description || '',
				type: FeatureType.KitType,
				data: {
					types: data.types || []
				}
			};
		},
		createLanguage: (data: { id: string, name?: string, description?: string, language: string }): FeatureLanguage => {
			return {
				id: data.id,
				name: data.name || data.language,
				description: data.description || '',
				type: FeatureType.Language,
				data: {
					language: data.language
				}
			};
		},
		createLanguageChoice: (data: { id: string, name?: string, description?: string, options?: string[], count?: number, selected?: string[] }): FeatureLanguageChoice => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Language',
				description: data.description || '',
				type: FeatureType.LanguageChoice,
				data: {
					options: data.options || [],
					count: count,
					selected: data.selected || []
				}
			};
		},
		createMalice: (data: { id: string, name: string, cost: number, repeatable?: boolean, sections: (string | PowerRoll)[] }): FeatureMalice => {
			return {
				id: data.id,
				name: data.name,
				description: '',
				type: FeatureType.Malice,
				data: {
					cost: data.cost,
					repeatable: data.repeatable || false,
					sections: data.sections
				}
			};
		},
		createMultiple: (data: { id: string, name?: string, description?: string, features: Feature[] }): FeatureMultiple => {
			return {
				id: data.id,
				name: data.name || data.features.map(f => f.name || 'Unnamed Feature').join(', '),
				description: data.description || data.features.map(f => f.name || 'Unnamed Feature').join(', '),
				type: FeatureType.Multiple,
				data: {
					features: data.features
				}
			};
		},
		createPackage: (data: { id: string, name?: string, description?: string }): FeaturePackage => {
			return {
				id: data.id,
				name: data.name || 'Domain Package',
				description: data.description || '',
				type: FeatureType.Package,
				data: {}
			};
		},
		createPerk: (data: { id: string, name?: string, description?: string, lists?: PerkList[], count?: number }): FeaturePerk => {
			const count = data.count || 1;
			const lists = data.lists || [];

			const prefix = (lists.length > 0) && (lists.length < 6) ? `${lists.join(' / ')} ` : '';

			return {
				id: data.id,
				name: data.name || (count > 1 ? `${prefix}Perks` : `${prefix}Perk`),
				description: data.description || '',
				type: FeatureType.Perk,
				data: {
					lists: data.lists || [ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ],
					count: count,
					selected: []
				}
			};
		},
		createSize: (data: { id: string, name?: string, description?: string, sizeValue: number, sizeMod: 'T' | 'S' | 'M' | 'L' }): FeatureSize => {
			return {
				id: data.id,
				name: data.name || 'Size',
				description: data.description || '',
				type: FeatureType.Size,
				data: {
					size: {
						value: data.sizeValue,
						mod: data.sizeMod
					}
				}
			};
		},
		createSkill: (data: { id: string, name?: string, description?: string, skill: string }): FeatureSkill => {
			return {
				id: data.id,
				name: data.name || data.skill,
				description: data.description || '',
				type: FeatureType.Skill,
				data: {
					skill: data.skill
				}
			};
		},
		createSkillChoice: (data: { id: string, name?: string, description?: string, options?: string[], listOptions?: SkillList[], count?: number, selected?: string[] }): FeatureSkillChoice => {
			const count = data.count || 1;
			const options = data.options || [];
			const listOptions = data.listOptions || [];

			const prefix = (listOptions.length < 5) ? ((options.length === 0) && (listOptions.length > 0) ? `${listOptions.join(' / ')} ` : '') : '';

			return {
				id: data.id,
				name: data.name || (count > 1 ? `${prefix}Skills` : `${prefix}Skill`),
				description: data.description || '',
				type: FeatureType.SkillChoice,
				data: {
					options: data.options || [],
					listOptions: data.listOptions || [],
					count: count,
					selected: data.selected || []
				}
			};
		},
		createSoloMonster: (data: { id: string, name: string, gender?: 'm' | 'f' | 'n' , endEfect?: number }): FeatureText => {
			const capitalizedName = data.name.split(' ').map((n, i) => i === 0 ? Format.capitalize(n) : n).join(' ');
			const genderWithDefault = data.gender ?? 'n';
			const heSheThey = ({ m: 'he', f: 'she', n: 'they' } as const)[ genderWithDefault ];
			const hisHerTheir = ({ m: 'his', f: 'her', n: 'their' } as const)[ genderWithDefault ];
			const himHerThem = ({ m: 'him', f: 'her', n: 'them' } as const)[ genderWithDefault ];
			return {
				id: data.id,
				name: 'Solo Monster',
				description: `
**Solo Turns** ${capitalizedName} takes up to two turns each round. ${Format.capitalize(heSheThey)} can’t take turns consecutively. ${Format.capitalize(heSheThey)} can use two actions on each of ${hisHerTheir} turns. While dazed, ${data.name} can take one action and one maneuver per turn.

**End Effect** At the end of ${hisHerTheir} turn, ${data.name} can take ${data.endEfect || 5} damage to end one save ends effect affecting ${himHerThem}. This damage can’t be reduced in any way.`,
				type: FeatureType.Text,
				data: null
			};
		},
		createSpeed: (data: { id: string, name?: string, description?: string, speed: number }): FeatureSpeed => {
			return {
				id: data.id,
				name: data.name || 'Speed',
				description: data.description || '',
				type: FeatureType.Speed,
				data: {
					speed: data.speed
				}
			};
		},
		createTitleChoice: (data: { id: string, name?: string, description?: string, echelon?: number, count?: number }): FeatureTitleChoice => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Title',
				description: data.description || (count > 1 ? `Choose ${count} titles.` : 'Choose a title.'),
				type: FeatureType.TitleChoice,
				data: {
					echelon: data.echelon || 1,
					count: count,
					selected: []
				}
			};
		}
	};
}
