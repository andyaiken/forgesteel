import { Extensible, Extension, ExtensionChange, ExtensionTargetKind } from '@/models/extension';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { Ancestry } from '@/models/ancestry';
import { Domain } from '@/models/domain';
import { Element } from '@/models/element';
import { ExtensionChangeType } from '@/enums/extension-change-type';
import { Feature } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { Kit } from '@/models/kit';
import { MonsterGroup } from '@/models/monster-group';
import { SubClass } from '@/models/subclass';
import { Utils } from '@/utils/utils';

export type ExtensionTarget =
	| { kind: 'ancestry', element: Ancestry }
	| { kind: 'class', element: HeroClass }
	| { kind: 'domain', element: Domain }
	| { kind: 'kit', element: Kit }
	| { kind: 'monster-group', element: MonsterGroup }
	| { kind: 'subclass', element: SubClass };

// A place a feature sits, so that a change can swap it out wherever it is nested
interface FeatureSlot {
	feature: Feature;
	level: number | undefined;
	replace: (feature: Feature) => void;
}

export class ExtensionLogic {
	// Returns every one of the sourcebooks, with each element that an extension targets swapped for a copy with the extension applied.
	// The filter limits which extensions apply, never which sourcebooks come back: only extensions that live in the given
	// sourcebooks, only those with the given IDs (for a hero, the ones the player has approved), and only those aimed at
	// the given kinds of element; with no filter, every extension applies.
	// Extensions apply to elements in any sourcebook - a homebrew extension is usually aimed at official content.
	// Sourcebooks and elements that nothing targets are returned as they are, so with no extensions this costs nothing.
	static applyExtensions = (sourcebooks: Sourcebook[], filter?: { extensionSourcebookIDs?: string[], extensionIDs?: string[], targetKinds?: ExtensionTargetKind[] }): Sourcebook[] => {
		const extensions = sourcebooks
			.filter(sb => !filter?.extensionSourcebookIDs || filter.extensionSourcebookIDs.includes(sb.id))
			.flatMap(sb => (sb.extensions || []).map(extension => ({ extension: extension, sourcebookID: sb.id })))
			.filter(e => !filter?.extensionIDs || filter.extensionIDs.includes(e.extension.id))
			.filter(e => !filter?.targetKinds || filter.targetKinds.includes(e.extension.targetKind));
		if (extensions.length === 0) {
			return sourcebooks;
		}

		const targetIDs = extensions.map(e => e.extension.targetID);

		const patch = <T extends Element & Extensible>(element: T, kind: ExtensionTargetKind): T => {
			const relevant = extensions
				.filter(e => e.extension.targetID === element.id)
				.filter(e => e.extension.targetKind === kind);
			if (relevant.length === 0) {
				return element;
			}

			const copy = Utils.copy(element);
			ExtensionLogic.applyChanges({ kind: kind, element: copy } as unknown as ExtensionTarget, relevant.map(e => e.extension));
			copy.appliedExtensions = [
				...(copy.appliedExtensions || []),
				...relevant.map(e => ({ extensionID: e.extension.id, sourcebookID: e.sourcebookID }))
			];
			return copy;
		};

		const patchClass = (heroClass: HeroClass) => {
			if (!targetIDs.includes(heroClass.id) && !heroClass.subclasses.some(sc => targetIDs.includes(sc.id))) {
				return heroClass;
			}

			const patched = patch(heroClass, 'class');
			const copy = (patched === heroClass) ? { ...heroClass } : patched;
			copy.subclasses = copy.subclasses.map(sc => patch(sc, 'subclass'));
			return copy;
		};

		return sourcebooks.map(sb => {
			const touched = [
				...sb.ancestries,
				...sb.classes,
				...sb.classes.flatMap(c => c.subclasses),
				...sb.domains,
				...sb.kits,
				...sb.monsterGroups,
				...sb.subclasses
			].some(e => targetIDs.includes(e.id));
			if (!touched) {
				return sb;
			}

			return {
				...sb,
				ancestries: sb.ancestries.map(a => patch(a, 'ancestry')),
				classes: sb.classes.map(patchClass),
				domains: sb.domains.map(d => patch(d, 'domain')),
				kits: sb.kits.map(k => patch(k, 'kit')),
				monsterGroups: sb.monsterGroups.map(mg => patch(mg, 'monster-group')),
				subclasses: sb.subclasses.map(sc => patch(sc, 'subclass'))
			};
		});
	};

