import { Ability, AbilityDistance, AbilityType, PowerRoll } from '../models/ability';
import { Encounter, EncounterGroup, EncounterSlot } from '../models/encounter';
import { Feature, FeatureAbility, FeatureAbilityCost, FeatureBonus, FeatureChoice, FeatureClassAbility, FeatureDamageModifier, FeatureDomain, FeatureDomainFeature, FeatureKit, FeatureKitType, FeatureLanguage, FeatureLanguageChoice, FeatureMalice, FeatureMultiple, FeaturePerk, FeatureSize, FeatureSkill, FeatureSkillChoice, FeatureSpeed, FeatureText, FeatureTitle } from '../models/feature';
import { Kit, KitDamageBonus } from '../models/kit';
import { Monster, MonsterGroup, MonsterRole } from '../models/monster';
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
import { FormatLogic } from './format-logic';
import { Hero } from '../models/hero';
import { HeroClass } from '../models/class';
import { Item } from '../models/item';
import { KitType } from '../enums/kit';
import { MonsterFilter } from '../models/monster-filter';
import { MonsterRoleType } from '../enums/monster-role-type';
import { Perk } from '../models/perk';
import { PerkList } from '../enums/perk-list';
import { Playbook } from '../models/playbook';
import { PowerRollType } from '../enums/power-roll-type';
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
				inventory: []
			}
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
			languages: []
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
			featuresByLevel: [ 1, 2, 3 ].map(n => ({ level: n, features: [], optionalFeatures: [] }))
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
			features: []
		};
	};

	static createItem = (): Item => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			features: [],
			count: 1
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

	static createMonster = (): Monster => {
		return {
			id: Utils.guid(),
			name: '',
			description: '',
			level: 1,
			role: {
				type: MonsterRoleType.Ambusher,
				isMinion: false
			},
			keywords: [],
			encounterValue: 0,
			size: {
				value: 1,
				mod: 'M'
			},
			speed: {
				value: 5,
				modes: ''
			},
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: [
				{
					characteristic: Characteristic.Might,
					value: 0
				},
				{
					characteristic: Characteristic.Agility,
					value: 0
				},
				{
					characteristic: Characteristic.Reason,
					value: 0
				},
				{
					characteristic: Characteristic.Intuition,
					value: 0
				},
				{
					characteristic: Characteristic.Presence,
					value: 0
				}
			],
			features: []
		};
	};

	static createMonsterRole = (type: MonsterRoleType, isMinion?: boolean): MonsterRole => {
		return {
			type: type,
			isMinion: isMinion || false
		};
	};

	static createSize = (value: number, mod?: string): Size => {
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
			isMinion: 'any',
			level: [ 1, 20 ],
			ev: [ 0, 500 ]
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

	static createAbility = (data: { id: string, name: string, description?: string, type: AbilityType, keywords?: AbilityKeyword[], distance: AbilityDistance[], target: string, cost?: number, preEffect?: string, powerRoll?: PowerRoll, effect?: string, strained?: string, alternateEffects?: string[], spend?: { value?: number, effect: string }[], persistence?: { value?: number, effect: string }[] }): Ability => {
		return {
			id: data.id,
			name: data.name,
			description: data.description || '',
			type: data.type,
			keywords: data.keywords || [],
			distance: data.distance || [],
			target: data.target || '',
			cost: data.cost || 0,
			preEffect: data.preEffect || '',
			powerRoll: data.powerRoll || null,
			effect: data.effect || '',
			strained: data.strained || '',
			alternateEffects: data.alternateEffects || [],
			spend: data.spend ? data.spend.map(s => ({ value: s.value || 0, effect: s.effect })) : [],
			persistence: data.persistence ? data.persistence.map(p => ({ value: p.value || 0, effect: p.effect })) : []
		};
	};

	static createPowerRoll = (data: { type?: PowerRollType, characteristic?: Characteristic[], bonus?: number, tier1: string, tier2: string, tier3: string }) => {
		return {
			type: data.type || PowerRollType.PowerRoll,
			characteristic: data.characteristic || [],
			bonus: data.bonus || 0,
			tier1: data.tier1,
			tier2: data.tier2,
			tier3: data.tier3
		} as PowerRoll;
	};

	static type = {
		createAction: (free = false): AbilityType => {
			return {
				usage: AbilityUsage.Action,
				free: free,
				trigger: '',
				time: ''
			};
		},
		createManeuver: (free = false): AbilityType => {
			return {
				usage: AbilityUsage.Maneuver,
				free: free,
				trigger: '',
				time: ''
			};
		},
		createMove: (free = false): AbilityType => {
			return {
				usage: AbilityUsage.Move,
				free: free,
				trigger: '',
				time: ''
			};
		},
		createTrigger: (trigger: string, free = false): AbilityType => {
			return {
				usage: AbilityUsage.Trigger,
				free: free,
				trigger: trigger,
				time: ''
			};
		},
		createTime: (time: string): AbilityType => {
			return {
				usage: AbilityUsage.Other,
				free: false,
				trigger: '',
				time: time
			};
		},
		createVillainAction: (): AbilityType => {
			return {
				usage: AbilityUsage.VillainAction,
				free: false,
				trigger: '',
				time: ''
			};
		},
		createNoAction: (): AbilityType => {
			return {
				usage: AbilityUsage.NoAction,
				free: false,
				trigger: '',
				time: ''
			};
		}
	};

	static distance = {
		create: (data: { type: AbilityDistanceType, value: number, value2?: number, within?: number }): AbilityDistance => {
			return {
				type: data.type,
				value: data.value,
				value2: data.value2 || 0,
				within: data.within || 0,
				special: ''
			};
		},
		createSelf: (): AbilityDistance => {
			return {
				type: AbilityDistanceType.Self,
				value: 0,
				value2: 0,
				within: 0,
				special: ''
			};
		},
		createMelee: (value = 1): AbilityDistance => {
			return {
				type: AbilityDistanceType.Melee,
				value: value,
				value2: 0,
				within: 0,
				special: ''
			};
		},
		createRanged: (value = 10): AbilityDistance => {
			return {
				type: AbilityDistanceType.Ranged,
				value: value,
				value2: 0,
				within: 0,
				special: ''
			};
		},
		createSpecial: (special: string): AbilityDistance => {
			return {
				type: AbilityDistanceType.Special,
				value: 0,
				value2: 0,
				within: 0,
				special: special
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
		createAbility: (data: { ability: Ability }): FeatureAbility => {
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
		createBonus: (data: { id: string, name?: string, description?: string, field: FeatureField, value?: number, valuePerLevel?: number, valuePerEchelon?: number }): FeatureBonus => {
			return {
				id: data.id,
				name: data.name || data.field.toString(),
				description: data.description || '',
				type: FeatureType.Bonus,
				data: {
					field: data.field,
					value: data.value || 0,
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
				description: data.description || (count > 1 ? `Choose ${count} options.` : 'Choose an option.'),
				type: FeatureType.Choice,
				data: {
					options: data.options,
					count: count,
					selected: []
				}
			};
		},
		createClassAbilityChoice: (data: { id: string, name?: string, description?: string, cost: number, count?: number }): FeatureClassAbility => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Ability',
				description: data.description || `Choose ${count > 1 ? count : 'a'} ${data.cost === 0 ? 'signature' : `${data.cost}pt`} ${count > 1 ? 'abilities' : 'ability'}.`,
				type: FeatureType.ClassAbility,
				data: {
					cost: data.cost,
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
				description: data.description || (count > 1 ? `Choose ${count} domains.` : 'Choose a domain.'),
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
				description: data.description || (count > 1 ? `Choose ${count} options.` : 'Choose an option.'),
				type: FeatureType.DomainFeature,
				data: {
					level: data.level,
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
				description: data.description || (count > 1 ? `Choose ${count} kits.` : 'Choose a kit.'),
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
				description: data.description || `Allow ${data.types.join(', ')} kits.`,
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
		createMalice: (data: { id: string, name: string, description: string, cost: number }): FeatureMalice => {
			return {
				id: data.id,
				name: data.name,
				description: data.description,
				type: FeatureType.Malice,
				data: {
					cost: data.cost
				}
			};
		},
		createMultiple: (data: { id: string, name?: string, description?: string, features: Feature[] }): FeatureMultiple => {
			return {
				id: data.id,
				name: data.name || data.features.map(f => f.name || 'Unnamed Feature').join(', '),
				description: data.description || '',
				type: FeatureType.Multiple,
				data: {
					features: data.features
				}
			};
		},
		createPerk: (data: { id: string, name?: string, description?: string, lists?: PerkList[], count?: number }): FeaturePerk => {
			const count = data.count || 1;
			const lists = data.lists || [];

			const prefix = (lists.length > 0) ? `${lists.join(' / ')} ` : '';

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
		createSize: (data: { id: string, name?: string, description?: string, sizeValue: number, sizeMod: string }): FeatureSize => {
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

			const prefix = (options.length === 0) && (listOptions.length > 0) ? `${listOptions.join(' / ')} ` : '';

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
		createTitle: (data: { id: string, name?: string, description?: string, count?: number }): FeatureTitle => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Title',
				description: data.description || (count > 1 ? `Choose ${count} titles.` : 'Choose a title.'),
				type: FeatureType.Title,
				data: {
					count: count,
					selected: []
				}
			};
		}
	};
}
