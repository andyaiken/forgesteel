import { Feature, FeatureAbility, FeatureAbilityCost, FeatureAbilityDamage, FeatureAbilityData, FeatureAbilityDistance, FeatureAddOn, FeatureAncestryChoice, FeatureAncestryFeatureChoice, FeatureBonus, FeatureCharacteristicBonus, FeatureChoice, FeatureClassAbility, FeatureCompanion, FeatureConditionImmunity, FeatureDamageModifier, FeatureDomain, FeatureDomainFeature, FeatureFollower, FeatureHeroicResource, FeatureHeroicResourceGain, FeatureItemChoice, FeatureKit, FeatureLanguage, FeatureLanguageChoice, FeatureMalice, FeatureMovementMode, FeatureMultiple, FeaturePackage, FeaturePackageContent, FeaturePerk, FeatureProficiency, FeatureSize, FeatureSkill, FeatureSkillChoice, FeatureSpeed, FeatureSummon, FeatureTaggedFeature, FeatureTaggedFeatureChoice, FeatureText, FeatureTitleChoice } from '../models/feature';
import { AbilityKeyword } from '../enums/ability-keyword';
import { Characteristic } from '../enums/characteristic';
import { ConditionType } from '../enums/condition-type';
import { DamageModifier } from '../models/damage-modifier';
import { DamageType } from '../enums/damage-type';
import { FeatureAddOnType } from '../enums/feature-addon-type';
import { FeatureField } from '../enums/feature-field';
import { FeatureType } from '../enums/feature-type';
import { Follower } from '../models/follower';
import { Format } from '../utils/format';
import { FormatLogic } from './format-logic';
import { ItemType } from '../enums/item-type';
import { KitArmor } from '../enums/kit-armor';
import { KitWeapon } from '../enums/kit-weapon';
import { Monster } from '../models/monster';
import { PerkList } from '../enums/perk-list';
import { PowerRoll } from '../models/power-roll';
import { SkillList } from '../enums/skill-list';

