import { AbilitySectionField, AbilitySectionPackage, AbilitySectionRoll, AbilitySectionText } from '../models/ability';

import { AbilitySheet } from '../models/character-sheet';
import { Characteristic } from '../enums/characteristic';
import { Feature } from '../models/feature';
import { FeatureType } from '../enums/feature-type';
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
			.replace(/\|\s+≤\s*11\s+\|/g, `|![≤ 11](${rollT1Icon})|`)
			.replace(/\|\s+12\s*-\s*16\s+\|/g, `|![12 - 16](${rollT2Icon})|`)
			.replace(/\|\s+≥?\s*17\s*\+?\s+\|/g, `|![17+](${rollT3Icon})|`);
		return text;
	};

	static shortenText = (text: string, splitAt: number = 2) => {
		const split = text.split('\n');
		if (split.length > splitAt) {
			text = split.slice(0, splitAt).join('\n') + '\n*…(continued in reference)…*';
		}
		return this.cleanupText(text);
	};

	static isLongFeature = (f: Feature, check: number = 2): boolean => {
		return f.description.split('\n').length > check;
	};

	// There are some that might just be *too* long for the Class Features section,
	// even just showing the first paragraph. Possible candidates:
	//  - Elementalist's 'Persistent Magic'
	//  - Fury's 'Growing Ferocity'
	static isVERYLongFeature = (f: Feature): boolean => {
		return f.name.includes('Persistent Magic');
	};

	static isBasicFeature = (f: Feature): boolean => {
		return [
			FeatureType.HeroicResource,
			FeatureType.Bonus,
			FeatureType.CharacteristicBonus,
			FeatureType.LanguageChoice,
			FeatureType.SkillChoice,
			FeatureType.Perk,
			FeatureType.Choice
		].includes(f.type);
	};

	static featureTypeOrder: FeatureType[] = [
		FeatureType.Text,
		FeatureType.Package,
		FeatureType.PackageContent,
		FeatureType.Ability,
		FeatureType.ClassAbility,
		FeatureType.AbilityDistance,
		FeatureType.DamageModifier,
		FeatureType.Kit,
		FeatureType.HeroicResource,
		FeatureType.Domain,
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
		const aLength = this.calculateAbilitySize(a);
		const bLength = this.calculateAbilitySize(b);

		return aLength - bLength;
	};

	static calculateAbilitySize = (ability: AbilitySheet): number => {
		let size = 0;
		size += this.countLines(ability.rollT1Effect, 40);
		size += this.countLines(ability.rollT2Effect, 40);
		size += this.countLines(ability.rollT3Effect, 40);
		size += this.countLines(ability.effect, 50);
		return size;
	};

	static countLines = (text: string | undefined, lineWidth: number) => {
		return text?.split('\n').reduce((n, l) => {
			return n + Math.ceil(l.length / lineWidth);
		}, 0) || 0;
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
