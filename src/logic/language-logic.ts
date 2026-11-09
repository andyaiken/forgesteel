import { FeatureLanguageChoiceData } from '@/models/feature';
import { Language } from '@/models/language';

export class LanguageLogic {
	static isAllowed = (name: string, data: FeatureLanguageChoiceData, languages: Language[]): boolean => {
		return data.options.includes(name) || languages.some(language => language.name === name && data.allowedTypes.includes(language.type));
	};
}
