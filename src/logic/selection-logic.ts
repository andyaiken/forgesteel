import { ChoiceAssignmentLogic, ChoiceSlot } from '@/logic/choice-assignment-logic';
import { Feature, FeatureLanguageChoice, FeatureSkillChoice } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Language } from '@/models/language';
import { LanguageLogic } from '@/logic/language-logic';
import { Skill } from '@/models/skill';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';

export interface SelectionWarnings {
	skills: string[];
	languages: string[];
}

export class SelectionLogic {
	static hasUndismissedWarnings = (warnings: SelectionWarnings, dismissed?: Hero['selectionWarningsDismissed']): boolean => {
		return (warnings.skills.length > 0 && !dismissed?.skills) || (warnings.languages.length > 0 && !dismissed?.languages);
	};

	static getSkillSlots = (features: FeatureSkillChoice[], allSkills: Skill[]): ChoiceSlot[] => {
		return features.map(feature => {
			const data = feature.data;
			const accepts = (name: string) => {
				if (data.options.includes(name)) {
					return true;
				}
				const skill = allSkills.find(s => s.name === name);
				return !!skill && data.listOptions.includes(skill.list);
			};
			return {
				id: feature.id,
				capacity: data.count,
				selected: data.selected,
				rank: allSkills.filter(s => accepts(s.name)).length + data.options.filter(o => !allSkills.some(s => s.name === o)).length,
				accepts: accepts
			};
		});
	};

	static getLanguageSlots = (features: FeatureLanguageChoice[], allLanguages: Language[]): ChoiceSlot[] => {
		return features.map(feature => {
			const data = feature.data;
			const accepts = (name: string) => LanguageLogic.isAllowed(name, data, allLanguages);
			return {
				id: feature.id,
				capacity: data.count,
				selected: data.selected,
				rank: allLanguages.filter(l => accepts(l.name)).length + data.options.filter(name => !allLanguages.some(l => l.name === name)).length,
				accepts: accepts
			};
		});
	};

	static getWarnings = (hero: Hero, sourcebooks: Sourcebook[]): SelectionWarnings => {
		const features: Feature[] = HeroLogic.getFeatures(hero).map(f => f.feature);
		const skillSlots = SelectionLogic.getSkillSlots(features.filter(f => f.type === FeatureType.SkillChoice), SourcebookLogic.getSkills(sourcebooks));
		const languageSlots = SelectionLogic.getLanguageSlots(features.filter(f => f.type === FeatureType.LanguageChoice), SourcebookLogic.getLanguages(sourcebooks));
		const grantedLanguages = features.flatMap(f => f.type === FeatureType.Language ? [ f.data.language ] : []);
		return {
			skills: ChoiceAssignmentLogic.getUnsupportedSelections(skillSlots),
			languages: ChoiceAssignmentLogic.getUnsupportedSelections(languageSlots).filter(name => !grantedLanguages.includes(name))
		};
	};
}
