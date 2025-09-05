import { Ability, AbilitySectionField, AbilitySectionPackage, AbilitySectionRoll, AbilitySectionText } from '../models/ability';

import { AbilitySheet, ItemSheet } from '../models/character-sheet';
import { AbilityLogic } from '../logic/ability-logic';
import { Characteristic } from '../enums/characteristic';
import { Collections } from './collections';
import { Feature } from '../models/feature';
import { FeatureType } from '../enums/feature-type';
import { Format } from './format';
import { Hero } from '../models/hero';
import { Utils } from './utils';

import rollT1Icon from '../assets/icons/power-roll-t1.svg';
import rollT2Icon from '../assets/icons/power-roll-t2.svg';
import rollT3Icon from '../assets/icons/power-roll-t3.svg';

export class CharacterSheetFormatter {
	static getPageId = (heroId: string, pageNum: number) => {
		return `hero-sheet-${heroId}-page-${pageNum}`;
	};

	static addSign = (n: number | undefined) => {
		if (n !== undefined) {
			return n >= 0 ? '+' + n : n.toString();
		}
	};

	static convertFeatures = (features: Feature[]): Feature[] => {
		features.sort(this.sortFeatures);
		const results: Feature[] = [];
		for (const feature of features) {
			results.push(this.cleanupFeature(feature));
		}
		return results;
	};

	static cleanupFeature = (feature: Feature): Feature => {
		const result = Utils.copy(feature);
		if (this.isVERYLongFeature(feature)) {
			result.description = '*See Reference for details…*';
		} else if (this.isLongFeature(feature)) {
			result.description = this.shortenText(feature.description);
		} else {
			result.description = this.cleanupText(feature.description);
		}

		return result;
	};

	static cleanupText = (text: string) => {
		text = text
			.replace(/(\|:-+)+\|\n/g, '')
			.replace(/\|\s+(.+?)\s+\| (.+?)\s+\|/g, '$1\t\t$2')
			.replace(/11 -\t/g, '≤ 11\t')
			.replace(/17 \+/g, '17+\t')
			.replace(/\n\* \*\*(.*?)\*\*(:) /g, '\n   • $1$2\t')
			.replace(/\n\* /g, '\n   • ');
		return text;
	};

	static fixClassAbilityNames = (feature: Feature, abilities: Ability[]) => {
		let result = feature;
		if (result.type === FeatureType.ClassAbility) {
			result = Utils.copy(result);
			result.data.selectedIDs = result.data.selectedIDs.map(id => {
				return abilities.find(a => a.id === id)?.name || id;
			});
		}
		return result;
	};

	static enhanceFeatures = (features: Feature[]): Feature[] => {
		features.sort(this.sortFeatures);
		const results: Feature[] = [];
		for (const feature of features) {
			results.push(this.enhanceFeature(feature));
		}
		return results;
	};

	static enhanceFeature = (feature: Feature): Feature => {
		const result = Utils.copy(feature);
		result.description = this.enhanceMarkdown(feature.description);
		return result;
	};

