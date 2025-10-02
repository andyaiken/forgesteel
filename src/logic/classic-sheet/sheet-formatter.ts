import { Ability, AbilitySectionField, AbilitySectionPackage, AbilitySectionRoll, AbilitySectionText } from '@/models/ability';
import { FollowerSheet, ItemSheet } from '@/models/classic-sheets/hero-sheet';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilitySheet } from '@/models/classic-sheets/ability-sheet';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { CreatureLogic } from '@/logic/creature-logic';
import { Feature } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
import { Format } from '@/utils/format';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Monster } from '@/models/monster';
import { MonsterSheet } from '@/models/classic-sheets/encounter-sheet';
import { RulesItem } from '@/models/rules-item';
import { StatBlockIcon } from '@/enums/stat-block-icon';
import { Title } from '@/models/title';
import { Utils } from '@/utils/utils';

import areaIcon from '@/assets/icons/area-icon.svg';
import burstIcon from '@/assets/icons/burst-icon.svg';
import meleeIcon from '@/assets/icons/sword.svg';
import meleeRangedIcon from '@/assets/icons/melee-ranged.svg';
import rangedIcon from '@/assets/icons/ranged.svg';
import rollT1Icon from '@/assets/icons/power-roll-t1.svg';
import rollT2Icon from '@/assets/icons/power-roll-t2.svg';
import rollT3Icon from '@/assets/icons/power-roll-t3.svg';
import selfIcon from '@/assets/icons/self.svg';
import skullIcon from '@/assets/icons/skull.svg';
import specialAreaIcon from '@/assets/icons/special-area.svg';
import starIcon from '@/assets/icons/star.svg';
import triggerIcon from '@/assets/icons/trigger-solid.svg';

export class SheetFormatter {
	static getPageId = (kind: string, id: string, key: string) => {
		return `${kind}-${id}-page-${key}`;
	};

