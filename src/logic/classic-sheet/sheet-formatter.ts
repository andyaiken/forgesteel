import { Ability, AbilitySectionField, AbilitySectionPackage, AbilitySectionRoll, AbilitySectionText } from '@/models/ability';
import { FollowerSheet, ItemSheet, ProjectSheet } from '@/models/classic-sheets/hero-sheet';
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
import { MonsterSheet } from '@/models/classic-sheets/monster-sheet';
import { RulesItem } from '@/models/rules-item';
import { StatBlockIcon } from '@/enums/stat-block-icon';
import { Title } from '@/models/title';
import { Utils } from '@/utils/utils';

import areaIcon from '@/assets/icons/area.svg';
import burstIcon from '@/assets/icons/burst.svg';
import meleeIcon from '@/assets/icons/melee.svg';
import meleeRangedIcon from '@/assets/icons/versatile.svg';
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
	// #region Text & Feature Manipulation
	static getPageId = (kind: string, id: string, key: string) => {
		return `${kind}-${id}-page-${key}`;
	};

	static addSign = (n: number | undefined) => {
		if (n !== undefined) {
			return n > 0 ? '+' + n : n.toString();
		}
	};

	static convertFeaturesShort = (features: Feature[]): Feature[] => {
		return this.convertFeatures(features.map(f => ({ feature: f, display: 'short' })));
	};

	static convertFeatures = (features: { feature: Feature, display: 'short' | 'full' }[]): Feature[] => {
		features.sort((a, b) => this.sortFeatures(a.feature, b.feature));
		const results: Feature[] = [];
		for (const fd of features) {
			results.push(this.cleanupFeature(fd.feature, fd.display));
		}
		return results;
	};

	static cleanupFeature = (feature: Feature, display: 'short' | 'full' = 'short'): Feature => {
		const result = Utils.copy(feature);
		if (display !== 'full' && this.isVERYLongFeature(feature)) {
			result.description = '*See Reference for details…*';
		} else if (display !== 'full' && this.isLongFeature(feature)) {
			result.description = this.shortenText(feature.description);
		} else {
			result.description = this.cleanupText(feature.description);
		}

		return result;
	};

	static cleanupText = (text: string) => {
		text = text
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
			.replace(/\|\s+≤\s*11\s+\|/g, `|![11 or less](${rollT1Icon})|`)
			.replace(/\|\s+12\s*[-–]\s*16\s+\|/g, `|![12 to 16](${rollT2Icon})|`)
			.replace(/\|\s+≥?\s*17\s*\+?\s+\|/g, `|![17 or greater](${rollT3Icon})|`)
			.replace(/11 or lower:?/g, `![11 or less](${rollT1Icon})`)
			.replace(/12\s*[-–]\s*16:?/g, `![12 to 16](${rollT2Icon})`)
			.replace(/17\s*\+:?/g, `![17 or greater](${rollT3Icon})`);
		return text;
	};

	static shortenText = (text: string, splitAt: number = 1) => {
		const split = text.trim().split('\n');
		if (split.length > splitAt) {
			text = split.slice(0, splitAt).join('\n') + '\n<p class="continued-in-reference"><em>…(continued in reference)…</em></p>';
		}
		return this.cleanupText(text);
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
	// #endregion Text & Feature Manipulation

	// #region Feature Logic
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

	// Takes a list of features for a given Hero, as well as some info about how much display space is available on the sheet,
	// and divides the features into those that can be displayed within that space, and those that need to go in the
	// overflow/reference space.
	static divideFeatures = (sourcedFeatures: { feature: Feature, source: string }[], hero: Hero | null, availableSpace: number, lineLength: number = 50, columns: number = 1) => {
		const displayed: { feature: Feature, display: 'short' | 'full' }[] = [];
		const reference: { feature: Feature, source: string }[] = [];
		const extraRefItems: { title: string, content: string, wide: boolean, section: string }[] = [];

		sourcedFeatures.sort((a, b) => this.sortFeatures(a.feature, b.feature));
		let size = 0;
		let longest = 0;
		sourcedFeatures.forEach(sf => {
			const sourcedFeature = Utils.copy(sf);
			const f = sourcedFeature.feature;
			let display = false;
			let fSize = 1;
			let displaySize: 'short' | 'full' = 'full';
			if (size < availableSpace) {
				fSize = this.calculateFeatureSize(f, hero, lineLength);
				longest = Math.max(fSize, longest);
				if (this.isLongFeature(f)) {
					let addToReference = true;
					displaySize = 'short';
					if (this.containsExtractableReferenceContent(f)) {
						// pull out table
						const referenceContent = this.extractReferenceContent(f);
						if (referenceContent) {
							extraRefItems.push({
								title: referenceContent.title,
								content: referenceContent.content,
								wide: referenceContent.wide,
								section: referenceContent.section
							});
							if (!referenceContent.leftover.length)
								return;
							f.description = referenceContent.leftover;
						}
						// re-check size without table to see if needs to go in reference
						fSize = this.calculateFeatureSize(f, hero, lineLength);
						longest = Math.max(fSize, longest);
						// can fit
						if (!this.isLongFeature(f)) {
							addToReference = false;
						}
					}
					if (addToReference)
						reference.push(sourcedFeature);

					if (this.isVERYLongFeature(f)) {
						fSize = 2;
					}
					fSize += 1;
				}
				// double-count the longest feature to acocunt for worst-case column balancing
				if (size + fSize + (longest * (columns - 1)) <= availableSpace) {
					display = true;
				}
			}
			size += fSize;

			if (display) {
				displayed.push({ feature: f, display: displaySize });
			} else {
				reference.push(sourcedFeature);
			}
		});

		let distinctReference = Collections.distinct(reference, f => f);

		// If we still have space, see if we can show full versions of some long features
		if (size < availableSpace) {
			const referenceWithSize = distinctReference.map(sf => {
				const fullSize = this.calculateFeatureSize(sf.feature, hero, lineLength, false);
				return {
					feature: sf,
					size: fullSize
				};
			}).sort((a, b) => a.size - b.size);

			referenceWithSize.every(fws => {
				const f = fws.feature.feature;
				let prevSize = 0;
				if (displayed.find(fd => fd.feature.id === f.id)) {
					prevSize = this.isVERYLongFeature(f) ? 2 : this.calculateFeatureSize(f, hero, lineLength);
				}
				const newLongest = Math.max(longest, fws.size);
				if (size - prevSize + fws.size + (newLongest * (columns - 1)) < availableSpace) {
					distinctReference = distinctReference.filter(rf => rf.feature.id !== f.id);
					const d = displayed.find(fd => fd.feature.id === f.id);
					if (d) {
						d.display = 'full';
					} else {
						displayed.push({ feature: f, display: 'full' });
					}
					size = size - prevSize + fws.size;
					longest = newLongest;
					return true;
				} else {
					return false;
				}
			});
		}

		return {
			displayed: displayed,
			reference: distinctReference,
			extraReferenceItems: extraRefItems
		};
	};

	static containsExtractableReferenceContent = (feature: Feature): boolean => {
		return this.containsLargeTable(feature)
			|| this.isSpecialHandlingFeature(feature);
	};

	static containsLargeTable = (feature: Feature): boolean => {
		const fourColumns = feature.description.match(/\|([:\-=\s]{3,}\|){4,}/);

		return fourColumns !== null;
	};

	// Some specific features can use some special handling to improve the layout/usability of the sheet
	static isSpecialHandlingFeature = (feature: Feature): boolean => {
		return [
			'beastheart-1-2b',
			'summoner-1-2'
		].includes(feature.id);
	};

	static extractReferenceContent = (feature: Feature): { title: string, content: string, leftover: string, wide: boolean, section: string } | null => {
		if (this.containsLargeTable(feature)) {
			const table = this.extractTable(feature.description);
			if (table) {
				table.title = `${feature.name}: ${table.title}`;
			}
			return table;
		} else if (this.isSpecialHandlingFeature(feature)) {
			return this.extractSpecialHandlingData(feature);
		}
		return null;
	};

	// If there is a table in the given feature's description, remove it and return separately
	static extractTable = (text: string): { title: string, content: string, leftover: string, wide: boolean, section: string } | null => {
		let result = null;

		const tableAndLabel = text.match(/(?:^\s*(?:\*\*|#+\s+)(?<label>[^*]*)(?:\*\*)?(?:\n|$)+)?(?<table>(?:^\s*\|(?:.*\|){2,}\s*(?:\n|$)){3,})/m);
		if (tableAndLabel && tableAndLabel.groups) {
			const tableContent = tableAndLabel.groups['table'].trim();
			const firstHeaderCellMatch = tableContent.match(/(?:^\|([^|]*)\|)/m);
			let titleLabel = 'Table';
			if (tableAndLabel.groups['label']) {
				titleLabel = tableAndLabel.groups['label'].trim();
			} else if (firstHeaderCellMatch) {
				titleLabel = `${firstHeaderCellMatch[1].trim()} Table`;
			}
			const title = `${titleLabel}`;
			result = {
				title: title,
				content: tableContent,
				leftover: text.split(tableAndLabel[0]).map(s => s.trim()).join('\n').trim(),
				wide: true,
				section: 'abilities'
			};
		}
		return result;
	};

	static extractSpecialHandlingData = (feature: Feature): { title: string, content: string, leftover: string, wide: boolean, section: string } | null => {
		switch (feature.id) {
			case 'summoner-1-2': {
				const splitLoc = feature.description.indexOf('###');
				const before = feature.description.slice(0, splitLoc).trim();
				const ref = feature.description.slice(splitLoc).trim();
				return {
					title: 'Summoner Minions',
					content: ref,
					leftover: before,
					wide: false,
					section: 'followers'
				};
			}
			case 'beastheart-1-2b':
				return {
					title: feature.name,
					content: feature.description,
					leftover: '',
					wide: false,
					section: 'followers'
				};
		}
		return null;
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
	// #endregion Feature Logic

	// #region Ability Logic
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
				} else if (creature !== undefined) {
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

	static getSkillAbbreviation = (skill: string): string => {
		switch (skill) {
			case 'Criminal Underworld':
				return 'Criminal Und.';
		}
		return skill;
	};
	// #endregion Ability Logic

	// #region Size Calculation
	static calculateFeatureSize = (f: Feature, hero: Hero | null, lineWidth: number, countShortenedText: boolean = true): number => {
		let size = 1;
		const headerSize = 1.5;
		const bottomMargin = 0.3;
		if ([ FeatureType.Multiple, FeatureType.PackageContent ].includes(f.type)) {
			size = 0;
		} else if (this.isLongFeature(f) && countShortenedText) {
			size = headerSize + this.countLines(f.description.trim().split('\n')[0], lineWidth);
			size += bottomMargin;
		} else if (f.type === FeatureType.Text) {
			size = headerSize + this.countLines(f.description.trim(), lineWidth, 0, 0.88);
			size += bottomMargin;
		} else if (f.type === FeatureType.Package) {
			size = headerSize + this.countLines(f.description.trim(), lineWidth, 0, 0.88);
			if (hero) {
				const packageContent = HeroLogic.getFeatures(hero)
					.map(hf => hf.feature)
					.filter(hf => hf.type === FeatureType.PackageContent)
					.filter(hf => hf.data.tag === f.data.tag);
				packageContent.forEach(pc => {
					size += headerSize + this.countLines(pc.description.trim(), lineWidth, 0, 0.88);
				});
			}
			size += bottomMargin;
		} else if (f.type === FeatureType.Ability) {
			size = headerSize + this.countLines(f.data.ability.description.trim(), lineWidth);
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

	static calculateFeatureReferenceSize = (features: { feature: Feature, source: string }[], hero: Hero, lineWidth: number, columns: number): number => {
		const headerSize = 2.5; // Card header
		let largestFeature = 0;
		let size = 0;
		const sources: string[] = [];
		if (features) {
			features.forEach(f => {
				let fSize = this.calculateFeatureSize(f.feature, hero, lineWidth, false);
				if (!sources.includes(f.source)) {
					fSize += 2;
					sources.push(f.source);
				}
				size += fSize;
				largestFeature = Math.max(largestFeature, fSize);
			});
			size = Math.max(Math.ceil(size / columns), largestFeature);
		}
		const totalSize = headerSize + size;
		return +totalSize.toFixed(1);
	};

	static calculateInventorySize = (items: ItemSheet[], lineWidth: number): number => {
		let size = 2.5; // Card header
		if (items) {
			items.forEach(i => {
				size += this.calculateItemSize(i, lineWidth);
			});
		}
		return +size.toFixed(1);
	};

	static calculateItemSize = (item: ItemSheet, lineWidth: number): number => {
		let size = 2;
		if (item.features) {
			size += item.features.reduce((s, f) => {
				s += this.calculateFeatureSize(f, null, lineWidth, false);
				return s;
			}, 0);
		}
		return size;
	};

	static calculateTitlesSize = (titles: Title[] | undefined, lineWidth: number): number => {
		let size = 2.5; // Card header
		titles?.forEach(title => {
			let tSize = 1.7 + this.countLines(title.description, lineWidth);
			if (title.features) {
				title.features.filter(f => f.id === title.selectedFeatureID).forEach(f => {
					tSize += this.calculateFeatureSize(f, null, lineWidth, false);
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
				size += this.calculateAbilityComponentSize(ability, lineWidth) + 1;
			});
			follower.features?.forEach(f => {
				size += this.calculateFeatureSize(f, null, lineWidth, false) + 1;
			});
			follower.advancement?.forEach(advancement => {
				size += 1.5;
				if (advancement.ability) {
					size += this.calculateAbilityComponentSize(advancement.ability, lineWidth);
				}
				if (advancement.features?.length) {
					advancement.features.forEach(f => {
						size += this.calculateFeatureSize(f, null, lineWidth);
					});
				}
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
			size += this.calculateFeatureSize(f, null, lineWidth, false);
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

	static calculateProjectDetailCardSize = (project: ProjectSheet, lineWidth: number): number => {
		let size = 3;
		size += this.calculateProjectComponentSize(project, lineWidth);
		return size;
	};

	static calculateProjectComponentSize = (project: ProjectSheet, lineWidth: number): number => {
		let size = 0;
		size += this.countLines(`Item Prerequisite ${project.prerequisites}`, lineWidth);
		size += 1.8; // Prerequisites box
		size += this.countLines(`Project Source ${project.source}`, lineWidth);
		size += 1.8; // Source box
		size += this.countLines(`Project Roll Characteristic ${project.characteristic}`, lineWidth);
		size += 1; // points goal
		size += this.countLines(project.effect, lineWidth, 0);
		return size;
	};

	static calculateProjectsOverviewCardSize = (projects: ProjectSheet[], lineWidth: number): number => {
		let size = 2.7;
		projects.forEach(p => {
			size += 1.8; // header
			size += this.calculateProjectComponentSize(p, lineWidth);
			size += 1.2; // divider
		});
		size -= 1.2;// last divider not present
		return size;
	};

	static calculateAbilitySize = (ability: AbilitySheet | undefined, lineWidth: number): number => {
		let size = 0;
		const rollLineLen = Math.ceil(0.8 * lineWidth) - 10;
		if (ability) {
			size += 4; // title
			size += this.countLines(ability.description, lineWidth);
			size += 2.5; // keywords, distance, etc
			size += ability.hasPowerRoll ? 2 : 0;
			if (ability.hasPowerRoll) {
				size += 0.3 + this.countLines(ability.rollT1Effect, rollLineLen);
				size += 0.3 + this.countLines(ability.rollT2Effect, rollLineLen);
				size += 0.3 + this.countLines(ability.rollT3Effect, rollLineLen);
			}
			if (ability.trigger)
				size += 1 + this.countLines(ability.trigger, lineWidth);
			if (ability.effect) {
				if (ability.hasPowerRoll) {
					size += 0.5; // extra padding when effect follows power roll
				}
				const effectSize = this.countLines(ability.effect, lineWidth, 1);
				size += 2 + effectSize;
			}
		}
		return size;
	};

	static countLines = (text: string | undefined, lineWidth: number, emptyLineSize = 0, lineFactor: number = 1) => {
		const result = text?.trim().split('\n').reduce((n, l) => {
			let len = emptyLineSize;
			if (l.length) {
				len = Math.ceil(l.length / lineWidth) * lineFactor;
				len += 0.2;// additional spacing
			}
			if (l.startsWith('|:---')) { // table divider
				len = 0;
			} else if (l.startsWith('|') && l.endsWith('|')) { // table row
				len = Math.ceil(l.replaceAll('|', '').trim().length / (lineWidth - 3));
				len += 0.6;// additional row spacing
			} else if (l.startsWith('**')) { // bolded label - will have extra bottom margin
				len += 0.5;
			} else if (l.startsWith('* ')) { // list item, will be indented
				len = Math.ceil(l.length / (lineWidth - 3));
			}

			return n + len;
		}, 0) || 0;
		return result;
	};

	static getLargestSize = (abilities: AbilitySheet[], lineLength: number): number => {
		const largestSize = abilities.reduce((h, a) => {
			return Math.max(h, this.calculateAbilitySize(a, lineLength));
		}, 0);
		return largestSize;
	};
	// #endregion Size Calculation

	// #region Sorting
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
			const typeOrder = this.featureTypeOrder.indexOf(a.type) - this.featureTypeOrder.indexOf(b.type);
			if (typeOrder === 0) {
				return this.calculateFeatureSize(a, null, 50, false) - this.calculateFeatureSize(b, null, 50, false);
			}
			return typeOrder;
		} else if (aSort) {
			return -1;
		} else if (bSort) {
			return 1;
		} else {
			const typeOrder = a.type.toString().localeCompare(b.type.toString());
			if (typeOrder === 0) {
				return this.calculateFeatureSize(a, null, 50, false) - this.calculateFeatureSize(b, null, 50, false);
			}
			return typeOrder;
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

	static sortAbilitiesByLength = (a: AbilitySheet, b: AbilitySheet, order: 'asc' | 'desc' = 'asc'): number => {
		const aLength = this.calculateAbilitySize(a, 50);
		const bLength = this.calculateAbilitySize(b, 50);

		if (order === 'asc') {
			return aLength - bLength;
		} else {
			return bLength - aLength;
		}
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

	static sortAbilitiesByType = (a: AbilitySheet, b: AbilitySheet, order: 'asc' | 'desc' = 'desc'): number => {
		const aType = a.actionType || '';
		const bType = b.actionType || '';
		const aSort = aType.length && this.abilityTypeOrder.includes(aType);
		const bSort = bType.length && this.abilityTypeOrder.includes(bType);

		if (aSort && bSort) {
			let s = this.abilityTypeOrder.indexOf(aType) - this.abilityTypeOrder.indexOf(bType);
			if (s === 0) {
				s = a.cost - b.cost;
				if (s === 0) {
					return this.sortAbilitiesByLength(a, b, order);
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
				return this.sortAbilitiesByLength(a, b, 'desc');
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

	static resourceGainTriggerOrder: string[] = [
		'when', 'the first time'
	];

	static sortHeroicResourceGains = (a: { tag: string, trigger: string, value: string; }, b: { tag: string, trigger: string, value: string; }): number => {
		const aStart = a.tag === 'start';
		const bStart = b.tag === 'start';

		const aSort = this.resourceGainTriggerOrder.reduce((v, s, i) => {
			if (v < 0) {
				if (a.trigger.toLocaleLowerCase().startsWith(s)) {
					v = i;
				}
			}
			return v;
		}, -1);
		const bSort = this.resourceGainTriggerOrder.reduce((v, s, i) => {
			if (v < 0) {
				if (b.trigger.toLocaleLowerCase().startsWith(s)) {
					v = i;
				}
			}
			return v;
		}, -1);
		if (aStart && !bStart) {
			return -1;
		} else if (!aStart && bStart) {
			return 1;
		} else if (aSort !== bSort) {
			return aSort - bSort;
		} else {
			return a.trigger.length - b.trigger.length;
		}
	};
	// #endregion Sorting
}