	static enhanceMarkdown = (text: string) => {
		text = text
			.replace(/([MARIP]) < \[?([Ss]trong|[Aa]verage|[Ww]eak)\]?/g, '$1<$2')
			.replace(/([MARIP])<[Ss]trong/g, '$1<s]')
			.replace(/([MARIP])<[Aa]verage/g, '$1<v]')
			.replace(/([MARIP])<[Ww]eak/g, '$1<w]')
			.replace(/M<([svw])\]/g, 'm<$1]')
			.replace(/A<([svw])\]/g, 'a<$1]')
			.replace(/R<([svw])\]/g, 'r<$1]')
			.replace(/I<([svw])\]/g, 'i<$1]')
			.replace(/P<([svw])\]/g, 'p<$1]')
			.replace(/([marip])<([svw]\])/g, '<span class="potency">$1&lt;$2</span>')
			.replace(/\|\s+≤\s*11\s+\|/g, `|![≤ 11](${rollT1Icon})|`)
			.replace(/\|\s+12\s*-\s*16\s+\|/g, `|![12 - 16](${rollT2Icon})|`)
			.replace(/\|\s+≥?\s*17\s*\+?\s+\|/g, `|![17+](${rollT3Icon})|`);
		return text;
	};

	static shortenText = (text: string, splitAt: number = 2) => {
		const split = text.trim().split('\n');
		if (split.length > splitAt) {
			text = split.slice(0, splitAt).join('\n') + '\n*…(continued in reference)…*';
		}
		return this.cleanupText(text);
	};

	static isLongFeature = (f: Feature, check: number = 2): boolean => {
		return ([ FeatureType.Text, FeatureType.Package ].includes(f.type))
			&& (f.description.trim().split('\n').length > check);
	};

	// There are some that might just be *too* long for the Class Features section,
	// even just showing the first paragraph. Possible candidates:
	//  - Elementalist's 'Persistent Magic'
	//  - Fury's 'Growing Ferocity'
	static isVERYLongFeature = (f: Feature): boolean => {
		return f.name.includes('Persistent Magic');
	};

	static divideFeatures = (features: Feature[], availableSpace: number) => {
		const displayed: Feature[] = [];
		const reference: Feature[] = [];

		features.sort(this.sortFeatures);
		let size = 0;
		features.forEach(f => {
			let display = false;
			let fSize = 1;
			if (size < availableSpace) {
				fSize = this.calculateFeatureSize(f, 50);
				if (this.isLongFeature(f)) {
					reference.push(f);
					fSize += 1;
				}
				if (size + fSize <= availableSpace) {
					display = true;
				}
			}
			size += fSize;

			if (display) {
				displayed.push(f);
			} else {
				reference.push(f);
			}
		});

		return {
			displayed: displayed,
			referenceIds: Collections.distinct(reference.map(f => f.id), f => f)
		};
	};

	static calculateFeatureSize = (f: Feature, lineWidth: number, countShortenedText: boolean = true): number => {
		let size = 1;
		if ([ FeatureType.Multiple, FeatureType.DomainFeature ].includes(f.type)) {
			size = 0;
		} else if (this.isLongFeature(f)) {
			size = 2;
			if (countShortenedText) {
				size += this.countLines(f.description.trim().split('\n')[0], lineWidth);
			} else {
				size += this.countLines(f.description, lineWidth);
			}
		} else if ([ FeatureType.Text, FeatureType.Package, FeatureType.PackageContent ].includes(f.type)) {
			size = 2 + this.countLines(f.description, lineWidth);
		} else if (f.type === FeatureType.Ability) {
			size = 3;
		} else if (f.type === FeatureType.DamageModifier) {
			size = 3 + (2 * Collections.distinct(f.data.modifiers, m => m.type).length);
		} else if (f.type === FeatureType.HeroicResource) {
			size = 2 + (2 * this.countLines(f.data.details, lineWidth));
		}

		return size;
	};

	static calculateFeaturesSize = (features: { feature: Feature, source: string }[] | undefined, lineWidth: number): number => {
		let size = 0;
		if (features) {
			features.forEach(f => {
				size += this.calculateFeatureSize(f.feature, lineWidth, false);
			});

			size += 2 * Collections.distinct(features, f => f.source).length;
		}
		return size;
	};

	static calculateInventorySize = (items: ItemSheet[] | undefined, lineWidth: number): number => {
		let size = 0;
		if (items) {
			items.forEach(i => {
				if (i.features)
					size += i.features.reduce((s, f) => s += this.calculateFeatureSize(f, lineWidth, false), 0);
				size += 2;
			});
		}
		return size;
	};

	static featureTypeOrder: FeatureType[] = [
		FeatureType.Text,
		FeatureType.Package,
		FeatureType.PackageContent,
		FeatureType.Ability,
		FeatureType.HeroicResource,
		FeatureType.Domain,
		FeatureType.Kit,
		FeatureType.ClassAbility,
		FeatureType.AbilityDistance,
		FeatureType.DamageModifier,
		FeatureType.ConditionImmunity
	];

	static sortFeatures = (a: Feature, b: Feature): number => {
		const aSort = this.featureTypeOrder.includes(a.type);
		const bSort = this.featureTypeOrder.includes(b.type);

		if (aSort && bSort) {
			return this.featureTypeOrder.indexOf(a.type) - this.featureTypeOrder.indexOf(b.type);
		} else if (aSort) {
			return -1;
		} else if (bSort) {
			return 1;
		} else {
			return a.type.toString().localeCompare(b.type.toString());
		}
	};

	static keywordOrder: string[] = [
		'Melee', 'Ranged', 'Magic'
	];

	static sortKeywords = (a: string, b: string): number => {
		const aSort = this.keywordOrder.includes(a);
		const bSort = this.keywordOrder.includes(b);

		if (aSort && bSort) {
			return this.keywordOrder.indexOf(a) - this.keywordOrder.indexOf(b);
		} else if (aSort) {
			return -1;
		} else if (bSort) {
			return 1;
		} else {
			return a.localeCompare(b);
		}
	};

	static sortAbilitiesByLength = (a: AbilitySheet, b: AbilitySheet): number => {
		const aLength = this.calculateAbilitySize(a, 50);
		const bLength = this.calculateAbilitySize(b, 50);

		return aLength - bLength;
	};

	static calculateAbilitySize = (ability: AbilitySheet | undefined, lineWidth: number): number => {
		let size = 0;
		const rollLineLen = Math.ceil(0.8 * lineWidth);
		if (ability) {
			size += 4; // title
			size += this.countLines(ability.description, lineWidth);
			size += 4; // keywords, distance, etc
			size += ability.hasPowerRoll ? 2 : 0;
			size += 2 * this.countLines(ability.rollT1Effect, rollLineLen);
			size += 2 * this.countLines(ability.rollT2Effect, rollLineLen);
			size += 2 * this.countLines(ability.rollT3Effect, rollLineLen);
			if (ability.trigger)
				size += 1 + this.countLines(ability.trigger, lineWidth);
			if (ability.effect) {
				const effectSize = this.countLines(ability.effect, lineWidth, 1);
				// console.log('Effect size: ', effectSize);
				size += 2 + effectSize;
			}
		}
		return size;
	};

	static countLines = (text: string | undefined, lineWidth: number, emptyLineSize = 0) => {
		return text?.trim().split('\n').reduce((n, l) => {
			let len = Math.max(emptyLineSize, Math.ceil(l.length / lineWidth));
			if (l.startsWith('*'))// list item, will be indented
				len = Math.ceil(l.length / (lineWidth - 5));
			return n + len;
		}, 0) || 0;
	};

	static getLargestSize = (abilities: AbilitySheet[], lineLength: number): number => {
		const largestSize = abilities.reduce((h, a) => {
			return Math.max(h, this.calculateAbilitySize(a, lineLength));
		}, 0);
		return largestSize;
	};

	static abilityTypeOrder: string[] = [
		'Main Action',
		'Free Maneuver',
		'Maneuver',
		'Free Triggered Action',
		'Triggered Action',
		'Free Strike',
		'Move Action'
	];

	static sortAbilitiesByType = (a: AbilitySheet, b: AbilitySheet): number => {
		const aType = a.actionType || '';
		const bType = b.actionType || '';
		const aSort = aType.length && this.abilityTypeOrder.includes(aType);
		const bSort = bType.length && this.abilityTypeOrder.includes(bType);

		if (aSort && bSort) {
			let s = this.abilityTypeOrder.indexOf(aType) - this.abilityTypeOrder.indexOf(bType);
			if (s === 0) {
				s = a.cost - b.cost;
				if (s === 0) {
					return this.sortAbilitiesByLength(a, b);
				} else {
					return s;
				}
			}
			return s;
		} else if (aSort) {
			return -1;
		} else if (bSort) {
			return 1;
		} else {
			const alpha = aType.localeCompare(bType);
			if (alpha === 0) {
				return this.sortAbilitiesByLength(a, b);
			}
			return alpha;
		}
	};

	static characteristicOrder: string[] = [
		'M', 'A', 'R', 'I', 'P'
	];

	static sortCharacteristics = (a: string | Characteristic, b: string | Characteristic): number => {
		const aCheck = a.toUpperCase().slice(0, 1);
		const bCheck = b.toUpperCase().slice(0, 1);
		return this.characteristicOrder.indexOf(aCheck) - this.characteristicOrder.indexOf(bCheck);
	};

	static pluralize = (text: string, n: number): string => {
		let result = text;
		if (n > 1 && text.slice(-1).toLowerCase() !== 's') {
			result += 's';
		}
		return result;
	};

	static joinCommasOr = (options: string[]): string => {
		if (options.length <= 2) {
			return options.slice(-2).join(' or ');
		} else {
			const last2 = options.slice(-2).join(' or ');
			return [ options.slice(0, -2).join(', '), last2 ].join(', ');
		}
	};

	static fixAncestryName = (name: string): string => {
		let result = name;
		const match = name.match(/\s\((\w+)\)$/);
		if (match) {
			const mod = match[1];
			result = Format.capitalize(mod) + ' ' + name.split(' (')[0];
		}
		return result;
	};

	static formatAbilityTier = (value: string, tier: number, ability: Ability, hero: Hero) => {
		if (ability.distance.length > 1) {
			const distanceTypes = ability.distance.map(d => d.type);
			const values = distanceTypes.map(d => {
				return {
					type: d,
					effect: CharacterSheetFormatter.cleanupText(AbilityLogic.getTierEffect(value, tier, ability, d, hero)).split('; ')
				};
			});
			const combined: string[] = [];
			const size = Math.max(...values.map(v => v.effect.length));
			for (let i = 0; i < size; ++i) {
				const parts = values.map(v => v.effect[i]);
				if (parts.every(t => t === parts[0])) {
					combined.push(parts[0]);
				} else {
					combined.push(values.map(v => `${v.effect[i]} (${v.type})`).join(' | '));
				}
			}
			return combined.join('; ');
		}
		return CharacterSheetFormatter.cleanupText(
			AbilityLogic.getTierEffect(value, tier, ability, undefined, hero));
	};

	static abilitySections = (sections: (AbilitySectionText | AbilitySectionField | AbilitySectionRoll | AbilitySectionPackage)[]): string => {
		const lines: string[] = [];
		for (const section of sections) {
			let text = CharacterSheetFormatter.abilitySection(section);
			text = CharacterSheetFormatter.enhanceMarkdown(text);
			lines.push(text);
		}
		return lines.join('\n');
	};

	static abilitySection = (section: (AbilitySectionText | AbilitySectionField | AbilitySectionRoll | AbilitySectionPackage)): string => {
		let text = '';
		switch (section.type) {
			case 'text':
				text = section.text.replace(/^\s+/, '');
				break;
			case 'field':
				if (section.value !== 0) {
					text = `\n#### ${section.name} ${section.value}${section.repeatable ? '+' : ''}:\n${section.effect}`;
				} else {
					text = `\n#### ${section.name}:\n${section.effect}`;
				}
				break;
		}
		return text;
	};
}