	static addSign = (n: number | undefined) => {
		if (n !== undefined) {
			return n > 0 ? '+' + n : n.toString();
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
			.replace(/\|\s+12\s*[-–]\s*16\s+\|/g, `|![12 - 16](${rollT2Icon})|`)
			.replace(/\|\s+≥?\s*17\s*\+?\s+\|/g, `|![17+](${rollT3Icon})|`);
		return text;
	};

	static shortenText = (text: string, splitAt: number = 1) => {
		const split = text.trim().split('\n');
		if (split.length > splitAt) {
			text = split.slice(0, splitAt).join('\n') + '\n<em class="continued-in-reference">…(continued in reference)…</em>';
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
		const headerSize = 1.5;
		const bottomMargin = 0.3;
		if ([ FeatureType.Multiple ].includes(f.type)) {
			size = 0;
		} else if (this.isLongFeature(f)) {
			if (countShortenedText) {
				size = headerSize + this.countLines(f.description.trim().split('\n')[0], lineWidth);
			} else {
				size = headerSize + this.countLines(f.description, lineWidth);
			}
			size += bottomMargin;
		} else if ([ FeatureType.Text, FeatureType.Package, FeatureType.PackageContent ].includes(f.type)) {
			size = headerSize + this.countLines(f.description, lineWidth);
			size += bottomMargin;
		} else if (f.type === FeatureType.Ability) {
			size = headerSize + this.countLines(f.data.ability.description, lineWidth);
			size += bottomMargin;
		} else if (f.type === FeatureType.DamageModifier) {
			size = headerSize + (Collections.distinct(f.data.modifiers, m => m.type).length);
			size += bottomMargin + 0.3;
		} else if (f.type === FeatureType.HeroicResource) {
			size = headerSize + (2 * this.countLines(f.data.details, lineWidth));
		} else if ([ FeatureType.Choice,
			FeatureType.ItemChoice,
			FeatureType.SkillChoice,
			FeatureType.LanguageChoice,
			FeatureType.Perk,
			FeatureType.Domain,
			FeatureType.DomainFeature,
			FeatureType.ClassAbility ].includes(f.type)) {
			if (f.data && (Object.hasOwn(f.data, 'selected') || Object.hasOwn(f.data, 'selectedIds'))) {
				size += 0.2; // choices with selections are sliiightly taller than a single line
			}
		}
		size = +size.toFixed(1);
		// console.log('###### Feature', f.name, f.id, size);
		return size;
	};

	static calculateFeatureReferenceSize = (features: { feature: Feature, source: string }[] | undefined, lineWidth: number): number => {
		let size = 2.5; // Card header
		if (features) {
			features.forEach(f => {
				size += this.calculateFeatureSize(f.feature, lineWidth, false);
			});

			size += 2 * Collections.distinct(features, f => f.source).length;
		}
		return +size.toFixed(1);
	};

	static calculateInventorySize = (items: ItemSheet[] | undefined, lineWidth: number): number => {
		let size = 2.5; // Card header
		if (items) {
			let itemSize;
			items.forEach(i => {
				itemSize = 1.4; // account for item display differences from plain features
				if (i.features) {
					itemSize += i.features.reduce((s, f) => {
						s += this.calculateFeatureSize(f, lineWidth, false);
						return s;
					}, 0);
					size += itemSize;
				}
			});
		}
		return +size.toFixed(1);
	};

	static calculateTitlesSize = (titles: Title[] | undefined, lineWidth: number): number => {
		let size = 2.5; // Card header
		titles?.forEach(title => {
			let tSize = 1.7 + this.countLines(title.description, lineWidth);
			if (title.features) {
				title.features.filter(f => f.id === title.selectedFeatureID).forEach(f => {
					tSize += this.calculateFeatureSize(f, lineWidth, false);
				});
			}
			size += tSize;
		});
		return +size.toFixed(1);
	};

	static calculateFollowerSize = (follower: FollowerSheet, lineWidth: number): number => {
		let size = 0;
		if (follower.classification === 'Follower') {
			size = 6; // name, characteristics
			size += this.countLines(`Skills: ${follower.skills?.join(', ')}`, lineWidth);
			size += this.countLines(`Languages: ${follower.languages?.join(', ')}`, lineWidth);
			size += 0.5;
		} else {
			size = 22; // name, stats, characteristics, stamina
			follower.abilities?.forEach(ability => {
				size += this.calculateAbilityComponentSize(ability, lineWidth);
			});
			follower.features?.forEach(f => {
				size += this.calculateFeatureSize(f, lineWidth, false);
			});
			follower.advancement?.forEach(advancement => {
				size += 1.5 + this.calculateAbilityComponentSize(advancement.ability, lineWidth);
			});
		}
		return size;
	};

	static calculateMonsterSize = (monster: MonsterSheet, lineWidth: number): number => {
		let size = 0;
		size = 12; // name, stats, characteristics
		monster.abilities?.forEach(ability => {
			size += this.calculateAbilityComponentSize(ability, lineWidth - 5);
		});
		monster.features?.forEach(f => {
			size += this.calculateFeatureSize(f, lineWidth, false);
		});
		// ability/feature dividers
		size += 0.6 * Math.max(0, ((monster.abilities?.length || 0) + (monster.features?.length || 0) - 1));
		return size;
	};

	static calculateFollowersSize = (followers: FollowerSheet[], lineWidth: number): number => {
		let size = 2.5; // card header
		followers.forEach(f => {
			size += 0.8 + this.calculateFollowerSize(f, lineWidth);
		});
		return size;
	};

	// COMPACT Ability display - e.g. for Retainers & Monsters
	static calculateAbilityComponentSize = (ability: AbilitySheet, lineWidth: number): number => {
		let size = 2; // name, usage
		size += this.countLines(`${ability.keywords} ${ability.actionType}`, lineWidth);
		size += this.countLines(`${ability.distance} ${ability.target}`, lineWidth);

		const rollLineLen = Math.ceil(lineWidth - 10); // account for icons
		size += this.countLines(ability.rollT1Effect, rollLineLen);
		size += this.countLines(ability.rollT2Effect, rollLineLen);
		size += this.countLines(ability.rollT3Effect, rollLineLen);

		if (ability.trigger)
			size += this.countLines(ability.trigger, lineWidth);

		if (ability.effect) {
			const effectSize = this.countLines(ability.effect, lineWidth);
			size += effectSize;
		}
		return size;
	};

	static calculateRuleReferenceCardSize = (rule: RulesItem, lineWidth: number): number => {
		let size = 3;
		size += this.countLines(rule.content, lineWidth - 4); // account for padding
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
			size += 2.5; // keywords, distance, etc
			size += ability.hasPowerRoll ? 2 : 0;
			size += 2 * this.countLines(ability.rollT1Effect, rollLineLen);
			size += 2 * this.countLines(ability.rollT2Effect, rollLineLen);
			size += 2 * this.countLines(ability.rollT3Effect, rollLineLen);
			if (ability.trigger)
				size += 1 + this.countLines(ability.trigger, lineWidth);
			if (ability.effect) {
				const effectSize = this.countLines(ability.effect, lineWidth, 1);
				size += 2 + effectSize;
			}
		}
		return size;
	};

	static countLines = (text: string | undefined, lineWidth: number, emptyLineSize = 0) => {
		return text?.trim().split('\n').reduce((n, l) => {
			let len = Math.max(emptyLineSize, Math.ceil(l.length / lineWidth));
			if (l.startsWith('|:---')) { // table divider
				len = 0;
			} else if (l.startsWith('|') && l.endsWith('|')) { // table row
				len = Math.ceil(l.replaceAll('|', '').trim().length / (lineWidth - 3));
				len += 0.4;// additional row spacing
			} else if (l.startsWith('**')) { // bolded label - will have extra bottom margin
				len += 0.5;
			} else if (l.startsWith('* ')) { // list item, will be indented
				len = Math.ceil(l.length / (lineWidth - 3));
			}

			return n + len + 0.2;
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

	static joinCommasOr = (options: string[] | undefined): string => {
		if (options?.length) {
			if (options.length <= 2) {
				return options.slice(-2).join(' or ');
			} else {
				const last2 = options.slice(-2).join(' or ');
				return [ options.slice(0, -2).join(', '), last2 ].join(', ');
			}
		} else {
			return '';
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

	static formatAbilityTier = (value: string, tier: number, ability: Ability, creature: Hero | Monster | undefined) => {
		if (ability.distance.length > 1) {
			const distanceTypes = ability.distance.map(d => d.type);
			const values = distanceTypes.map(d => {
				return {
					type: d,
					effect: SheetFormatter.cleanupText(AbilityLogic.getTierEffectCreature(value, tier, ability, d, creature)).split('; ')
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
		return SheetFormatter.cleanupText(AbilityLogic.getTierEffectCreature(value, tier, ability, undefined, creature));
	};

	static abilitySections = (sections: (AbilitySectionText | AbilitySectionField | AbilitySectionRoll | AbilitySectionPackage)[], creature: Hero | Monster | undefined): string => {
		const lines: string[] = [];
		for (const section of sections) {
			let text = SheetFormatter.abilitySection(section, creature);
			text = SheetFormatter.enhanceMarkdown(text);
			lines.push(text);
		}
		return lines.join('\n');
	};

	static abilitySection = (section: (AbilitySectionText | AbilitySectionField | AbilitySectionRoll | AbilitySectionPackage), creature: Hero | Monster | undefined): string => {
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
			case 'package':
				if (CreatureLogic.isHero(creature)) {
					text = HeroLogic.getFeatures(creature)
						.map(f => f.feature)
						.filter(f => f.type === FeatureType.PackageContent)
						.filter(f => f.data.tag === section.tag)
						.map(f => (
							`\n#### ${f.name}:\n${f.description}`
						)).join('\n');
				} else {
					console.warn('Ability package in NON-HERO!', section, creature);
				}
				break;
		}
		return text;
	};

	static getAbilityIcon = (ability: Ability | AbilitySheet) => {
		let abilityIcon = starIcon;
		// Melee / Ranged
		if (ability.keywords?.includes('Melee')) {
			if (ability.keywords.includes('Ranged')) {
				abilityIcon = meleeRangedIcon;
			} else {
				abilityIcon = meleeIcon;
			}
		} else if (ability.keywords?.includes('Ranged')) {
			abilityIcon = rangedIcon;
		}

		// Targets
		if (ability.target?.toLowerCase() === 'self') {
			abilityIcon = selfIcon;
		}

		// Other Distances
		let distance, type;
		if ('repeatable' in ability) { // Ability
			distance = ability.distance.map(ad => ad.type.toString()).join(' ');
			type = ability.type.usage.toString();
		} else {
			distance = ability.distance;
			type = ability.actionType;
		}

		if (distance?.includes('Aura') || distance?.includes('Burst')) {
			abilityIcon = burstIcon;
		} else if (distance?.includes('Line') || distance?.includes('Cube') || distance?.includes('Wall')) {
			abilityIcon = areaIcon;
		}

		// Ability Type
		if (type?.includes('Trigger')) {
			abilityIcon = triggerIcon;
		} else if (type?.includes('Villain')) {
			abilityIcon = skullIcon;
		}

		return abilityIcon;
	};

	static getIconSrc = (icon: StatBlockIcon | undefined) => {
		let src = starIcon;
		switch (icon) {
			case StatBlockIcon.Area:
				src = areaIcon;
				break;
			case StatBlockIcon.AuraBurst:
				src = burstIcon;
				break;
			case StatBlockIcon.Melee:
				src = meleeIcon;
				break;
			case StatBlockIcon.MeleeRanged:
				src = meleeRangedIcon;
				break;
			case StatBlockIcon.Ranged:
				src = rangedIcon;
				break;
			case StatBlockIcon.Self:
				src = selfIcon;
				break;
			case StatBlockIcon.SpecialArea:
				src = specialAreaIcon;
				break;
			case StatBlockIcon.Trait:
				src = starIcon;
				break;
			case StatBlockIcon.Trigger:
				src = triggerIcon;
				break;
			case StatBlockIcon.Villain:
				src = skullIcon;
				break;
		}
		return src;
	};
}