	// The sourcebooks as the director's tools see them. A monster group has no hero to opt in for it, so its extensions
	// apply wherever the extension's sourcebook is visible; extensions to hero elements are left to each hero.
	// Only for reading - anything that is saved has to come from the sourcebooks as they are, or it would take the extensions with it.
	static getDirectorSourcebooks = (sourcebooks: Sourcebook[], hiddenSourcebookIDs: string[]): Sourcebook[] => {
		return ExtensionLogic.applyExtensions(sourcebooks, {
			extensionSourcebookIDs: sourcebooks.filter(sb => !hiddenSourcebookIDs.includes(sb.id)).map(sb => sb.id),
			targetKinds: [ 'monster-group' ]
		});
	};

	// The hero's own sourcebooks, with only the extensions the player has approved for the hero applied -
	// so that every picker offers the extended options
	static getHeroSourcebooks = (hero: Hero, sourcebooks: Sourcebook[]): Sourcebook[] => {
		return ExtensionLogic.applyExtensions(
			sourcebooks.filter(sb => hero.sourcebookIDs.includes(sb.id)),
			{ extensionIDs: hero.extensionIDs || [] }
		);
	};

	// Applies the extensions' changes to the target, in place.
	// Replacements go first, so that an option added by one extension survives another replacing the feature it was added to.
	// Returns the IDs of the changes that couldn't be applied, because what they point at isn't there.
	static applyChanges = (target: ExtensionTarget, extensions: Extension[]): string[] => {
		const changes = extensions.flatMap(ext => ext.changes.map(change => ({ extensionID: ext.id, change: change })));
		const unresolved: string[] = [];

		const isAddition = (change: ExtensionChange) => change.type !== ExtensionChangeType.ReplaceFeature;

		[ ...changes.filter(c => !isAddition(c.change)), ...changes.filter(c => isAddition(c.change)) ].forEach(c => {
			if (!ExtensionLogic.applyChange(target, c.change, c.extensionID)) {
				unresolved.push(c.change.id);
			}
		});

		return unresolved;
	};

	static applyChange = (target: ExtensionTarget, change: ExtensionChange, extensionID: string): boolean => {
		if (!ExtensionLogic.canChange(target.kind, change.type)) {
			return false;
		}

		const findSlot = (featureID: string) => ExtensionLogic.getFeatureSlots(target).find(slot => slot.feature.id === featureID);

		switch (change.type) {
			case ExtensionChangeType.AddAbility: {
				if ((target.kind !== 'class') && (target.kind !== 'subclass')) {
					return false;
				}
				target.element.abilities.push(Utils.copy(change.data.ability));
				return true;
			}
			case ExtensionChangeType.AddMalice: {
				if (target.kind !== 'monster-group') {
					return false;
				}
				target.element.malice.push(Utils.copy(change.data.malice));
				return true;
			}
			case ExtensionChangeType.AddMonster: {
				if (target.kind !== 'monster-group') {
					return false;
				}
				target.element.monsters.push(Utils.copy(change.data.monster));
				return true;
			}
			case ExtensionChangeType.AddFeature: {
				const feature = Utils.copy(change.data.feature);
				switch (target.kind) {
					case 'ancestry':
					case 'kit':
						target.element.features.push(feature);
						return true;
					case 'domain':
						if (change.data.level === 0) {
							target.element.defaultFeatures.push(feature);
							return true;
						}
						ExtensionLogic.getLevel(target.element.featuresByLevel, change.data.level).features.push(feature);
						return true;
					case 'class':
					case 'subclass':
						ExtensionLogic.getLevel(target.element.featuresByLevel, change.data.level).features.push(feature);
						return true;
				}
				return false;
			}
			case ExtensionChangeType.AddChoiceOption: {
				const slot = findSlot(change.data.featureID);
				if (!slot || (slot.feature.type !== FeatureType.Choice)) {
					return false;
				}
				slot.feature.data.options.push(Utils.copy(change.data.option));
				return true;
			}
			case ExtensionChangeType.AddSummonOption: {
				const slot = findSlot(change.data.featureID);
				if (!slot || (slot.feature.type !== FeatureType.SummonChoice)) {
					return false;
				}
				const summon = Utils.copy(change.data.summon);
				summon.extensionID = extensionID;
				slot.feature.data.options.push(summon);
				return true;
			}
			case ExtensionChangeType.ReplaceFeature: {
				const slot = findSlot(change.data.featureID);
				if (!slot) {
					return false;
				}
				const feature = Utils.copy(change.data.feature);
				feature.id = change.data.featureID;
				slot.replace(feature);
				return true;
			}
		}
	};