export class FactoryFeatureLogic {
	create = (data: { id: string, name: string, description: string }): FeatureText => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: FeatureType.Text,
			data: null
		};
	};

	createAbility = (data: FeatureAbilityData): FeatureAbility => {
		return {
			id: data.ability.id,
			name: data.ability.name,
			description: data.ability.description,
			type: FeatureType.Ability,
			data: {
				ability: data.ability
			}
		};
	};

	createAbilityCost = (data: { id: string, name?: string, description?: string, keywords: AbilityKeyword[], modifier: number }): FeatureAbilityCost => {
		return {
			id: data.id,
			name: data.name || 'Ability cost modifier',
			description: data.description || '',
			type: FeatureType.AbilityCost,
			data: {
				keywords: data.keywords,
				modifier: data.modifier
			}
		};
	};

	createAbilityDamage = (data: { id: string, name?: string, description?: string, keywords: AbilityKeyword[], value?: number, valueCharacteristics?: Characteristic[], valueCharacteristicMultiplier?: number, valuePerLevel?: number, valuePerEchelon?: number, damageType?: DamageType }): FeatureAbilityDamage => {
		return {
			id: data.id,
			name: data.name || 'Ability damage modifier',
			description: data.description || '',
			type: FeatureType.AbilityDamage,
			data: {
				keywords: data.keywords,
				value: data.value || 0,
				valueCharacteristics: data.valueCharacteristics || [],
				valueCharacteristicMultiplier: data.valueCharacteristicMultiplier || 0,
				valuePerLevel: data.valuePerLevel || 0,
				valuePerEchelon: data.valuePerEchelon || 0,
				damageType: data.damageType || DamageType.Damage
			}
		};
	};

	createAbilityDistance = (data: { id: string, name?: string, description?: string, keywords: AbilityKeyword[], value?: number, valueCharacteristics?: Characteristic[], valueCharacteristicMultiplier?: number, valuePerLevel?: number, valuePerEchelon?: number }): FeatureAbilityDistance => {
		return {
			id: data.id,
			name: data.name || 'Ability distance modifier',
			description: data.description || '',
			type: FeatureType.AbilityDistance,
			data: {
				keywords: data.keywords,
				value: data.value || 0,
				valueCharacteristics: data.valueCharacteristics || [],
				valueCharacteristicMultiplier: data.valueCharacteristicMultiplier || 0,
				valuePerLevel: data.valuePerLevel || 0,
				valuePerEchelon: data.valuePerEchelon || 0
			}
		};
	};

	createAddOn = (data: { id: string, name: string, description: string, category: FeatureAddOnType, cost?: number }): FeatureAddOn => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: FeatureType.AddOn,
			data: {
				category: data.category,
				cost: data.cost || 1
			}
		};
	};

	createAncestry = (data: { id: string, name?: string, description?: string }): FeatureAncestryChoice => {
		return {
			id: data.id,
			name: data.name || 'Ancestry',
			description: data.description || '',
			type: FeatureType.AncestryChoice,
			data: {
				selected: null
			}
		};
	};

	createAncestryFeature = (data: { id: string, name?: string, description?: string, current: boolean, former: boolean, customID: string, value: number }): FeatureAncestryFeatureChoice => {
		return {
			id: data.id,
			name: data.name || 'Ancestry Feature',
			description: data.description || '',
			type: FeatureType.AncestryFeatureChoice,
			data: {
				source: {
					current: data.current,
					former: data.former,
					customID: data.customID
				},
				value: data.value,
				selected: null
			}
		};
	};

	createBonus = (data: { id: string, name?: string, description?: string, field: FeatureField, value?: number, valueCharacteristics?: Characteristic[], valueCharacteristicMultiplier?: number, valuePerLevel?: number, valuePerEchelon?: number }): FeatureBonus => {
		return {
			id: data.id,
			name: data.name || data.field.toString(),
			description: data.description || '',
			type: FeatureType.Bonus,
			data: {
				field: data.field,
				value: data.value || 0,
				valueCharacteristics: data.valueCharacteristics || [],
				valueCharacteristicMultiplier: data.valueCharacteristicMultiplier || 1,
				valuePerLevel: data.valuePerLevel || 0,
				valuePerEchelon: data.valuePerEchelon || 0
			}
		};
	};

	createCharacteristicBonus = (data: { id: string, name?: string, description?: string, characteristic: Characteristic, value: number }): FeatureCharacteristicBonus => {
		return {
			id: data.id,
			name: data.name || data.characteristic.toString(),
			description: data.description || '',
			type: FeatureType.CharacteristicBonus,
			data: {
				characteristic: data.characteristic,
				value: data.value
			}
		};
	};

	createChoice = (data: { id: string, name?: string, description?: string, options: { feature: Feature, value: number }[], count?: number | 'ancestry' }): FeatureChoice => {
		return {
			id: data.id,
			name: data.name || 'Choice',
			description: data.description || '',
			type: FeatureType.Choice,
			data: {
				options: data.options,
				count: data.count || 1,
				selected: []
			}
		};
	};

	createClassAbilityChoice = (data: { id: string, name?: string, description?: string, cost: number | 'signature', allowAnySource?: boolean, minLevel?: number, count?: number }): FeatureClassAbility => {
		return {
			id: data.id,
			name: data.name || 'Ability',
			description: data.description || '',
			type: FeatureType.ClassAbility,
			data: {
				classID: undefined,
				cost: data.cost,
				allowAnySource: data.allowAnySource ?? false,
				minLevel: data.minLevel || 1,
				count: data.count || 1,
				selectedIDs: []
			}
		};
	};

	createCompanion = (data: { id: string, name?: string, description?: string, type: 'companion' | 'mount' | 'retainer' }): FeatureCompanion => {
		return {
			id: data.id,
			name: data.name || Format.capitalize(data.type),
			description: data.description || '',
			type: FeatureType.Companion,
			data: {
				type: data.type,
				selected: null
			}
		};
	};

	createConditionImmunity = (data: { id: string, name?: string, description?: string, conditions: ConditionType[] }): FeatureConditionImmunity => {
		return {
			id: data.id,
			name: data.name || 'Condition Immunity',
			description: data.description || '',
			type: FeatureType.ConditionImmunity,
			data: {
				conditions: data.conditions
			}
		};
	};

	createDamageModifier = (data: { id: string, name?: string, description?: string, modifiers: DamageModifier[] }): FeatureDamageModifier => {
		return {
			id: data.id,
			name: data.name || 'Damage Modifier',
			description: data.description || data.modifiers.map(FormatLogic.getDamageModifier).join(', '),
			type: FeatureType.DamageModifier,
			data: {
				modifiers: data.modifiers
			}
		};
	};

	createDomainChoice = (data: { id: string, name?: string, description?: string, count?: number }): FeatureDomain => {
		return {
			id: data.id,
			name: data.name || 'Domain',
			description: data.description || '',
			type: FeatureType.Domain,
			data: {
				count: data.count || 1,
				selected: []
			}
		};
	};

	createDomainFeature = (data: { id: string, name?: string, description?: string, level: number, count?: number }): FeatureDomainFeature => {
		return {
			id: data.id,
			name: data.name || 'Domain Feature Choice',
			description: data.description || '',
			type: FeatureType.DomainFeature,
			data: {
				level: data.level,
				count: data.count || 1,
				selected: []
			}
		};
	};

	createFollower = (data: { id: string, name?: string, description?: string, follower: Follower }): FeatureFollower => {
		return {
			id: data.id,
			name: data.name || 'Follower',
			description: data.description || '',
			type: FeatureType.Follower,
			data: {
				follower: data.follower
			}
		};
	};

	createHeroicResource = (data: { id: string, name: string, description?: string, type?: 'heroic' | 'epic', gains: { tag: string, trigger: string, value: string }[], details?: string, canBeNegative?: boolean }): FeatureHeroicResource => {
		return {
			id: data.id,
			name: data.name,
			description: data.description || '',
			type: FeatureType.HeroicResource,
			data: {
				type: data.type || 'heroic',
				gains: data.gains,
				details: data.details || '',
				canBeNegative: data.canBeNegative ?? false,
				value: 0
			}
		};
	};

	createHeroicResourceGain = (data: { id: string, name: string, tag: string, trigger: string, value: string, replacesTags?: string[] }): FeatureHeroicResourceGain => {
		return {
			id: data.id,
			name: data.name,
			description: '',
			type: FeatureType.HeroicResourceGain,
			data: {
				tag: data.tag,
				trigger: data.trigger,
				value: data.value,
				replacesTags: data.replacesTags || []
			}
		};
	};

	createItemChoice = (data: { id: string, name?: string, description?: string, types?: ItemType[], count?: number }): FeatureItemChoice => {
		const type = data.types && (data.types.length === 1) ? data.types[0] : 'Item';
		return {
			id: data.id,
			name: data.name || type,
			description: data.description || '',
			type: FeatureType.ItemChoice,
			data: {
				types: data.types || [ ItemType.Artifact, ItemType.Consumable, ItemType.Leveled, ItemType.Trinket ],
				count: data.count || 1,
				selected: []
			}
		};
	};

	createKitChoice = (data: { id: string, name?: string, description?: string, types?: string[], count?: number }): FeatureKit => {
		return {
			id: data.id,
			name: data.name || 'Kit',
			description: data.description || '',
			type: FeatureType.Kit,
			data: {
				types: data.types || [ '' ],
				count: data.count || 1,
				selected: []
			}
		};
	};

	createLanguage = (data: { id: string, name?: string, description?: string, language: string }): FeatureLanguage => {
		return {
			id: data.id,
			name: data.name || data.language,
			description: data.description || '',
			type: FeatureType.Language,
			data: {
				language: data.language
			}
		};
	};

	createLanguageChoice = (data: { id: string, name?: string, description?: string, options?: string[], count?: number, selected?: string[] }): FeatureLanguageChoice => {
		const count = data.count || 1;
		return {
			id: data.id,
			name: data.name || (count === 1 ? 'Language' : 'Languages'),
			description: data.description || '',
			type: FeatureType.LanguageChoice,
			data: {
				options: data.options || [],
				count: count,
				selected: data.selected || []
			}
		};
	};

	createMalice = (data: { id: string, name: string, cost: number, repeatable?: boolean, sections: (string | PowerRoll)[] }): FeatureMalice => {
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
	};

	createMovementMode = (data: { id: string, name?: string, mode: string }): FeatureMovementMode => {
		return {
			id: data.id,
			name: data.name || 'Movement Mode',
			description: '',
			type: FeatureType.MovementMode,
			data: {
				mode: data.mode
			}
		};
	};

	createMultiple = (data: { id: string, name?: string, description?: string, features: Feature[] }): FeatureMultiple => {
		return {
			id: data.id,
			name: data.name || data.features.map(f => f.name || 'Unnamed Feature').join(', '),
			description: data.description || data.features.map(f => f.name || 'Unnamed Feature').join(', '),
			type: FeatureType.Multiple,
			data: {
				features: data.features
			}
		};
	};

	createPackage = (data: { id: string, name: string, description: string, tag: string }): FeaturePackage => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: FeatureType.Package,
			data: {
				tag: data.tag
			}
		};
	};

	createPackageContent = (data: { id: string, name: string, description: string, tag: string }): FeaturePackageContent => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: FeatureType.PackageContent,
			data: {
				tag: data.tag
			}
		};
	};

	createPerk = (data: { id: string, name?: string, description?: string, lists?: PerkList[], count?: number }): FeaturePerk => {
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
	};

	createProficiency = (data: { id: string, name?: string, description?: string, weapons?: KitWeapon[], armor?: KitArmor[] }): FeatureProficiency => {
		return {
			id: data.id,
			name: data.name || 'Proficiency',
			description: data.description || '',
			type: FeatureType.Proficiency,
			data: {
				weapons: data.weapons || [],
				armor: data.armor || []
			}
		};
	};

	createSize = (data: { id: string, name?: string, description?: string, sizeValue: number, sizeMod: 'T' | 'S' | 'M' | 'L' }): FeatureSize => {
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
	};

	createSkill = (data: { id: string, name?: string, description?: string, skill: string }): FeatureSkill => {
		return {
			id: data.id,
			name: data.name || data.skill,
			description: data.description || '',
			type: FeatureType.Skill,
			data: {
				skill: data.skill
			}
		};
	};

	createSkillChoice = (data: { id: string, name?: string, description?: string, options?: string[], listOptions?: SkillList[], count?: number, selected?: string[] }): FeatureSkillChoice => {
		const count = data.count || 1;
		const options = data.options || [];
		const listOptions = data.listOptions || [];

		const prefix = (listOptions.length < 5) ? ((options.length === 0) && (listOptions.length > 0) ? `${listOptions.join(' / ')} ` : '') : '';

		return {
			id: data.id,
			name: data.name || (count === 1 ? `${prefix}Skill` : `${prefix}Skills`),
			description: data.description || '',
			type: FeatureType.SkillChoice,
			data: {
				options: data.options || [],
				listOptions: data.listOptions || [],
				count: count,
				selected: data.selected || []
			}
		};
	};

	createSoloMonster = (data: { id: string, name: string, gender?: 'm' | 'f' | 'n', endEfect?: number }): FeatureText => {
		const capitalizedName = data.name.split(' ').map((n, i) => i === 0 ? Format.capitalize(n) : n).join(' ');
		const genderWithDefault = data.gender ?? 'n';
		const heSheThey = ({ m: 'he', f: 'she', n: 'they' } as const)[ genderWithDefault ];
		const hisHerTheir = ({ m: 'his', f: 'her', n: 'their' } as const)[ genderWithDefault ];
		const himHerThem = ({ m: 'him', f: 'her', n: 'them' } as const)[ genderWithDefault ];
		return {
			id: data.id,
			name: 'Solo Monster',
			description: `
* **Solo Turns** ${capitalizedName} takes up to two turns each round. ${Format.capitalize(heSheThey)} can’t take turns consecutively. ${Format.capitalize(heSheThey)} can use two main actions on each of ${hisHerTheir} turns. While dazed, ${data.name} can take one action and one maneuver per turn.
* **End Effect** At the end of ${hisHerTheir} turn, ${data.name} can take ${data.endEfect || 5} damage to end one *save ends* effect affecting ${himHerThem}. This damage can’t be reduced in any way.`,
			type: FeatureType.Text,
			data: null
		};
	};

	createSpeed = (data: { id: string, name?: string, description?: string, speed: number }): FeatureSpeed => {
		return {
			id: data.id,
			name: data.name || 'Speed',
			description: data.description || '',
			type: FeatureType.Speed,
			data: {
				speed: data.speed
			}
		};
	};

	createSummon = (data: { id: string, name?: string, description?: string, options: Monster[], count?: number }): FeatureSummon => {
		return {
			id: data.id,
			name: data.name || 'Summon',
			description: data.description || '',
			type: FeatureType.Summon,
			data: {
				options: data.options,
				count: data.count || 1,
				selected: []
			}
		};
	};

	createTaggedFeature = (data: { tag: string, feature: Feature }): FeatureTaggedFeature => {
		return {
			id: data.feature.id,
			name: data.feature.name,
			description: data.feature.description,
			type: FeatureType.TaggedFeature,
			data: {
				tag: data.tag,
				feature: data.feature
			}
		};
	};

	createTaggedFeatureChoice = (data: { id: string, name?: string, description?: string, tag: string, count?: number }): FeatureTaggedFeatureChoice => {
		return {
			id: data.id,
			name: data.name || 'Tagged Feature',
			description: data.description || '',
			type: FeatureType.TaggedFeatureChoice,
			data: {
				tag: data.tag,
				count: data.count || 1,
				selected: []
			}
		};
	};

	createTitleChoice = (data: { id: string, name?: string, description?: string, echelon?: number, count?: number }): FeatureTitleChoice => {
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
	};
}
