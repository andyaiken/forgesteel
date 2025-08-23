import { Characteristic } from "../enums/characteristic";
import { FeatureType } from "../enums/feature-type";
import { AbilitySectionField, AbilitySectionPackage, AbilitySectionRoll, AbilitySectionText } from "../models/ability";
import { Feature } from "../models/feature";
import { Utils } from "./utils";

export class CharacterSheetFormatter {
    static getPageId = (heroId: string, pageNum: number) => {
        return `hero-sheet-${heroId}-page-${pageNum}`;
    }

    static addSign = (n: number | undefined) => {
        if (n !== undefined) {
            return n >= 0 ? '+' + n : n.toString();
        }
    }

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

    private static splitAt = 2;
    static shortenText = (text: string) => {
        const split = text.split('\n');
        if (split.length > this.splitAt) {
            text = split.slice(0, this.splitAt).join('\n') + '\n*…(continued in reference)…*'
        }
        return this.cleanupText(text);
    };

    static isLongFeature = (f: Feature): boolean => {
        return f.description.split('\n').length > this.splitAt;
    };

    // There are some that might just be *too* long for the Class Features section, 
    // even just showing the first paragraph. Possible candidates:
    //  - Elementalist's 'Persistent Magic'
    //  - Fury's 'Growing Ferocity'
    static isVERYLongFeature = (f: Feature): boolean => {
        return f.name.includes('Persistent Magic');
    };

    static featureTypeOrder: FeatureType[] = [
        FeatureType.Text, FeatureType.Perk, FeatureType.Ability, FeatureType.ClassAbility,
        FeatureType.AbilityDistance, FeatureType.DamageModifier, FeatureType.Kit, 
        FeatureType.HeroicResource, FeatureType.Domain, FeatureType.ConditionImmunity,
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
            return [options.slice(0, -2).join(', '), last2].join(', ');
        }
    }

    static abilitySections = (sections: (AbilitySectionText | AbilitySectionField | AbilitySectionRoll | AbilitySectionPackage)[]): string => {
        const lines: string[] = [];
        for (const section of sections) {
            let text = CharacterSheetFormatter.abilitySection(section);
            text = CharacterSheetFormatter.cleanupText(text);
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
                text = `\n${section.name} ${section.value}${section.repeatable ? '+' : ''}:\n${section.effect}`;
            } else {
                text = `\n${section.name}:\n${section.effect}`;
            }
            break;
        }
        return text;
    };
}