	// Every feature in the target that a change could point at, including those nested inside other features.
	static getFeatureSlots = (target: ExtensionTarget): FeatureSlot[] => {
		switch (target.kind) {
			case 'ancestry':
			case 'kit':
				return ExtensionLogic.getSlotsInList(target.element.features, undefined);
			case 'domain':
				return [
					...ExtensionLogic.getSlotsInList(target.element.defaultFeatures, 0),
					...target.element.featuresByLevel.flatMap(lvl => ExtensionLogic.getSlotsInList(lvl.features, lvl.level))
				];
			case 'class':
			case 'subclass':
				return target.element.featuresByLevel.flatMap(lvl => ExtensionLogic.getSlotsInList(lvl.features, lvl.level));
			case 'monster-group':
				// Nothing in a monster group can be replaced or given options
				return [];
		}
	};

	static getTargetFeatures = (target: ExtensionTarget) => {
		return ExtensionLogic.getFeatureSlots(target).map(slot => ({ feature: slot.feature, level: slot.level }));
	};

	static getSlotsInList = (features: Feature[], level: number | undefined): FeatureSlot[] => {
		return features.flatMap(feature => [
			{
				feature: feature,
				level: level,
				replace: (f: Feature) => features.splice(features.indexOf(feature), 1, f)
			},
			...ExtensionLogic.getNestedSlots(feature, level)
		]);
	};

	static getNestedSlots = (feature: Feature, level: number | undefined): FeatureSlot[] => {
		const single = (holder: { feature: Feature }): FeatureSlot[] => [
			{ feature: holder.feature, level: level, replace: f => holder.feature = f },
			...ExtensionLogic.getNestedSlots(holder.feature, level)
		];

		switch (feature.type) {
			case FeatureType.Choice:
				return feature.data.options.flatMap(single);
			case FeatureType.ForController:
			case FeatureType.HeroicResourceThreshold:
			case FeatureType.TaggedFeature:
				return single(feature.data);
			case FeatureType.HeroicResource:
				return (feature.data.thresholds || []).flatMap(single);
			case FeatureType.Multiple:
				return ExtensionLogic.getSlotsInList(feature.data.features, level);
			case FeatureType.SwitchOptions: {
				const data = feature.data;
				const slots = data.options.flatMap(single);
				if (data.defaultOption) {
					slots.push(
						{ feature: data.defaultOption, level: level, replace: f => data.defaultOption = f },
						...ExtensionLogic.getNestedSlots(data.defaultOption, level)
					);
				}
				return slots;
			}
			case FeatureType.Toggle: {
				const data = feature.data;
				const slots: FeatureSlot[] = [];
				if (data.featureChecked) {
					slots.push(
						{ feature: data.featureChecked, level: level, replace: f => data.featureChecked = f },
						...ExtensionLogic.getNestedSlots(data.featureChecked, level)
					);
				}
				if (data.featureUnchecked) {
					slots.push(
						{ feature: data.featureUnchecked, level: level, replace: f => data.featureUnchecked = f },
						...ExtensionLogic.getNestedSlots(data.featureUnchecked, level)
					);
				}
				return slots;
			}
		}

		return [];
	};

	static getLevel = (featuresByLevel: { level: number, features: Feature[] }[], level: number) => {
		let lvl = featuresByLevel.find(l => l.level === level);
		if (!lvl) {
			lvl = { level: level, features: [] };
			featuresByLevel.push(lvl);
			featuresByLevel.sort((a, b) => a.level - b.level);
		}
		return lvl;
	};

	///////////////////////////////////////////////////////////////////////////

	// The name of whatever the change adds or swaps in
	static getChangeName = (change: ExtensionChange) => {
		switch (change.type) {
			case ExtensionChangeType.AddAbility:
				return change.data.ability.name;
			case ExtensionChangeType.AddFeature:
			case ExtensionChangeType.ReplaceFeature:
				return change.data.feature.name;
			case ExtensionChangeType.AddChoiceOption:
				return change.data.option.feature.name;
			case ExtensionChangeType.AddSummonOption:
				return change.data.summon.monster.name;
			case ExtensionChangeType.AddMalice:
				return change.data.malice.name;
			case ExtensionChangeType.AddMonster:
				return change.data.monster.name;
		}
	};

	// Whether a change of this type means anything for this kind of target
	static canChange = (kind: ExtensionTargetKind, type: ExtensionChangeType) => {
		switch (type) {
			case ExtensionChangeType.AddAbility:
				return (kind === 'class') || (kind === 'subclass');
			case ExtensionChangeType.AddFeature:
			case ExtensionChangeType.AddChoiceOption:
			case ExtensionChangeType.AddSummonOption:
			case ExtensionChangeType.ReplaceFeature:
				return kind !== 'monster-group';
			case ExtensionChangeType.AddMalice:
			case ExtensionChangeType.AddMonster:
				return kind === 'monster-group';
		}
	};

