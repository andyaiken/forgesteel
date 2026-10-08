import { Ability } from '@/models/ability';
import { Element } from '@/models/element';
import { ExtensionChangeType } from '@/enums/extension-change-type';
import { Feature } from '@/models/feature';
import { Monster } from '@/models/monster';
import { Summon } from '@/models/summon';

export type ExtensionTargetKind = 'ancestry' | 'class' | 'domain' | 'kit' | 'monster-group' | 'subclass';

type ExtensionChangeOf<Type extends ExtensionChangeType, Data> = { id: string, type: Type, data: Data };

// Adds an ability to a class or subclass's pool of abilities, for its ability choices to offer
export type ExtensionChangeAddAbility = ExtensionChangeOf<ExtensionChangeType.AddAbility, {
	ability: Ability;
}>;

// Adds a feature to the target; the level is ignored for an ancestry or a kit, which have no levels,
// and level 0 on a domain means one of its default features
export type ExtensionChangeAddFeature = ExtensionChangeOf<ExtensionChangeType.AddFeature, {
	level: number;
	feature: Feature;
}>;

export type ExtensionChangeAddChoiceOption = ExtensionChangeOf<ExtensionChangeType.AddChoiceOption, {
	featureID: string;
	option: { feature: Feature, value: number };
}>;

export type ExtensionChangeAddSummonOption = ExtensionChangeOf<ExtensionChangeType.AddSummonOption, {
	featureID: string;
	summon: Summon;
}>;

// The replacement takes over the original feature's ID, so that a hero's selections still line up with it
export type ExtensionChangeReplaceFeature = ExtensionChangeOf<ExtensionChangeType.ReplaceFeature, {
	featureID: string;
	feature: Feature;
}>;

// Adds a malice feature to a monster group
export type ExtensionChangeAddMalice = ExtensionChangeOf<ExtensionChangeType.AddMalice, {
	malice: Feature;
}>;

// Adds a monster to a monster group; encounters refer to it by its ID, as they do the group's own monsters
export type ExtensionChangeAddMonster = ExtensionChangeOf<ExtensionChangeType.AddMonster, {
	monster: Monster;
}>;

export type ExtensionChange =
	| ExtensionChangeAddAbility
	| ExtensionChangeAddFeature
	| ExtensionChangeAddChoiceOption
	| ExtensionChangeAddSummonOption
	| ExtensionChangeReplaceFeature
	| ExtensionChangeAddMalice
	| ExtensionChangeAddMonster;

// A set of homebrew changes to an existing element, so that official content can be extended without copying it
export interface Extension extends Element {
	targetKind: ExtensionTargetKind;
	targetID: string;
	changes: ExtensionChange[];
}

// Stamped onto a copy of an element that has had extensions applied to it, so that a hero can tell
// when its copy depends on homebrew that isn't loaded
export interface Extensible {
	appliedExtensions?: { extensionID: string, sourcebookID: string }[];
}