	// What an extension to this kind of target can do, to finish a sentence such as 'An extension...'
	static getChangeSummary = (kind: ExtensionTargetKind) => {
		switch (kind) {
			case 'class':
			case 'subclass':
				return 'adds abilities, features, or options to it, or replaces some of its features';
			case 'monster-group':
				return 'adds malice or monsters to it';
			default:
				return 'adds features or options to it, or replaces some of its features';
		}
	};

	// The name of one of the target's features, with its level where the target has levels
	static getTargetFeatureName = (target: ExtensionTarget | null, featureID: string) => {
		const tf = target ? ExtensionLogic.getTargetFeatures(target).find(f => f.feature.id === featureID) : undefined;
		if (!target || !tf) {
			return 'Unknown feature';
		}

		const name = tf.feature.name || 'Unnamed feature';
		const hasLevels = (target.kind !== 'ancestry') && (target.kind !== 'kit');
		return (hasLevels && (tf.level !== undefined)) ? `${ExtensionLogic.getLevelName(tf.level, target.kind)}: ${name}` : name;
	};

	static getLevelName = (level: number, kind: ExtensionTargetKind) => {
		return ((kind === 'domain') && (level === 0)) ? 'Default' : `Level ${level}`;
	};

	// The kind of extension target that a library element kind corresponds to, if it can be extended at all
	static getTargetKind = (kind: SourcebookElementKind): ExtensionTargetKind | null => {
		switch (kind) {
			case 'ancestry':
			case 'class':
			case 'domain':
			case 'kit':
			case 'monster-group':
			case 'subclass':
				return kind;
		}

		return null;
	};

	static getTargetKindName = (kind: ExtensionTargetKind) => {
		switch (kind) {
			case 'ancestry':
				return 'Ancestry';
			case 'class':
				return 'Class';
			case 'domain':
				return 'Domain';
			case 'kit':
				return 'Kit';
			case 'monster-group':
				return 'Monster Group';
			case 'subclass':
				return 'Subclass';
		}
	};

	// Finds the element an extension is aimed at, as published - without any extensions applied
	static getTarget = (extension: Extension, sourcebooks: Sourcebook[]): ExtensionTarget | null => {
		const id = extension.targetID;
		switch (extension.targetKind) {
			case 'ancestry': {
				const element = sourcebooks.flatMap(sb => sb.ancestries).find(a => a.id === id);
				return element ? { kind: 'ancestry', element: element } : null;
			}
			case 'class': {
				const element = sourcebooks.flatMap(sb => sb.classes).find(c => c.id === id);
				return element ? { kind: 'class', element: element } : null;
			}
			case 'domain': {
				const element = sourcebooks.flatMap(sb => sb.domains).find(d => d.id === id);
				return element ? { kind: 'domain', element: element } : null;
			}
			case 'kit': {
				const element = sourcebooks.flatMap(sb => sb.kits).find(k => k.id === id);
				return element ? { kind: 'kit', element: element } : null;
			}
			case 'monster-group': {
				const element = sourcebooks.flatMap(sb => sb.monsterGroups).find(mg => mg.id === id);
				return element ? { kind: 'monster-group', element: element } : null;
			}
			case 'subclass': {
				const element = [
					...sourcebooks.flatMap(sb => sb.subclasses),
					...sourcebooks.flatMap(sb => sb.classes).flatMap(c => c.subclasses)
				].find(sc => sc.id === id);
				return element ? { kind: 'subclass', element: element } : null;
			}
		}
	};

	// The extensions (from any of the given sourcebooks) that are aimed at any of the given elements
	static getExtensionsFor = (elementIDs: string[], sourcebooks: Sourcebook[]) => {
		return sourcebooks.flatMap(sb => (sb.extensions || [])
			.filter(ext => elementIDs.includes(ext.targetID))
			.map(ext => ({ extension: ext, sourcebook: sb })));
	};

	// The IDs of the extension's changes that wouldn't apply to its target, because what they point at isn't there
	static getUnresolvedChanges = (extension: Extension, sourcebooks: Sourcebook[]): string[] => {
		const target = ExtensionLogic.getTarget(extension, sourcebooks);
		if (!target) {
			return extension.changes.map(c => c.id);
		}

		return ExtensionLogic.applyChanges({ kind: target.kind, element: Utils.copy(target.element) } as ExtensionTarget, [ extension ]);
	};

	// True when the element (a hero's copy) was built using an extension whose sourcebook isn't loaded,
	// in which case rebuilding it from the sourcebooks would silently drop that homebrew
	static dependsOnMissingSourcebook = (element: Extensible | null | undefined, sourcebooks: Sourcebook[]) => {
		return (element?.appliedExtensions || []).some(ae => !sourcebooks.some(sb => sb.id === ae.sourcebookID));
	};
}
